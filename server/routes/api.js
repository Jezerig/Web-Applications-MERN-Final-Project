
var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage})

require('../auth/passport')(passport)
//source: https://stackoverflow.com/questions/60034257/typeerror-req-login-is-not-a-function-passport-js
router.use(passport.initialize());


router.post('/login',
  upload.none(),
  body("email").trim().escape(),
  body("password"),
  (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) =>{
    if(err) throw err;
    if(!user) {
      return res.send({message: "Invalid credentials"});
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          const jwtPayload = {
            id: user._id,
            email: user.email
          }
          jwt.sign(
            jwtPayload,
            process.env.SECRET,
            {
              expiresIn: 6000
            },
            (err, token) => {
              res.json({success: true, token});
            }
          );
        } else {
          return res.status(403).json({message: "Invalid credentials"});
        }
      })
    }
    })
});

router.post('/register', 
  body("email").trim().isEmail().escape(),
  body("password").isStrongPassword().withMessage('Password is not strong enough'),
  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    User.findOne({email: req.body.email}, (err, user) => {
      if(err) {
        console.log(err);
        throw err
      };
      if(user){
        return res.status(403).json({message: "Email already in use"});
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            User.create(
              {
                username: req.body.username,
                email: req.body.email,
                password: hash,
                admin: 0
              },
              (err, ok) => {
                if(err) throw err;
                return res.redirect("/login");
              }
            );
          });
        });
      }
    });
});


module.exports = router;