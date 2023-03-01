import axios from "axios";
import * as cheerio from "cheerio";
import xlsx from "xlsx";
import { readdirAsync, Download } from "../../util.js";

/*
 *   the table file is named as follows: date + time + format ->  30092021 0918.xlsx -> 30/09/2021 09:18
 */

const url = "https://www.gov.br";
const endPoint =
  "/aneel/pt-br/centrais-de-conteudos/relatorios-e-indicadores/tarifas-e-informacoes-economico-financeiras";
const pathTableOnDatabase = "./src/database/tables";

async function DownloadTable() {
  try {
    const response = await axios.get(url + endPoint);

    const $ = cheerio.load(response.data);

    const dateUpdateTable = $(
      "#plone-document-byline > span.documentModified > span.value"
    ).text();

    const endPointDownload = $(
      "#parent-fieldname-text > ul:nth-child(3) > ul:nth-child(2) > li:nth-child(4) > a:nth-child(5)"
    ).attr("href");

    console.log(dateUpdateTable);

    const date = dateUpdateTable.replace(new RegExp("[/,:,h]", "g"), "");
    const recent = await RecentTable();

    console.log(date.slice(0, 8));

    console.log(recent);

    if (recent) {
      if (recent.date < date.slice(0, 8)) {
        await Download(endPointDownload, `${pathTableOnDatabase}/${date}.xlsx`);
      } else {
        console.log("Updated table!");
      }
    } else {
      await Download(endPointDownload, `${pathTableOnDatabase}/${date}.xlsx`);
      console.log("Not found!");
    }
  } catch (e) {
    console.log(e);
  }
}

async function GetTable() {
  const recent = await RecentTable();
  const wb = xlsx.readFile(recent.path, { cellDates: true });
  const ws = wb.Sheets["Sheet1"];
  const data = xlsx.utils.sheet_to_json(ws);
  const result = [];
  data.map((info) => {
    result.push({
      distributor: info.Distribuidora,
      UF: info.UF,
      ranking: info.Ranking,
      tc: info["Tarifa Convencional"],
      tbp: info["Tarifa Branca - Ponta"],
      tbi: info["Tarifa Branca - Intermediária"],
      tbfp: info["Tarifa Branca - Fora ponta"],
      rh: info["Resolução Homologatória"],
      validity: info["Início de vigência"],
    });
  });
  return result;
}

async function RecentTable() {
  const tables = [];
  const files = await readdirAsync(pathTableOnDatabase);
  files.map((file) => {
    let dateString = file.replace(/\D/g, "");
    dateString = dateString.replace(
      /^(\d{2})(\d{2})(\d{4})(\d{2})(\d{2}).*/,
      "$3-$2-$1T$4:$5:00-03:00"
    );
    const date = new Date(dateString);
    const now = new Date(Date.now());
    const Difference_In_Time = now - date;

    tables.push({
      path: pathTableOnDatabase + "/" + file,
      time: Difference_In_Time,
      date: file.slice(0, 8),
    });
  });
  return tables.sort((a, b) => a.time - b.time)[0];
}

export { GetTable, DownloadTable };
