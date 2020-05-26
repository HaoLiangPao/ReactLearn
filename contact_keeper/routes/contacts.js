const express = require("express");
const router = express.Router();

//  @route    GET api/contacts
//  @desc     Get all users contacts
//  @access   Private
router.get("/", (req, res) => {
  res.send("Get all contacts");
});

//  @route    POST api/auth
//  @desc     Add new contacts
//  @access   Private
router.post("/", (req, res) => {
  res.send("Add contact");
});

//  @route    PUT api/auth
//  @desc     Update contact
//  @access   Private
router.post("/", (req, res) => {
  res.send("Update contact");
});

//  @route    DELETE api/auth
//  @desc     Delete contact
//  @access   Private
router.post("/", (req, res) => {
  res.send("Delete contact");
});

module.exports = router;
