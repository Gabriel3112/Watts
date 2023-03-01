import fs from "fs";
import axios from "axios";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readdirAsync(path) {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

async function Download(url, name) {
  let file = fs.createWriteStream(name);

  const { data } = await axios.get(url, { responseType: "stream" });
  data.pipe(file);
}

export { readdirAsync, Download, __dirname };
