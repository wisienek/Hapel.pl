import betterLogging from 'better-logging';
import dotenv from "dotenv";

betterLogging(console);
dotenv.config();

import Bot from "./Client";

const bot = new Bot().init();