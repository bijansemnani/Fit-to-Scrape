var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

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

          })
          .catch(function(err) {
            res.json(err);
          });
      });

      res.end();
    });
  });
};
