import Koa from "koa";
import Router from "@koa/router";
import { fetchMapData } from "./fetchMapData.js";
import dotenv from "dotenv";
dotenv.config();

const app = new Koa();
const port = process.env.PORT;
const router = new Router();

let mapData = [];

router.get("/map", (ctx) => {
  ctx.body = mapData;
});

async function updateMapData() {
  mapData = await fetchMapData();
}

setInterval(updateMapData, 3600000);

updateMapData();

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log("Server running at port " + port);
});
