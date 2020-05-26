const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

//  @route    POST api/users
//  @desc     Register a user
//  @access   Public
router.post(
  "/",
  [
    check("name", "Please enter a name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters, with at least 1 letter"
    )
      .isLength({ min: 6 })
      .isString(),
  ],
  async (req, res) => {
    // Validate the inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // searching in the database
      let user = await User.findOne({ email });
      // if the email is already exist, reject the request
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      // Create a user
      user = new User({
        name,
        email,
        password,
      });
      // Encrypt the password (hash the password)
      const salt = await bcrypt.genSalt(10); // (n) indicates how secure the password is
      user.password = await bcrypt.hash(password, salt); // hash the password with the salt generated

      // Save the user to the database
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      // We have to sign it to generate a token
      // (payload, secret, options(object), callback)
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          // usually 3600 in production
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
