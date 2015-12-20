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
    avatar: {
        type: String
    },
    created_at: Date,
    updated_at: Date
})

var contact = mongoose.model('contact', contactSchema);

exports.getAllContacts = function(req, res) {
    contact.find({}, function(err, contacts) {
        if (err) {
            return err;
        } else {
            console.log(contacts);
            return res.send(contacts);
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
            return res.send(contact);
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
            return res.send(count);
        }
    });
};

exports.addContact = function(req, res) {
    var addUser = new contact();
    addUser.name = req.body.name;
    addUser.email = req.body.email;
    addUser.phone = req.body.phone;
    addUser.avatar = req.body.avatar;
    addUser.save(function(err, savedObject) {
        if (err) {
            console.log('ERROR: ' + err);
        } else {
            return res.send(savedObject);
        }
    });
};

exports.removeContact = function(req, res) {
    console.log('id is ---- ' + req.query.id);
    contact.findByIdAndRemove(req.query.id, function(err, contact) {
        if (err) {
            return console.log(err);
        } else {
            return res.send(contact);
        }
    });
};
