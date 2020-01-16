const CustomerData = require('../models/SignUp.model');
var nodemailer = require('nodemailer');


exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};


exports.RegisterCustomer = function (req, res) {
    let postData = new CustomerData(
        {
            FullName: req.body.FullName,
            Email: req.body.Email,
            Password: req.body.Password,
            DOB: req.body.DOB

        }
    );

    CustomerData.find({ Email: req.body.Email }).then(data => {
        if (data.length > 0) {
            res.status(500).send({
                message: err.message || "User Already Registered"
            });
        }
        else {
            postData.save().then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "No Record found"
                });
            });

        }
            }).catch (err => {
    res.status(500).send({
        message: err.message || "No Record found"
    });
});
};


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

exports.VerifyUserEmail = function (req, res) {

    CustomerData.find({ Email: req.body.Email }).then(data => {
        if (data.length > 0) {

            res.send(data[0]);

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

 
exports.ActivateAccount = function (req, res) {
    const filter = { UniqueID: req.body.UniqueID };
    const update = { Status: 1 };

    let promise = new Promise(async (resolve, reject) => {

        let doc = await SignUpData.findOneAndUpdate(filter, update, {
            new: true
        });
        res.send(doc);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "No Record found"
        });
    });
    return promise;
};







