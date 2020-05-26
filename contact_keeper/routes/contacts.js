const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Contact = require("../models/Contact");

//  @route    GET api/contacts
//  @desc     Get all users contacts
//  @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    }); // make the most recent contact first
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  @route    POST api/contacts
//  @desc     Add new contacts
//  @access   Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    // Resolve the check results from Express-Validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Get name from request
    const { name, email, phone, type } = req.body;

    try {
      // Create a contact document
      const newContact = new Contact({
        user: req.user.id,
        name,
        email,
        phone,
        type,
      });
      // Save it to the database
      const contact = await newContact.save();
      // Return the status and the document added successfully
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//  @route    PUT api/auth
//  @desc     Update contact
//  @access   Private
router.put("/:id", auth, async (req, res) => {
  // Get context to be updated
  const { name, email, phone, type } = req.body;
  // Initialize a contact object
  const contactFields = {};
  if (name) {
    contactFields.name = name;
  }
  if (email) {
    contactFields.email = email;
  }
  if (phone) {
    contactFields.phone = phone;
  }
  if (type) {
    contactFields.type = type;
  }

  try {
    // Get the contact needs to be updated from the database
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    // Make sure user owns contact
    console.log(contact.user);
    console.log(req.user);
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Update the contact
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.send(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  @route    DELETE api/auth
//  @desc     Delete contact
//  @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Get the contact needs to be updated from the database
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    // Make sure user owns contact
    // console.log(contact.user);
    // console.log(req.user);
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Delete the contact
    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
