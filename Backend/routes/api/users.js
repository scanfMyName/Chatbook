const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require("gravatar");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const keys = require('../../config/key');
const passport = require('passport');
const validateNewUser = require('../../validation/Signup');
const validateOldUser = require('../../validation/login');
const accessTokenSecret = 'youraccesstokensecret';
// for user route
router.get(
    '/test', (req,res) => res.json({msg:"user works"})
    
)

// for register or say sign up
router.post('/register', (req,res) => {
    
    const { errors, isValid } = validateNewUser(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({email: req.body.email.toLowerCase()})
    .then(user => {
        if(user){
            errors.email= 'email-already exist';
            return res.status(400).json(errors)
        }else {

            const avatar = gravatar.url(req.body.email,{
                s: '200',  //size of avatar
                r: 'pg',  // for the format 
                d: 'mm'    // for the default image
            });
            const newUser = new User({
                username:req.body.username,
                email: req.body.email.toLowerCase(),
                avatar,
                password:req.body.password,
                mobile: req.body.mobile
            });

            bcrypt.genSalt(20, (err,salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash) =>{
                   if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                   .then(user => res.json(user))
                   .catch(err => console.log(err));
                })
            })
            return res.json(newUser);
        }
    })
})


router.post('/login', async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
   
    const {errors, isValid} = validateOldUser(req.body); 


    if(!isValid){
        // errors.password = 'hello'
        return res.status(400).json(errors);
    }
    console.log(email);

    User.findOne({email})
    .then(user => {

        console.log("After Finding user from the database:", user)
        if(!user){
            errors.email = 'User not found'
          return res.status(404).json(errors);
        }

         bcrypt.compare(password,user.password).then( isMatch => {

            //  console.log("In Backend routes/api/ user.js after comparing user:",user); 
            if(isMatch) {

           // res.json({msg: 'Success'});

                 // user matched
                //   console.log("In Backend routes/api/ user.js after matching correctly:",isMatch);
                // creating a payload for assigning token
                const payload = { id:user.id, name:user.username, avatar: user.avatar }
                // Sign Token

                console.log("In Backend routes/api/ user.js after creating payload:",payload);
                
                const token1 = jwt.sign(
                    payload, 
                    keys.secretOrKey, 
                    { expiresIn: 360000000000000}, 
                    (err,token) => {

                        console.log("In Backend routes/api/ user.js after creating token:",token);
                        return res.status(200).json({token: token, message: 'Success',user:user});
                    });



               
               
            }
            else{
                errors.password = 'Password do not match'
                return res.status(400).json(errors);
            }
        })
    })
})

// @route Get api/users/current
// @desc Return the current user
// @access Private

router.get('/current',
passport.authenticate('jwt', { session: false }), 
(req, res) =>{
res.json({
    id: req.user.id,
    User_Name: req.user.username,
    email: req.user.email
})
})

module.exports = router;