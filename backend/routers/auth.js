const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

//string for JWTdata : 
const JWT_SECRET = "rahulisgood$boy";

// ROUTER 1 : Create a User : "/api/auth/createuser". login doesn't required :  using: POST

router.post('/createuser' ,
    // Express validation for user
    [ body('name' , "Enter the valid name" ).isLength({ min: 3 }),
    body('password' , "Enter the valid password" ).isLength({ min: 5 }),
    body('email' , "Enter the valid email" ).isEmail() ] ,

    async (req,res) =>{
    // when Error occured this statment will be exicuted 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        // Check whether the user with this email is already exist
        let createUser = await User.findOne({email: req.body.email})
        if(createUser){
            return res.status(400).json({error: "Sorry! the user is with this email is alredy exist"})
        }

        // Hashing for Password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Otherwise Create a Collection in the database
        createUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        // Sending reponse to the user
        const data = {
            user:{
                id: createUser.id
            }
        }
        const authToken = jwt.sign( data, JWT_SECRET);
        res.json({success:true , authToken});
        // res.json(`The data has been Added : ${createUser}`);

    } catch(error){
        res.status(500).send("Some error occured");
        console.log(error)
    }
})


// ROUTER 2 : LogIn endpoint taking Email & Password from user : "/api/auth/login". login doesn't required :  using: POST

router.post('/loginuser' ,

    [ body('email' , "Enter the valid email" ).isEmail() ] ,
    body('password' , "Enter the valid password" ).exists(),

    async (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    // taking email and password from user req 
    const{email, password} = req.body;

    try {
        const userLogin = await User.findOne({email});

        if(userLogin){
            // compare password using bcrypt's compare method
            const comparePassword = await bcrypt.compare(password, userLogin.password);
            if(comparePassword){
                // Sending reponse to the user
                const data = {
                    user:{ id: userLogin.id }
                }
                const authToken = jwt.sign( data, JWT_SECRET);
                res.json({success:true , authToken});
            } else{ 
                res.status(404).json({error: "write here : correct authantication" })
            }
        }
        else{
            res.status(404).json({error: "write here : correct authantication" })
        }

    } catch (error) {
        res.status(500).send("Some error occured");
        console.log(error)
    }

})

// ROUTER 3 : Get logged in user Details : "/api/auth/getuserinfo". login required : using: POST

router.post("/getuserinfo", fetchuser, async (req,res) =>{
    
    try {
        // fetchuser se [req.user.id], userid me aajegi || fetch user is middleware function that can be called before async()
        let userid = req.user.id;
        // findById me Ek id dalenge jisse database me se all info aa jaegi --------> (-password)dene se password nhi fetch karega
        const userInfo = await User.findById(userid).select("-password")
        // then we can fetch all information about that user
        res.send(userInfo)
    }
    catch (error) {
        res.status(500).send("Some error occured");
        console.log(error)
    }
})


module.exports = router;