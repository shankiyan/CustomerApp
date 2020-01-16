const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SignUpSchema = new Schema({
    Email: {type: String, required: true},
    Password: { type: String, required: true },
    FullName: { type: String, required: true },
    DOB: { type: Date, required: true },
    Contacts: { type: Array, required: false },
    ContactEmailID: { type: String, required:false }
    
});


// Export the model
module.exports = mongoose.model('CustomerData', SignUpSchema);