import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import * as dotenv from "dotenv";

import * as http from "http";
import cors from "cors";
import puppeteer from 'puppeteer';




dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
const server: http.Server = http.createServer(app);

app.use(cors());

app.use(express.json());
server.listen(port);


app.get("/", async (req, res)=> {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://developer.chrome.com/');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  await page.type('.devsite-search-field', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.devsite-result-item-link';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate'
  );
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
  return res.status(200)
})


export { server };