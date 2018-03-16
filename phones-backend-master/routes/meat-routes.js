const mongoose = require("mongoose");
const express = require("express");
const multer = require('multer');
const meatRoutes = express.Router();

const Meat = require('../models/meat-model');

// multer for photo
const myUploader = multer({
  dest: __dirname + "/../public/uploads/"
});


// create new meat
meatRoutes.post('/api/meats', myUploader.single('meatImage'), (req, res, next) => {
    if(!req.user){
        res.status(401).json({message: "Log in to create meat."});
        return;
    }
    const newMeat = new Meat({
      name: req.body.meatName,
      price: req.body.meatPrice,
      type: req.body.meatType,
      image: req.body.meatImage,
    });
    if(req.file){
        newMeat.image = '/uploads/' + req.file.filename;
    }

    newMeat.save((err) => {
        if(err){
            res.status(500).json({message: "Some weird error from DB.", err});
            return;
        }
        // validation errors
        if (err && newMeat.errors){
            res.status(400).json({
                brandError: newMeat.errors.brand,
            });
            return;
        }
        req.user.encryptedPassword = undefined;
        newMeat.user = req.user;

        res.status(200).json(newMeat);
    });
});

// list the meats

meatRoutes.get('/api/meats', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Log in to see meats." });
      return;
    }
    Meat.find()
      // retrieve all the info of the owners (needs "ref" in model)
      // don't retrieve "encryptedPassword" though
      .populate('user', { encryptedPassword: 0 })
      .exec((err, allTheMeats) => {
        if (err) {
          res.status(500).json({ message: "Meats find went bad." });
          return;
        }
        res.status(200).json(allTheMeats);
      });
});

// list single meat
meatRoutes.get("/api/meats/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to see THE meat." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Meat.findById(req.params.id, (err, theMeat) => {
    if (err) {
      //res.json(err);
      res.status(500).json({ message: "Meats find went bad." });
      return;
    }

    res.status(200).json(theMeat);
  });
});

// update the meat
meatRoutes.put('/api/meats/:id', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: "Log in to update the meat." });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    const updates = {
        brand: req.body.meatType,
        name: req.body.meatName,
        color: req.body.meatColor,
        // image: req.body.image    
    };

  Meat.findByIdAndUpdate(req.params.id, updates, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "Meat updated successfully."
    });
  });
});

// delete meat
meatRoutes.delete("/api/meats/:id", (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "Log in to delete the meat." });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid." });
    return;
  }

  Meat.remove({ _id: req.params.id }, err => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "Meat has been removed."
    });
  });
});


module.exports = meatRoutes;
