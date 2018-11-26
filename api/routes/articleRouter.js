const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const articleController = require('../Controller/articleController');

router.get('/ShowArticles', articleController.fetchallArticles);
router.post('/DeleteArticle', articleController.DeleteArticle);
router.post('/',articleController.CreatenewArticle);
// router.delete('/DeleteCattle/:id', articleController.DeleteCattle);
// router.get('/SearchCattle/:id',articleController.fetchoneCattle);
// router.get('/Searchbyfarm/:id',articleController.fetchbyfarm);
// router.patch('/UpdateCattle/:id',articleController.UpdateCattle);

module.exports = router;