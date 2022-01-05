import Bot from "../Client";
import { ClientEvents } from "discord.js";

interface Run {
    (client: Bot, ...args: any[]);
}

export interface Event {
    name: keyof ClientEvents;
    run: Run;
}