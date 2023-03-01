import express from "express";
import fs from "fs";
import config from "../../../config.js";
import ScrapNews from "../../core/scraping/news.js";
import { __dirname } from "../../../util.js";

const NewsRouter = express.Router();

NewsRouter.get("/get", async (req, res) => {
  try {
    const json = fs.readFileSync(
      __dirname + config.scraper.pathDatabase + config.scraper.nameDatabase
    );
    const { news } = JSON.parse(json);

    const page = req.query.page;
    const limit = 5;
    const startPage = (page - 1) * limit;
    const endPage = page * limit;
    const newsPagination = news.slice(startPage, endPage);
    res.send(newsPagination);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

NewsRouter.get("/update", async (req, res) => {
  try {
    await ScrapNews();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default NewsRouter;
