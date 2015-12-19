/**
 *  File: Routes
 *
 * Description: This file contains the routing logic for different request/urls
 */
var crudContact = require('./models/crudContact');
module.exports = function(app) {
    app.get('/api/getAllContacts', crudContact.getAllContacts);
    app.get('/api/getcontact', crudContact.getContact);
    app.post('/api/addcontact', crudContact.addContact);
    app.put('/api/updatecontact', crudContact.updateContact);
    app.delete('/api/removecontact/', crudContact.removeContact);
    app.get('*', function(req, res) {
        res.redirect('./public/app/index.html'); // load our public/index.html file
    });
};
