const express = require('express');
const mongoose = require('mongoose');
const Article = require('../model/articleSch');


exports.CreatenewArticle = function (req, res) {

    var article = new Article({
        title: req.body.title,
        url : req.body.url,
        date: req.body.date
    });
    article.save(function (err) {
        if (err)
            return res.json(err);
        else    
            res.send({
                message: "Article created Successfully",
            });
        console.log("Data entered");
    });
                
}

//fetch all
exports.fetchallArticles = function (req, res) {
    Article.find()
    .then(article => {
        if (article == null) {
            res.json({
                message: 'No Article Found'
            })
        } else {
            return res.json(article);
        }
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving all Items."
        });
    });
};


//search
exports.fetchoneArticle =  function (req,res){
    Article.findOne(
        {
           _id: req.body._id
        },
        // callback function
        (err, Article) => {
            if (err) return res.status(200).send(err)
            if (Article == null)
                return res.status(200).json(message = 'No Article With this ID')
            else
                return res.status(200).json(Article)
        }
    );
};


// delete article
exports.DeleteArticle = function (req, res) {
    console.log(req.body.id);
    Article.remove({
            _id: req.body.id
        },function(err){
            if(err)
                return res.status(200).json(err);
            else
                return res.status(200).json({message:'deleted'})
        });
    }