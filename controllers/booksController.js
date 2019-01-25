const axios = require("axios")

const db = require("../models");
require('dotenv').config();

const API_Key = process.env.API_KEY


// Defining methods for the booksController
module.exports = {

  findAll: function(req, res) {
    db.Book
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
    search: function(req, res) {
        const q = encodeURIComponent(req.params.query)
        // console.log("booksController.js search: " + q)
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}&key=${API_Key}`)
        .then(function(searchReturned) {
            // console.log(searchReturned.data)
            res.json(searchReturned.data)})
        .catch(err => res.status(422).json(err))
    },
  findById: function(req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Book
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
