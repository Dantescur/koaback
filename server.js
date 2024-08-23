import Koa from "koa";
import Router from "@koa/router";
import { fetchMapData } from "./fetchMapData.js";

const app = new Koa();
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

app.listen(3000, () => {
  console.log("Server running at port 3000");
});
