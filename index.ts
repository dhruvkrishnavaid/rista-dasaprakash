import "dotenv/config";
import express from "express";
import analyticsRouter from "./routers/analytics";
import branchRouter from "./routers/branch";
import salesRouter from "./routers/sales";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(analyticsRouter);
app.use(branchRouter);
app.use(salesRouter);

const port = parseInt(process.env.PORT || "3000");
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
