const express = require('express')
const router = express.Router()
const messagesController = require('../controllers/messagesController')



router
    .post('/send', messagesController.sendMessage)
    .get('/conversation/:bothUserId', messagesController.getConversation)



 module.exports = router;
