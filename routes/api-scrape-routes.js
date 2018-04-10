var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");
var resultArray = [];
module.exports = function(app) {

  app.get("/scrape", function(req, res) {
    axios.get("https://www.reddit.com/").then(function(response) {
      var $ = cheerio.load(response.data);
      $("div.thing").each(function(i, element) {
        var result = {};

        result.title = $(element).find("div.entry.unvoted")
          .find("div.top-matter").find("a.title").text();
        result.link = "https://www.reddit.com" +
          $(element).find("div.entry.unvoted")
          .find("div.top-matter").find("a.title").attr("href");

        db.Article.create(result)
          .then(function(dbArticle) {
            resultArray.push(dbArticle);
          })
          .catch(function(err) {
            res.json(err);
          });
      });
    });
    res.end();
  });

  app.get("/articles", function (req, res) {
    db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  });
};
