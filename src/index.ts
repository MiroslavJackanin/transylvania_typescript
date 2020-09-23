import * as express from 'express';
import * as fs from "fs";
import * as menu from "./menu.json";
import * as articles from "./articles.json";

const app = express();
const router = express.Router();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(router);

app.use(router); app.use(function(_req, res) {
  res.status(404).render("404"); });

router.get("/:page", function(req, res) {
  if (fs.existsSync("views/pages/" + req.params.page + ".ejs")) {
    res.render("index", { page: req.params.page, menu: menu, articles: articles });
  }
  else {
    res.status(404).render("404", {menu: menu});
  }
});

router.get("/", function (req, res) {
  res.render("index", { page: "main", menu, articles });
});

app.listen(8080, () => console.log('listening on port 8080'));
