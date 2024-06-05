import express, { NextFunction, Request, Response, Router } from "express";
import "express-async-errors";
import 'reflect-metadata';
import * as dotenv from "dotenv";
import * as http from "http";
import cors from "cors";
import { AppGlobalRoutes } from "./modules";
import { errorHandler } from "./middlewares/errorHandler";



dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const appGlobalRoutesInstance = new AppGlobalRoutes();


app.use(express.json());
app.use(cors());
appGlobalRoutesInstance.startModule(app);


app.use(errorHandler);

app.listen(port);

export { app };