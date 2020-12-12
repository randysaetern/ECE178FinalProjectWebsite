const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const cloudinary = require('cloudinary');
const fs = require('fs');
const ImageItem= require("../models/ImageItem");


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../public/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, req.body.username + "_" + req.body.imagename + req.body._id + "." + file.mimetype.substring(6,file.mimetype.length));
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20
  },
  fileFilter: fileFilter
});

router.get("/", (req, res, next) => {
  ImageItem.find()
    .select("name price _id productImage")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/imageitems/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/add", upload.single('productImage'), async (req, res, next) => {
  try{
  const imageitem = new ImageItem({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    imagename: req.body.imagename,
    description: req.body.description,
    productImageType: req.file.mimetype.substring(6,req.file.mimetype.length),
    //productImage: req.file.path
  });
  
    console.log("here")
    //const uploadedResponse = await cloudinary.uploader.upload(req.body.data,{upload_preset: 'AuthenticChef'});
    //console.log(uploadedResponse.url);
    imageitem
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Image item successfully",
        ImageItemCreated: {
            chefname: result.chefname,
            foodname:req.body.foodname,
            price: result.price,
            description: result.description,
            ethnicity: result.ethnicity,
            _id: result._id,
            productImage: result.productImage,
            request: {
                type: 'GET',
                url: ""
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  }catch(error){
    console.error(error);
  }


});

router.get("/seller/:sellername", (req, res, next) => {
  const sellername = req.params.sellername;
  console.log(sellername);
  ImageItem.find({chefname:sellername})
    .then(doc => {
      console.log("From database", doc);
      res.json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  ImageItem.findById(id)
    .then(doc => {
      console.log("From database", doc);
      if(doc){
        res.json(doc);
      }
      else{
        res.json("ITEM NOT FOUND");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  ImageItem.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Product updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/imageitems/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  ImageItem.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Product deleted',
          request: {
              type: 'DELETE',
              url: 'http://localhost:3000/imageitems',
              body: { name: 'String', price: 'Number' }
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;