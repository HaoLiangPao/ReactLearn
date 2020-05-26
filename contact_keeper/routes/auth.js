const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

//  @route    GET api/auth
//  @desc     Get logged in user
//  @access   Private
router.get("/", auth, async (req, res) => {
  try {
    // Do not want to return the password
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  @route    POST api/auth
//  @desc     Auth user & get token
//  @access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Get valid email and password
    const { email, password } = req.body;

    try {
      // Check emails
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      // Both email and password match
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
