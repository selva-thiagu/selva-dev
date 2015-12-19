/**
 *  File: crudContact
 *
 * Description: This file contains the CRUD methods which will talk to DB for contact Managment
 */
var mongoose = require('mongoose');
 
var contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    created_at: Date,
    updated_at: Date
})

var contact = mongoose.model('contact', contactSchema);

exports.getAllContacts = function() {
    // var count = contact.count();
    // console.log(count);
    contact.find({}, function(err, contacts) {
        if (err) {
            return console.log(err);
        } else {
            console.log(contacts);
        }

    });
};

exports.getContact = function(req, res) {
    contact.findOne({
        _id: req.query.id
    }, function(err, contact) {
        if (err) {
            return console.log(err);
        } else {
            console.log(contact);
        }
    });
};

exports.updateContact = function(req, res) {
    contact.where('_id', req.query.id).update({
        $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        }
    }, function(err, count) {
        if (err) {
            console.log('ERROR: ' + err);
        } else {
            console.log('saved !!!');
            console.log(count);
        }
    });
};

exports.addContact = function(req, res) {
    var object = req.body
    var addUser = new contact();
    addUser.name = req.body.name;
    addUser.email = req.body.email;
    addUser.phone = req.body.phone;
    addUser.avatar = "9.jpg";
    addUser.save(function(err, savedObject) {
        if (err) {
            console.log('ERROR: ' + err);
        } else {
            console.log('saved !!!');
            console.log(savedObject);
        }
    });
};

exports.removeContact = function(req, res) {
    console.log('id is ---- ' + req.query.id);
    contact.findByIdAndRemove(req.query.id, function(err, contact) {
        if (err) {
            return console.log(err);
        } else {
            console.log(contact);
        }
    });
};
