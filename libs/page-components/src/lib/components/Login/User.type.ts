import { User as DcUser } from 'discord.js';

export interface IUserContext {
  user: User | undefined;
  setUser?: (user: User) => null;
}

export interface User extends DcUser {
  hasPerms: boolean;
  hasPermsHic: boolean;
  guilds: any[];
}
