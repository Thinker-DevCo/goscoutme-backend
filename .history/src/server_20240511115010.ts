import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import * as dotenv from "dotenv";
import 'reflect-metadata';
import * as http from "http";
import cors from "cors";
import { AppGlobalRoutes } from "./route";





dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
const appGlobalRoutesInstance = new AppGlobalRoutes();

app.use(cors());
appGlobalRoutesInstance.startModule(app);
app.use(express.json());
app.listen(port);




export { app };