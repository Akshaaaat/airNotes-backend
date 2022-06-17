const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const JWT_SECRET = "TechnicllyThisSHouldBeSecret";

//Create a User with POST '/api/auth/createuser'
router.post(
  "/createuser",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("name", "Enter a valid Name").isLength({ min: 4 }),
    body("pwd").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are errors then return ERROR 400
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Check if a user with this email already exists. If it does, then return ERROR 400.
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "A user already exists with this email" });
    }

    //Hashing the password so that no hacker can have it even if he hacks into the database. It is done by bcrypt.js
    const salt = await bcrypt.genSaltSync(10);
    const securePwd = await bcrypt.hash(req.body.pwd, salt);

    //Standard way of creating a User.
    user = await User.create({
      name: req.body.name,
      pwd: securePwd,
      email: req.body.email,
    });

    //Performing JWT Authentication
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json(authToken);
  }
);

//Authenticate a User using POST '/api/auth/login'. No login reqd
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("pwd", "Enter a Valid Password").isLength({ min: 4 }),
  ],
  async (req, res) => {
    //Check if there are Errors while filling the credentials.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, pwd } = req.body;
    try {
      
      //Checks if there is a user with the given email.
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Enter valid Credentials" });
      }

      //Compares the password to one stored in a database.
      const passwordCompare = await bcrypt.compare(pwd, user.pwd);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Invalid Credentials!!! Try again" });
      }

      //Performing JWT Authentication
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data,JWT_SECRET);
      res.json(authtoken)

    } 
    catch (error) {
        console.error(error.message);
        return res.status(500).json({error:"Internal Server Error occured"});
    }
  }
);

module.exports = router;
