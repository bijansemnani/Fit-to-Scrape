module.exports = function (app) {
  app.get("/scrape", function (req, res) {
    axios.get("https://www.reddit.com/").then(function (response) {
      var $ = cheerio.load(response.data);
    });
  });
};
