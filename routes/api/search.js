const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/search/:query"
router
    .route("/:query")
    .get(booksController.search)

module.exports = router;