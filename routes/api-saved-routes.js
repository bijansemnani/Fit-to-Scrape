var db = require("../models");

module.exports = function (app) {
  app.post("/api/saved/:id", function (req, res) {
    console.log(req.params.id);
    db.Article.findOneAndUpdate({ _id: req.params.id }, {saved: true})
    .then(function (dbArticle) {
      res.json(dbArticle);
    });
  });
};
