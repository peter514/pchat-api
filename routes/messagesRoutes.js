const express = require('express')
const router = express.Router()
const messagesController = require('../controllers/messagesController.js')
const contactUSController = require('../controllers/contactUsController')



router
    .post('/send', messagesController.sendMessage)
    .post('/contact', contactUSController.sendUsMessage)
    .get('/conversation/:bothUserId', messagesController.getConversation)



 module.exports = router;
