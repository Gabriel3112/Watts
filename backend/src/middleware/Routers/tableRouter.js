import express from "express";
import { DownloadTable, GetTable } from "../../core/table.js";

const TableRouter = express.Router();

TableRouter.get("/update", async (req, res) => {
  await DownloadTable();
  res.send("Updated table!");
});

TableRouter.get("/get", async (req, res) => {
  const info = await GetTable();
  res.send(info);
});

export default TableRouter;
