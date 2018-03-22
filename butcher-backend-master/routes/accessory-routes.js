const mongoose = require("mongoose");
const express = require("express");
const multer = require('multer');
const accessoryRoutes = express.Router();

const Accessory = require('../models/accessory-model');
const User = require('../models/user-model');

// multer for photo
const myUploader = multer({
  dest: __dirname + "/../public/uploads/"
});


// create new accessory
accessoryRoutes.post('/api/accessories', myUploader.single('accessoryImage'), (req, res, next) => {
    if(!req.user){
        res.status(401).json({message: "Log in to create accessory."});
        return;
    }
    const newAccessory = new Accessory({
      name: req.body.accessoryName,
      price: req.body.accessoryPrice,
      description: req.body.accessoryDescription,
      image: req.body.accessoryImage
    });
    if(req.file){
        newAccessory.image = '/uploads/' + req.file.filename;
    }

    newAccessory.save((err) => {
        if(err){
            res.status(500).json({message: "Some weird error from DB accessory-routes. ", err});
            return;
        }
        // validation errors
        if (err && newAccessory.errors){
            res.status(400).json({
                brandError: newAccessory.errors.brand,
            });
            return;
        }
        req.user.encryptedPassword = undefined;
        newAccessory.user = req.user;

        res.status(200).json(newAccessory);
    });
});

// list the accessories

accessoryRoutes.get('/api/accessories', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Log in to see accessories." });
      return;
    }
    Accessory.find()
      // retrieve all the info of the owners (needs "ref" in model)
      // don't retrieve "encryptedPassword" though
      .populate('user', { encryptedPassword: 0 })
      .exec((err, allTheAccessories) => {
        if (err) {
          res.status(500).json({ message: "Accessories find went bad." });
          return;
        }
        res.status(200).json(allTheAccessories);
      });
});

// list single accessory
accessoryRoutes.get("/api/accessories/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to see THE accessory." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Accessory.findById(req.params.id, (err, theAccessory) => {
    if (err) {
      //res.json(err);
      res.status(500).json({ message: "Accessories find went bad." });
      return;
    }

    res.status(200).json(theAccessory);
  });
});

// update the accessory
accessoryRoutes.put('/api/accessories/:id', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Log in to update the accessory." });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    const updates = {
        description: req.body.accessoryDescription,
        name: req.body.accessoryName,
        price: req.body.accessoryPrice
        // image: req.body.image    
    };

  Accessory.findByIdAndUpdate(req.params.id, updates, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "Accessory updated successfully."
    });
  });
});

// add the accessory to the cart
accessoryRoutes.post('/api/cart/:id', (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to add item to cart." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
  }

  const updates = {
      name: req.body.accessoryName,
      price: req.body.accessoryPrice,
      description: req.body.accessoryDescription,   
  };

User.findById(req.user._id, (err, user) => {
    if (err){
      res.json(err);
      return
    }

    user.cart.push(req.params.id)
    console.log(user)
})

  res.json({
    message: "Accessory successfully added to cart."
  });
});

// delete accessory
accessoryRoutes.delete("/api/accessories/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to delete the accessory." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid." });
    return;
  }

  Accessory.remove({ _id: req.params.id }, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "Accessory has been removed."
    });
  });
});


module.exports = accessoryRoutes;
