const express = require("express");
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
//use middleware in router.get()
const auth = require('../middleware/auth');

const router = express.Router();


// @route Get api/contacts
// @desc Get get all users contacts
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

// @route Post api/contacts
// @desc Add new contact
// @access Private
router.post('/',
    [auth,
        [
            check('name', 'Please add name').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, type } = req.body;

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            });

            const contact = await newContact.save();
            res.json(contact);

        } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
        }
    })

// @route Put api/contact
// @desc Update contact
// @access Private
router.put('/:id',
    auth,
    async (req, res) => {
        const { name, email, phone, type } = req.body;
        //build a contact obj
        const contactFileds = {};
        if (name) {
            contactFileds.name = name;
        }
        if (email) {
            contactFileds.email = email;
        }
        if (phone) {
            contactFileds.phone = phone;
        }
        if (type) {
            contactFileds.type = type;
        }

        try {
            let contact = await Contact.findById(req.params.id);
            if (!contact) {
                return res.status(404).json({ msg: "Contact not found" });
            }
            //make sure user owns contact
            if (contact.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: "Not authorized" });
            }
            contact = await Contact.findByIdAndUpdate(req.params.id,
                {
                    $set: contactFileds,
                    new: true
                });
            res.json(contact);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
        }

    })

// @route Put api/contact
// @desc Update contact
// @access Private
router.delete('/:id',
    auth,
    async (req, res) => {
        try {
            let contact = await Contact.findById(req.params.id);
            if (!contact) {
                return res.status(404).json({ msg: "Contact not found" });
            }
            //make sure user owns contact
            if (contact.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: "Not authorized" });
            }
            contact = await Contact.findByIdAndRemove(req.params.id);
            res.json({msg:"contact removed"});
        } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
        }
    })

module.exports = router;