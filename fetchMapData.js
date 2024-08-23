import fetch from "node-fetch";
import * as cheerio from "cheerio";

export async function fetchMapData() {
  const response = await fetch("https://api.chatwars.me/webview/map");
  const html = await response.text();
  const $ = cheerio.load(html);

  const cells = [];
  $(".map-cell").each((_, element) => {
    const cell = $(element);
    const style = cell.attr("style");
    const bgColorMatch = style
      ? style.match(/background-color:\s*(.*);/)
      : null;

    cells.push({
      title: cell.attr("title"),
      bgCol: bgColorMatch ? bgColorMatch[1] : null, // Safely access the color
      topLeftText: cell.find(".top-left-text").text() || null,
      topRightText: cell.find(".top-right-text").text() || null,
      bottomLeftText: cell.find(".bottom-left-text").text() || null,
      bottomRightText: cell.find(".bottom-right-text").text() || null,
      emoji: cell.contents().last().text().trim() || null,
    });
  });

  return cells;
}
