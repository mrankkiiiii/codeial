const express = require('express');
const router = express.Router();
const postsApi = require('../../../controllers/api/v1/posts_api');

// router.post('/create', passport.checkAuthentication, postsController.create);
router.get('/', postsApi.index);

module.exports = router;