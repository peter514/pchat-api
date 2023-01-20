const express = require('express')
const router = express.Router()
const postContoller = require('../controllers/postController')



router
    .post('/add-post', postContoller.addPost)
    .get('/get-all-post', postContoller.getPosts)



 module.exports = router;
