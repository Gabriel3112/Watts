import express from "express";

//Routers
import TableRouter from "./src/middleware/Routers/tableRouter.js";
import NewsRouter from "./src/middleware/Routers/newsRouter.js";

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const port = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/table", TableRouter);
app.use("/news", NewsRouter);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`server is running in port: ${port}`);
});
