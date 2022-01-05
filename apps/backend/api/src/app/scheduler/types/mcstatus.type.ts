export type OnlineResponse = {
  online: boolean;
  ip: string;
  port: number;
  debug: DebugInfo;
  motd: Motd;
  players: PlayersInfo;
  version: string;
  protocol?: number;
  hostname?: string;
  icon?: string;
  software?: string;
  map: string;
  gamemode?: string;
  serverid?: string;
  plugins?: PluginsAndModInfo;
  mods?: PluginsAndModInfo;
  info: Motd;
};

export type OfflineResponse = {
  online: boolean;
  ip: string;
  port: number;
  debug: DebugInfo;
  hostname?: string;
};

export type DebugInfo = {
  ping: boolean;
  query: boolean;
  srv: boolean;
  querymismatch: boolean;
  ipinsrv: boolean;
  cnameinsrv: boolean;
  animatedmotd: boolean;
  cachetime: number;
};

export type Motd = {
  raw: string[];
  clean: string[];
  html: string[];
};

export type PlayersInfo = {
  online: number;
  max: number;
  list?: string[];
  uuid?: string[];
};

export type PluginsAndModInfo = {
  names: string[];
  raw: string[];
};
