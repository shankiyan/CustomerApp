const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/Customer.Controller');
const SignUpController = require('../controllers/SignUp.Controller');

router.get('/test', CustomerController.test);
router.post('/VerifyUserEmail', SignUpController.VerifyUserEmail);
router.post('/AuthenticateUser', CustomerController.AuthenticateUser);
router.post('/Register', SignUpController.RegisterCustomer);

router.post('/AddToContacts', CustomerController.AddToContacts);

router.post('/GetUserData', CustomerController.GetUserData);
router.post('/SendEmail', CustomerController.SendEmail);



module.exports = router;    