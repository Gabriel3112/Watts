import * as cheerio from "cheerio";
import axios from "axios";
import fs from "fs";
import config from "../../../config.js";
import { __dirname } from "../../../util.js";
export default async function ScrapNews() {
  try {
    const response = await axios.get(
      config.scraper.url + config.scraper.endpoint
    );
    const $ = cheerio.load(response.data);
    const currentDate = new Date();
    const database = {
      updated: currentDate,
      news: [],
    };

    const articles = "article";
    let id = 0;

    $(articles).each(function (i, element) {
      const article = $(element);
      const title = article.find("h4").text();
      const link = article.find("a").attr("href");
      const image = article.find("figure > img").attr("src");
      const publisher = article.find("span").eq(0).text();
      const date = article.find("time").attr("datetime");
      database.news.push({
        id: id++,
        title: title,
        link: config.scraper.url + link,
        image: image,
        publisher: publisher,
        date: date,
      });
    });

    if (!fs.existsSync(__dirname + config.scraper.pathDatabase)) {
      fs.mkdirSync(__dirname + config.scraper.pathDatabase);
    }
    const json = JSON.stringify(database, null, 2);
    fs.writeFileSync(
      __dirname + config.scraper.pathDatabase + config.scraper.nameDatabase,
      json
    );
    console.log("Banco de dados atualizado.");
  } catch (error) {
    console.error(error);
  }
}
