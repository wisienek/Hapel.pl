
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 3.3.0
 * Query Engine version: 33838b0f78f1fe9052cf9a00e9761c9dc097a63c
 */
Prisma.prismaVersion = {
  client: "3.3.0",
  engine: "33838b0f78f1fe9052cf9a00e9761c9dc097a63c"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = 'DbNull'
Prisma.JsonNull = 'JsonNull'
Prisma.AnyNull = 'AnyNull'

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.EliksiryScalarFieldEnum = makeEnum({
  serial: 'serial',
  nazwa: 'nazwa',
  kolor: 'kolor',
  hex: 'hex',
  zapach: 'zapach',
  smak: 'smak',
  data: 'data',
  czas: 'czas',
  inokreacja: 'inokreacja',
  pcena: 'pcena',
  ile: 'ile'
});

exports.Prisma.OczekujaceScalarFieldEnum = makeEnum({
  id: 'id',
  eliksir: 'eliksir',
  gracz: 'gracz',
  uuid: 'uuid',
  discord: 'discord',
  przepis: 'przepis',
  cena: 'cena',
  odebrane: 'odebrane',
  weryfikowane: 'weryfikowane',
  data_odebrania: 'data_odebrania',
  kociolek: 'kociolek',
  pdata: 'pdata',
  pile: 'pile'
});

exports.Prisma.SkladnikiScalarFieldEnum = makeEnum({
  serial: 'serial',
  nazwa: 'nazwa',
  typ: 'typ',
  cena: 'cena',
  ilosc: 'ilosc',
  jednostka: 'jednostka',
  dostepny: 'dostepny'
});

exports.Prisma.ZlaneScalarFieldEnum = makeEnum({
  id: 'id',
  json: 'json',
  data: 'data'
});

exports.Prisma.AutoRolesScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  dcid: 'dcid'
});

exports.Prisma.BetaTestsScalarFieldEnum = makeEnum({
  id: 'id',
  ip: 'ip'
});

exports.Prisma.CennikScalarFieldEnum = makeEnum({
  id: 'id',
  nazwa: 'nazwa',
  item: 'item',
  cena: 'cena',
  dostepne: 'dostepne',
  sale: 'sale',
  monly: 'monly',
  msale: 'msale',
  wer: 'wer',
  opis: 'opis',
  tagi: 'tagi',
  autor: 'autor'
});

exports.Prisma.DiscordInfoScalarFieldEnum = makeEnum({
  discord: 'discord',
  username: 'username',
  blocked: 'blocked',
  created: 'created',
  discriminator: 'discriminator',
  avatar: 'avatar',
  guilds: 'guilds',
  email: 'email'
});

exports.Prisma.KartyScalarFieldEnum = makeEnum({
  numer: 'numer',
  typ: 'typ',
  nazwa: 'nazwa',
  opis: 'opis'
});

exports.Prisma.KopieScalarFieldEnum = makeEnum({
  serial: 'serial',
  id: 'id',
  uuid: 'uuid',
  nazwa: 'nazwa',
  itemy: 'itemy',
  data: 'data'
});

exports.Prisma.LekcjeScalarFieldEnum = makeEnum({
  id: 'id',
  day: 'day',
  class: 'class',
  repeating: 'repeating',
  name: 'name',
  start: 'start',
  end: 'end',
  place: 'place',
  prof: 'prof'
});

exports.Prisma.MainScalarFieldEnum = makeEnum({
  serial: 'serial',
  id: 'id',
  uuid: 'uuid',
  nazwa: 'nazwa',
  itemy: 'itemy',
  aktualizacja: 'aktualizacja'
});

exports.Prisma.MojeKartyScalarFieldEnum = makeEnum({
  serial: 'serial',
  karta: 'karta',
  uuid: 'uuid'
});

exports.Prisma.OnlineScalarFieldEnum = makeEnum({
  id: 'id',
  data: 'data',
  ilosc: 'ilosc',
  czas: 'czas',
  gracze: 'gracze'
});

exports.Prisma.PlanExtraScalarFieldEnum = makeEnum({
  planid: 'planid',
  Sprof: 'Sprof',
  Splace: 'Splace',
  Sstart: 'Sstart',
  Send: 'Send',
  Sday: 'Sday',
  when: 'when'
});

exports.Prisma.PlanfollowScalarFieldEnum = makeEnum({
  id: 'id',
  user: 'user',
  kl1: 'kl1',
  kl2: 'kl2',
  kl3: 'kl3',
  kl4: 'kl4'
});

exports.Prisma.PlayerInfoScalarFieldEnum = makeEnum({
  serial: 'serial',
  discord: 'discord',
  nick: 'nick',
  uuid: 'uuid',
  displayName: 'displayName',
  plec: 'plec',
  wiek: 'wiek',
  image: 'image',
  visible: 'visible',
  archived: 'archived'
});

exports.Prisma.PrzepisyScalarFieldEnum = makeEnum({
  id: 'id',
  autor: 'autor',
  eliksir: 'eliksir',
  item: 'item',
  oceny: 'oceny',
  ocena: 'ocena',
  cena: 'cena'
});

exports.Prisma.RolesScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  displayname: 'displayname',
  creator: 'creator',
  parent: 'parent',
  dcperms: 'dcperms',
  dcid: 'dcid',
  dccolor: 'dccolor',
  verified: 'verified',
  canResign: 'canResign',
  isFree: 'isFree',
  canApply: 'canApply'
});

exports.Prisma.SessionsScalarFieldEnum = makeEnum({
  session_id: 'session_id',
  expires: 'expires',
  data: 'data'
});

exports.Prisma.ListenerScalarFieldEnum = makeEnum({
  id: 'id',
  guild: 'guild',
  channel: 'channel',
  emoji: 'emoji',
  role: 'role',
  message: 'message'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});


exports.Prisma.ModelName = makeEnum({
  Eliksiry: 'Eliksiry',
  Oczekujace: 'Oczekujace',
  Skladniki: 'Skladniki',
  Zlane: 'Zlane',
  autoRoles: 'autoRoles',
  betaTests: 'betaTests',
  cennik: 'cennik',
  discordInfo: 'discordInfo',
  karty: 'karty',
  kopie: 'kopie',
  lekcje: 'lekcje',
  main: 'main',
  mojeKarty: 'mojeKarty',
  online: 'online',
  planExtra: 'planExtra',
  planfollow: 'planfollow',
  playerInfo: 'playerInfo',
  przepisy: 'przepisy',
  roles: 'roles',
  sessions: 'sessions',
  Listener: 'Listener'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
