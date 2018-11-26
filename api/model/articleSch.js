const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    title: { type: String},
    date: {
        type: String
      },
    url: { type: String, required: true },
});

module.exports = mongoose.model('Article',ArticleSchema);