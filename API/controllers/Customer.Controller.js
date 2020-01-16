const CustomerData = require('../models//SignUp.model');
const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '97d70bb088679c',
        pass: 'a2aa16e3b23414'
    }
});

exports.SendEmail = function (req, res) {
    const message = {
        from: req.body.Email, // Sender address
        to: req.body.ContactEmailID,         // List of recipients
        subject: 'Happy BirthDay', // Subject line
        text: 'Wishin you a great year ahead.' // Plain text body
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
};




exports.GetUserData = function (req, res) {
    CustomerData.find({ Email: req.body.Email }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "No Record found"
        });
    });
};

exports.AuthenticateUser = function (req, res) {
    CustomerData.find({ Email: req.body.Email , Password: req.body.Password }).then(data => {
   
        if (data.length > 0) {
            res.send(data);
        }
        else {
            res.status(500).send({
                message: err.message || "No Record found"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "No Record found"
        });
    });
};

exports.AddToContacts = function (req, res) {

    CustomerData.find({ Email: req.body.ContactEmailID }).then(data => {

        CustomerData.updateOne({ Email: req.body.Email }, { $push: { Contacts: data } }).then(data => {

            res.send(data);

        }).catch(err => {
            res.status(500).send({
                message: err.message || "No Record found"
            });
        });

    }).catch(err => {
        res.status(500).send({
            message: err.message || "No Record found"
        });
    });

   
};





exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};