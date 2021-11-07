
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Eliksiry
 */

export type Eliksiry = {
  serial: number
  nazwa: string
  kolor: string
  hex: string
  zapach: string
  smak: string
  data: number
  czas: string
  inokreacja: string
  pcena: number | null
  ile: number
}

/**
 * Model Oczekujace
 */

export type Oczekujace = {
  id: string
  eliksir: string
  gracz: string
  uuid: string
  discord: string | null
  przepis: string
  cena: number
  odebrane: number
  weryfikowane: number
  data_odebrania: string | null
  kociolek: string | null
  pdata: string | null
  pile: number | null
}

/**
 * Model Skladniki
 */

export type Skladniki = {
  serial: number
  nazwa: string
  typ: string
  cena: number
  ilosc: number
  jednostka: string
  dostepny: number
}

/**
 * Model Zlane
 */

export type Zlane = {
  id: string
  json: string
  data: string
}

/**
 * Model autoRoles
 */

export type autoRoles = {
  id: number
  name: string
  dcid: string
}

/**
 * Model betaTests
 */

export type betaTests = {
  id: number
  ip: string
}

/**
 * Model cennik
 */

export type cennik = {
  id: number
  nazwa: string
  item: string | null
  cena: number
  dostepne: number
  sale: number | null
  monly: number
  msale: number | null
  wer: number
  opis: string | null
  tagi: string | null
  autor: string | null
}

/**
 * Model discordInfo
 */

export type discordInfo = {
  discord: string
  username: string
  blocked: boolean
  created: Date
  discriminator: string
  avatar: string | null
  guilds: string | null
  email: string | null
}

/**
 * Model karty
 */

export type karty = {
  numer: number
  typ: string
  nazwa: string
  opis: string
}

/**
 * Model kopie
 */

export type kopie = {
  serial: number
  id: number
  uuid: string
  nazwa: string
  itemy: string
  data: bigint
}

/**
 * Model lekcje
 */

export type lekcje = {
  id: number
  day: boolean
  class: boolean
  repeating: number | null
  name: string
  start: string
  end: string
  place: string | null
  prof: string | null
}

/**
 * Model main
 */

export type main = {
  serial: number
  id: number
  uuid: string
  nazwa: string
  itemy: string
  aktualizacja: bigint
}

/**
 * Model mojeKarty
 */

export type mojeKarty = {
  serial: number
  karta: number
  uuid: string
}

/**
 * Model online
 */

export type online = {
  id: number
  data: Date
  ilosc: number
  czas: string
  gracze: string
}

/**
 * Model planExtra
 */

export type planExtra = {
  planid: number
  Sprof: string | null
  Splace: string | null
  Sstart: string | null
  Send: string | null
  Sday: boolean | null
  when: string | null
}

/**
 * Model planfollow
 */

export type planfollow = {
  id: number
  user: string
  kl1: boolean
  kl2: boolean
  kl3: boolean
  kl4: boolean
}

/**
 * Model playerInfo
 */

export type playerInfo = {
  serial: number
  discord: string | null
  nick: string
  uuid: string
  displayName: string | null
  plec: string | null
  wiek: number | null
  image: string | null
  visible: number
  archived: number
}

/**
 * Model przepisy
 */

export type przepisy = {
  id: number
  autor: string
  eliksir: string
  item: string
  oceny: string
  ocena: number
  cena: number
}

/**
 * Model roles
 */

export type roles = {
  id: number
  name: string
  displayname: string | null
  creator: string | null
  parent: string | null
  dcperms: bigint | null
  dcid: string | null
  dccolor: string | null
  verified: boolean
  canResign: boolean | null
  isFree: boolean | null
  canApply: boolean | null
}

/**
 * Model sessions
 */

export type sessions = {
  session_id: string
  expires: number
  data: string | null
}

/**
 * Model Listener
 */

export type Listener = {
  id: number
  guild: string
  channel: string
  emoji: string
  role: string
  message: string
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Eliksiries
 * const eliksiries = await prisma.eliksiry.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Eliksiries
   * const eliksiries = await prisma.eliksiry.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;


      /**
   * `prisma.eliksiry`: Exposes CRUD operations for the **Eliksiry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Eliksiries
    * const eliksiries = await prisma.eliksiry.findMany()
    * ```
    */
  get eliksiry(): Prisma.EliksiryDelegate<GlobalReject>;

  /**
   * `prisma.oczekujace`: Exposes CRUD operations for the **Oczekujace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Oczekujaces
    * const oczekujaces = await prisma.oczekujace.findMany()
    * ```
    */
  get oczekujace(): Prisma.OczekujaceDelegate<GlobalReject>;

  /**
   * `prisma.skladniki`: Exposes CRUD operations for the **Skladniki** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Skladnikis
    * const skladnikis = await prisma.skladniki.findMany()
    * ```
    */
  get skladniki(): Prisma.SkladnikiDelegate<GlobalReject>;

  /**
   * `prisma.zlane`: Exposes CRUD operations for the **Zlane** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Zlanes
    * const zlanes = await prisma.zlane.findMany()
    * ```
    */
  get zlane(): Prisma.ZlaneDelegate<GlobalReject>;

  /**
   * `prisma.autoRoles`: Exposes CRUD operations for the **autoRoles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AutoRoles
    * const autoRoles = await prisma.autoRoles.findMany()
    * ```
    */
  get autoRoles(): Prisma.autoRolesDelegate<GlobalReject>;

  /**
   * `prisma.betaTests`: Exposes CRUD operations for the **betaTests** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BetaTests
    * const betaTests = await prisma.betaTests.findMany()
    * ```
    */
  get betaTests(): Prisma.betaTestsDelegate<GlobalReject>;

  /**
   * `prisma.cennik`: Exposes CRUD operations for the **cennik** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cenniks
    * const cenniks = await prisma.cennik.findMany()
    * ```
    */
  get cennik(): Prisma.cennikDelegate<GlobalReject>;

  /**
   * `prisma.discordInfo`: Exposes CRUD operations for the **discordInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DiscordInfos
    * const discordInfos = await prisma.discordInfo.findMany()
    * ```
    */
  get discordInfo(): Prisma.discordInfoDelegate<GlobalReject>;

  /**
   * `prisma.karty`: Exposes CRUD operations for the **karty** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Karties
    * const karties = await prisma.karty.findMany()
    * ```
    */
  get karty(): Prisma.kartyDelegate<GlobalReject>;

  /**
   * `prisma.kopie`: Exposes CRUD operations for the **kopie** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Kopies
    * const kopies = await prisma.kopie.findMany()
    * ```
    */
  get kopie(): Prisma.kopieDelegate<GlobalReject>;

  /**
   * `prisma.lekcje`: Exposes CRUD operations for the **lekcje** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lekcjes
    * const lekcjes = await prisma.lekcje.findMany()
    * ```
    */
  get lekcje(): Prisma.lekcjeDelegate<GlobalReject>;

  /**
   * `prisma.main`: Exposes CRUD operations for the **main** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mains
    * const mains = await prisma.main.findMany()
    * ```
    */
  get main(): Prisma.mainDelegate<GlobalReject>;

  /**
   * `prisma.mojeKarty`: Exposes CRUD operations for the **mojeKarty** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MojeKarties
    * const mojeKarties = await prisma.mojeKarty.findMany()
    * ```
    */
  get mojeKarty(): Prisma.mojeKartyDelegate<GlobalReject>;

  /**
   * `prisma.online`: Exposes CRUD operations for the **online** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Onlines
    * const onlines = await prisma.online.findMany()
    * ```
    */
  get online(): Prisma.onlineDelegate<GlobalReject>;

  /**
   * `prisma.planExtra`: Exposes CRUD operations for the **planExtra** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlanExtras
    * const planExtras = await prisma.planExtra.findMany()
    * ```
    */
  get planExtra(): Prisma.planExtraDelegate<GlobalReject>;

  /**
   * `prisma.planfollow`: Exposes CRUD operations for the **planfollow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Planfollows
    * const planfollows = await prisma.planfollow.findMany()
    * ```
    */
  get planfollow(): Prisma.planfollowDelegate<GlobalReject>;

  /**
   * `prisma.playerInfo`: Exposes CRUD operations for the **playerInfo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlayerInfos
    * const playerInfos = await prisma.playerInfo.findMany()
    * ```
    */
  get playerInfo(): Prisma.playerInfoDelegate<GlobalReject>;

  /**
   * `prisma.przepisy`: Exposes CRUD operations for the **przepisy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Przepisies
    * const przepisies = await prisma.przepisy.findMany()
    * ```
    */
  get przepisy(): Prisma.przepisyDelegate<GlobalReject>;

  /**
   * `prisma.roles`: Exposes CRUD operations for the **roles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.roles.findMany()
    * ```
    */
  get roles(): Prisma.rolesDelegate<GlobalReject>;

  /**
   * `prisma.sessions`: Exposes CRUD operations for the **sessions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.sessions.findMany()
    * ```
    */
  get sessions(): Prisma.sessionsDelegate<GlobalReject>;

  /**
   * `prisma.listener`: Exposes CRUD operations for the **Listener** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Listeners
    * const listeners = await prisma.listener.findMany()
    * ```
    */
  get listener(): Prisma.ListenerDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 3.3.0
   * Query Engine version: 33838b0f78f1fe9052cf9a00e9761c9dc097a63c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = {[Key in string]?: JsonValue}
 
  export interface InputJsonArray extends Array<JsonValue> {}
 
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: 'DbNull'

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: 'JsonNull'

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: 'AnyNull'

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
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
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Eliksiry
   */


  export type AggregateEliksiry = {
    _count: EliksiryCountAggregateOutputType | null
    _avg: EliksiryAvgAggregateOutputType | null
    _sum: EliksirySumAggregateOutputType | null
    _min: EliksiryMinAggregateOutputType | null
    _max: EliksiryMaxAggregateOutputType | null
  }

  export type EliksiryAvgAggregateOutputType = {
    serial: number | null
    data: number | null
    pcena: number | null
    ile: number | null
  }

  export type EliksirySumAggregateOutputType = {
    serial: number | null
    data: number | null
    pcena: number | null
    ile: number | null
  }

  export type EliksiryMinAggregateOutputType = {
    serial: number | null
    nazwa: string | null
    kolor: string | null
    hex: string | null
    zapach: string | null
    smak: string | null
    data: number | null
    czas: string | null
    inokreacja: string | null
    pcena: number | null
    ile: number | null
  }

  export type EliksiryMaxAggregateOutputType = {
    serial: number | null
    nazwa: string | null
    kolor: string | null
    hex: string | null
    zapach: string | null
    smak: string | null
    data: number | null
    czas: string | null
    inokreacja: string | null
    pcena: number | null
    ile: number | null
  }

  export type EliksiryCountAggregateOutputType = {
    serial: number
    nazwa: number
    kolor: number
    hex: number
    zapach: number
    smak: number
    data: number
    czas: number
    inokreacja: number
    pcena: number
    ile: number
    _all: number
  }


  export type EliksiryAvgAggregateInputType = {
    serial?: true
    data?: true
    pcena?: true
    ile?: true
  }

  export type EliksirySumAggregateInputType = {
    serial?: true
    data?: true
    pcena?: true
    ile?: true
  }

  export type EliksiryMinAggregateInputType = {
    serial?: true
    nazwa?: true
    kolor?: true
    hex?: true
    zapach?: true
    smak?: true
    data?: true
    czas?: true
    inokreacja?: true
    pcena?: true
    ile?: true
  }

  export type EliksiryMaxAggregateInputType = {
    serial?: true
    nazwa?: true
    kolor?: true
    hex?: true
    zapach?: true
    smak?: true
    data?: true
    czas?: true
    inokreacja?: true
    pcena?: true
    ile?: true
  }

  export type EliksiryCountAggregateInputType = {
    serial?: true
    nazwa?: true
    kolor?: true
    hex?: true
    zapach?: true
    smak?: true
    data?: true
    czas?: true
    inokreacja?: true
    pcena?: true
    ile?: true
    _all?: true
  }

  export type EliksiryAggregateArgs = {
    /**
     * Filter which Eliksiry to aggregate.
     * 
    **/
    where?: EliksiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eliksiries to fetch.
     * 
    **/
    orderBy?: Enumerable<EliksiryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: EliksiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eliksiries from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eliksiries.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Eliksiries
    **/
    _count?: true | EliksiryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EliksiryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EliksirySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EliksiryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EliksiryMaxAggregateInputType
  }

  export type GetEliksiryAggregateType<T extends EliksiryAggregateArgs> = {
        [P in keyof T & keyof AggregateEliksiry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEliksiry[P]>
      : GetScalarType<T[P], AggregateEliksiry[P]>
  }


    
    
  export type EliksiryGroupByArgs = {
    where?: EliksiryWhereInput
    orderBy?: Enumerable<EliksiryOrderByWithAggregationInput>
    by: Array<EliksiryScalarFieldEnum>
    having?: EliksiryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EliksiryCountAggregateInputType | true
    _avg?: EliksiryAvgAggregateInputType
    _sum?: EliksirySumAggregateInputType
    _min?: EliksiryMinAggregateInputType
    _max?: EliksiryMaxAggregateInputType
  }


  export type EliksiryGroupByOutputType = {
    serial: number
    nazwa: string
    kolor: string
    hex: string
    zapach: string
    smak: string
    data: number
    czas: string
    inokreacja: string
    pcena: number | null
    ile: number
    _count: EliksiryCountAggregateOutputType | null
    _avg: EliksiryAvgAggregateOutputType | null
    _sum: EliksirySumAggregateOutputType | null
    _min: EliksiryMinAggregateOutputType | null
    _max: EliksiryMaxAggregateOutputType | null
  }

  type GetEliksiryGroupByPayload<T extends EliksiryGroupByArgs> = Promise<
    Array<
      PickArray<EliksiryGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof EliksiryGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], EliksiryGroupByOutputType[P]> 
            : GetScalarType<T[P], EliksiryGroupByOutputType[P]>
        }
      > 
    >


  export type EliksirySelect = {
    serial?: boolean
    nazwa?: boolean
    kolor?: boolean
    hex?: boolean
    zapach?: boolean
    smak?: boolean
    data?: boolean
    czas?: boolean
    inokreacja?: boolean
    pcena?: boolean
    ile?: boolean
  }

  export type EliksiryGetPayload<
    S extends boolean | null | undefined | EliksiryArgs,
    U = keyof S
      > = S extends true
        ? Eliksiry
    : S extends undefined
    ? never
    : S extends EliksiryArgs | EliksiryFindManyArgs
    ?'include' extends U
    ? Eliksiry 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Eliksiry ?Eliksiry [P]
  : 
     never
  } 
    : Eliksiry
  : Eliksiry


  type EliksiryCountArgs = Merge<
    Omit<EliksiryFindManyArgs, 'select' | 'include'> & {
      select?: EliksiryCountAggregateInputType | true
    }
  >

  export interface EliksiryDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Eliksiry that matches the filter.
     * @param {EliksiryFindUniqueArgs} args - Arguments to find a Eliksiry
     * @example
     * // Get one Eliksiry
     * const eliksiry = await prisma.eliksiry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EliksiryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EliksiryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Eliksiry'> extends True ? CheckSelect<T, Prisma__EliksiryClient<Eliksiry>, Prisma__EliksiryClient<EliksiryGetPayload<T>>> : CheckSelect<T, Prisma__EliksiryClient<Eliksiry | null >, Prisma__EliksiryClient<EliksiryGetPayload<T> | null >>

    /**
     * Find the first Eliksiry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EliksiryFindFirstArgs} args - Arguments to find a Eliksiry
     * @example
     * // Get one Eliksiry
     * const eliksiry = await prisma.eliksiry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EliksiryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EliksiryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Eliksiry'> extends True ? CheckSelect<T, Prisma__EliksiryClient<Eliksiry>, Prisma__EliksiryClient<EliksiryGetPayload<T>>> : CheckSelect<T, Prisma__EliksiryClient<Eliksiry | null >, Prisma__EliksiryClient<EliksiryGetPayload<T> | null >>

    /**
     * Find zero or more Eliksiries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EliksiryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Eliksiries
     * const eliksiries = await prisma.eliksiry.findMany()
     * 
     * // Get first 10 Eliksiries
     * const eliksiries = await prisma.eliksiry.findMany({ take: 10 })
     * 
     * // Only select the `serial`
     * const eliksiryWithSerialOnly = await prisma.eliksiry.findMany({ select: { serial: true } })
     * 
    **/
    findMany<T extends EliksiryFindManyArgs>(
      args?: SelectSubset<T, EliksiryFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Eliksiry>>, PrismaPromise<Array<EliksiryGetPayload<T>>>>

    /**
     * Create a Eliksiry.
     * @param {EliksiryCreateArgs} args - Arguments to create a Eliksiry.
     * @example
     * // Create one Eliksiry
     * const Eliksiry = await prisma.eliksiry.create({
     *   data: {
     *     // ... data to create a Eliksiry
     *   }
     * })
     * 
    **/
    create<T extends EliksiryCreateArgs>(
      args: SelectSubset<T, EliksiryCreateArgs>
    ): CheckSelect<T, Prisma__EliksiryClient<Eliksiry>, Prisma__EliksiryClient<EliksiryGetPayload<T>>>

    /**
     * Create many Eliksiries.
     *     @param {EliksiryCreateManyArgs} args - Arguments to create many Eliksiries.
     *     @example
     *     // Create many Eliksiries
     *     const eliksiry = await prisma.eliksiry.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EliksiryCreateManyArgs>(
      args?: SelectSubset<T, EliksiryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Eliksiry.
     * @param {EliksiryDeleteArgs} args - Arguments to delete one Eliksiry.
     * @example
     * // Delete one Eliksiry
     * const Eliksiry = await prisma.eliksiry.delete({
     *   where: {
     *     // ... filter to delete one Eliksiry
     *   }
     * })
     * 
    **/
    delete<T extends EliksiryDeleteArgs>(
      args: SelectSubset<T, EliksiryDeleteArgs>
    ): CheckSelect<T, Prisma__EliksiryClient<Eliksiry>, Prisma__EliksiryClient<EliksiryGetPayload<T>>>

    /**
     * Update one Eliksiry.
     * @param {EliksiryUpdateArgs} args - Arguments to update one Eliksiry.
     * @example
     * // Update one Eliksiry
     * const eliksiry = await prisma.eliksiry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EliksiryUpdateArgs>(
      args: SelectSubset<T, EliksiryUpdateArgs>
    ): CheckSelect<T, Prisma__EliksiryClient<Eliksiry>, Prisma__EliksiryClient<EliksiryGetPayload<T>>>

    /**
     * Delete zero or more Eliksiries.
     * @param {EliksiryDeleteManyArgs} args - Arguments to filter Eliksiries to delete.
     * @example
     * // Delete a few Eliksiries
     * const { count } = await prisma.eliksiry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EliksiryDeleteManyArgs>(
      args?: SelectSubset<T, EliksiryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Eliksiries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EliksiryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Eliksiries
     * const eliksiry = await prisma.eliksiry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EliksiryUpdateManyArgs>(
      args: SelectSubset<T, EliksiryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Eliksiry.
     * @param {EliksiryUpsertArgs} args - Arguments to update or create a Eliksiry.
     * @example
     * // Update or create a Eliksiry
     * const eliksiry = await prisma.eliksiry.upsert({
     *   create: {
     *     // ... data to create a Eliksiry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Eliksiry we want to update
     *   }
     * })
    **/
    upsert<T extends EliksiryUpsertArgs>(
      args: SelectSubset<T, EliksiryUpsertArgs>
    ): CheckSelect<T, Prisma__EliksiryClient<Eliksiry>, Prisma__EliksiryClient<EliksiryGetPayload<T>>>

    /**
     * Count the number of Eliksiries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EliksiryCountArgs} args - Arguments to filter Eliksiries to count.
     * @example
     * // Count the number of Eliksiries
     * const count = await prisma.eliksiry.count({
     *   where: {
     *     // ... the filter for the Eliksiries we want to count
     *   }
     * })
    **/
    count<T extends EliksiryCountArgs>(
      args?: Subset<T, EliksiryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EliksiryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Eliksiry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EliksiryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EliksiryAggregateArgs>(args: Subset<T, EliksiryAggregateArgs>): PrismaPromise<GetEliksiryAggregateType<T>>

    /**
     * Group by Eliksiry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EliksiryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EliksiryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EliksiryGroupByArgs['orderBy'] }
        : { orderBy?: EliksiryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EliksiryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEliksiryGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Eliksiry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EliksiryClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Eliksiry findUnique
   */
  export type EliksiryFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Eliksiry
     * 
    **/
    select?: EliksirySelect | null
    /**
     * Throw an Error if a Eliksiry can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Eliksiry to fetch.
     * 
    **/
    where: EliksiryWhereUniqueInput
  }


  /**
   * Eliksiry findFirst
   */
  export type EliksiryFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Eliksiry
     * 
    **/
    select?: EliksirySelect | null
    /**
     * Throw an Error if a Eliksiry can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Eliksiry to fetch.
     * 
    **/
    where?: EliksiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eliksiries to fetch.
     * 
    **/
    orderBy?: Enumerable<EliksiryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Eliksiries.
     * 
    **/
    cursor?: EliksiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eliksiries from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eliksiries.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Eliksiries.
     * 
    **/
    distinct?: Enumerable<EliksiryScalarFieldEnum>
  }


  /**
   * Eliksiry findMany
   */
  export type EliksiryFindManyArgs = {
    /**
     * Select specific fields to fetch from the Eliksiry
     * 
    **/
    select?: EliksirySelect | null
    /**
     * Filter, which Eliksiries to fetch.
     * 
    **/
    where?: EliksiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eliksiries to fetch.
     * 
    **/
    orderBy?: Enumerable<EliksiryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Eliksiries.
     * 
    **/
    cursor?: EliksiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eliksiries from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eliksiries.
     * 
    **/
    skip?: number
    distinct?: Enumerable<EliksiryScalarFieldEnum>
  }


  /**
   * Eliksiry create
   */
  export type EliksiryCreateArgs = {
    /**
     * Select specific fields to fetch from the Eliksiry
     * 
    **/
    select?: EliksirySelect | null
    /**
     * The data needed to create a Eliksiry.
     * 
    **/
    data: XOR<EliksiryCreateInput, EliksiryUncheckedCreateInput>
  }


  /**
   * Eliksiry createMany
   */
  export type EliksiryCreateManyArgs = {
    data: Enumerable<EliksiryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Eliksiry update
   */
  export type EliksiryUpdateArgs = {
    /**
     * Select specific fields to fetch from the Eliksiry
     * 
    **/
    select?: EliksirySelect | null
    /**
     * The data needed to update a Eliksiry.
     * 
    **/
    data: XOR<EliksiryUpdateInput, EliksiryUncheckedUpdateInput>
    /**
     * Choose, which Eliksiry to update.
     * 
    **/
    where: EliksiryWhereUniqueInput
  }


  /**
   * Eliksiry updateMany
   */
  export type EliksiryUpdateManyArgs = {
    data: XOR<EliksiryUpdateManyMutationInput, EliksiryUncheckedUpdateManyInput>
    where?: EliksiryWhereInput
  }


  /**
   * Eliksiry upsert
   */
  export type EliksiryUpsertArgs = {
    /**
     * Select specific fields to fetch from the Eliksiry
     * 
    **/
    select?: EliksirySelect | null
    /**
     * The filter to search for the Eliksiry to update in case it exists.
     * 
    **/
    where: EliksiryWhereUniqueInput
    /**
     * In case the Eliksiry found by the `where` argument doesn't exist, create a new Eliksiry with this data.
     * 
    **/
    create: XOR<EliksiryCreateInput, EliksiryUncheckedCreateInput>
    /**
     * In case the Eliksiry was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<EliksiryUpdateInput, EliksiryUncheckedUpdateInput>
  }


  /**
   * Eliksiry delete
   */
  export type EliksiryDeleteArgs = {
    /**
     * Select specific fields to fetch from the Eliksiry
     * 
    **/
    select?: EliksirySelect | null
    /**
     * Filter which Eliksiry to delete.
     * 
    **/
    where: EliksiryWhereUniqueInput
  }


  /**
   * Eliksiry deleteMany
   */
  export type EliksiryDeleteManyArgs = {
    where?: EliksiryWhereInput
  }


  /**
   * Eliksiry without action
   */
  export type EliksiryArgs = {
    /**
     * Select specific fields to fetch from the Eliksiry
     * 
    **/
    select?: EliksirySelect | null
  }



  /**
   * Model Oczekujace
   */


  export type AggregateOczekujace = {
    _count: OczekujaceCountAggregateOutputType | null
    _avg: OczekujaceAvgAggregateOutputType | null
    _sum: OczekujaceSumAggregateOutputType | null
    _min: OczekujaceMinAggregateOutputType | null
    _max: OczekujaceMaxAggregateOutputType | null
  }

  export type OczekujaceAvgAggregateOutputType = {
    cena: number | null
    odebrane: number | null
    weryfikowane: number | null
    pile: number | null
  }

  export type OczekujaceSumAggregateOutputType = {
    cena: number | null
    odebrane: number | null
    weryfikowane: number | null
    pile: number | null
  }

  export type OczekujaceMinAggregateOutputType = {
    id: string | null
    eliksir: string | null
    gracz: string | null
    uuid: string | null
    discord: string | null
    przepis: string | null
    cena: number | null
    odebrane: number | null
    weryfikowane: number | null
    data_odebrania: string | null
    kociolek: string | null
    pdata: string | null
    pile: number | null
  }

  export type OczekujaceMaxAggregateOutputType = {
    id: string | null
    eliksir: string | null
    gracz: string | null
    uuid: string | null
    discord: string | null
    przepis: string | null
    cena: number | null
    odebrane: number | null
    weryfikowane: number | null
    data_odebrania: string | null
    kociolek: string | null
    pdata: string | null
    pile: number | null
  }

  export type OczekujaceCountAggregateOutputType = {
    id: number
    eliksir: number
    gracz: number
    uuid: number
    discord: number
    przepis: number
    cena: number
    odebrane: number
    weryfikowane: number
    data_odebrania: number
    kociolek: number
    pdata: number
    pile: number
    _all: number
  }


  export type OczekujaceAvgAggregateInputType = {
    cena?: true
    odebrane?: true
    weryfikowane?: true
    pile?: true
  }

  export type OczekujaceSumAggregateInputType = {
    cena?: true
    odebrane?: true
    weryfikowane?: true
    pile?: true
  }

  export type OczekujaceMinAggregateInputType = {
    id?: true
    eliksir?: true
    gracz?: true
    uuid?: true
    discord?: true
    przepis?: true
    cena?: true
    odebrane?: true
    weryfikowane?: true
    data_odebrania?: true
    kociolek?: true
    pdata?: true
    pile?: true
  }

  export type OczekujaceMaxAggregateInputType = {
    id?: true
    eliksir?: true
    gracz?: true
    uuid?: true
    discord?: true
    przepis?: true
    cena?: true
    odebrane?: true
    weryfikowane?: true
    data_odebrania?: true
    kociolek?: true
    pdata?: true
    pile?: true
  }

  export type OczekujaceCountAggregateInputType = {
    id?: true
    eliksir?: true
    gracz?: true
    uuid?: true
    discord?: true
    przepis?: true
    cena?: true
    odebrane?: true
    weryfikowane?: true
    data_odebrania?: true
    kociolek?: true
    pdata?: true
    pile?: true
    _all?: true
  }

  export type OczekujaceAggregateArgs = {
    /**
     * Filter which Oczekujace to aggregate.
     * 
    **/
    where?: OczekujaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Oczekujaces to fetch.
     * 
    **/
    orderBy?: Enumerable<OczekujaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: OczekujaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Oczekujaces from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Oczekujaces.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Oczekujaces
    **/
    _count?: true | OczekujaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OczekujaceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OczekujaceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OczekujaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OczekujaceMaxAggregateInputType
  }

  export type GetOczekujaceAggregateType<T extends OczekujaceAggregateArgs> = {
        [P in keyof T & keyof AggregateOczekujace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOczekujace[P]>
      : GetScalarType<T[P], AggregateOczekujace[P]>
  }


    
    
  export type OczekujaceGroupByArgs = {
    where?: OczekujaceWhereInput
    orderBy?: Enumerable<OczekujaceOrderByWithAggregationInput>
    by: Array<OczekujaceScalarFieldEnum>
    having?: OczekujaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OczekujaceCountAggregateInputType | true
    _avg?: OczekujaceAvgAggregateInputType
    _sum?: OczekujaceSumAggregateInputType
    _min?: OczekujaceMinAggregateInputType
    _max?: OczekujaceMaxAggregateInputType
  }


  export type OczekujaceGroupByOutputType = {
    id: string
    eliksir: string
    gracz: string
    uuid: string
    discord: string | null
    przepis: string
    cena: number
    odebrane: number
    weryfikowane: number
    data_odebrania: string | null
    kociolek: string | null
    pdata: string | null
    pile: number | null
    _count: OczekujaceCountAggregateOutputType | null
    _avg: OczekujaceAvgAggregateOutputType | null
    _sum: OczekujaceSumAggregateOutputType | null
    _min: OczekujaceMinAggregateOutputType | null
    _max: OczekujaceMaxAggregateOutputType | null
  }

  type GetOczekujaceGroupByPayload<T extends OczekujaceGroupByArgs> = Promise<
    Array<
      PickArray<OczekujaceGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof OczekujaceGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], OczekujaceGroupByOutputType[P]> 
            : GetScalarType<T[P], OczekujaceGroupByOutputType[P]>
        }
      > 
    >


  export type OczekujaceSelect = {
    id?: boolean
    eliksir?: boolean
    gracz?: boolean
    uuid?: boolean
    discord?: boolean
    przepis?: boolean
    cena?: boolean
    odebrane?: boolean
    weryfikowane?: boolean
    data_odebrania?: boolean
    kociolek?: boolean
    pdata?: boolean
    pile?: boolean
  }

  export type OczekujaceGetPayload<
    S extends boolean | null | undefined | OczekujaceArgs,
    U = keyof S
      > = S extends true
        ? Oczekujace
    : S extends undefined
    ? never
    : S extends OczekujaceArgs | OczekujaceFindManyArgs
    ?'include' extends U
    ? Oczekujace 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Oczekujace ?Oczekujace [P]
  : 
     never
  } 
    : Oczekujace
  : Oczekujace


  type OczekujaceCountArgs = Merge<
    Omit<OczekujaceFindManyArgs, 'select' | 'include'> & {
      select?: OczekujaceCountAggregateInputType | true
    }
  >

  export interface OczekujaceDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Oczekujace that matches the filter.
     * @param {OczekujaceFindUniqueArgs} args - Arguments to find a Oczekujace
     * @example
     * // Get one Oczekujace
     * const oczekujace = await prisma.oczekujace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends OczekujaceFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, OczekujaceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Oczekujace'> extends True ? CheckSelect<T, Prisma__OczekujaceClient<Oczekujace>, Prisma__OczekujaceClient<OczekujaceGetPayload<T>>> : CheckSelect<T, Prisma__OczekujaceClient<Oczekujace | null >, Prisma__OczekujaceClient<OczekujaceGetPayload<T> | null >>

    /**
     * Find the first Oczekujace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OczekujaceFindFirstArgs} args - Arguments to find a Oczekujace
     * @example
     * // Get one Oczekujace
     * const oczekujace = await prisma.oczekujace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends OczekujaceFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, OczekujaceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Oczekujace'> extends True ? CheckSelect<T, Prisma__OczekujaceClient<Oczekujace>, Prisma__OczekujaceClient<OczekujaceGetPayload<T>>> : CheckSelect<T, Prisma__OczekujaceClient<Oczekujace | null >, Prisma__OczekujaceClient<OczekujaceGetPayload<T> | null >>

    /**
     * Find zero or more Oczekujaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OczekujaceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Oczekujaces
     * const oczekujaces = await prisma.oczekujace.findMany()
     * 
     * // Get first 10 Oczekujaces
     * const oczekujaces = await prisma.oczekujace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oczekujaceWithIdOnly = await prisma.oczekujace.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends OczekujaceFindManyArgs>(
      args?: SelectSubset<T, OczekujaceFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Oczekujace>>, PrismaPromise<Array<OczekujaceGetPayload<T>>>>

    /**
     * Create a Oczekujace.
     * @param {OczekujaceCreateArgs} args - Arguments to create a Oczekujace.
     * @example
     * // Create one Oczekujace
     * const Oczekujace = await prisma.oczekujace.create({
     *   data: {
     *     // ... data to create a Oczekujace
     *   }
     * })
     * 
    **/
    create<T extends OczekujaceCreateArgs>(
      args: SelectSubset<T, OczekujaceCreateArgs>
    ): CheckSelect<T, Prisma__OczekujaceClient<Oczekujace>, Prisma__OczekujaceClient<OczekujaceGetPayload<T>>>

    /**
     * Create many Oczekujaces.
     *     @param {OczekujaceCreateManyArgs} args - Arguments to create many Oczekujaces.
     *     @example
     *     // Create many Oczekujaces
     *     const oczekujace = await prisma.oczekujace.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends OczekujaceCreateManyArgs>(
      args?: SelectSubset<T, OczekujaceCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Oczekujace.
     * @param {OczekujaceDeleteArgs} args - Arguments to delete one Oczekujace.
     * @example
     * // Delete one Oczekujace
     * const Oczekujace = await prisma.oczekujace.delete({
     *   where: {
     *     // ... filter to delete one Oczekujace
     *   }
     * })
     * 
    **/
    delete<T extends OczekujaceDeleteArgs>(
      args: SelectSubset<T, OczekujaceDeleteArgs>
    ): CheckSelect<T, Prisma__OczekujaceClient<Oczekujace>, Prisma__OczekujaceClient<OczekujaceGetPayload<T>>>

    /**
     * Update one Oczekujace.
     * @param {OczekujaceUpdateArgs} args - Arguments to update one Oczekujace.
     * @example
     * // Update one Oczekujace
     * const oczekujace = await prisma.oczekujace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends OczekujaceUpdateArgs>(
      args: SelectSubset<T, OczekujaceUpdateArgs>
    ): CheckSelect<T, Prisma__OczekujaceClient<Oczekujace>, Prisma__OczekujaceClient<OczekujaceGetPayload<T>>>

    /**
     * Delete zero or more Oczekujaces.
     * @param {OczekujaceDeleteManyArgs} args - Arguments to filter Oczekujaces to delete.
     * @example
     * // Delete a few Oczekujaces
     * const { count } = await prisma.oczekujace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends OczekujaceDeleteManyArgs>(
      args?: SelectSubset<T, OczekujaceDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Oczekujaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OczekujaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Oczekujaces
     * const oczekujace = await prisma.oczekujace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends OczekujaceUpdateManyArgs>(
      args: SelectSubset<T, OczekujaceUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Oczekujace.
     * @param {OczekujaceUpsertArgs} args - Arguments to update or create a Oczekujace.
     * @example
     * // Update or create a Oczekujace
     * const oczekujace = await prisma.oczekujace.upsert({
     *   create: {
     *     // ... data to create a Oczekujace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Oczekujace we want to update
     *   }
     * })
    **/
    upsert<T extends OczekujaceUpsertArgs>(
      args: SelectSubset<T, OczekujaceUpsertArgs>
    ): CheckSelect<T, Prisma__OczekujaceClient<Oczekujace>, Prisma__OczekujaceClient<OczekujaceGetPayload<T>>>

    /**
     * Count the number of Oczekujaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OczekujaceCountArgs} args - Arguments to filter Oczekujaces to count.
     * @example
     * // Count the number of Oczekujaces
     * const count = await prisma.oczekujace.count({
     *   where: {
     *     // ... the filter for the Oczekujaces we want to count
     *   }
     * })
    **/
    count<T extends OczekujaceCountArgs>(
      args?: Subset<T, OczekujaceCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OczekujaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Oczekujace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OczekujaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OczekujaceAggregateArgs>(args: Subset<T, OczekujaceAggregateArgs>): PrismaPromise<GetOczekujaceAggregateType<T>>

    /**
     * Group by Oczekujace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OczekujaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OczekujaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OczekujaceGroupByArgs['orderBy'] }
        : { orderBy?: OczekujaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OczekujaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOczekujaceGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Oczekujace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__OczekujaceClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Oczekujace findUnique
   */
  export type OczekujaceFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Oczekujace
     * 
    **/
    select?: OczekujaceSelect | null
    /**
     * Throw an Error if a Oczekujace can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Oczekujace to fetch.
     * 
    **/
    where: OczekujaceWhereUniqueInput
  }


  /**
   * Oczekujace findFirst
   */
  export type OczekujaceFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Oczekujace
     * 
    **/
    select?: OczekujaceSelect | null
    /**
     * Throw an Error if a Oczekujace can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Oczekujace to fetch.
     * 
    **/
    where?: OczekujaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Oczekujaces to fetch.
     * 
    **/
    orderBy?: Enumerable<OczekujaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Oczekujaces.
     * 
    **/
    cursor?: OczekujaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Oczekujaces from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Oczekujaces.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Oczekujaces.
     * 
    **/
    distinct?: Enumerable<OczekujaceScalarFieldEnum>
  }


  /**
   * Oczekujace findMany
   */
  export type OczekujaceFindManyArgs = {
    /**
     * Select specific fields to fetch from the Oczekujace
     * 
    **/
    select?: OczekujaceSelect | null
    /**
     * Filter, which Oczekujaces to fetch.
     * 
    **/
    where?: OczekujaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Oczekujaces to fetch.
     * 
    **/
    orderBy?: Enumerable<OczekujaceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Oczekujaces.
     * 
    **/
    cursor?: OczekujaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Oczekujaces from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Oczekujaces.
     * 
    **/
    skip?: number
    distinct?: Enumerable<OczekujaceScalarFieldEnum>
  }


  /**
   * Oczekujace create
   */
  export type OczekujaceCreateArgs = {
    /**
     * Select specific fields to fetch from the Oczekujace
     * 
    **/
    select?: OczekujaceSelect | null
    /**
     * The data needed to create a Oczekujace.
     * 
    **/
    data: XOR<OczekujaceCreateInput, OczekujaceUncheckedCreateInput>
  }


  /**
   * Oczekujace createMany
   */
  export type OczekujaceCreateManyArgs = {
    data: Enumerable<OczekujaceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Oczekujace update
   */
  export type OczekujaceUpdateArgs = {
    /**
     * Select specific fields to fetch from the Oczekujace
     * 
    **/
    select?: OczekujaceSelect | null
    /**
     * The data needed to update a Oczekujace.
     * 
    **/
    data: XOR<OczekujaceUpdateInput, OczekujaceUncheckedUpdateInput>
    /**
     * Choose, which Oczekujace to update.
     * 
    **/
    where: OczekujaceWhereUniqueInput
  }


  /**
   * Oczekujace updateMany
   */
  export type OczekujaceUpdateManyArgs = {
    data: XOR<OczekujaceUpdateManyMutationInput, OczekujaceUncheckedUpdateManyInput>
    where?: OczekujaceWhereInput
  }


  /**
   * Oczekujace upsert
   */
  export type OczekujaceUpsertArgs = {
    /**
     * Select specific fields to fetch from the Oczekujace
     * 
    **/
    select?: OczekujaceSelect | null
    /**
     * The filter to search for the Oczekujace to update in case it exists.
     * 
    **/
    where: OczekujaceWhereUniqueInput
    /**
     * In case the Oczekujace found by the `where` argument doesn't exist, create a new Oczekujace with this data.
     * 
    **/
    create: XOR<OczekujaceCreateInput, OczekujaceUncheckedCreateInput>
    /**
     * In case the Oczekujace was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<OczekujaceUpdateInput, OczekujaceUncheckedUpdateInput>
  }


  /**
   * Oczekujace delete
   */
  export type OczekujaceDeleteArgs = {
    /**
     * Select specific fields to fetch from the Oczekujace
     * 
    **/
    select?: OczekujaceSelect | null
    /**
     * Filter which Oczekujace to delete.
     * 
    **/
    where: OczekujaceWhereUniqueInput
  }


  /**
   * Oczekujace deleteMany
   */
  export type OczekujaceDeleteManyArgs = {
    where?: OczekujaceWhereInput
  }


  /**
   * Oczekujace without action
   */
  export type OczekujaceArgs = {
    /**
     * Select specific fields to fetch from the Oczekujace
     * 
    **/
    select?: OczekujaceSelect | null
  }



  /**
   * Model Skladniki
   */


  export type AggregateSkladniki = {
    _count: SkladnikiCountAggregateOutputType | null
    _avg: SkladnikiAvgAggregateOutputType | null
    _sum: SkladnikiSumAggregateOutputType | null
    _min: SkladnikiMinAggregateOutputType | null
    _max: SkladnikiMaxAggregateOutputType | null
  }

  export type SkladnikiAvgAggregateOutputType = {
    serial: number | null
    cena: number | null
    ilosc: number | null
    dostepny: number | null
  }

  export type SkladnikiSumAggregateOutputType = {
    serial: number | null
    cena: number | null
    ilosc: number | null
    dostepny: number | null
  }

  export type SkladnikiMinAggregateOutputType = {
    serial: number | null
    nazwa: string | null
    typ: string | null
    cena: number | null
    ilosc: number | null
    jednostka: string | null
    dostepny: number | null
  }

  export type SkladnikiMaxAggregateOutputType = {
    serial: number | null
    nazwa: string | null
    typ: string | null
    cena: number | null
    ilosc: number | null
    jednostka: string | null
    dostepny: number | null
  }

  export type SkladnikiCountAggregateOutputType = {
    serial: number
    nazwa: number
    typ: number
    cena: number
    ilosc: number
    jednostka: number
    dostepny: number
    _all: number
  }


  export type SkladnikiAvgAggregateInputType = {
    serial?: true
    cena?: true
    ilosc?: true
    dostepny?: true
  }

  export type SkladnikiSumAggregateInputType = {
    serial?: true
    cena?: true
    ilosc?: true
    dostepny?: true
  }

  export type SkladnikiMinAggregateInputType = {
    serial?: true
    nazwa?: true
    typ?: true
    cena?: true
    ilosc?: true
    jednostka?: true
    dostepny?: true
  }

  export type SkladnikiMaxAggregateInputType = {
    serial?: true
    nazwa?: true
    typ?: true
    cena?: true
    ilosc?: true
    jednostka?: true
    dostepny?: true
  }

  export type SkladnikiCountAggregateInputType = {
    serial?: true
    nazwa?: true
    typ?: true
    cena?: true
    ilosc?: true
    jednostka?: true
    dostepny?: true
    _all?: true
  }

  export type SkladnikiAggregateArgs = {
    /**
     * Filter which Skladniki to aggregate.
     * 
    **/
    where?: SkladnikiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skladnikis to fetch.
     * 
    **/
    orderBy?: Enumerable<SkladnikiOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: SkladnikiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skladnikis from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skladnikis.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Skladnikis
    **/
    _count?: true | SkladnikiCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SkladnikiAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SkladnikiSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkladnikiMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkladnikiMaxAggregateInputType
  }

  export type GetSkladnikiAggregateType<T extends SkladnikiAggregateArgs> = {
        [P in keyof T & keyof AggregateSkladniki]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkladniki[P]>
      : GetScalarType<T[P], AggregateSkladniki[P]>
  }


    
    
  export type SkladnikiGroupByArgs = {
    where?: SkladnikiWhereInput
    orderBy?: Enumerable<SkladnikiOrderByWithAggregationInput>
    by: Array<SkladnikiScalarFieldEnum>
    having?: SkladnikiScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkladnikiCountAggregateInputType | true
    _avg?: SkladnikiAvgAggregateInputType
    _sum?: SkladnikiSumAggregateInputType
    _min?: SkladnikiMinAggregateInputType
    _max?: SkladnikiMaxAggregateInputType
  }


  export type SkladnikiGroupByOutputType = {
    serial: number
    nazwa: string
    typ: string
    cena: number
    ilosc: number
    jednostka: string
    dostepny: number
    _count: SkladnikiCountAggregateOutputType | null
    _avg: SkladnikiAvgAggregateOutputType | null
    _sum: SkladnikiSumAggregateOutputType | null
    _min: SkladnikiMinAggregateOutputType | null
    _max: SkladnikiMaxAggregateOutputType | null
  }

  type GetSkladnikiGroupByPayload<T extends SkladnikiGroupByArgs> = Promise<
    Array<
      PickArray<SkladnikiGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof SkladnikiGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], SkladnikiGroupByOutputType[P]> 
            : GetScalarType<T[P], SkladnikiGroupByOutputType[P]>
        }
      > 
    >


  export type SkladnikiSelect = {
    serial?: boolean
    nazwa?: boolean
    typ?: boolean
    cena?: boolean
    ilosc?: boolean
    jednostka?: boolean
    dostepny?: boolean
  }

  export type SkladnikiGetPayload<
    S extends boolean | null | undefined | SkladnikiArgs,
    U = keyof S
      > = S extends true
        ? Skladniki
    : S extends undefined
    ? never
    : S extends SkladnikiArgs | SkladnikiFindManyArgs
    ?'include' extends U
    ? Skladniki 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Skladniki ?Skladniki [P]
  : 
     never
  } 
    : Skladniki
  : Skladniki


  type SkladnikiCountArgs = Merge<
    Omit<SkladnikiFindManyArgs, 'select' | 'include'> & {
      select?: SkladnikiCountAggregateInputType | true
    }
  >

  export interface SkladnikiDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Skladniki that matches the filter.
     * @param {SkladnikiFindUniqueArgs} args - Arguments to find a Skladniki
     * @example
     * // Get one Skladniki
     * const skladniki = await prisma.skladniki.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SkladnikiFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SkladnikiFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Skladniki'> extends True ? CheckSelect<T, Prisma__SkladnikiClient<Skladniki>, Prisma__SkladnikiClient<SkladnikiGetPayload<T>>> : CheckSelect<T, Prisma__SkladnikiClient<Skladniki | null >, Prisma__SkladnikiClient<SkladnikiGetPayload<T> | null >>

    /**
     * Find the first Skladniki that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkladnikiFindFirstArgs} args - Arguments to find a Skladniki
     * @example
     * // Get one Skladniki
     * const skladniki = await prisma.skladniki.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SkladnikiFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SkladnikiFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Skladniki'> extends True ? CheckSelect<T, Prisma__SkladnikiClient<Skladniki>, Prisma__SkladnikiClient<SkladnikiGetPayload<T>>> : CheckSelect<T, Prisma__SkladnikiClient<Skladniki | null >, Prisma__SkladnikiClient<SkladnikiGetPayload<T> | null >>

    /**
     * Find zero or more Skladnikis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkladnikiFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Skladnikis
     * const skladnikis = await prisma.skladniki.findMany()
     * 
     * // Get first 10 Skladnikis
     * const skladnikis = await prisma.skladniki.findMany({ take: 10 })
     * 
     * // Only select the `serial`
     * const skladnikiWithSerialOnly = await prisma.skladniki.findMany({ select: { serial: true } })
     * 
    **/
    findMany<T extends SkladnikiFindManyArgs>(
      args?: SelectSubset<T, SkladnikiFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Skladniki>>, PrismaPromise<Array<SkladnikiGetPayload<T>>>>

    /**
     * Create a Skladniki.
     * @param {SkladnikiCreateArgs} args - Arguments to create a Skladniki.
     * @example
     * // Create one Skladniki
     * const Skladniki = await prisma.skladniki.create({
     *   data: {
     *     // ... data to create a Skladniki
     *   }
     * })
     * 
    **/
    create<T extends SkladnikiCreateArgs>(
      args: SelectSubset<T, SkladnikiCreateArgs>
    ): CheckSelect<T, Prisma__SkladnikiClient<Skladniki>, Prisma__SkladnikiClient<SkladnikiGetPayload<T>>>

    /**
     * Create many Skladnikis.
     *     @param {SkladnikiCreateManyArgs} args - Arguments to create many Skladnikis.
     *     @example
     *     // Create many Skladnikis
     *     const skladniki = await prisma.skladniki.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SkladnikiCreateManyArgs>(
      args?: SelectSubset<T, SkladnikiCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Skladniki.
     * @param {SkladnikiDeleteArgs} args - Arguments to delete one Skladniki.
     * @example
     * // Delete one Skladniki
     * const Skladniki = await prisma.skladniki.delete({
     *   where: {
     *     // ... filter to delete one Skladniki
     *   }
     * })
     * 
    **/
    delete<T extends SkladnikiDeleteArgs>(
      args: SelectSubset<T, SkladnikiDeleteArgs>
    ): CheckSelect<T, Prisma__SkladnikiClient<Skladniki>, Prisma__SkladnikiClient<SkladnikiGetPayload<T>>>

    /**
     * Update one Skladniki.
     * @param {SkladnikiUpdateArgs} args - Arguments to update one Skladniki.
     * @example
     * // Update one Skladniki
     * const skladniki = await prisma.skladniki.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SkladnikiUpdateArgs>(
      args: SelectSubset<T, SkladnikiUpdateArgs>
    ): CheckSelect<T, Prisma__SkladnikiClient<Skladniki>, Prisma__SkladnikiClient<SkladnikiGetPayload<T>>>

    /**
     * Delete zero or more Skladnikis.
     * @param {SkladnikiDeleteManyArgs} args - Arguments to filter Skladnikis to delete.
     * @example
     * // Delete a few Skladnikis
     * const { count } = await prisma.skladniki.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SkladnikiDeleteManyArgs>(
      args?: SelectSubset<T, SkladnikiDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skladnikis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkladnikiUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Skladnikis
     * const skladniki = await prisma.skladniki.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SkladnikiUpdateManyArgs>(
      args: SelectSubset<T, SkladnikiUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Skladniki.
     * @param {SkladnikiUpsertArgs} args - Arguments to update or create a Skladniki.
     * @example
     * // Update or create a Skladniki
     * const skladniki = await prisma.skladniki.upsert({
     *   create: {
     *     // ... data to create a Skladniki
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Skladniki we want to update
     *   }
     * })
    **/
    upsert<T extends SkladnikiUpsertArgs>(
      args: SelectSubset<T, SkladnikiUpsertArgs>
    ): CheckSelect<T, Prisma__SkladnikiClient<Skladniki>, Prisma__SkladnikiClient<SkladnikiGetPayload<T>>>

    /**
     * Count the number of Skladnikis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkladnikiCountArgs} args - Arguments to filter Skladnikis to count.
     * @example
     * // Count the number of Skladnikis
     * const count = await prisma.skladniki.count({
     *   where: {
     *     // ... the filter for the Skladnikis we want to count
     *   }
     * })
    **/
    count<T extends SkladnikiCountArgs>(
      args?: Subset<T, SkladnikiCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkladnikiCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Skladniki.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkladnikiAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkladnikiAggregateArgs>(args: Subset<T, SkladnikiAggregateArgs>): PrismaPromise<GetSkladnikiAggregateType<T>>

    /**
     * Group by Skladniki.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkladnikiGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SkladnikiGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkladnikiGroupByArgs['orderBy'] }
        : { orderBy?: SkladnikiGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SkladnikiGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkladnikiGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Skladniki.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SkladnikiClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Skladniki findUnique
   */
  export type SkladnikiFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Skladniki
     * 
    **/
    select?: SkladnikiSelect | null
    /**
     * Throw an Error if a Skladniki can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Skladniki to fetch.
     * 
    **/
    where: SkladnikiWhereUniqueInput
  }


  /**
   * Skladniki findFirst
   */
  export type SkladnikiFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Skladniki
     * 
    **/
    select?: SkladnikiSelect | null
    /**
     * Throw an Error if a Skladniki can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Skladniki to fetch.
     * 
    **/
    where?: SkladnikiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skladnikis to fetch.
     * 
    **/
    orderBy?: Enumerable<SkladnikiOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skladnikis.
     * 
    **/
    cursor?: SkladnikiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skladnikis from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skladnikis.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skladnikis.
     * 
    **/
    distinct?: Enumerable<SkladnikiScalarFieldEnum>
  }


  /**
   * Skladniki findMany
   */
  export type SkladnikiFindManyArgs = {
    /**
     * Select specific fields to fetch from the Skladniki
     * 
    **/
    select?: SkladnikiSelect | null
    /**
     * Filter, which Skladnikis to fetch.
     * 
    **/
    where?: SkladnikiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skladnikis to fetch.
     * 
    **/
    orderBy?: Enumerable<SkladnikiOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Skladnikis.
     * 
    **/
    cursor?: SkladnikiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skladnikis from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skladnikis.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SkladnikiScalarFieldEnum>
  }


  /**
   * Skladniki create
   */
  export type SkladnikiCreateArgs = {
    /**
     * Select specific fields to fetch from the Skladniki
     * 
    **/
    select?: SkladnikiSelect | null
    /**
     * The data needed to create a Skladniki.
     * 
    **/
    data: XOR<SkladnikiCreateInput, SkladnikiUncheckedCreateInput>
  }


  /**
   * Skladniki createMany
   */
  export type SkladnikiCreateManyArgs = {
    data: Enumerable<SkladnikiCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Skladniki update
   */
  export type SkladnikiUpdateArgs = {
    /**
     * Select specific fields to fetch from the Skladniki
     * 
    **/
    select?: SkladnikiSelect | null
    /**
     * The data needed to update a Skladniki.
     * 
    **/
    data: XOR<SkladnikiUpdateInput, SkladnikiUncheckedUpdateInput>
    /**
     * Choose, which Skladniki to update.
     * 
    **/
    where: SkladnikiWhereUniqueInput
  }


  /**
   * Skladniki updateMany
   */
  export type SkladnikiUpdateManyArgs = {
    data: XOR<SkladnikiUpdateManyMutationInput, SkladnikiUncheckedUpdateManyInput>
    where?: SkladnikiWhereInput
  }


  /**
   * Skladniki upsert
   */
  export type SkladnikiUpsertArgs = {
    /**
     * Select specific fields to fetch from the Skladniki
     * 
    **/
    select?: SkladnikiSelect | null
    /**
     * The filter to search for the Skladniki to update in case it exists.
     * 
    **/
    where: SkladnikiWhereUniqueInput
    /**
     * In case the Skladniki found by the `where` argument doesn't exist, create a new Skladniki with this data.
     * 
    **/
    create: XOR<SkladnikiCreateInput, SkladnikiUncheckedCreateInput>
    /**
     * In case the Skladniki was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<SkladnikiUpdateInput, SkladnikiUncheckedUpdateInput>
  }


  /**
   * Skladniki delete
   */
  export type SkladnikiDeleteArgs = {
    /**
     * Select specific fields to fetch from the Skladniki
     * 
    **/
    select?: SkladnikiSelect | null
    /**
     * Filter which Skladniki to delete.
     * 
    **/
    where: SkladnikiWhereUniqueInput
  }


  /**
   * Skladniki deleteMany
   */
  export type SkladnikiDeleteManyArgs = {
    where?: SkladnikiWhereInput
  }


  /**
   * Skladniki without action
   */
  export type SkladnikiArgs = {
    /**
     * Select specific fields to fetch from the Skladniki
     * 
    **/
    select?: SkladnikiSelect | null
  }



  /**
   * Model Zlane
   */


  export type AggregateZlane = {
    _count: ZlaneCountAggregateOutputType | null
    _min: ZlaneMinAggregateOutputType | null
    _max: ZlaneMaxAggregateOutputType | null
  }

  export type ZlaneMinAggregateOutputType = {
    id: string | null
    json: string | null
    data: string | null
  }

  export type ZlaneMaxAggregateOutputType = {
    id: string | null
    json: string | null
    data: string | null
  }

  export type ZlaneCountAggregateOutputType = {
    id: number
    json: number
    data: number
    _all: number
  }


  export type ZlaneMinAggregateInputType = {
    id?: true
    json?: true
    data?: true
  }

  export type ZlaneMaxAggregateInputType = {
    id?: true
    json?: true
    data?: true
  }

  export type ZlaneCountAggregateInputType = {
    id?: true
    json?: true
    data?: true
    _all?: true
  }

  export type ZlaneAggregateArgs = {
    /**
     * Filter which Zlane to aggregate.
     * 
    **/
    where?: ZlaneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Zlanes to fetch.
     * 
    **/
    orderBy?: Enumerable<ZlaneOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ZlaneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Zlanes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Zlanes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Zlanes
    **/
    _count?: true | ZlaneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ZlaneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ZlaneMaxAggregateInputType
  }

  export type GetZlaneAggregateType<T extends ZlaneAggregateArgs> = {
        [P in keyof T & keyof AggregateZlane]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateZlane[P]>
      : GetScalarType<T[P], AggregateZlane[P]>
  }


    
    
  export type ZlaneGroupByArgs = {
    where?: ZlaneWhereInput
    orderBy?: Enumerable<ZlaneOrderByWithAggregationInput>
    by: Array<ZlaneScalarFieldEnum>
    having?: ZlaneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ZlaneCountAggregateInputType | true
    _min?: ZlaneMinAggregateInputType
    _max?: ZlaneMaxAggregateInputType
  }


  export type ZlaneGroupByOutputType = {
    id: string
    json: string
    data: string
    _count: ZlaneCountAggregateOutputType | null
    _min: ZlaneMinAggregateOutputType | null
    _max: ZlaneMaxAggregateOutputType | null
  }

  type GetZlaneGroupByPayload<T extends ZlaneGroupByArgs> = Promise<
    Array<
      PickArray<ZlaneGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof ZlaneGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], ZlaneGroupByOutputType[P]> 
            : GetScalarType<T[P], ZlaneGroupByOutputType[P]>
        }
      > 
    >


  export type ZlaneSelect = {
    id?: boolean
    json?: boolean
    data?: boolean
  }

  export type ZlaneGetPayload<
    S extends boolean | null | undefined | ZlaneArgs,
    U = keyof S
      > = S extends true
        ? Zlane
    : S extends undefined
    ? never
    : S extends ZlaneArgs | ZlaneFindManyArgs
    ?'include' extends U
    ? Zlane 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Zlane ?Zlane [P]
  : 
     never
  } 
    : Zlane
  : Zlane


  type ZlaneCountArgs = Merge<
    Omit<ZlaneFindManyArgs, 'select' | 'include'> & {
      select?: ZlaneCountAggregateInputType | true
    }
  >

  export interface ZlaneDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Zlane that matches the filter.
     * @param {ZlaneFindUniqueArgs} args - Arguments to find a Zlane
     * @example
     * // Get one Zlane
     * const zlane = await prisma.zlane.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ZlaneFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ZlaneFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Zlane'> extends True ? CheckSelect<T, Prisma__ZlaneClient<Zlane>, Prisma__ZlaneClient<ZlaneGetPayload<T>>> : CheckSelect<T, Prisma__ZlaneClient<Zlane | null >, Prisma__ZlaneClient<ZlaneGetPayload<T> | null >>

    /**
     * Find the first Zlane that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZlaneFindFirstArgs} args - Arguments to find a Zlane
     * @example
     * // Get one Zlane
     * const zlane = await prisma.zlane.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ZlaneFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ZlaneFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Zlane'> extends True ? CheckSelect<T, Prisma__ZlaneClient<Zlane>, Prisma__ZlaneClient<ZlaneGetPayload<T>>> : CheckSelect<T, Prisma__ZlaneClient<Zlane | null >, Prisma__ZlaneClient<ZlaneGetPayload<T> | null >>

    /**
     * Find zero or more Zlanes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZlaneFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Zlanes
     * const zlanes = await prisma.zlane.findMany()
     * 
     * // Get first 10 Zlanes
     * const zlanes = await prisma.zlane.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const zlaneWithIdOnly = await prisma.zlane.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ZlaneFindManyArgs>(
      args?: SelectSubset<T, ZlaneFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Zlane>>, PrismaPromise<Array<ZlaneGetPayload<T>>>>

    /**
     * Create a Zlane.
     * @param {ZlaneCreateArgs} args - Arguments to create a Zlane.
     * @example
     * // Create one Zlane
     * const Zlane = await prisma.zlane.create({
     *   data: {
     *     // ... data to create a Zlane
     *   }
     * })
     * 
    **/
    create<T extends ZlaneCreateArgs>(
      args: SelectSubset<T, ZlaneCreateArgs>
    ): CheckSelect<T, Prisma__ZlaneClient<Zlane>, Prisma__ZlaneClient<ZlaneGetPayload<T>>>

    /**
     * Create many Zlanes.
     *     @param {ZlaneCreateManyArgs} args - Arguments to create many Zlanes.
     *     @example
     *     // Create many Zlanes
     *     const zlane = await prisma.zlane.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ZlaneCreateManyArgs>(
      args?: SelectSubset<T, ZlaneCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Zlane.
     * @param {ZlaneDeleteArgs} args - Arguments to delete one Zlane.
     * @example
     * // Delete one Zlane
     * const Zlane = await prisma.zlane.delete({
     *   where: {
     *     // ... filter to delete one Zlane
     *   }
     * })
     * 
    **/
    delete<T extends ZlaneDeleteArgs>(
      args: SelectSubset<T, ZlaneDeleteArgs>
    ): CheckSelect<T, Prisma__ZlaneClient<Zlane>, Prisma__ZlaneClient<ZlaneGetPayload<T>>>

    /**
     * Update one Zlane.
     * @param {ZlaneUpdateArgs} args - Arguments to update one Zlane.
     * @example
     * // Update one Zlane
     * const zlane = await prisma.zlane.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ZlaneUpdateArgs>(
      args: SelectSubset<T, ZlaneUpdateArgs>
    ): CheckSelect<T, Prisma__ZlaneClient<Zlane>, Prisma__ZlaneClient<ZlaneGetPayload<T>>>

    /**
     * Delete zero or more Zlanes.
     * @param {ZlaneDeleteManyArgs} args - Arguments to filter Zlanes to delete.
     * @example
     * // Delete a few Zlanes
     * const { count } = await prisma.zlane.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ZlaneDeleteManyArgs>(
      args?: SelectSubset<T, ZlaneDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Zlanes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZlaneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Zlanes
     * const zlane = await prisma.zlane.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ZlaneUpdateManyArgs>(
      args: SelectSubset<T, ZlaneUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Zlane.
     * @param {ZlaneUpsertArgs} args - Arguments to update or create a Zlane.
     * @example
     * // Update or create a Zlane
     * const zlane = await prisma.zlane.upsert({
     *   create: {
     *     // ... data to create a Zlane
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Zlane we want to update
     *   }
     * })
    **/
    upsert<T extends ZlaneUpsertArgs>(
      args: SelectSubset<T, ZlaneUpsertArgs>
    ): CheckSelect<T, Prisma__ZlaneClient<Zlane>, Prisma__ZlaneClient<ZlaneGetPayload<T>>>

    /**
     * Count the number of Zlanes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZlaneCountArgs} args - Arguments to filter Zlanes to count.
     * @example
     * // Count the number of Zlanes
     * const count = await prisma.zlane.count({
     *   where: {
     *     // ... the filter for the Zlanes we want to count
     *   }
     * })
    **/
    count<T extends ZlaneCountArgs>(
      args?: Subset<T, ZlaneCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ZlaneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Zlane.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZlaneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ZlaneAggregateArgs>(args: Subset<T, ZlaneAggregateArgs>): PrismaPromise<GetZlaneAggregateType<T>>

    /**
     * Group by Zlane.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZlaneGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ZlaneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ZlaneGroupByArgs['orderBy'] }
        : { orderBy?: ZlaneGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ZlaneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetZlaneGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Zlane.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ZlaneClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Zlane findUnique
   */
  export type ZlaneFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Zlane
     * 
    **/
    select?: ZlaneSelect | null
    /**
     * Throw an Error if a Zlane can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Zlane to fetch.
     * 
    **/
    where: ZlaneWhereUniqueInput
  }


  /**
   * Zlane findFirst
   */
  export type ZlaneFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Zlane
     * 
    **/
    select?: ZlaneSelect | null
    /**
     * Throw an Error if a Zlane can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Zlane to fetch.
     * 
    **/
    where?: ZlaneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Zlanes to fetch.
     * 
    **/
    orderBy?: Enumerable<ZlaneOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Zlanes.
     * 
    **/
    cursor?: ZlaneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Zlanes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Zlanes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Zlanes.
     * 
    **/
    distinct?: Enumerable<ZlaneScalarFieldEnum>
  }


  /**
   * Zlane findMany
   */
  export type ZlaneFindManyArgs = {
    /**
     * Select specific fields to fetch from the Zlane
     * 
    **/
    select?: ZlaneSelect | null
    /**
     * Filter, which Zlanes to fetch.
     * 
    **/
    where?: ZlaneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Zlanes to fetch.
     * 
    **/
    orderBy?: Enumerable<ZlaneOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Zlanes.
     * 
    **/
    cursor?: ZlaneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Zlanes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Zlanes.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ZlaneScalarFieldEnum>
  }


  /**
   * Zlane create
   */
  export type ZlaneCreateArgs = {
    /**
     * Select specific fields to fetch from the Zlane
     * 
    **/
    select?: ZlaneSelect | null
    /**
     * The data needed to create a Zlane.
     * 
    **/
    data: XOR<ZlaneCreateInput, ZlaneUncheckedCreateInput>
  }


  /**
   * Zlane createMany
   */
  export type ZlaneCreateManyArgs = {
    data: Enumerable<ZlaneCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Zlane update
   */
  export type ZlaneUpdateArgs = {
    /**
     * Select specific fields to fetch from the Zlane
     * 
    **/
    select?: ZlaneSelect | null
    /**
     * The data needed to update a Zlane.
     * 
    **/
    data: XOR<ZlaneUpdateInput, ZlaneUncheckedUpdateInput>
    /**
     * Choose, which Zlane to update.
     * 
    **/
    where: ZlaneWhereUniqueInput
  }


  /**
   * Zlane updateMany
   */
  export type ZlaneUpdateManyArgs = {
    data: XOR<ZlaneUpdateManyMutationInput, ZlaneUncheckedUpdateManyInput>
    where?: ZlaneWhereInput
  }


  /**
   * Zlane upsert
   */
  export type ZlaneUpsertArgs = {
    /**
     * Select specific fields to fetch from the Zlane
     * 
    **/
    select?: ZlaneSelect | null
    /**
     * The filter to search for the Zlane to update in case it exists.
     * 
    **/
    where: ZlaneWhereUniqueInput
    /**
     * In case the Zlane found by the `where` argument doesn't exist, create a new Zlane with this data.
     * 
    **/
    create: XOR<ZlaneCreateInput, ZlaneUncheckedCreateInput>
    /**
     * In case the Zlane was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ZlaneUpdateInput, ZlaneUncheckedUpdateInput>
  }


  /**
   * Zlane delete
   */
  export type ZlaneDeleteArgs = {
    /**
     * Select specific fields to fetch from the Zlane
     * 
    **/
    select?: ZlaneSelect | null
    /**
     * Filter which Zlane to delete.
     * 
    **/
    where: ZlaneWhereUniqueInput
  }


  /**
   * Zlane deleteMany
   */
  export type ZlaneDeleteManyArgs = {
    where?: ZlaneWhereInput
  }


  /**
   * Zlane without action
   */
  export type ZlaneArgs = {
    /**
     * Select specific fields to fetch from the Zlane
     * 
    **/
    select?: ZlaneSelect | null
  }



  /**
   * Model autoRoles
   */


  export type AggregateAutoRoles = {
    _count: AutoRolesCountAggregateOutputType | null
    _avg: AutoRolesAvgAggregateOutputType | null
    _sum: AutoRolesSumAggregateOutputType | null
    _min: AutoRolesMinAggregateOutputType | null
    _max: AutoRolesMaxAggregateOutputType | null
  }

  export type AutoRolesAvgAggregateOutputType = {
    id: number | null
  }

  export type AutoRolesSumAggregateOutputType = {
    id: number | null
  }

  export type AutoRolesMinAggregateOutputType = {
    id: number | null
    name: string | null
    dcid: string | null
  }

  export type AutoRolesMaxAggregateOutputType = {
    id: number | null
    name: string | null
    dcid: string | null
  }

  export type AutoRolesCountAggregateOutputType = {
    id: number
    name: number
    dcid: number
    _all: number
  }


  export type AutoRolesAvgAggregateInputType = {
    id?: true
  }

  export type AutoRolesSumAggregateInputType = {
    id?: true
  }

  export type AutoRolesMinAggregateInputType = {
    id?: true
    name?: true
    dcid?: true
  }

  export type AutoRolesMaxAggregateInputType = {
    id?: true
    name?: true
    dcid?: true
  }

  export type AutoRolesCountAggregateInputType = {
    id?: true
    name?: true
    dcid?: true
    _all?: true
  }

  export type AutoRolesAggregateArgs = {
    /**
     * Filter which autoRoles to aggregate.
     * 
    **/
    where?: autoRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of autoRoles to fetch.
     * 
    **/
    orderBy?: Enumerable<autoRolesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: autoRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` autoRoles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` autoRoles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned autoRoles
    **/
    _count?: true | AutoRolesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AutoRolesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AutoRolesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AutoRolesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AutoRolesMaxAggregateInputType
  }

  export type GetAutoRolesAggregateType<T extends AutoRolesAggregateArgs> = {
        [P in keyof T & keyof AggregateAutoRoles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAutoRoles[P]>
      : GetScalarType<T[P], AggregateAutoRoles[P]>
  }


    
    
  export type AutoRolesGroupByArgs = {
    where?: autoRolesWhereInput
    orderBy?: Enumerable<autoRolesOrderByWithAggregationInput>
    by: Array<AutoRolesScalarFieldEnum>
    having?: autoRolesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AutoRolesCountAggregateInputType | true
    _avg?: AutoRolesAvgAggregateInputType
    _sum?: AutoRolesSumAggregateInputType
    _min?: AutoRolesMinAggregateInputType
    _max?: AutoRolesMaxAggregateInputType
  }


  export type AutoRolesGroupByOutputType = {
    id: number
    name: string
    dcid: string
    _count: AutoRolesCountAggregateOutputType | null
    _avg: AutoRolesAvgAggregateOutputType | null
    _sum: AutoRolesSumAggregateOutputType | null
    _min: AutoRolesMinAggregateOutputType | null
    _max: AutoRolesMaxAggregateOutputType | null
  }

  type GetAutoRolesGroupByPayload<T extends AutoRolesGroupByArgs> = Promise<
    Array<
      PickArray<AutoRolesGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof AutoRolesGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], AutoRolesGroupByOutputType[P]> 
            : GetScalarType<T[P], AutoRolesGroupByOutputType[P]>
        }
      > 
    >


  export type autoRolesSelect = {
    id?: boolean
    name?: boolean
    dcid?: boolean
  }

  export type autoRolesGetPayload<
    S extends boolean | null | undefined | autoRolesArgs,
    U = keyof S
      > = S extends true
        ? autoRoles
    : S extends undefined
    ? never
    : S extends autoRolesArgs | autoRolesFindManyArgs
    ?'include' extends U
    ? autoRoles 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof autoRoles ?autoRoles [P]
  : 
     never
  } 
    : autoRoles
  : autoRoles


  type autoRolesCountArgs = Merge<
    Omit<autoRolesFindManyArgs, 'select' | 'include'> & {
      select?: AutoRolesCountAggregateInputType | true
    }
  >

  export interface autoRolesDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one AutoRoles that matches the filter.
     * @param {autoRolesFindUniqueArgs} args - Arguments to find a AutoRoles
     * @example
     * // Get one AutoRoles
     * const autoRoles = await prisma.autoRoles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends autoRolesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, autoRolesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'autoRoles'> extends True ? CheckSelect<T, Prisma__autoRolesClient<autoRoles>, Prisma__autoRolesClient<autoRolesGetPayload<T>>> : CheckSelect<T, Prisma__autoRolesClient<autoRoles | null >, Prisma__autoRolesClient<autoRolesGetPayload<T> | null >>

    /**
     * Find the first AutoRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {autoRolesFindFirstArgs} args - Arguments to find a AutoRoles
     * @example
     * // Get one AutoRoles
     * const autoRoles = await prisma.autoRoles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends autoRolesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, autoRolesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'autoRoles'> extends True ? CheckSelect<T, Prisma__autoRolesClient<autoRoles>, Prisma__autoRolesClient<autoRolesGetPayload<T>>> : CheckSelect<T, Prisma__autoRolesClient<autoRoles | null >, Prisma__autoRolesClient<autoRolesGetPayload<T> | null >>

    /**
     * Find zero or more AutoRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {autoRolesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AutoRoles
     * const autoRoles = await prisma.autoRoles.findMany()
     * 
     * // Get first 10 AutoRoles
     * const autoRoles = await prisma.autoRoles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const autoRolesWithIdOnly = await prisma.autoRoles.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends autoRolesFindManyArgs>(
      args?: SelectSubset<T, autoRolesFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<autoRoles>>, PrismaPromise<Array<autoRolesGetPayload<T>>>>

    /**
     * Create a AutoRoles.
     * @param {autoRolesCreateArgs} args - Arguments to create a AutoRoles.
     * @example
     * // Create one AutoRoles
     * const AutoRoles = await prisma.autoRoles.create({
     *   data: {
     *     // ... data to create a AutoRoles
     *   }
     * })
     * 
    **/
    create<T extends autoRolesCreateArgs>(
      args: SelectSubset<T, autoRolesCreateArgs>
    ): CheckSelect<T, Prisma__autoRolesClient<autoRoles>, Prisma__autoRolesClient<autoRolesGetPayload<T>>>

    /**
     * Create many AutoRoles.
     *     @param {autoRolesCreateManyArgs} args - Arguments to create many AutoRoles.
     *     @example
     *     // Create many AutoRoles
     *     const autoRoles = await prisma.autoRoles.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends autoRolesCreateManyArgs>(
      args?: SelectSubset<T, autoRolesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a AutoRoles.
     * @param {autoRolesDeleteArgs} args - Arguments to delete one AutoRoles.
     * @example
     * // Delete one AutoRoles
     * const AutoRoles = await prisma.autoRoles.delete({
     *   where: {
     *     // ... filter to delete one AutoRoles
     *   }
     * })
     * 
    **/
    delete<T extends autoRolesDeleteArgs>(
      args: SelectSubset<T, autoRolesDeleteArgs>
    ): CheckSelect<T, Prisma__autoRolesClient<autoRoles>, Prisma__autoRolesClient<autoRolesGetPayload<T>>>

    /**
     * Update one AutoRoles.
     * @param {autoRolesUpdateArgs} args - Arguments to update one AutoRoles.
     * @example
     * // Update one AutoRoles
     * const autoRoles = await prisma.autoRoles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends autoRolesUpdateArgs>(
      args: SelectSubset<T, autoRolesUpdateArgs>
    ): CheckSelect<T, Prisma__autoRolesClient<autoRoles>, Prisma__autoRolesClient<autoRolesGetPayload<T>>>

    /**
     * Delete zero or more AutoRoles.
     * @param {autoRolesDeleteManyArgs} args - Arguments to filter AutoRoles to delete.
     * @example
     * // Delete a few AutoRoles
     * const { count } = await prisma.autoRoles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends autoRolesDeleteManyArgs>(
      args?: SelectSubset<T, autoRolesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AutoRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {autoRolesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AutoRoles
     * const autoRoles = await prisma.autoRoles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends autoRolesUpdateManyArgs>(
      args: SelectSubset<T, autoRolesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AutoRoles.
     * @param {autoRolesUpsertArgs} args - Arguments to update or create a AutoRoles.
     * @example
     * // Update or create a AutoRoles
     * const autoRoles = await prisma.autoRoles.upsert({
     *   create: {
     *     // ... data to create a AutoRoles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AutoRoles we want to update
     *   }
     * })
    **/
    upsert<T extends autoRolesUpsertArgs>(
      args: SelectSubset<T, autoRolesUpsertArgs>
    ): CheckSelect<T, Prisma__autoRolesClient<autoRoles>, Prisma__autoRolesClient<autoRolesGetPayload<T>>>

    /**
     * Count the number of AutoRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {autoRolesCountArgs} args - Arguments to filter AutoRoles to count.
     * @example
     * // Count the number of AutoRoles
     * const count = await prisma.autoRoles.count({
     *   where: {
     *     // ... the filter for the AutoRoles we want to count
     *   }
     * })
    **/
    count<T extends autoRolesCountArgs>(
      args?: Subset<T, autoRolesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AutoRolesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AutoRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutoRolesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AutoRolesAggregateArgs>(args: Subset<T, AutoRolesAggregateArgs>): PrismaPromise<GetAutoRolesAggregateType<T>>

    /**
     * Group by AutoRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutoRolesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AutoRolesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AutoRolesGroupByArgs['orderBy'] }
        : { orderBy?: AutoRolesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AutoRolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAutoRolesGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for autoRoles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__autoRolesClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * autoRoles findUnique
   */
  export type autoRolesFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the autoRoles
     * 
    **/
    select?: autoRolesSelect | null
    /**
     * Throw an Error if a autoRoles can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which autoRoles to fetch.
     * 
    **/
    where: autoRolesWhereUniqueInput
  }


  /**
   * autoRoles findFirst
   */
  export type autoRolesFindFirstArgs = {
    /**
     * Select specific fields to fetch from the autoRoles
     * 
    **/
    select?: autoRolesSelect | null
    /**
     * Throw an Error if a autoRoles can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which autoRoles to fetch.
     * 
    **/
    where?: autoRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of autoRoles to fetch.
     * 
    **/
    orderBy?: Enumerable<autoRolesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for autoRoles.
     * 
    **/
    cursor?: autoRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` autoRoles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` autoRoles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of autoRoles.
     * 
    **/
    distinct?: Enumerable<AutoRolesScalarFieldEnum>
  }


  /**
   * autoRoles findMany
   */
  export type autoRolesFindManyArgs = {
    /**
     * Select specific fields to fetch from the autoRoles
     * 
    **/
    select?: autoRolesSelect | null
    /**
     * Filter, which autoRoles to fetch.
     * 
    **/
    where?: autoRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of autoRoles to fetch.
     * 
    **/
    orderBy?: Enumerable<autoRolesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing autoRoles.
     * 
    **/
    cursor?: autoRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` autoRoles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` autoRoles.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AutoRolesScalarFieldEnum>
  }


  /**
   * autoRoles create
   */
  export type autoRolesCreateArgs = {
    /**
     * Select specific fields to fetch from the autoRoles
     * 
    **/
    select?: autoRolesSelect | null
    /**
     * The data needed to create a autoRoles.
     * 
    **/
    data: XOR<autoRolesCreateInput, autoRolesUncheckedCreateInput>
  }


  /**
   * autoRoles createMany
   */
  export type autoRolesCreateManyArgs = {
    data: Enumerable<autoRolesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * autoRoles update
   */
  export type autoRolesUpdateArgs = {
    /**
     * Select specific fields to fetch from the autoRoles
     * 
    **/
    select?: autoRolesSelect | null
    /**
     * The data needed to update a autoRoles.
     * 
    **/
    data: XOR<autoRolesUpdateInput, autoRolesUncheckedUpdateInput>
    /**
     * Choose, which autoRoles to update.
     * 
    **/
    where: autoRolesWhereUniqueInput
  }


  /**
   * autoRoles updateMany
   */
  export type autoRolesUpdateManyArgs = {
    data: XOR<autoRolesUpdateManyMutationInput, autoRolesUncheckedUpdateManyInput>
    where?: autoRolesWhereInput
  }


  /**
   * autoRoles upsert
   */
  export type autoRolesUpsertArgs = {
    /**
     * Select specific fields to fetch from the autoRoles
     * 
    **/
    select?: autoRolesSelect | null
    /**
     * The filter to search for the autoRoles to update in case it exists.
     * 
    **/
    where: autoRolesWhereUniqueInput
    /**
     * In case the autoRoles found by the `where` argument doesn't exist, create a new autoRoles with this data.
     * 
    **/
    create: XOR<autoRolesCreateInput, autoRolesUncheckedCreateInput>
    /**
     * In case the autoRoles was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<autoRolesUpdateInput, autoRolesUncheckedUpdateInput>
  }


  /**
   * autoRoles delete
   */
  export type autoRolesDeleteArgs = {
    /**
     * Select specific fields to fetch from the autoRoles
     * 
    **/
    select?: autoRolesSelect | null
    /**
     * Filter which autoRoles to delete.
     * 
    **/
    where: autoRolesWhereUniqueInput
  }


  /**
   * autoRoles deleteMany
   */
  export type autoRolesDeleteManyArgs = {
    where?: autoRolesWhereInput
  }


  /**
   * autoRoles without action
   */
  export type autoRolesArgs = {
    /**
     * Select specific fields to fetch from the autoRoles
     * 
    **/
    select?: autoRolesSelect | null
  }



  /**
   * Model betaTests
   */


  export type AggregateBetaTests = {
    _count: BetaTestsCountAggregateOutputType | null
    _avg: BetaTestsAvgAggregateOutputType | null
    _sum: BetaTestsSumAggregateOutputType | null
    _min: BetaTestsMinAggregateOutputType | null
    _max: BetaTestsMaxAggregateOutputType | null
  }

  export type BetaTestsAvgAggregateOutputType = {
    id: number | null
  }

  export type BetaTestsSumAggregateOutputType = {
    id: number | null
  }

  export type BetaTestsMinAggregateOutputType = {
    id: number | null
    ip: string | null
  }

  export type BetaTestsMaxAggregateOutputType = {
    id: number | null
    ip: string | null
  }

  export type BetaTestsCountAggregateOutputType = {
    id: number
    ip: number
    _all: number
  }


  export type BetaTestsAvgAggregateInputType = {
    id?: true
  }

  export type BetaTestsSumAggregateInputType = {
    id?: true
  }

  export type BetaTestsMinAggregateInputType = {
    id?: true
    ip?: true
  }

  export type BetaTestsMaxAggregateInputType = {
    id?: true
    ip?: true
  }

  export type BetaTestsCountAggregateInputType = {
    id?: true
    ip?: true
    _all?: true
  }

  export type BetaTestsAggregateArgs = {
    /**
     * Filter which betaTests to aggregate.
     * 
    **/
    where?: betaTestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of betaTests to fetch.
     * 
    **/
    orderBy?: Enumerable<betaTestsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: betaTestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` betaTests from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` betaTests.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned betaTests
    **/
    _count?: true | BetaTestsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BetaTestsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BetaTestsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BetaTestsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BetaTestsMaxAggregateInputType
  }

  export type GetBetaTestsAggregateType<T extends BetaTestsAggregateArgs> = {
        [P in keyof T & keyof AggregateBetaTests]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBetaTests[P]>
      : GetScalarType<T[P], AggregateBetaTests[P]>
  }


    
    
  export type BetaTestsGroupByArgs = {
    where?: betaTestsWhereInput
    orderBy?: Enumerable<betaTestsOrderByWithAggregationInput>
    by: Array<BetaTestsScalarFieldEnum>
    having?: betaTestsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BetaTestsCountAggregateInputType | true
    _avg?: BetaTestsAvgAggregateInputType
    _sum?: BetaTestsSumAggregateInputType
    _min?: BetaTestsMinAggregateInputType
    _max?: BetaTestsMaxAggregateInputType
  }


  export type BetaTestsGroupByOutputType = {
    id: number
    ip: string
    _count: BetaTestsCountAggregateOutputType | null
    _avg: BetaTestsAvgAggregateOutputType | null
    _sum: BetaTestsSumAggregateOutputType | null
    _min: BetaTestsMinAggregateOutputType | null
    _max: BetaTestsMaxAggregateOutputType | null
  }

  type GetBetaTestsGroupByPayload<T extends BetaTestsGroupByArgs> = Promise<
    Array<
      PickArray<BetaTestsGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof BetaTestsGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], BetaTestsGroupByOutputType[P]> 
            : GetScalarType<T[P], BetaTestsGroupByOutputType[P]>
        }
      > 
    >


  export type betaTestsSelect = {
    id?: boolean
    ip?: boolean
  }

  export type betaTestsGetPayload<
    S extends boolean | null | undefined | betaTestsArgs,
    U = keyof S
      > = S extends true
        ? betaTests
    : S extends undefined
    ? never
    : S extends betaTestsArgs | betaTestsFindManyArgs
    ?'include' extends U
    ? betaTests 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof betaTests ?betaTests [P]
  : 
     never
  } 
    : betaTests
  : betaTests


  type betaTestsCountArgs = Merge<
    Omit<betaTestsFindManyArgs, 'select' | 'include'> & {
      select?: BetaTestsCountAggregateInputType | true
    }
  >

  export interface betaTestsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one BetaTests that matches the filter.
     * @param {betaTestsFindUniqueArgs} args - Arguments to find a BetaTests
     * @example
     * // Get one BetaTests
     * const betaTests = await prisma.betaTests.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends betaTestsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, betaTestsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'betaTests'> extends True ? CheckSelect<T, Prisma__betaTestsClient<betaTests>, Prisma__betaTestsClient<betaTestsGetPayload<T>>> : CheckSelect<T, Prisma__betaTestsClient<betaTests | null >, Prisma__betaTestsClient<betaTestsGetPayload<T> | null >>

    /**
     * Find the first BetaTests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {betaTestsFindFirstArgs} args - Arguments to find a BetaTests
     * @example
     * // Get one BetaTests
     * const betaTests = await prisma.betaTests.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends betaTestsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, betaTestsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'betaTests'> extends True ? CheckSelect<T, Prisma__betaTestsClient<betaTests>, Prisma__betaTestsClient<betaTestsGetPayload<T>>> : CheckSelect<T, Prisma__betaTestsClient<betaTests | null >, Prisma__betaTestsClient<betaTestsGetPayload<T> | null >>

    /**
     * Find zero or more BetaTests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {betaTestsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BetaTests
     * const betaTests = await prisma.betaTests.findMany()
     * 
     * // Get first 10 BetaTests
     * const betaTests = await prisma.betaTests.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const betaTestsWithIdOnly = await prisma.betaTests.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends betaTestsFindManyArgs>(
      args?: SelectSubset<T, betaTestsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<betaTests>>, PrismaPromise<Array<betaTestsGetPayload<T>>>>

    /**
     * Create a BetaTests.
     * @param {betaTestsCreateArgs} args - Arguments to create a BetaTests.
     * @example
     * // Create one BetaTests
     * const BetaTests = await prisma.betaTests.create({
     *   data: {
     *     // ... data to create a BetaTests
     *   }
     * })
     * 
    **/
    create<T extends betaTestsCreateArgs>(
      args: SelectSubset<T, betaTestsCreateArgs>
    ): CheckSelect<T, Prisma__betaTestsClient<betaTests>, Prisma__betaTestsClient<betaTestsGetPayload<T>>>

    /**
     * Create many BetaTests.
     *     @param {betaTestsCreateManyArgs} args - Arguments to create many BetaTests.
     *     @example
     *     // Create many BetaTests
     *     const betaTests = await prisma.betaTests.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends betaTestsCreateManyArgs>(
      args?: SelectSubset<T, betaTestsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a BetaTests.
     * @param {betaTestsDeleteArgs} args - Arguments to delete one BetaTests.
     * @example
     * // Delete one BetaTests
     * const BetaTests = await prisma.betaTests.delete({
     *   where: {
     *     // ... filter to delete one BetaTests
     *   }
     * })
     * 
    **/
    delete<T extends betaTestsDeleteArgs>(
      args: SelectSubset<T, betaTestsDeleteArgs>
    ): CheckSelect<T, Prisma__betaTestsClient<betaTests>, Prisma__betaTestsClient<betaTestsGetPayload<T>>>

    /**
     * Update one BetaTests.
     * @param {betaTestsUpdateArgs} args - Arguments to update one BetaTests.
     * @example
     * // Update one BetaTests
     * const betaTests = await prisma.betaTests.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends betaTestsUpdateArgs>(
      args: SelectSubset<T, betaTestsUpdateArgs>
    ): CheckSelect<T, Prisma__betaTestsClient<betaTests>, Prisma__betaTestsClient<betaTestsGetPayload<T>>>

    /**
     * Delete zero or more BetaTests.
     * @param {betaTestsDeleteManyArgs} args - Arguments to filter BetaTests to delete.
     * @example
     * // Delete a few BetaTests
     * const { count } = await prisma.betaTests.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends betaTestsDeleteManyArgs>(
      args?: SelectSubset<T, betaTestsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more BetaTests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {betaTestsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BetaTests
     * const betaTests = await prisma.betaTests.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends betaTestsUpdateManyArgs>(
      args: SelectSubset<T, betaTestsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one BetaTests.
     * @param {betaTestsUpsertArgs} args - Arguments to update or create a BetaTests.
     * @example
     * // Update or create a BetaTests
     * const betaTests = await prisma.betaTests.upsert({
     *   create: {
     *     // ... data to create a BetaTests
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BetaTests we want to update
     *   }
     * })
    **/
    upsert<T extends betaTestsUpsertArgs>(
      args: SelectSubset<T, betaTestsUpsertArgs>
    ): CheckSelect<T, Prisma__betaTestsClient<betaTests>, Prisma__betaTestsClient<betaTestsGetPayload<T>>>

    /**
     * Count the number of BetaTests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {betaTestsCountArgs} args - Arguments to filter BetaTests to count.
     * @example
     * // Count the number of BetaTests
     * const count = await prisma.betaTests.count({
     *   where: {
     *     // ... the filter for the BetaTests we want to count
     *   }
     * })
    **/
    count<T extends betaTestsCountArgs>(
      args?: Subset<T, betaTestsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BetaTestsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BetaTests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetaTestsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BetaTestsAggregateArgs>(args: Subset<T, BetaTestsAggregateArgs>): PrismaPromise<GetBetaTestsAggregateType<T>>

    /**
     * Group by BetaTests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BetaTestsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BetaTestsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BetaTestsGroupByArgs['orderBy'] }
        : { orderBy?: BetaTestsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BetaTestsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBetaTestsGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for betaTests.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__betaTestsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * betaTests findUnique
   */
  export type betaTestsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the betaTests
     * 
    **/
    select?: betaTestsSelect | null
    /**
     * Throw an Error if a betaTests can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which betaTests to fetch.
     * 
    **/
    where: betaTestsWhereUniqueInput
  }


  /**
   * betaTests findFirst
   */
  export type betaTestsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the betaTests
     * 
    **/
    select?: betaTestsSelect | null
    /**
     * Throw an Error if a betaTests can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which betaTests to fetch.
     * 
    **/
    where?: betaTestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of betaTests to fetch.
     * 
    **/
    orderBy?: Enumerable<betaTestsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for betaTests.
     * 
    **/
    cursor?: betaTestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` betaTests from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` betaTests.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of betaTests.
     * 
    **/
    distinct?: Enumerable<BetaTestsScalarFieldEnum>
  }


  /**
   * betaTests findMany
   */
  export type betaTestsFindManyArgs = {
    /**
     * Select specific fields to fetch from the betaTests
     * 
    **/
    select?: betaTestsSelect | null
    /**
     * Filter, which betaTests to fetch.
     * 
    **/
    where?: betaTestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of betaTests to fetch.
     * 
    **/
    orderBy?: Enumerable<betaTestsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing betaTests.
     * 
    **/
    cursor?: betaTestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` betaTests from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` betaTests.
     * 
    **/
    skip?: number
    distinct?: Enumerable<BetaTestsScalarFieldEnum>
  }


  /**
   * betaTests create
   */
  export type betaTestsCreateArgs = {
    /**
     * Select specific fields to fetch from the betaTests
     * 
    **/
    select?: betaTestsSelect | null
    /**
     * The data needed to create a betaTests.
     * 
    **/
    data: XOR<betaTestsCreateInput, betaTestsUncheckedCreateInput>
  }


  /**
   * betaTests createMany
   */
  export type betaTestsCreateManyArgs = {
    data: Enumerable<betaTestsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * betaTests update
   */
  export type betaTestsUpdateArgs = {
    /**
     * Select specific fields to fetch from the betaTests
     * 
    **/
    select?: betaTestsSelect | null
    /**
     * The data needed to update a betaTests.
     * 
    **/
    data: XOR<betaTestsUpdateInput, betaTestsUncheckedUpdateInput>
    /**
     * Choose, which betaTests to update.
     * 
    **/
    where: betaTestsWhereUniqueInput
  }


  /**
   * betaTests updateMany
   */
  export type betaTestsUpdateManyArgs = {
    data: XOR<betaTestsUpdateManyMutationInput, betaTestsUncheckedUpdateManyInput>
    where?: betaTestsWhereInput
  }


  /**
   * betaTests upsert
   */
  export type betaTestsUpsertArgs = {
    /**
     * Select specific fields to fetch from the betaTests
     * 
    **/
    select?: betaTestsSelect | null
    /**
     * The filter to search for the betaTests to update in case it exists.
     * 
    **/
    where: betaTestsWhereUniqueInput
    /**
     * In case the betaTests found by the `where` argument doesn't exist, create a new betaTests with this data.
     * 
    **/
    create: XOR<betaTestsCreateInput, betaTestsUncheckedCreateInput>
    /**
     * In case the betaTests was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<betaTestsUpdateInput, betaTestsUncheckedUpdateInput>
  }


  /**
   * betaTests delete
   */
  export type betaTestsDeleteArgs = {
    /**
     * Select specific fields to fetch from the betaTests
     * 
    **/
    select?: betaTestsSelect | null
    /**
     * Filter which betaTests to delete.
     * 
    **/
    where: betaTestsWhereUniqueInput
  }


  /**
   * betaTests deleteMany
   */
  export type betaTestsDeleteManyArgs = {
    where?: betaTestsWhereInput
  }


  /**
   * betaTests without action
   */
  export type betaTestsArgs = {
    /**
     * Select specific fields to fetch from the betaTests
     * 
    **/
    select?: betaTestsSelect | null
  }



  /**
   * Model cennik
   */


  export type AggregateCennik = {
    _count: CennikCountAggregateOutputType | null
    _avg: CennikAvgAggregateOutputType | null
    _sum: CennikSumAggregateOutputType | null
    _min: CennikMinAggregateOutputType | null
    _max: CennikMaxAggregateOutputType | null
  }

  export type CennikAvgAggregateOutputType = {
    id: number | null
    cena: number | null
    dostepne: number | null
    sale: number | null
    monly: number | null
    msale: number | null
    wer: number | null
  }

  export type CennikSumAggregateOutputType = {
    id: number | null
    cena: number | null
    dostepne: number | null
    sale: number | null
    monly: number | null
    msale: number | null
    wer: number | null
  }

  export type CennikMinAggregateOutputType = {
    id: number | null
    nazwa: string | null
    item: string | null
    cena: number | null
    dostepne: number | null
    sale: number | null
    monly: number | null
    msale: number | null
    wer: number | null
    opis: string | null
    tagi: string | null
    autor: string | null
  }

  export type CennikMaxAggregateOutputType = {
    id: number | null
    nazwa: string | null
    item: string | null
    cena: number | null
    dostepne: number | null
    sale: number | null
    monly: number | null
    msale: number | null
    wer: number | null
    opis: string | null
    tagi: string | null
    autor: string | null
  }

  export type CennikCountAggregateOutputType = {
    id: number
    nazwa: number
    item: number
    cena: number
    dostepne: number
    sale: number
    monly: number
    msale: number
    wer: number
    opis: number
    tagi: number
    autor: number
    _all: number
  }


  export type CennikAvgAggregateInputType = {
    id?: true
    cena?: true
    dostepne?: true
    sale?: true
    monly?: true
    msale?: true
    wer?: true
  }

  export type CennikSumAggregateInputType = {
    id?: true
    cena?: true
    dostepne?: true
    sale?: true
    monly?: true
    msale?: true
    wer?: true
  }

  export type CennikMinAggregateInputType = {
    id?: true
    nazwa?: true
    item?: true
    cena?: true
    dostepne?: true
    sale?: true
    monly?: true
    msale?: true
    wer?: true
    opis?: true
    tagi?: true
    autor?: true
  }

  export type CennikMaxAggregateInputType = {
    id?: true
    nazwa?: true
    item?: true
    cena?: true
    dostepne?: true
    sale?: true
    monly?: true
    msale?: true
    wer?: true
    opis?: true
    tagi?: true
    autor?: true
  }

  export type CennikCountAggregateInputType = {
    id?: true
    nazwa?: true
    item?: true
    cena?: true
    dostepne?: true
    sale?: true
    monly?: true
    msale?: true
    wer?: true
    opis?: true
    tagi?: true
    autor?: true
    _all?: true
  }

  export type CennikAggregateArgs = {
    /**
     * Filter which cennik to aggregate.
     * 
    **/
    where?: cennikWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cenniks to fetch.
     * 
    **/
    orderBy?: Enumerable<cennikOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: cennikWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cenniks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cenniks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cenniks
    **/
    _count?: true | CennikCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CennikAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CennikSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CennikMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CennikMaxAggregateInputType
  }

  export type GetCennikAggregateType<T extends CennikAggregateArgs> = {
        [P in keyof T & keyof AggregateCennik]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCennik[P]>
      : GetScalarType<T[P], AggregateCennik[P]>
  }


    
    
  export type CennikGroupByArgs = {
    where?: cennikWhereInput
    orderBy?: Enumerable<cennikOrderByWithAggregationInput>
    by: Array<CennikScalarFieldEnum>
    having?: cennikScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CennikCountAggregateInputType | true
    _avg?: CennikAvgAggregateInputType
    _sum?: CennikSumAggregateInputType
    _min?: CennikMinAggregateInputType
    _max?: CennikMaxAggregateInputType
  }


  export type CennikGroupByOutputType = {
    id: number
    nazwa: string
    item: string | null
    cena: number
    dostepne: number
    sale: number | null
    monly: number
    msale: number | null
    wer: number
    opis: string | null
    tagi: string | null
    autor: string | null
    _count: CennikCountAggregateOutputType | null
    _avg: CennikAvgAggregateOutputType | null
    _sum: CennikSumAggregateOutputType | null
    _min: CennikMinAggregateOutputType | null
    _max: CennikMaxAggregateOutputType | null
  }

  type GetCennikGroupByPayload<T extends CennikGroupByArgs> = Promise<
    Array<
      PickArray<CennikGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof CennikGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], CennikGroupByOutputType[P]> 
            : GetScalarType<T[P], CennikGroupByOutputType[P]>
        }
      > 
    >


  export type cennikSelect = {
    id?: boolean
    nazwa?: boolean
    item?: boolean
    cena?: boolean
    dostepne?: boolean
    sale?: boolean
    monly?: boolean
    msale?: boolean
    wer?: boolean
    opis?: boolean
    tagi?: boolean
    autor?: boolean
  }

  export type cennikGetPayload<
    S extends boolean | null | undefined | cennikArgs,
    U = keyof S
      > = S extends true
        ? cennik
    : S extends undefined
    ? never
    : S extends cennikArgs | cennikFindManyArgs
    ?'include' extends U
    ? cennik 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof cennik ?cennik [P]
  : 
     never
  } 
    : cennik
  : cennik


  type cennikCountArgs = Merge<
    Omit<cennikFindManyArgs, 'select' | 'include'> & {
      select?: CennikCountAggregateInputType | true
    }
  >

  export interface cennikDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Cennik that matches the filter.
     * @param {cennikFindUniqueArgs} args - Arguments to find a Cennik
     * @example
     * // Get one Cennik
     * const cennik = await prisma.cennik.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends cennikFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, cennikFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'cennik'> extends True ? CheckSelect<T, Prisma__cennikClient<cennik>, Prisma__cennikClient<cennikGetPayload<T>>> : CheckSelect<T, Prisma__cennikClient<cennik | null >, Prisma__cennikClient<cennikGetPayload<T> | null >>

    /**
     * Find the first Cennik that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cennikFindFirstArgs} args - Arguments to find a Cennik
     * @example
     * // Get one Cennik
     * const cennik = await prisma.cennik.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends cennikFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, cennikFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'cennik'> extends True ? CheckSelect<T, Prisma__cennikClient<cennik>, Prisma__cennikClient<cennikGetPayload<T>>> : CheckSelect<T, Prisma__cennikClient<cennik | null >, Prisma__cennikClient<cennikGetPayload<T> | null >>

    /**
     * Find zero or more Cenniks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cennikFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cenniks
     * const cenniks = await prisma.cennik.findMany()
     * 
     * // Get first 10 Cenniks
     * const cenniks = await prisma.cennik.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cennikWithIdOnly = await prisma.cennik.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends cennikFindManyArgs>(
      args?: SelectSubset<T, cennikFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<cennik>>, PrismaPromise<Array<cennikGetPayload<T>>>>

    /**
     * Create a Cennik.
     * @param {cennikCreateArgs} args - Arguments to create a Cennik.
     * @example
     * // Create one Cennik
     * const Cennik = await prisma.cennik.create({
     *   data: {
     *     // ... data to create a Cennik
     *   }
     * })
     * 
    **/
    create<T extends cennikCreateArgs>(
      args: SelectSubset<T, cennikCreateArgs>
    ): CheckSelect<T, Prisma__cennikClient<cennik>, Prisma__cennikClient<cennikGetPayload<T>>>

    /**
     * Create many Cenniks.
     *     @param {cennikCreateManyArgs} args - Arguments to create many Cenniks.
     *     @example
     *     // Create many Cenniks
     *     const cennik = await prisma.cennik.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends cennikCreateManyArgs>(
      args?: SelectSubset<T, cennikCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Cennik.
     * @param {cennikDeleteArgs} args - Arguments to delete one Cennik.
     * @example
     * // Delete one Cennik
     * const Cennik = await prisma.cennik.delete({
     *   where: {
     *     // ... filter to delete one Cennik
     *   }
     * })
     * 
    **/
    delete<T extends cennikDeleteArgs>(
      args: SelectSubset<T, cennikDeleteArgs>
    ): CheckSelect<T, Prisma__cennikClient<cennik>, Prisma__cennikClient<cennikGetPayload<T>>>

    /**
     * Update one Cennik.
     * @param {cennikUpdateArgs} args - Arguments to update one Cennik.
     * @example
     * // Update one Cennik
     * const cennik = await prisma.cennik.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends cennikUpdateArgs>(
      args: SelectSubset<T, cennikUpdateArgs>
    ): CheckSelect<T, Prisma__cennikClient<cennik>, Prisma__cennikClient<cennikGetPayload<T>>>

    /**
     * Delete zero or more Cenniks.
     * @param {cennikDeleteManyArgs} args - Arguments to filter Cenniks to delete.
     * @example
     * // Delete a few Cenniks
     * const { count } = await prisma.cennik.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends cennikDeleteManyArgs>(
      args?: SelectSubset<T, cennikDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cenniks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cennikUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cenniks
     * const cennik = await prisma.cennik.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends cennikUpdateManyArgs>(
      args: SelectSubset<T, cennikUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Cennik.
     * @param {cennikUpsertArgs} args - Arguments to update or create a Cennik.
     * @example
     * // Update or create a Cennik
     * const cennik = await prisma.cennik.upsert({
     *   create: {
     *     // ... data to create a Cennik
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cennik we want to update
     *   }
     * })
    **/
    upsert<T extends cennikUpsertArgs>(
      args: SelectSubset<T, cennikUpsertArgs>
    ): CheckSelect<T, Prisma__cennikClient<cennik>, Prisma__cennikClient<cennikGetPayload<T>>>

    /**
     * Count the number of Cenniks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cennikCountArgs} args - Arguments to filter Cenniks to count.
     * @example
     * // Count the number of Cenniks
     * const count = await prisma.cennik.count({
     *   where: {
     *     // ... the filter for the Cenniks we want to count
     *   }
     * })
    **/
    count<T extends cennikCountArgs>(
      args?: Subset<T, cennikCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CennikCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cennik.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CennikAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CennikAggregateArgs>(args: Subset<T, CennikAggregateArgs>): PrismaPromise<GetCennikAggregateType<T>>

    /**
     * Group by Cennik.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CennikGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CennikGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CennikGroupByArgs['orderBy'] }
        : { orderBy?: CennikGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CennikGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCennikGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for cennik.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__cennikClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * cennik findUnique
   */
  export type cennikFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the cennik
     * 
    **/
    select?: cennikSelect | null
    /**
     * Throw an Error if a cennik can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which cennik to fetch.
     * 
    **/
    where: cennikWhereUniqueInput
  }


  /**
   * cennik findFirst
   */
  export type cennikFindFirstArgs = {
    /**
     * Select specific fields to fetch from the cennik
     * 
    **/
    select?: cennikSelect | null
    /**
     * Throw an Error if a cennik can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which cennik to fetch.
     * 
    **/
    where?: cennikWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cenniks to fetch.
     * 
    **/
    orderBy?: Enumerable<cennikOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cenniks.
     * 
    **/
    cursor?: cennikWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cenniks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cenniks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cenniks.
     * 
    **/
    distinct?: Enumerable<CennikScalarFieldEnum>
  }


  /**
   * cennik findMany
   */
  export type cennikFindManyArgs = {
    /**
     * Select specific fields to fetch from the cennik
     * 
    **/
    select?: cennikSelect | null
    /**
     * Filter, which cenniks to fetch.
     * 
    **/
    where?: cennikWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cenniks to fetch.
     * 
    **/
    orderBy?: Enumerable<cennikOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cenniks.
     * 
    **/
    cursor?: cennikWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cenniks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cenniks.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CennikScalarFieldEnum>
  }


  /**
   * cennik create
   */
  export type cennikCreateArgs = {
    /**
     * Select specific fields to fetch from the cennik
     * 
    **/
    select?: cennikSelect | null
    /**
     * The data needed to create a cennik.
     * 
    **/
    data: XOR<cennikCreateInput, cennikUncheckedCreateInput>
  }


  /**
   * cennik createMany
   */
  export type cennikCreateManyArgs = {
    data: Enumerable<cennikCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * cennik update
   */
  export type cennikUpdateArgs = {
    /**
     * Select specific fields to fetch from the cennik
     * 
    **/
    select?: cennikSelect | null
    /**
     * The data needed to update a cennik.
     * 
    **/
    data: XOR<cennikUpdateInput, cennikUncheckedUpdateInput>
    /**
     * Choose, which cennik to update.
     * 
    **/
    where: cennikWhereUniqueInput
  }


  /**
   * cennik updateMany
   */
  export type cennikUpdateManyArgs = {
    data: XOR<cennikUpdateManyMutationInput, cennikUncheckedUpdateManyInput>
    where?: cennikWhereInput
  }


  /**
   * cennik upsert
   */
  export type cennikUpsertArgs = {
    /**
     * Select specific fields to fetch from the cennik
     * 
    **/
    select?: cennikSelect | null
    /**
     * The filter to search for the cennik to update in case it exists.
     * 
    **/
    where: cennikWhereUniqueInput
    /**
     * In case the cennik found by the `where` argument doesn't exist, create a new cennik with this data.
     * 
    **/
    create: XOR<cennikCreateInput, cennikUncheckedCreateInput>
    /**
     * In case the cennik was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<cennikUpdateInput, cennikUncheckedUpdateInput>
  }


  /**
   * cennik delete
   */
  export type cennikDeleteArgs = {
    /**
     * Select specific fields to fetch from the cennik
     * 
    **/
    select?: cennikSelect | null
    /**
     * Filter which cennik to delete.
     * 
    **/
    where: cennikWhereUniqueInput
  }


  /**
   * cennik deleteMany
   */
  export type cennikDeleteManyArgs = {
    where?: cennikWhereInput
  }


  /**
   * cennik without action
   */
  export type cennikArgs = {
    /**
     * Select specific fields to fetch from the cennik
     * 
    **/
    select?: cennikSelect | null
  }



  /**
   * Model discordInfo
   */


  export type AggregateDiscordInfo = {
    _count: DiscordInfoCountAggregateOutputType | null
    _min: DiscordInfoMinAggregateOutputType | null
    _max: DiscordInfoMaxAggregateOutputType | null
  }

  export type DiscordInfoMinAggregateOutputType = {
    discord: string | null
    username: string | null
    blocked: boolean | null
    created: Date | null
    discriminator: string | null
    avatar: string | null
    guilds: string | null
    email: string | null
  }

  export type DiscordInfoMaxAggregateOutputType = {
    discord: string | null
    username: string | null
    blocked: boolean | null
    created: Date | null
    discriminator: string | null
    avatar: string | null
    guilds: string | null
    email: string | null
  }

  export type DiscordInfoCountAggregateOutputType = {
    discord: number
    username: number
    blocked: number
    created: number
    discriminator: number
    avatar: number
    guilds: number
    email: number
    _all: number
  }


  export type DiscordInfoMinAggregateInputType = {
    discord?: true
    username?: true
    blocked?: true
    created?: true
    discriminator?: true
    avatar?: true
    guilds?: true
    email?: true
  }

  export type DiscordInfoMaxAggregateInputType = {
    discord?: true
    username?: true
    blocked?: true
    created?: true
    discriminator?: true
    avatar?: true
    guilds?: true
    email?: true
  }

  export type DiscordInfoCountAggregateInputType = {
    discord?: true
    username?: true
    blocked?: true
    created?: true
    discriminator?: true
    avatar?: true
    guilds?: true
    email?: true
    _all?: true
  }

  export type DiscordInfoAggregateArgs = {
    /**
     * Filter which discordInfo to aggregate.
     * 
    **/
    where?: discordInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of discordInfos to fetch.
     * 
    **/
    orderBy?: Enumerable<discordInfoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: discordInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` discordInfos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` discordInfos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned discordInfos
    **/
    _count?: true | DiscordInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DiscordInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DiscordInfoMaxAggregateInputType
  }

  export type GetDiscordInfoAggregateType<T extends DiscordInfoAggregateArgs> = {
        [P in keyof T & keyof AggregateDiscordInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDiscordInfo[P]>
      : GetScalarType<T[P], AggregateDiscordInfo[P]>
  }


    
    
  export type DiscordInfoGroupByArgs = {
    where?: discordInfoWhereInput
    orderBy?: Enumerable<discordInfoOrderByWithAggregationInput>
    by: Array<DiscordInfoScalarFieldEnum>
    having?: discordInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DiscordInfoCountAggregateInputType | true
    _min?: DiscordInfoMinAggregateInputType
    _max?: DiscordInfoMaxAggregateInputType
  }


  export type DiscordInfoGroupByOutputType = {
    discord: string
    username: string
    blocked: boolean
    created: Date
    discriminator: string
    avatar: string | null
    guilds: string | null
    email: string | null
    _count: DiscordInfoCountAggregateOutputType | null
    _min: DiscordInfoMinAggregateOutputType | null
    _max: DiscordInfoMaxAggregateOutputType | null
  }

  type GetDiscordInfoGroupByPayload<T extends DiscordInfoGroupByArgs> = Promise<
    Array<
      PickArray<DiscordInfoGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof DiscordInfoGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], DiscordInfoGroupByOutputType[P]> 
            : GetScalarType<T[P], DiscordInfoGroupByOutputType[P]>
        }
      > 
    >


  export type discordInfoSelect = {
    discord?: boolean
    username?: boolean
    blocked?: boolean
    created?: boolean
    discriminator?: boolean
    avatar?: boolean
    guilds?: boolean
    email?: boolean
  }

  export type discordInfoGetPayload<
    S extends boolean | null | undefined | discordInfoArgs,
    U = keyof S
      > = S extends true
        ? discordInfo
    : S extends undefined
    ? never
    : S extends discordInfoArgs | discordInfoFindManyArgs
    ?'include' extends U
    ? discordInfo 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof discordInfo ?discordInfo [P]
  : 
     never
  } 
    : discordInfo
  : discordInfo


  type discordInfoCountArgs = Merge<
    Omit<discordInfoFindManyArgs, 'select' | 'include'> & {
      select?: DiscordInfoCountAggregateInputType | true
    }
  >

  export interface discordInfoDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one DiscordInfo that matches the filter.
     * @param {discordInfoFindUniqueArgs} args - Arguments to find a DiscordInfo
     * @example
     * // Get one DiscordInfo
     * const discordInfo = await prisma.discordInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends discordInfoFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, discordInfoFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'discordInfo'> extends True ? CheckSelect<T, Prisma__discordInfoClient<discordInfo>, Prisma__discordInfoClient<discordInfoGetPayload<T>>> : CheckSelect<T, Prisma__discordInfoClient<discordInfo | null >, Prisma__discordInfoClient<discordInfoGetPayload<T> | null >>

    /**
     * Find the first DiscordInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {discordInfoFindFirstArgs} args - Arguments to find a DiscordInfo
     * @example
     * // Get one DiscordInfo
     * const discordInfo = await prisma.discordInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends discordInfoFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, discordInfoFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'discordInfo'> extends True ? CheckSelect<T, Prisma__discordInfoClient<discordInfo>, Prisma__discordInfoClient<discordInfoGetPayload<T>>> : CheckSelect<T, Prisma__discordInfoClient<discordInfo | null >, Prisma__discordInfoClient<discordInfoGetPayload<T> | null >>

    /**
     * Find zero or more DiscordInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {discordInfoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DiscordInfos
     * const discordInfos = await prisma.discordInfo.findMany()
     * 
     * // Get first 10 DiscordInfos
     * const discordInfos = await prisma.discordInfo.findMany({ take: 10 })
     * 
     * // Only select the `discord`
     * const discordInfoWithDiscordOnly = await prisma.discordInfo.findMany({ select: { discord: true } })
     * 
    **/
    findMany<T extends discordInfoFindManyArgs>(
      args?: SelectSubset<T, discordInfoFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<discordInfo>>, PrismaPromise<Array<discordInfoGetPayload<T>>>>

    /**
     * Create a DiscordInfo.
     * @param {discordInfoCreateArgs} args - Arguments to create a DiscordInfo.
     * @example
     * // Create one DiscordInfo
     * const DiscordInfo = await prisma.discordInfo.create({
     *   data: {
     *     // ... data to create a DiscordInfo
     *   }
     * })
     * 
    **/
    create<T extends discordInfoCreateArgs>(
      args: SelectSubset<T, discordInfoCreateArgs>
    ): CheckSelect<T, Prisma__discordInfoClient<discordInfo>, Prisma__discordInfoClient<discordInfoGetPayload<T>>>

    /**
     * Create many DiscordInfos.
     *     @param {discordInfoCreateManyArgs} args - Arguments to create many DiscordInfos.
     *     @example
     *     // Create many DiscordInfos
     *     const discordInfo = await prisma.discordInfo.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends discordInfoCreateManyArgs>(
      args?: SelectSubset<T, discordInfoCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a DiscordInfo.
     * @param {discordInfoDeleteArgs} args - Arguments to delete one DiscordInfo.
     * @example
     * // Delete one DiscordInfo
     * const DiscordInfo = await prisma.discordInfo.delete({
     *   where: {
     *     // ... filter to delete one DiscordInfo
     *   }
     * })
     * 
    **/
    delete<T extends discordInfoDeleteArgs>(
      args: SelectSubset<T, discordInfoDeleteArgs>
    ): CheckSelect<T, Prisma__discordInfoClient<discordInfo>, Prisma__discordInfoClient<discordInfoGetPayload<T>>>

    /**
     * Update one DiscordInfo.
     * @param {discordInfoUpdateArgs} args - Arguments to update one DiscordInfo.
     * @example
     * // Update one DiscordInfo
     * const discordInfo = await prisma.discordInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends discordInfoUpdateArgs>(
      args: SelectSubset<T, discordInfoUpdateArgs>
    ): CheckSelect<T, Prisma__discordInfoClient<discordInfo>, Prisma__discordInfoClient<discordInfoGetPayload<T>>>

    /**
     * Delete zero or more DiscordInfos.
     * @param {discordInfoDeleteManyArgs} args - Arguments to filter DiscordInfos to delete.
     * @example
     * // Delete a few DiscordInfos
     * const { count } = await prisma.discordInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends discordInfoDeleteManyArgs>(
      args?: SelectSubset<T, discordInfoDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more DiscordInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {discordInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DiscordInfos
     * const discordInfo = await prisma.discordInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends discordInfoUpdateManyArgs>(
      args: SelectSubset<T, discordInfoUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one DiscordInfo.
     * @param {discordInfoUpsertArgs} args - Arguments to update or create a DiscordInfo.
     * @example
     * // Update or create a DiscordInfo
     * const discordInfo = await prisma.discordInfo.upsert({
     *   create: {
     *     // ... data to create a DiscordInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DiscordInfo we want to update
     *   }
     * })
    **/
    upsert<T extends discordInfoUpsertArgs>(
      args: SelectSubset<T, discordInfoUpsertArgs>
    ): CheckSelect<T, Prisma__discordInfoClient<discordInfo>, Prisma__discordInfoClient<discordInfoGetPayload<T>>>

    /**
     * Count the number of DiscordInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {discordInfoCountArgs} args - Arguments to filter DiscordInfos to count.
     * @example
     * // Count the number of DiscordInfos
     * const count = await prisma.discordInfo.count({
     *   where: {
     *     // ... the filter for the DiscordInfos we want to count
     *   }
     * })
    **/
    count<T extends discordInfoCountArgs>(
      args?: Subset<T, discordInfoCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DiscordInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DiscordInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscordInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DiscordInfoAggregateArgs>(args: Subset<T, DiscordInfoAggregateArgs>): PrismaPromise<GetDiscordInfoAggregateType<T>>

    /**
     * Group by DiscordInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscordInfoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DiscordInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DiscordInfoGroupByArgs['orderBy'] }
        : { orderBy?: DiscordInfoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DiscordInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiscordInfoGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for discordInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__discordInfoClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * discordInfo findUnique
   */
  export type discordInfoFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the discordInfo
     * 
    **/
    select?: discordInfoSelect | null
    /**
     * Throw an Error if a discordInfo can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which discordInfo to fetch.
     * 
    **/
    where: discordInfoWhereUniqueInput
  }


  /**
   * discordInfo findFirst
   */
  export type discordInfoFindFirstArgs = {
    /**
     * Select specific fields to fetch from the discordInfo
     * 
    **/
    select?: discordInfoSelect | null
    /**
     * Throw an Error if a discordInfo can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which discordInfo to fetch.
     * 
    **/
    where?: discordInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of discordInfos to fetch.
     * 
    **/
    orderBy?: Enumerable<discordInfoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for discordInfos.
     * 
    **/
    cursor?: discordInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` discordInfos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` discordInfos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of discordInfos.
     * 
    **/
    distinct?: Enumerable<DiscordInfoScalarFieldEnum>
  }


  /**
   * discordInfo findMany
   */
  export type discordInfoFindManyArgs = {
    /**
     * Select specific fields to fetch from the discordInfo
     * 
    **/
    select?: discordInfoSelect | null
    /**
     * Filter, which discordInfos to fetch.
     * 
    **/
    where?: discordInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of discordInfos to fetch.
     * 
    **/
    orderBy?: Enumerable<discordInfoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing discordInfos.
     * 
    **/
    cursor?: discordInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` discordInfos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` discordInfos.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DiscordInfoScalarFieldEnum>
  }


  /**
   * discordInfo create
   */
  export type discordInfoCreateArgs = {
    /**
     * Select specific fields to fetch from the discordInfo
     * 
    **/
    select?: discordInfoSelect | null
    /**
     * The data needed to create a discordInfo.
     * 
    **/
    data: XOR<discordInfoCreateInput, discordInfoUncheckedCreateInput>
  }


  /**
   * discordInfo createMany
   */
  export type discordInfoCreateManyArgs = {
    data: Enumerable<discordInfoCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * discordInfo update
   */
  export type discordInfoUpdateArgs = {
    /**
     * Select specific fields to fetch from the discordInfo
     * 
    **/
    select?: discordInfoSelect | null
    /**
     * The data needed to update a discordInfo.
     * 
    **/
    data: XOR<discordInfoUpdateInput, discordInfoUncheckedUpdateInput>
    /**
     * Choose, which discordInfo to update.
     * 
    **/
    where: discordInfoWhereUniqueInput
  }


  /**
   * discordInfo updateMany
   */
  export type discordInfoUpdateManyArgs = {
    data: XOR<discordInfoUpdateManyMutationInput, discordInfoUncheckedUpdateManyInput>
    where?: discordInfoWhereInput
  }


  /**
   * discordInfo upsert
   */
  export type discordInfoUpsertArgs = {
    /**
     * Select specific fields to fetch from the discordInfo
     * 
    **/
    select?: discordInfoSelect | null
    /**
     * The filter to search for the discordInfo to update in case it exists.
     * 
    **/
    where: discordInfoWhereUniqueInput
    /**
     * In case the discordInfo found by the `where` argument doesn't exist, create a new discordInfo with this data.
     * 
    **/
    create: XOR<discordInfoCreateInput, discordInfoUncheckedCreateInput>
    /**
     * In case the discordInfo was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<discordInfoUpdateInput, discordInfoUncheckedUpdateInput>
  }


  /**
   * discordInfo delete
   */
  export type discordInfoDeleteArgs = {
    /**
     * Select specific fields to fetch from the discordInfo
     * 
    **/
    select?: discordInfoSelect | null
    /**
     * Filter which discordInfo to delete.
     * 
    **/
    where: discordInfoWhereUniqueInput
  }


  /**
   * discordInfo deleteMany
   */
  export type discordInfoDeleteManyArgs = {
    where?: discordInfoWhereInput
  }


  /**
   * discordInfo without action
   */
  export type discordInfoArgs = {
    /**
     * Select specific fields to fetch from the discordInfo
     * 
    **/
    select?: discordInfoSelect | null
  }



  /**
   * Model karty
   */


  export type AggregateKarty = {
    _count: KartyCountAggregateOutputType | null
    _avg: KartyAvgAggregateOutputType | null
    _sum: KartySumAggregateOutputType | null
    _min: KartyMinAggregateOutputType | null
    _max: KartyMaxAggregateOutputType | null
  }

  export type KartyAvgAggregateOutputType = {
    numer: number | null
  }

  export type KartySumAggregateOutputType = {
    numer: number | null
  }

  export type KartyMinAggregateOutputType = {
    numer: number | null
    typ: string | null
    nazwa: string | null
    opis: string | null
  }

  export type KartyMaxAggregateOutputType = {
    numer: number | null
    typ: string | null
    nazwa: string | null
    opis: string | null
  }

  export type KartyCountAggregateOutputType = {
    numer: number
    typ: number
    nazwa: number
    opis: number
    _all: number
  }


  export type KartyAvgAggregateInputType = {
    numer?: true
  }

  export type KartySumAggregateInputType = {
    numer?: true
  }

  export type KartyMinAggregateInputType = {
    numer?: true
    typ?: true
    nazwa?: true
    opis?: true
  }

  export type KartyMaxAggregateInputType = {
    numer?: true
    typ?: true
    nazwa?: true
    opis?: true
  }

  export type KartyCountAggregateInputType = {
    numer?: true
    typ?: true
    nazwa?: true
    opis?: true
    _all?: true
  }

  export type KartyAggregateArgs = {
    /**
     * Filter which karty to aggregate.
     * 
    **/
    where?: kartyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of karties to fetch.
     * 
    **/
    orderBy?: Enumerable<kartyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: kartyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` karties from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` karties.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned karties
    **/
    _count?: true | KartyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: KartyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: KartySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KartyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KartyMaxAggregateInputType
  }

  export type GetKartyAggregateType<T extends KartyAggregateArgs> = {
        [P in keyof T & keyof AggregateKarty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKarty[P]>
      : GetScalarType<T[P], AggregateKarty[P]>
  }


    
    
  export type KartyGroupByArgs = {
    where?: kartyWhereInput
    orderBy?: Enumerable<kartyOrderByWithAggregationInput>
    by: Array<KartyScalarFieldEnum>
    having?: kartyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KartyCountAggregateInputType | true
    _avg?: KartyAvgAggregateInputType
    _sum?: KartySumAggregateInputType
    _min?: KartyMinAggregateInputType
    _max?: KartyMaxAggregateInputType
  }


  export type KartyGroupByOutputType = {
    numer: number
    typ: string
    nazwa: string
    opis: string
    _count: KartyCountAggregateOutputType | null
    _avg: KartyAvgAggregateOutputType | null
    _sum: KartySumAggregateOutputType | null
    _min: KartyMinAggregateOutputType | null
    _max: KartyMaxAggregateOutputType | null
  }

  type GetKartyGroupByPayload<T extends KartyGroupByArgs> = Promise<
    Array<
      PickArray<KartyGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof KartyGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], KartyGroupByOutputType[P]> 
            : GetScalarType<T[P], KartyGroupByOutputType[P]>
        }
      > 
    >


  export type kartySelect = {
    numer?: boolean
    typ?: boolean
    nazwa?: boolean
    opis?: boolean
  }

  export type kartyGetPayload<
    S extends boolean | null | undefined | kartyArgs,
    U = keyof S
      > = S extends true
        ? karty
    : S extends undefined
    ? never
    : S extends kartyArgs | kartyFindManyArgs
    ?'include' extends U
    ? karty 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof karty ?karty [P]
  : 
     never
  } 
    : karty
  : karty


  type kartyCountArgs = Merge<
    Omit<kartyFindManyArgs, 'select' | 'include'> & {
      select?: KartyCountAggregateInputType | true
    }
  >

  export interface kartyDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Karty that matches the filter.
     * @param {kartyFindUniqueArgs} args - Arguments to find a Karty
     * @example
     * // Get one Karty
     * const karty = await prisma.karty.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends kartyFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, kartyFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'karty'> extends True ? CheckSelect<T, Prisma__kartyClient<karty>, Prisma__kartyClient<kartyGetPayload<T>>> : CheckSelect<T, Prisma__kartyClient<karty | null >, Prisma__kartyClient<kartyGetPayload<T> | null >>

    /**
     * Find the first Karty that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {kartyFindFirstArgs} args - Arguments to find a Karty
     * @example
     * // Get one Karty
     * const karty = await prisma.karty.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends kartyFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, kartyFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'karty'> extends True ? CheckSelect<T, Prisma__kartyClient<karty>, Prisma__kartyClient<kartyGetPayload<T>>> : CheckSelect<T, Prisma__kartyClient<karty | null >, Prisma__kartyClient<kartyGetPayload<T> | null >>

    /**
     * Find zero or more Karties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {kartyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Karties
     * const karties = await prisma.karty.findMany()
     * 
     * // Get first 10 Karties
     * const karties = await prisma.karty.findMany({ take: 10 })
     * 
     * // Only select the `numer`
     * const kartyWithNumerOnly = await prisma.karty.findMany({ select: { numer: true } })
     * 
    **/
    findMany<T extends kartyFindManyArgs>(
      args?: SelectSubset<T, kartyFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<karty>>, PrismaPromise<Array<kartyGetPayload<T>>>>

    /**
     * Create a Karty.
     * @param {kartyCreateArgs} args - Arguments to create a Karty.
     * @example
     * // Create one Karty
     * const Karty = await prisma.karty.create({
     *   data: {
     *     // ... data to create a Karty
     *   }
     * })
     * 
    **/
    create<T extends kartyCreateArgs>(
      args: SelectSubset<T, kartyCreateArgs>
    ): CheckSelect<T, Prisma__kartyClient<karty>, Prisma__kartyClient<kartyGetPayload<T>>>

    /**
     * Create many Karties.
     *     @param {kartyCreateManyArgs} args - Arguments to create many Karties.
     *     @example
     *     // Create many Karties
     *     const karty = await prisma.karty.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends kartyCreateManyArgs>(
      args?: SelectSubset<T, kartyCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Karty.
     * @param {kartyDeleteArgs} args - Arguments to delete one Karty.
     * @example
     * // Delete one Karty
     * const Karty = await prisma.karty.delete({
     *   where: {
     *     // ... filter to delete one Karty
     *   }
     * })
     * 
    **/
    delete<T extends kartyDeleteArgs>(
      args: SelectSubset<T, kartyDeleteArgs>
    ): CheckSelect<T, Prisma__kartyClient<karty>, Prisma__kartyClient<kartyGetPayload<T>>>

    /**
     * Update one Karty.
     * @param {kartyUpdateArgs} args - Arguments to update one Karty.
     * @example
     * // Update one Karty
     * const karty = await prisma.karty.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends kartyUpdateArgs>(
      args: SelectSubset<T, kartyUpdateArgs>
    ): CheckSelect<T, Prisma__kartyClient<karty>, Prisma__kartyClient<kartyGetPayload<T>>>

    /**
     * Delete zero or more Karties.
     * @param {kartyDeleteManyArgs} args - Arguments to filter Karties to delete.
     * @example
     * // Delete a few Karties
     * const { count } = await prisma.karty.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends kartyDeleteManyArgs>(
      args?: SelectSubset<T, kartyDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Karties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {kartyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Karties
     * const karty = await prisma.karty.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends kartyUpdateManyArgs>(
      args: SelectSubset<T, kartyUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Karty.
     * @param {kartyUpsertArgs} args - Arguments to update or create a Karty.
     * @example
     * // Update or create a Karty
     * const karty = await prisma.karty.upsert({
     *   create: {
     *     // ... data to create a Karty
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Karty we want to update
     *   }
     * })
    **/
    upsert<T extends kartyUpsertArgs>(
      args: SelectSubset<T, kartyUpsertArgs>
    ): CheckSelect<T, Prisma__kartyClient<karty>, Prisma__kartyClient<kartyGetPayload<T>>>

    /**
     * Count the number of Karties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {kartyCountArgs} args - Arguments to filter Karties to count.
     * @example
     * // Count the number of Karties
     * const count = await prisma.karty.count({
     *   where: {
     *     // ... the filter for the Karties we want to count
     *   }
     * })
    **/
    count<T extends kartyCountArgs>(
      args?: Subset<T, kartyCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KartyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Karty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KartyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KartyAggregateArgs>(args: Subset<T, KartyAggregateArgs>): PrismaPromise<GetKartyAggregateType<T>>

    /**
     * Group by Karty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KartyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KartyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KartyGroupByArgs['orderBy'] }
        : { orderBy?: KartyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KartyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKartyGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for karty.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__kartyClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * karty findUnique
   */
  export type kartyFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the karty
     * 
    **/
    select?: kartySelect | null
    /**
     * Throw an Error if a karty can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which karty to fetch.
     * 
    **/
    where: kartyWhereUniqueInput
  }


  /**
   * karty findFirst
   */
  export type kartyFindFirstArgs = {
    /**
     * Select specific fields to fetch from the karty
     * 
    **/
    select?: kartySelect | null
    /**
     * Throw an Error if a karty can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which karty to fetch.
     * 
    **/
    where?: kartyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of karties to fetch.
     * 
    **/
    orderBy?: Enumerable<kartyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for karties.
     * 
    **/
    cursor?: kartyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` karties from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` karties.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of karties.
     * 
    **/
    distinct?: Enumerable<KartyScalarFieldEnum>
  }


  /**
   * karty findMany
   */
  export type kartyFindManyArgs = {
    /**
     * Select specific fields to fetch from the karty
     * 
    **/
    select?: kartySelect | null
    /**
     * Filter, which karties to fetch.
     * 
    **/
    where?: kartyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of karties to fetch.
     * 
    **/
    orderBy?: Enumerable<kartyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing karties.
     * 
    **/
    cursor?: kartyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` karties from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` karties.
     * 
    **/
    skip?: number
    distinct?: Enumerable<KartyScalarFieldEnum>
  }


  /**
   * karty create
   */
  export type kartyCreateArgs = {
    /**
     * Select specific fields to fetch from the karty
     * 
    **/
    select?: kartySelect | null
    /**
     * The data needed to create a karty.
     * 
    **/
    data: XOR<kartyCreateInput, kartyUncheckedCreateInput>
  }


  /**
   * karty createMany
   */
  export type kartyCreateManyArgs = {
    data: Enumerable<kartyCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * karty update
   */
  export type kartyUpdateArgs = {
    /**
     * Select specific fields to fetch from the karty
     * 
    **/
    select?: kartySelect | null
    /**
     * The data needed to update a karty.
     * 
    **/
    data: XOR<kartyUpdateInput, kartyUncheckedUpdateInput>
    /**
     * Choose, which karty to update.
     * 
    **/
    where: kartyWhereUniqueInput
  }


  /**
   * karty updateMany
   */
  export type kartyUpdateManyArgs = {
    data: XOR<kartyUpdateManyMutationInput, kartyUncheckedUpdateManyInput>
    where?: kartyWhereInput
  }


  /**
   * karty upsert
   */
  export type kartyUpsertArgs = {
    /**
     * Select specific fields to fetch from the karty
     * 
    **/
    select?: kartySelect | null
    /**
     * The filter to search for the karty to update in case it exists.
     * 
    **/
    where: kartyWhereUniqueInput
    /**
     * In case the karty found by the `where` argument doesn't exist, create a new karty with this data.
     * 
    **/
    create: XOR<kartyCreateInput, kartyUncheckedCreateInput>
    /**
     * In case the karty was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<kartyUpdateInput, kartyUncheckedUpdateInput>
  }


  /**
   * karty delete
   */
  export type kartyDeleteArgs = {
    /**
     * Select specific fields to fetch from the karty
     * 
    **/
    select?: kartySelect | null
    /**
     * Filter which karty to delete.
     * 
    **/
    where: kartyWhereUniqueInput
  }


  /**
   * karty deleteMany
   */
  export type kartyDeleteManyArgs = {
    where?: kartyWhereInput
  }


  /**
   * karty without action
   */
  export type kartyArgs = {
    /**
     * Select specific fields to fetch from the karty
     * 
    **/
    select?: kartySelect | null
  }



  /**
   * Model kopie
   */


  export type AggregateKopie = {
    _count: KopieCountAggregateOutputType | null
    _avg: KopieAvgAggregateOutputType | null
    _sum: KopieSumAggregateOutputType | null
    _min: KopieMinAggregateOutputType | null
    _max: KopieMaxAggregateOutputType | null
  }

  export type KopieAvgAggregateOutputType = {
    serial: number | null
    id: number | null
    data: number | null
  }

  export type KopieSumAggregateOutputType = {
    serial: number | null
    id: number | null
    data: bigint | null
  }

  export type KopieMinAggregateOutputType = {
    serial: number | null
    id: number | null
    uuid: string | null
    nazwa: string | null
    itemy: string | null
    data: bigint | null
  }

  export type KopieMaxAggregateOutputType = {
    serial: number | null
    id: number | null
    uuid: string | null
    nazwa: string | null
    itemy: string | null
    data: bigint | null
  }

  export type KopieCountAggregateOutputType = {
    serial: number
    id: number
    uuid: number
    nazwa: number
    itemy: number
    data: number
    _all: number
  }


  export type KopieAvgAggregateInputType = {
    serial?: true
    id?: true
    data?: true
  }

  export type KopieSumAggregateInputType = {
    serial?: true
    id?: true
    data?: true
  }

  export type KopieMinAggregateInputType = {
    serial?: true
    id?: true
    uuid?: true
    nazwa?: true
    itemy?: true
    data?: true
  }

  export type KopieMaxAggregateInputType = {
    serial?: true
    id?: true
    uuid?: true
    nazwa?: true
    itemy?: true
    data?: true
  }

  export type KopieCountAggregateInputType = {
    serial?: true
    id?: true
    uuid?: true
    nazwa?: true
    itemy?: true
    data?: true
    _all?: true
  }

  export type KopieAggregateArgs = {
    /**
     * Filter which kopie to aggregate.
     * 
    **/
    where?: kopieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of kopies to fetch.
     * 
    **/
    orderBy?: Enumerable<kopieOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: kopieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` kopies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` kopies.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned kopies
    **/
    _count?: true | KopieCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: KopieAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: KopieSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KopieMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KopieMaxAggregateInputType
  }

  export type GetKopieAggregateType<T extends KopieAggregateArgs> = {
        [P in keyof T & keyof AggregateKopie]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKopie[P]>
      : GetScalarType<T[P], AggregateKopie[P]>
  }


    
    
  export type KopieGroupByArgs = {
    where?: kopieWhereInput
    orderBy?: Enumerable<kopieOrderByWithAggregationInput>
    by: Array<KopieScalarFieldEnum>
    having?: kopieScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KopieCountAggregateInputType | true
    _avg?: KopieAvgAggregateInputType
    _sum?: KopieSumAggregateInputType
    _min?: KopieMinAggregateInputType
    _max?: KopieMaxAggregateInputType
  }


  export type KopieGroupByOutputType = {
    serial: number
    id: number
    uuid: string
    nazwa: string
    itemy: string
    data: bigint
    _count: KopieCountAggregateOutputType | null
    _avg: KopieAvgAggregateOutputType | null
    _sum: KopieSumAggregateOutputType | null
    _min: KopieMinAggregateOutputType | null
    _max: KopieMaxAggregateOutputType | null
  }

  type GetKopieGroupByPayload<T extends KopieGroupByArgs> = Promise<
    Array<
      PickArray<KopieGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof KopieGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], KopieGroupByOutputType[P]> 
            : GetScalarType<T[P], KopieGroupByOutputType[P]>
        }
      > 
    >


  export type kopieSelect = {
    serial?: boolean
    id?: boolean
    uuid?: boolean
    nazwa?: boolean
    itemy?: boolean
    data?: boolean
  }

  export type kopieGetPayload<
    S extends boolean | null | undefined | kopieArgs,
    U = keyof S
      > = S extends true
        ? kopie
    : S extends undefined
    ? never
    : S extends kopieArgs | kopieFindManyArgs
    ?'include' extends U
    ? kopie 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof kopie ?kopie [P]
  : 
     never
  } 
    : kopie
  : kopie


  type kopieCountArgs = Merge<
    Omit<kopieFindManyArgs, 'select' | 'include'> & {
      select?: KopieCountAggregateInputType | true
    }
  >

  export interface kopieDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Kopie that matches the filter.
     * @param {kopieFindUniqueArgs} args - Arguments to find a Kopie
     * @example
     * // Get one Kopie
     * const kopie = await prisma.kopie.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends kopieFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, kopieFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'kopie'> extends True ? CheckSelect<T, Prisma__kopieClient<kopie>, Prisma__kopieClient<kopieGetPayload<T>>> : CheckSelect<T, Prisma__kopieClient<kopie | null >, Prisma__kopieClient<kopieGetPayload<T> | null >>

    /**
     * Find the first Kopie that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {kopieFindFirstArgs} args - Arguments to find a Kopie
     * @example
     * // Get one Kopie
     * const kopie = await prisma.kopie.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends kopieFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, kopieFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'kopie'> extends True ? CheckSelect<T, Prisma__kopieClient<kopie>, Prisma__kopieClient<kopieGetPayload<T>>> : CheckSelect<T, Prisma__kopieClient<kopie | null >, Prisma__kopieClient<kopieGetPayload<T> | null >>

    /**
     * Find zero or more Kopies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {kopieFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Kopies
     * const kopies = await prisma.kopie.findMany()
     * 
     * // Get first 10 Kopies
     * const kopies = await prisma.kopie.findMany({ take: 10 })
     * 
     * // Only select the `serial`
     * const kopieWithSerialOnly = await prisma.kopie.findMany({ select: { serial: true } })
     * 
    **/
    findMany<T extends kopieFindManyArgs>(
      args?: SelectSubset<T, kopieFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<kopie>>, PrismaPromise<Array<kopieGetPayload<T>>>>

    /**
     * Create a Kopie.
     * @param {kopieCreateArgs} args - Arguments to create a Kopie.
     * @example
     * // Create one Kopie
     * const Kopie = await prisma.kopie.create({
     *   data: {
     *     // ... data to create a Kopie
     *   }
     * })
     * 
    **/
    create<T extends kopieCreateArgs>(
      args: SelectSubset<T, kopieCreateArgs>
    ): CheckSelect<T, Prisma__kopieClient<kopie>, Prisma__kopieClient<kopieGetPayload<T>>>

    /**
     * Create many Kopies.
     *     @param {kopieCreateManyArgs} args - Arguments to create many Kopies.
     *     @example
     *     // Create many Kopies
     *     const kopie = await prisma.kopie.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends kopieCreateManyArgs>(
      args?: SelectSubset<T, kopieCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Kopie.
     * @param {kopieDeleteArgs} args - Arguments to delete one Kopie.
     * @example
     * // Delete one Kopie
     * const Kopie = await prisma.kopie.delete({
     *   where: {
     *     // ... filter to delete one Kopie
     *   }
     * })
     * 
    **/
    delete<T extends kopieDeleteArgs>(
      args: SelectSubset<T, kopieDeleteArgs>
    ): CheckSelect<T, Prisma__kopieClient<kopie>, Prisma__kopieClient<kopieGetPayload<T>>>

    /**
     * Update one Kopie.
     * @param {kopieUpdateArgs} args - Arguments to update one Kopie.
     * @example
     * // Update one Kopie
     * const kopie = await prisma.kopie.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends kopieUpdateArgs>(
      args: SelectSubset<T, kopieUpdateArgs>
    ): CheckSelect<T, Prisma__kopieClient<kopie>, Prisma__kopieClient<kopieGetPayload<T>>>

    /**
     * Delete zero or more Kopies.
     * @param {kopieDeleteManyArgs} args - Arguments to filter Kopies to delete.
     * @example
     * // Delete a few Kopies
     * const { count } = await prisma.kopie.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends kopieDeleteManyArgs>(
      args?: SelectSubset<T, kopieDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kopies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {kopieUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Kopies
     * const kopie = await prisma.kopie.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends kopieUpdateManyArgs>(
      args: SelectSubset<T, kopieUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Kopie.
     * @param {kopieUpsertArgs} args - Arguments to update or create a Kopie.
     * @example
     * // Update or create a Kopie
     * const kopie = await prisma.kopie.upsert({
     *   create: {
     *     // ... data to create a Kopie
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Kopie we want to update
     *   }
     * })
    **/
    upsert<T extends kopieUpsertArgs>(
      args: SelectSubset<T, kopieUpsertArgs>
    ): CheckSelect<T, Prisma__kopieClient<kopie>, Prisma__kopieClient<kopieGetPayload<T>>>

    /**
     * Count the number of Kopies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {kopieCountArgs} args - Arguments to filter Kopies to count.
     * @example
     * // Count the number of Kopies
     * const count = await prisma.kopie.count({
     *   where: {
     *     // ... the filter for the Kopies we want to count
     *   }
     * })
    **/
    count<T extends kopieCountArgs>(
      args?: Subset<T, kopieCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KopieCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Kopie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KopieAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KopieAggregateArgs>(args: Subset<T, KopieAggregateArgs>): PrismaPromise<GetKopieAggregateType<T>>

    /**
     * Group by Kopie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KopieGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KopieGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KopieGroupByArgs['orderBy'] }
        : { orderBy?: KopieGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KopieGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKopieGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for kopie.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__kopieClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * kopie findUnique
   */
  export type kopieFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the kopie
     * 
    **/
    select?: kopieSelect | null
    /**
     * Throw an Error if a kopie can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which kopie to fetch.
     * 
    **/
    where: kopieWhereUniqueInput
  }


  /**
   * kopie findFirst
   */
  export type kopieFindFirstArgs = {
    /**
     * Select specific fields to fetch from the kopie
     * 
    **/
    select?: kopieSelect | null
    /**
     * Throw an Error if a kopie can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which kopie to fetch.
     * 
    **/
    where?: kopieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of kopies to fetch.
     * 
    **/
    orderBy?: Enumerable<kopieOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for kopies.
     * 
    **/
    cursor?: kopieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` kopies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` kopies.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of kopies.
     * 
    **/
    distinct?: Enumerable<KopieScalarFieldEnum>
  }


  /**
   * kopie findMany
   */
  export type kopieFindManyArgs = {
    /**
     * Select specific fields to fetch from the kopie
     * 
    **/
    select?: kopieSelect | null
    /**
     * Filter, which kopies to fetch.
     * 
    **/
    where?: kopieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of kopies to fetch.
     * 
    **/
    orderBy?: Enumerable<kopieOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing kopies.
     * 
    **/
    cursor?: kopieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` kopies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` kopies.
     * 
    **/
    skip?: number
    distinct?: Enumerable<KopieScalarFieldEnum>
  }


  /**
   * kopie create
   */
  export type kopieCreateArgs = {
    /**
     * Select specific fields to fetch from the kopie
     * 
    **/
    select?: kopieSelect | null
    /**
     * The data needed to create a kopie.
     * 
    **/
    data: XOR<kopieCreateInput, kopieUncheckedCreateInput>
  }


  /**
   * kopie createMany
   */
  export type kopieCreateManyArgs = {
    data: Enumerable<kopieCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * kopie update
   */
  export type kopieUpdateArgs = {
    /**
     * Select specific fields to fetch from the kopie
     * 
    **/
    select?: kopieSelect | null
    /**
     * The data needed to update a kopie.
     * 
    **/
    data: XOR<kopieUpdateInput, kopieUncheckedUpdateInput>
    /**
     * Choose, which kopie to update.
     * 
    **/
    where: kopieWhereUniqueInput
  }


  /**
   * kopie updateMany
   */
  export type kopieUpdateManyArgs = {
    data: XOR<kopieUpdateManyMutationInput, kopieUncheckedUpdateManyInput>
    where?: kopieWhereInput
  }


  /**
   * kopie upsert
   */
  export type kopieUpsertArgs = {
    /**
     * Select specific fields to fetch from the kopie
     * 
    **/
    select?: kopieSelect | null
    /**
     * The filter to search for the kopie to update in case it exists.
     * 
    **/
    where: kopieWhereUniqueInput
    /**
     * In case the kopie found by the `where` argument doesn't exist, create a new kopie with this data.
     * 
    **/
    create: XOR<kopieCreateInput, kopieUncheckedCreateInput>
    /**
     * In case the kopie was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<kopieUpdateInput, kopieUncheckedUpdateInput>
  }


  /**
   * kopie delete
   */
  export type kopieDeleteArgs = {
    /**
     * Select specific fields to fetch from the kopie
     * 
    **/
    select?: kopieSelect | null
    /**
     * Filter which kopie to delete.
     * 
    **/
    where: kopieWhereUniqueInput
  }


  /**
   * kopie deleteMany
   */
  export type kopieDeleteManyArgs = {
    where?: kopieWhereInput
  }


  /**
   * kopie without action
   */
  export type kopieArgs = {
    /**
     * Select specific fields to fetch from the kopie
     * 
    **/
    select?: kopieSelect | null
  }



  /**
   * Model lekcje
   */


  export type AggregateLekcje = {
    _count: LekcjeCountAggregateOutputType | null
    _avg: LekcjeAvgAggregateOutputType | null
    _sum: LekcjeSumAggregateOutputType | null
    _min: LekcjeMinAggregateOutputType | null
    _max: LekcjeMaxAggregateOutputType | null
  }

  export type LekcjeAvgAggregateOutputType = {
    id: number | null
    repeating: number | null
  }

  export type LekcjeSumAggregateOutputType = {
    id: number | null
    repeating: number | null
  }

  export type LekcjeMinAggregateOutputType = {
    id: number | null
    day: boolean | null
    class: boolean | null
    repeating: number | null
    name: string | null
    start: string | null
    end: string | null
    place: string | null
    prof: string | null
  }

  export type LekcjeMaxAggregateOutputType = {
    id: number | null
    day: boolean | null
    class: boolean | null
    repeating: number | null
    name: string | null
    start: string | null
    end: string | null
    place: string | null
    prof: string | null
  }

  export type LekcjeCountAggregateOutputType = {
    id: number
    day: number
    class: number
    repeating: number
    name: number
    start: number
    end: number
    place: number
    prof: number
    _all: number
  }


  export type LekcjeAvgAggregateInputType = {
    id?: true
    repeating?: true
  }

  export type LekcjeSumAggregateInputType = {
    id?: true
    repeating?: true
  }

  export type LekcjeMinAggregateInputType = {
    id?: true
    day?: true
    class?: true
    repeating?: true
    name?: true
    start?: true
    end?: true
    place?: true
    prof?: true
  }

  export type LekcjeMaxAggregateInputType = {
    id?: true
    day?: true
    class?: true
    repeating?: true
    name?: true
    start?: true
    end?: true
    place?: true
    prof?: true
  }

  export type LekcjeCountAggregateInputType = {
    id?: true
    day?: true
    class?: true
    repeating?: true
    name?: true
    start?: true
    end?: true
    place?: true
    prof?: true
    _all?: true
  }

  export type LekcjeAggregateArgs = {
    /**
     * Filter which lekcje to aggregate.
     * 
    **/
    where?: lekcjeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lekcjes to fetch.
     * 
    **/
    orderBy?: Enumerable<lekcjeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: lekcjeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lekcjes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lekcjes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned lekcjes
    **/
    _count?: true | LekcjeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LekcjeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LekcjeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LekcjeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LekcjeMaxAggregateInputType
  }

  export type GetLekcjeAggregateType<T extends LekcjeAggregateArgs> = {
        [P in keyof T & keyof AggregateLekcje]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLekcje[P]>
      : GetScalarType<T[P], AggregateLekcje[P]>
  }


    
    
  export type LekcjeGroupByArgs = {
    where?: lekcjeWhereInput
    orderBy?: Enumerable<lekcjeOrderByWithAggregationInput>
    by: Array<LekcjeScalarFieldEnum>
    having?: lekcjeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LekcjeCountAggregateInputType | true
    _avg?: LekcjeAvgAggregateInputType
    _sum?: LekcjeSumAggregateInputType
    _min?: LekcjeMinAggregateInputType
    _max?: LekcjeMaxAggregateInputType
  }


  export type LekcjeGroupByOutputType = {
    id: number
    day: boolean
    class: boolean
    repeating: number | null
    name: string
    start: string
    end: string
    place: string | null
    prof: string | null
    _count: LekcjeCountAggregateOutputType | null
    _avg: LekcjeAvgAggregateOutputType | null
    _sum: LekcjeSumAggregateOutputType | null
    _min: LekcjeMinAggregateOutputType | null
    _max: LekcjeMaxAggregateOutputType | null
  }

  type GetLekcjeGroupByPayload<T extends LekcjeGroupByArgs> = Promise<
    Array<
      PickArray<LekcjeGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof LekcjeGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], LekcjeGroupByOutputType[P]> 
            : GetScalarType<T[P], LekcjeGroupByOutputType[P]>
        }
      > 
    >


  export type lekcjeSelect = {
    id?: boolean
    day?: boolean
    class?: boolean
    repeating?: boolean
    name?: boolean
    start?: boolean
    end?: boolean
    place?: boolean
    prof?: boolean
  }

  export type lekcjeGetPayload<
    S extends boolean | null | undefined | lekcjeArgs,
    U = keyof S
      > = S extends true
        ? lekcje
    : S extends undefined
    ? never
    : S extends lekcjeArgs | lekcjeFindManyArgs
    ?'include' extends U
    ? lekcje 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof lekcje ?lekcje [P]
  : 
     never
  } 
    : lekcje
  : lekcje


  type lekcjeCountArgs = Merge<
    Omit<lekcjeFindManyArgs, 'select' | 'include'> & {
      select?: LekcjeCountAggregateInputType | true
    }
  >

  export interface lekcjeDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Lekcje that matches the filter.
     * @param {lekcjeFindUniqueArgs} args - Arguments to find a Lekcje
     * @example
     * // Get one Lekcje
     * const lekcje = await prisma.lekcje.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends lekcjeFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, lekcjeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'lekcje'> extends True ? CheckSelect<T, Prisma__lekcjeClient<lekcje>, Prisma__lekcjeClient<lekcjeGetPayload<T>>> : CheckSelect<T, Prisma__lekcjeClient<lekcje | null >, Prisma__lekcjeClient<lekcjeGetPayload<T> | null >>

    /**
     * Find the first Lekcje that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lekcjeFindFirstArgs} args - Arguments to find a Lekcje
     * @example
     * // Get one Lekcje
     * const lekcje = await prisma.lekcje.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends lekcjeFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, lekcjeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'lekcje'> extends True ? CheckSelect<T, Prisma__lekcjeClient<lekcje>, Prisma__lekcjeClient<lekcjeGetPayload<T>>> : CheckSelect<T, Prisma__lekcjeClient<lekcje | null >, Prisma__lekcjeClient<lekcjeGetPayload<T> | null >>

    /**
     * Find zero or more Lekcjes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lekcjeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lekcjes
     * const lekcjes = await prisma.lekcje.findMany()
     * 
     * // Get first 10 Lekcjes
     * const lekcjes = await prisma.lekcje.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lekcjeWithIdOnly = await prisma.lekcje.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends lekcjeFindManyArgs>(
      args?: SelectSubset<T, lekcjeFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<lekcje>>, PrismaPromise<Array<lekcjeGetPayload<T>>>>

    /**
     * Create a Lekcje.
     * @param {lekcjeCreateArgs} args - Arguments to create a Lekcje.
     * @example
     * // Create one Lekcje
     * const Lekcje = await prisma.lekcje.create({
     *   data: {
     *     // ... data to create a Lekcje
     *   }
     * })
     * 
    **/
    create<T extends lekcjeCreateArgs>(
      args: SelectSubset<T, lekcjeCreateArgs>
    ): CheckSelect<T, Prisma__lekcjeClient<lekcje>, Prisma__lekcjeClient<lekcjeGetPayload<T>>>

    /**
     * Create many Lekcjes.
     *     @param {lekcjeCreateManyArgs} args - Arguments to create many Lekcjes.
     *     @example
     *     // Create many Lekcjes
     *     const lekcje = await prisma.lekcje.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends lekcjeCreateManyArgs>(
      args?: SelectSubset<T, lekcjeCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Lekcje.
     * @param {lekcjeDeleteArgs} args - Arguments to delete one Lekcje.
     * @example
     * // Delete one Lekcje
     * const Lekcje = await prisma.lekcje.delete({
     *   where: {
     *     // ... filter to delete one Lekcje
     *   }
     * })
     * 
    **/
    delete<T extends lekcjeDeleteArgs>(
      args: SelectSubset<T, lekcjeDeleteArgs>
    ): CheckSelect<T, Prisma__lekcjeClient<lekcje>, Prisma__lekcjeClient<lekcjeGetPayload<T>>>

    /**
     * Update one Lekcje.
     * @param {lekcjeUpdateArgs} args - Arguments to update one Lekcje.
     * @example
     * // Update one Lekcje
     * const lekcje = await prisma.lekcje.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends lekcjeUpdateArgs>(
      args: SelectSubset<T, lekcjeUpdateArgs>
    ): CheckSelect<T, Prisma__lekcjeClient<lekcje>, Prisma__lekcjeClient<lekcjeGetPayload<T>>>

    /**
     * Delete zero or more Lekcjes.
     * @param {lekcjeDeleteManyArgs} args - Arguments to filter Lekcjes to delete.
     * @example
     * // Delete a few Lekcjes
     * const { count } = await prisma.lekcje.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends lekcjeDeleteManyArgs>(
      args?: SelectSubset<T, lekcjeDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lekcjes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lekcjeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lekcjes
     * const lekcje = await prisma.lekcje.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends lekcjeUpdateManyArgs>(
      args: SelectSubset<T, lekcjeUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Lekcje.
     * @param {lekcjeUpsertArgs} args - Arguments to update or create a Lekcje.
     * @example
     * // Update or create a Lekcje
     * const lekcje = await prisma.lekcje.upsert({
     *   create: {
     *     // ... data to create a Lekcje
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lekcje we want to update
     *   }
     * })
    **/
    upsert<T extends lekcjeUpsertArgs>(
      args: SelectSubset<T, lekcjeUpsertArgs>
    ): CheckSelect<T, Prisma__lekcjeClient<lekcje>, Prisma__lekcjeClient<lekcjeGetPayload<T>>>

    /**
     * Count the number of Lekcjes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lekcjeCountArgs} args - Arguments to filter Lekcjes to count.
     * @example
     * // Count the number of Lekcjes
     * const count = await prisma.lekcje.count({
     *   where: {
     *     // ... the filter for the Lekcjes we want to count
     *   }
     * })
    **/
    count<T extends lekcjeCountArgs>(
      args?: Subset<T, lekcjeCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LekcjeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lekcje.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LekcjeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LekcjeAggregateArgs>(args: Subset<T, LekcjeAggregateArgs>): PrismaPromise<GetLekcjeAggregateType<T>>

    /**
     * Group by Lekcje.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LekcjeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LekcjeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LekcjeGroupByArgs['orderBy'] }
        : { orderBy?: LekcjeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LekcjeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLekcjeGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for lekcje.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__lekcjeClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * lekcje findUnique
   */
  export type lekcjeFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the lekcje
     * 
    **/
    select?: lekcjeSelect | null
    /**
     * Throw an Error if a lekcje can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which lekcje to fetch.
     * 
    **/
    where: lekcjeWhereUniqueInput
  }


  /**
   * lekcje findFirst
   */
  export type lekcjeFindFirstArgs = {
    /**
     * Select specific fields to fetch from the lekcje
     * 
    **/
    select?: lekcjeSelect | null
    /**
     * Throw an Error if a lekcje can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which lekcje to fetch.
     * 
    **/
    where?: lekcjeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lekcjes to fetch.
     * 
    **/
    orderBy?: Enumerable<lekcjeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for lekcjes.
     * 
    **/
    cursor?: lekcjeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lekcjes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lekcjes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of lekcjes.
     * 
    **/
    distinct?: Enumerable<LekcjeScalarFieldEnum>
  }


  /**
   * lekcje findMany
   */
  export type lekcjeFindManyArgs = {
    /**
     * Select specific fields to fetch from the lekcje
     * 
    **/
    select?: lekcjeSelect | null
    /**
     * Filter, which lekcjes to fetch.
     * 
    **/
    where?: lekcjeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lekcjes to fetch.
     * 
    **/
    orderBy?: Enumerable<lekcjeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing lekcjes.
     * 
    **/
    cursor?: lekcjeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lekcjes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lekcjes.
     * 
    **/
    skip?: number
    distinct?: Enumerable<LekcjeScalarFieldEnum>
  }


  /**
   * lekcje create
   */
  export type lekcjeCreateArgs = {
    /**
     * Select specific fields to fetch from the lekcje
     * 
    **/
    select?: lekcjeSelect | null
    /**
     * The data needed to create a lekcje.
     * 
    **/
    data: XOR<lekcjeCreateInput, lekcjeUncheckedCreateInput>
  }


  /**
   * lekcje createMany
   */
  export type lekcjeCreateManyArgs = {
    data: Enumerable<lekcjeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * lekcje update
   */
  export type lekcjeUpdateArgs = {
    /**
     * Select specific fields to fetch from the lekcje
     * 
    **/
    select?: lekcjeSelect | null
    /**
     * The data needed to update a lekcje.
     * 
    **/
    data: XOR<lekcjeUpdateInput, lekcjeUncheckedUpdateInput>
    /**
     * Choose, which lekcje to update.
     * 
    **/
    where: lekcjeWhereUniqueInput
  }


  /**
   * lekcje updateMany
   */
  export type lekcjeUpdateManyArgs = {
    data: XOR<lekcjeUpdateManyMutationInput, lekcjeUncheckedUpdateManyInput>
    where?: lekcjeWhereInput
  }


  /**
   * lekcje upsert
   */
  export type lekcjeUpsertArgs = {
    /**
     * Select specific fields to fetch from the lekcje
     * 
    **/
    select?: lekcjeSelect | null
    /**
     * The filter to search for the lekcje to update in case it exists.
     * 
    **/
    where: lekcjeWhereUniqueInput
    /**
     * In case the lekcje found by the `where` argument doesn't exist, create a new lekcje with this data.
     * 
    **/
    create: XOR<lekcjeCreateInput, lekcjeUncheckedCreateInput>
    /**
     * In case the lekcje was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<lekcjeUpdateInput, lekcjeUncheckedUpdateInput>
  }


  /**
   * lekcje delete
   */
  export type lekcjeDeleteArgs = {
    /**
     * Select specific fields to fetch from the lekcje
     * 
    **/
    select?: lekcjeSelect | null
    /**
     * Filter which lekcje to delete.
     * 
    **/
    where: lekcjeWhereUniqueInput
  }


  /**
   * lekcje deleteMany
   */
  export type lekcjeDeleteManyArgs = {
    where?: lekcjeWhereInput
  }


  /**
   * lekcje without action
   */
  export type lekcjeArgs = {
    /**
     * Select specific fields to fetch from the lekcje
     * 
    **/
    select?: lekcjeSelect | null
  }



  /**
   * Model main
   */


  export type AggregateMain = {
    _count: MainCountAggregateOutputType | null
    _avg: MainAvgAggregateOutputType | null
    _sum: MainSumAggregateOutputType | null
    _min: MainMinAggregateOutputType | null
    _max: MainMaxAggregateOutputType | null
  }

  export type MainAvgAggregateOutputType = {
    serial: number | null
    id: number | null
    aktualizacja: number | null
  }

  export type MainSumAggregateOutputType = {
    serial: number | null
    id: number | null
    aktualizacja: bigint | null
  }

  export type MainMinAggregateOutputType = {
    serial: number | null
    id: number | null
    uuid: string | null
    nazwa: string | null
    itemy: string | null
    aktualizacja: bigint | null
  }

  export type MainMaxAggregateOutputType = {
    serial: number | null
    id: number | null
    uuid: string | null
    nazwa: string | null
    itemy: string | null
    aktualizacja: bigint | null
  }

  export type MainCountAggregateOutputType = {
    serial: number
    id: number
    uuid: number
    nazwa: number
    itemy: number
    aktualizacja: number
    _all: number
  }


  export type MainAvgAggregateInputType = {
    serial?: true
    id?: true
    aktualizacja?: true
  }

  export type MainSumAggregateInputType = {
    serial?: true
    id?: true
    aktualizacja?: true
  }

  export type MainMinAggregateInputType = {
    serial?: true
    id?: true
    uuid?: true
    nazwa?: true
    itemy?: true
    aktualizacja?: true
  }

  export type MainMaxAggregateInputType = {
    serial?: true
    id?: true
    uuid?: true
    nazwa?: true
    itemy?: true
    aktualizacja?: true
  }

  export type MainCountAggregateInputType = {
    serial?: true
    id?: true
    uuid?: true
    nazwa?: true
    itemy?: true
    aktualizacja?: true
    _all?: true
  }

  export type MainAggregateArgs = {
    /**
     * Filter which main to aggregate.
     * 
    **/
    where?: mainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mains to fetch.
     * 
    **/
    orderBy?: Enumerable<mainOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: mainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mains from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mains.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned mains
    **/
    _count?: true | MainCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MainAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MainSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MainMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MainMaxAggregateInputType
  }

  export type GetMainAggregateType<T extends MainAggregateArgs> = {
        [P in keyof T & keyof AggregateMain]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMain[P]>
      : GetScalarType<T[P], AggregateMain[P]>
  }


    
    
  export type MainGroupByArgs = {
    where?: mainWhereInput
    orderBy?: Enumerable<mainOrderByWithAggregationInput>
    by: Array<MainScalarFieldEnum>
    having?: mainScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MainCountAggregateInputType | true
    _avg?: MainAvgAggregateInputType
    _sum?: MainSumAggregateInputType
    _min?: MainMinAggregateInputType
    _max?: MainMaxAggregateInputType
  }


  export type MainGroupByOutputType = {
    serial: number
    id: number
    uuid: string
    nazwa: string
    itemy: string
    aktualizacja: bigint
    _count: MainCountAggregateOutputType | null
    _avg: MainAvgAggregateOutputType | null
    _sum: MainSumAggregateOutputType | null
    _min: MainMinAggregateOutputType | null
    _max: MainMaxAggregateOutputType | null
  }

  type GetMainGroupByPayload<T extends MainGroupByArgs> = Promise<
    Array<
      PickArray<MainGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof MainGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], MainGroupByOutputType[P]> 
            : GetScalarType<T[P], MainGroupByOutputType[P]>
        }
      > 
    >


  export type mainSelect = {
    serial?: boolean
    id?: boolean
    uuid?: boolean
    nazwa?: boolean
    itemy?: boolean
    aktualizacja?: boolean
  }

  export type mainGetPayload<
    S extends boolean | null | undefined | mainArgs,
    U = keyof S
      > = S extends true
        ? main
    : S extends undefined
    ? never
    : S extends mainArgs | mainFindManyArgs
    ?'include' extends U
    ? main 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof main ?main [P]
  : 
     never
  } 
    : main
  : main


  type mainCountArgs = Merge<
    Omit<mainFindManyArgs, 'select' | 'include'> & {
      select?: MainCountAggregateInputType | true
    }
  >

  export interface mainDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Main that matches the filter.
     * @param {mainFindUniqueArgs} args - Arguments to find a Main
     * @example
     * // Get one Main
     * const main = await prisma.main.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends mainFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, mainFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'main'> extends True ? CheckSelect<T, Prisma__mainClient<main>, Prisma__mainClient<mainGetPayload<T>>> : CheckSelect<T, Prisma__mainClient<main | null >, Prisma__mainClient<mainGetPayload<T> | null >>

    /**
     * Find the first Main that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mainFindFirstArgs} args - Arguments to find a Main
     * @example
     * // Get one Main
     * const main = await prisma.main.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends mainFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, mainFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'main'> extends True ? CheckSelect<T, Prisma__mainClient<main>, Prisma__mainClient<mainGetPayload<T>>> : CheckSelect<T, Prisma__mainClient<main | null >, Prisma__mainClient<mainGetPayload<T> | null >>

    /**
     * Find zero or more Mains that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mainFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mains
     * const mains = await prisma.main.findMany()
     * 
     * // Get first 10 Mains
     * const mains = await prisma.main.findMany({ take: 10 })
     * 
     * // Only select the `serial`
     * const mainWithSerialOnly = await prisma.main.findMany({ select: { serial: true } })
     * 
    **/
    findMany<T extends mainFindManyArgs>(
      args?: SelectSubset<T, mainFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<main>>, PrismaPromise<Array<mainGetPayload<T>>>>

    /**
     * Create a Main.
     * @param {mainCreateArgs} args - Arguments to create a Main.
     * @example
     * // Create one Main
     * const Main = await prisma.main.create({
     *   data: {
     *     // ... data to create a Main
     *   }
     * })
     * 
    **/
    create<T extends mainCreateArgs>(
      args: SelectSubset<T, mainCreateArgs>
    ): CheckSelect<T, Prisma__mainClient<main>, Prisma__mainClient<mainGetPayload<T>>>

    /**
     * Create many Mains.
     *     @param {mainCreateManyArgs} args - Arguments to create many Mains.
     *     @example
     *     // Create many Mains
     *     const main = await prisma.main.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends mainCreateManyArgs>(
      args?: SelectSubset<T, mainCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Main.
     * @param {mainDeleteArgs} args - Arguments to delete one Main.
     * @example
     * // Delete one Main
     * const Main = await prisma.main.delete({
     *   where: {
     *     // ... filter to delete one Main
     *   }
     * })
     * 
    **/
    delete<T extends mainDeleteArgs>(
      args: SelectSubset<T, mainDeleteArgs>
    ): CheckSelect<T, Prisma__mainClient<main>, Prisma__mainClient<mainGetPayload<T>>>

    /**
     * Update one Main.
     * @param {mainUpdateArgs} args - Arguments to update one Main.
     * @example
     * // Update one Main
     * const main = await prisma.main.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends mainUpdateArgs>(
      args: SelectSubset<T, mainUpdateArgs>
    ): CheckSelect<T, Prisma__mainClient<main>, Prisma__mainClient<mainGetPayload<T>>>

    /**
     * Delete zero or more Mains.
     * @param {mainDeleteManyArgs} args - Arguments to filter Mains to delete.
     * @example
     * // Delete a few Mains
     * const { count } = await prisma.main.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends mainDeleteManyArgs>(
      args?: SelectSubset<T, mainDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mainUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mains
     * const main = await prisma.main.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends mainUpdateManyArgs>(
      args: SelectSubset<T, mainUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Main.
     * @param {mainUpsertArgs} args - Arguments to update or create a Main.
     * @example
     * // Update or create a Main
     * const main = await prisma.main.upsert({
     *   create: {
     *     // ... data to create a Main
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Main we want to update
     *   }
     * })
    **/
    upsert<T extends mainUpsertArgs>(
      args: SelectSubset<T, mainUpsertArgs>
    ): CheckSelect<T, Prisma__mainClient<main>, Prisma__mainClient<mainGetPayload<T>>>

    /**
     * Count the number of Mains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mainCountArgs} args - Arguments to filter Mains to count.
     * @example
     * // Count the number of Mains
     * const count = await prisma.main.count({
     *   where: {
     *     // ... the filter for the Mains we want to count
     *   }
     * })
    **/
    count<T extends mainCountArgs>(
      args?: Subset<T, mainCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MainCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Main.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MainAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MainAggregateArgs>(args: Subset<T, MainAggregateArgs>): PrismaPromise<GetMainAggregateType<T>>

    /**
     * Group by Main.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MainGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MainGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MainGroupByArgs['orderBy'] }
        : { orderBy?: MainGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MainGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMainGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for main.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__mainClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * main findUnique
   */
  export type mainFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the main
     * 
    **/
    select?: mainSelect | null
    /**
     * Throw an Error if a main can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which main to fetch.
     * 
    **/
    where: mainWhereUniqueInput
  }


  /**
   * main findFirst
   */
  export type mainFindFirstArgs = {
    /**
     * Select specific fields to fetch from the main
     * 
    **/
    select?: mainSelect | null
    /**
     * Throw an Error if a main can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which main to fetch.
     * 
    **/
    where?: mainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mains to fetch.
     * 
    **/
    orderBy?: Enumerable<mainOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mains.
     * 
    **/
    cursor?: mainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mains from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mains.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mains.
     * 
    **/
    distinct?: Enumerable<MainScalarFieldEnum>
  }


  /**
   * main findMany
   */
  export type mainFindManyArgs = {
    /**
     * Select specific fields to fetch from the main
     * 
    **/
    select?: mainSelect | null
    /**
     * Filter, which mains to fetch.
     * 
    **/
    where?: mainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mains to fetch.
     * 
    **/
    orderBy?: Enumerable<mainOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing mains.
     * 
    **/
    cursor?: mainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mains from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mains.
     * 
    **/
    skip?: number
    distinct?: Enumerable<MainScalarFieldEnum>
  }


  /**
   * main create
   */
  export type mainCreateArgs = {
    /**
     * Select specific fields to fetch from the main
     * 
    **/
    select?: mainSelect | null
    /**
     * The data needed to create a main.
     * 
    **/
    data: XOR<mainCreateInput, mainUncheckedCreateInput>
  }


  /**
   * main createMany
   */
  export type mainCreateManyArgs = {
    data: Enumerable<mainCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * main update
   */
  export type mainUpdateArgs = {
    /**
     * Select specific fields to fetch from the main
     * 
    **/
    select?: mainSelect | null
    /**
     * The data needed to update a main.
     * 
    **/
    data: XOR<mainUpdateInput, mainUncheckedUpdateInput>
    /**
     * Choose, which main to update.
     * 
    **/
    where: mainWhereUniqueInput
  }


  /**
   * main updateMany
   */
  export type mainUpdateManyArgs = {
    data: XOR<mainUpdateManyMutationInput, mainUncheckedUpdateManyInput>
    where?: mainWhereInput
  }


  /**
   * main upsert
   */
  export type mainUpsertArgs = {
    /**
     * Select specific fields to fetch from the main
     * 
    **/
    select?: mainSelect | null
    /**
     * The filter to search for the main to update in case it exists.
     * 
    **/
    where: mainWhereUniqueInput
    /**
     * In case the main found by the `where` argument doesn't exist, create a new main with this data.
     * 
    **/
    create: XOR<mainCreateInput, mainUncheckedCreateInput>
    /**
     * In case the main was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<mainUpdateInput, mainUncheckedUpdateInput>
  }


  /**
   * main delete
   */
  export type mainDeleteArgs = {
    /**
     * Select specific fields to fetch from the main
     * 
    **/
    select?: mainSelect | null
    /**
     * Filter which main to delete.
     * 
    **/
    where: mainWhereUniqueInput
  }


  /**
   * main deleteMany
   */
  export type mainDeleteManyArgs = {
    where?: mainWhereInput
  }


  /**
   * main without action
   */
  export type mainArgs = {
    /**
     * Select specific fields to fetch from the main
     * 
    **/
    select?: mainSelect | null
  }



  /**
   * Model mojeKarty
   */


  export type AggregateMojeKarty = {
    _count: MojeKartyCountAggregateOutputType | null
    _avg: MojeKartyAvgAggregateOutputType | null
    _sum: MojeKartySumAggregateOutputType | null
    _min: MojeKartyMinAggregateOutputType | null
    _max: MojeKartyMaxAggregateOutputType | null
  }

  export type MojeKartyAvgAggregateOutputType = {
    serial: number | null
    karta: number | null
  }

  export type MojeKartySumAggregateOutputType = {
    serial: number | null
    karta: number | null
  }

  export type MojeKartyMinAggregateOutputType = {
    serial: number | null
    karta: number | null
    uuid: string | null
  }

  export type MojeKartyMaxAggregateOutputType = {
    serial: number | null
    karta: number | null
    uuid: string | null
  }

  export type MojeKartyCountAggregateOutputType = {
    serial: number
    karta: number
    uuid: number
    _all: number
  }


  export type MojeKartyAvgAggregateInputType = {
    serial?: true
    karta?: true
  }

  export type MojeKartySumAggregateInputType = {
    serial?: true
    karta?: true
  }

  export type MojeKartyMinAggregateInputType = {
    serial?: true
    karta?: true
    uuid?: true
  }

  export type MojeKartyMaxAggregateInputType = {
    serial?: true
    karta?: true
    uuid?: true
  }

  export type MojeKartyCountAggregateInputType = {
    serial?: true
    karta?: true
    uuid?: true
    _all?: true
  }

  export type MojeKartyAggregateArgs = {
    /**
     * Filter which mojeKarty to aggregate.
     * 
    **/
    where?: mojeKartyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mojeKarties to fetch.
     * 
    **/
    orderBy?: Enumerable<mojeKartyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: mojeKartyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mojeKarties from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mojeKarties.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned mojeKarties
    **/
    _count?: true | MojeKartyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MojeKartyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MojeKartySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MojeKartyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MojeKartyMaxAggregateInputType
  }

  export type GetMojeKartyAggregateType<T extends MojeKartyAggregateArgs> = {
        [P in keyof T & keyof AggregateMojeKarty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMojeKarty[P]>
      : GetScalarType<T[P], AggregateMojeKarty[P]>
  }


    
    
  export type MojeKartyGroupByArgs = {
    where?: mojeKartyWhereInput
    orderBy?: Enumerable<mojeKartyOrderByWithAggregationInput>
    by: Array<MojeKartyScalarFieldEnum>
    having?: mojeKartyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MojeKartyCountAggregateInputType | true
    _avg?: MojeKartyAvgAggregateInputType
    _sum?: MojeKartySumAggregateInputType
    _min?: MojeKartyMinAggregateInputType
    _max?: MojeKartyMaxAggregateInputType
  }


  export type MojeKartyGroupByOutputType = {
    serial: number
    karta: number
    uuid: string
    _count: MojeKartyCountAggregateOutputType | null
    _avg: MojeKartyAvgAggregateOutputType | null
    _sum: MojeKartySumAggregateOutputType | null
    _min: MojeKartyMinAggregateOutputType | null
    _max: MojeKartyMaxAggregateOutputType | null
  }

  type GetMojeKartyGroupByPayload<T extends MojeKartyGroupByArgs> = Promise<
    Array<
      PickArray<MojeKartyGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof MojeKartyGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], MojeKartyGroupByOutputType[P]> 
            : GetScalarType<T[P], MojeKartyGroupByOutputType[P]>
        }
      > 
    >


  export type mojeKartySelect = {
    serial?: boolean
    karta?: boolean
    uuid?: boolean
  }

  export type mojeKartyGetPayload<
    S extends boolean | null | undefined | mojeKartyArgs,
    U = keyof S
      > = S extends true
        ? mojeKarty
    : S extends undefined
    ? never
    : S extends mojeKartyArgs | mojeKartyFindManyArgs
    ?'include' extends U
    ? mojeKarty 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof mojeKarty ?mojeKarty [P]
  : 
     never
  } 
    : mojeKarty
  : mojeKarty


  type mojeKartyCountArgs = Merge<
    Omit<mojeKartyFindManyArgs, 'select' | 'include'> & {
      select?: MojeKartyCountAggregateInputType | true
    }
  >

  export interface mojeKartyDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one MojeKarty that matches the filter.
     * @param {mojeKartyFindUniqueArgs} args - Arguments to find a MojeKarty
     * @example
     * // Get one MojeKarty
     * const mojeKarty = await prisma.mojeKarty.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends mojeKartyFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, mojeKartyFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'mojeKarty'> extends True ? CheckSelect<T, Prisma__mojeKartyClient<mojeKarty>, Prisma__mojeKartyClient<mojeKartyGetPayload<T>>> : CheckSelect<T, Prisma__mojeKartyClient<mojeKarty | null >, Prisma__mojeKartyClient<mojeKartyGetPayload<T> | null >>

    /**
     * Find the first MojeKarty that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mojeKartyFindFirstArgs} args - Arguments to find a MojeKarty
     * @example
     * // Get one MojeKarty
     * const mojeKarty = await prisma.mojeKarty.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends mojeKartyFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, mojeKartyFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'mojeKarty'> extends True ? CheckSelect<T, Prisma__mojeKartyClient<mojeKarty>, Prisma__mojeKartyClient<mojeKartyGetPayload<T>>> : CheckSelect<T, Prisma__mojeKartyClient<mojeKarty | null >, Prisma__mojeKartyClient<mojeKartyGetPayload<T> | null >>

    /**
     * Find zero or more MojeKarties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mojeKartyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MojeKarties
     * const mojeKarties = await prisma.mojeKarty.findMany()
     * 
     * // Get first 10 MojeKarties
     * const mojeKarties = await prisma.mojeKarty.findMany({ take: 10 })
     * 
     * // Only select the `serial`
     * const mojeKartyWithSerialOnly = await prisma.mojeKarty.findMany({ select: { serial: true } })
     * 
    **/
    findMany<T extends mojeKartyFindManyArgs>(
      args?: SelectSubset<T, mojeKartyFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<mojeKarty>>, PrismaPromise<Array<mojeKartyGetPayload<T>>>>

    /**
     * Create a MojeKarty.
     * @param {mojeKartyCreateArgs} args - Arguments to create a MojeKarty.
     * @example
     * // Create one MojeKarty
     * const MojeKarty = await prisma.mojeKarty.create({
     *   data: {
     *     // ... data to create a MojeKarty
     *   }
     * })
     * 
    **/
    create<T extends mojeKartyCreateArgs>(
      args: SelectSubset<T, mojeKartyCreateArgs>
    ): CheckSelect<T, Prisma__mojeKartyClient<mojeKarty>, Prisma__mojeKartyClient<mojeKartyGetPayload<T>>>

    /**
     * Create many MojeKarties.
     *     @param {mojeKartyCreateManyArgs} args - Arguments to create many MojeKarties.
     *     @example
     *     // Create many MojeKarties
     *     const mojeKarty = await prisma.mojeKarty.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends mojeKartyCreateManyArgs>(
      args?: SelectSubset<T, mojeKartyCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a MojeKarty.
     * @param {mojeKartyDeleteArgs} args - Arguments to delete one MojeKarty.
     * @example
     * // Delete one MojeKarty
     * const MojeKarty = await prisma.mojeKarty.delete({
     *   where: {
     *     // ... filter to delete one MojeKarty
     *   }
     * })
     * 
    **/
    delete<T extends mojeKartyDeleteArgs>(
      args: SelectSubset<T, mojeKartyDeleteArgs>
    ): CheckSelect<T, Prisma__mojeKartyClient<mojeKarty>, Prisma__mojeKartyClient<mojeKartyGetPayload<T>>>

    /**
     * Update one MojeKarty.
     * @param {mojeKartyUpdateArgs} args - Arguments to update one MojeKarty.
     * @example
     * // Update one MojeKarty
     * const mojeKarty = await prisma.mojeKarty.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends mojeKartyUpdateArgs>(
      args: SelectSubset<T, mojeKartyUpdateArgs>
    ): CheckSelect<T, Prisma__mojeKartyClient<mojeKarty>, Prisma__mojeKartyClient<mojeKartyGetPayload<T>>>

    /**
     * Delete zero or more MojeKarties.
     * @param {mojeKartyDeleteManyArgs} args - Arguments to filter MojeKarties to delete.
     * @example
     * // Delete a few MojeKarties
     * const { count } = await prisma.mojeKarty.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends mojeKartyDeleteManyArgs>(
      args?: SelectSubset<T, mojeKartyDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more MojeKarties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mojeKartyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MojeKarties
     * const mojeKarty = await prisma.mojeKarty.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends mojeKartyUpdateManyArgs>(
      args: SelectSubset<T, mojeKartyUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one MojeKarty.
     * @param {mojeKartyUpsertArgs} args - Arguments to update or create a MojeKarty.
     * @example
     * // Update or create a MojeKarty
     * const mojeKarty = await prisma.mojeKarty.upsert({
     *   create: {
     *     // ... data to create a MojeKarty
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MojeKarty we want to update
     *   }
     * })
    **/
    upsert<T extends mojeKartyUpsertArgs>(
      args: SelectSubset<T, mojeKartyUpsertArgs>
    ): CheckSelect<T, Prisma__mojeKartyClient<mojeKarty>, Prisma__mojeKartyClient<mojeKartyGetPayload<T>>>

    /**
     * Count the number of MojeKarties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mojeKartyCountArgs} args - Arguments to filter MojeKarties to count.
     * @example
     * // Count the number of MojeKarties
     * const count = await prisma.mojeKarty.count({
     *   where: {
     *     // ... the filter for the MojeKarties we want to count
     *   }
     * })
    **/
    count<T extends mojeKartyCountArgs>(
      args?: Subset<T, mojeKartyCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MojeKartyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MojeKarty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MojeKartyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MojeKartyAggregateArgs>(args: Subset<T, MojeKartyAggregateArgs>): PrismaPromise<GetMojeKartyAggregateType<T>>

    /**
     * Group by MojeKarty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MojeKartyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MojeKartyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MojeKartyGroupByArgs['orderBy'] }
        : { orderBy?: MojeKartyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MojeKartyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMojeKartyGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for mojeKarty.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__mojeKartyClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * mojeKarty findUnique
   */
  export type mojeKartyFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the mojeKarty
     * 
    **/
    select?: mojeKartySelect | null
    /**
     * Throw an Error if a mojeKarty can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which mojeKarty to fetch.
     * 
    **/
    where: mojeKartyWhereUniqueInput
  }


  /**
   * mojeKarty findFirst
   */
  export type mojeKartyFindFirstArgs = {
    /**
     * Select specific fields to fetch from the mojeKarty
     * 
    **/
    select?: mojeKartySelect | null
    /**
     * Throw an Error if a mojeKarty can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which mojeKarty to fetch.
     * 
    **/
    where?: mojeKartyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mojeKarties to fetch.
     * 
    **/
    orderBy?: Enumerable<mojeKartyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mojeKarties.
     * 
    **/
    cursor?: mojeKartyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mojeKarties from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mojeKarties.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mojeKarties.
     * 
    **/
    distinct?: Enumerable<MojeKartyScalarFieldEnum>
  }


  /**
   * mojeKarty findMany
   */
  export type mojeKartyFindManyArgs = {
    /**
     * Select specific fields to fetch from the mojeKarty
     * 
    **/
    select?: mojeKartySelect | null
    /**
     * Filter, which mojeKarties to fetch.
     * 
    **/
    where?: mojeKartyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mojeKarties to fetch.
     * 
    **/
    orderBy?: Enumerable<mojeKartyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing mojeKarties.
     * 
    **/
    cursor?: mojeKartyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mojeKarties from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mojeKarties.
     * 
    **/
    skip?: number
    distinct?: Enumerable<MojeKartyScalarFieldEnum>
  }


  /**
   * mojeKarty create
   */
  export type mojeKartyCreateArgs = {
    /**
     * Select specific fields to fetch from the mojeKarty
     * 
    **/
    select?: mojeKartySelect | null
    /**
     * The data needed to create a mojeKarty.
     * 
    **/
    data: XOR<mojeKartyCreateInput, mojeKartyUncheckedCreateInput>
  }


  /**
   * mojeKarty createMany
   */
  export type mojeKartyCreateManyArgs = {
    data: Enumerable<mojeKartyCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * mojeKarty update
   */
  export type mojeKartyUpdateArgs = {
    /**
     * Select specific fields to fetch from the mojeKarty
     * 
    **/
    select?: mojeKartySelect | null
    /**
     * The data needed to update a mojeKarty.
     * 
    **/
    data: XOR<mojeKartyUpdateInput, mojeKartyUncheckedUpdateInput>
    /**
     * Choose, which mojeKarty to update.
     * 
    **/
    where: mojeKartyWhereUniqueInput
  }


  /**
   * mojeKarty updateMany
   */
  export type mojeKartyUpdateManyArgs = {
    data: XOR<mojeKartyUpdateManyMutationInput, mojeKartyUncheckedUpdateManyInput>
    where?: mojeKartyWhereInput
  }


  /**
   * mojeKarty upsert
   */
  export type mojeKartyUpsertArgs = {
    /**
     * Select specific fields to fetch from the mojeKarty
     * 
    **/
    select?: mojeKartySelect | null
    /**
     * The filter to search for the mojeKarty to update in case it exists.
     * 
    **/
    where: mojeKartyWhereUniqueInput
    /**
     * In case the mojeKarty found by the `where` argument doesn't exist, create a new mojeKarty with this data.
     * 
    **/
    create: XOR<mojeKartyCreateInput, mojeKartyUncheckedCreateInput>
    /**
     * In case the mojeKarty was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<mojeKartyUpdateInput, mojeKartyUncheckedUpdateInput>
  }


  /**
   * mojeKarty delete
   */
  export type mojeKartyDeleteArgs = {
    /**
     * Select specific fields to fetch from the mojeKarty
     * 
    **/
    select?: mojeKartySelect | null
    /**
     * Filter which mojeKarty to delete.
     * 
    **/
    where: mojeKartyWhereUniqueInput
  }


  /**
   * mojeKarty deleteMany
   */
  export type mojeKartyDeleteManyArgs = {
    where?: mojeKartyWhereInput
  }


  /**
   * mojeKarty without action
   */
  export type mojeKartyArgs = {
    /**
     * Select specific fields to fetch from the mojeKarty
     * 
    **/
    select?: mojeKartySelect | null
  }



  /**
   * Model online
   */


  export type AggregateOnline = {
    _count: OnlineCountAggregateOutputType | null
    _avg: OnlineAvgAggregateOutputType | null
    _sum: OnlineSumAggregateOutputType | null
    _min: OnlineMinAggregateOutputType | null
    _max: OnlineMaxAggregateOutputType | null
  }

  export type OnlineAvgAggregateOutputType = {
    id: number | null
    ilosc: number | null
  }

  export type OnlineSumAggregateOutputType = {
    id: number | null
    ilosc: number | null
  }

  export type OnlineMinAggregateOutputType = {
    id: number | null
    data: Date | null
    ilosc: number | null
    czas: string | null
    gracze: string | null
  }

  export type OnlineMaxAggregateOutputType = {
    id: number | null
    data: Date | null
    ilosc: number | null
    czas: string | null
    gracze: string | null
  }

  export type OnlineCountAggregateOutputType = {
    id: number
    data: number
    ilosc: number
    czas: number
    gracze: number
    _all: number
  }


  export type OnlineAvgAggregateInputType = {
    id?: true
    ilosc?: true
  }

  export type OnlineSumAggregateInputType = {
    id?: true
    ilosc?: true
  }

  export type OnlineMinAggregateInputType = {
    id?: true
    data?: true
    ilosc?: true
    czas?: true
    gracze?: true
  }

  export type OnlineMaxAggregateInputType = {
    id?: true
    data?: true
    ilosc?: true
    czas?: true
    gracze?: true
  }

  export type OnlineCountAggregateInputType = {
    id?: true
    data?: true
    ilosc?: true
    czas?: true
    gracze?: true
    _all?: true
  }

  export type OnlineAggregateArgs = {
    /**
     * Filter which online to aggregate.
     * 
    **/
    where?: onlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of onlines to fetch.
     * 
    **/
    orderBy?: Enumerable<onlineOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: onlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` onlines from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` onlines.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned onlines
    **/
    _count?: true | OnlineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OnlineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OnlineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OnlineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OnlineMaxAggregateInputType
  }

  export type GetOnlineAggregateType<T extends OnlineAggregateArgs> = {
        [P in keyof T & keyof AggregateOnline]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOnline[P]>
      : GetScalarType<T[P], AggregateOnline[P]>
  }


    
    
  export type OnlineGroupByArgs = {
    where?: onlineWhereInput
    orderBy?: Enumerable<onlineOrderByWithAggregationInput>
    by: Array<OnlineScalarFieldEnum>
    having?: onlineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OnlineCountAggregateInputType | true
    _avg?: OnlineAvgAggregateInputType
    _sum?: OnlineSumAggregateInputType
    _min?: OnlineMinAggregateInputType
    _max?: OnlineMaxAggregateInputType
  }


  export type OnlineGroupByOutputType = {
    id: number
    data: Date
    ilosc: number
    czas: string
    gracze: string
    _count: OnlineCountAggregateOutputType | null
    _avg: OnlineAvgAggregateOutputType | null
    _sum: OnlineSumAggregateOutputType | null
    _min: OnlineMinAggregateOutputType | null
    _max: OnlineMaxAggregateOutputType | null
  }

  type GetOnlineGroupByPayload<T extends OnlineGroupByArgs> = Promise<
    Array<
      PickArray<OnlineGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof OnlineGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], OnlineGroupByOutputType[P]> 
            : GetScalarType<T[P], OnlineGroupByOutputType[P]>
        }
      > 
    >


  export type onlineSelect = {
    id?: boolean
    data?: boolean
    ilosc?: boolean
    czas?: boolean
    gracze?: boolean
  }

  export type onlineGetPayload<
    S extends boolean | null | undefined | onlineArgs,
    U = keyof S
      > = S extends true
        ? online
    : S extends undefined
    ? never
    : S extends onlineArgs | onlineFindManyArgs
    ?'include' extends U
    ? online 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof online ?online [P]
  : 
     never
  } 
    : online
  : online


  type onlineCountArgs = Merge<
    Omit<onlineFindManyArgs, 'select' | 'include'> & {
      select?: OnlineCountAggregateInputType | true
    }
  >

  export interface onlineDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Online that matches the filter.
     * @param {onlineFindUniqueArgs} args - Arguments to find a Online
     * @example
     * // Get one Online
     * const online = await prisma.online.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends onlineFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, onlineFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'online'> extends True ? CheckSelect<T, Prisma__onlineClient<online>, Prisma__onlineClient<onlineGetPayload<T>>> : CheckSelect<T, Prisma__onlineClient<online | null >, Prisma__onlineClient<onlineGetPayload<T> | null >>

    /**
     * Find the first Online that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {onlineFindFirstArgs} args - Arguments to find a Online
     * @example
     * // Get one Online
     * const online = await prisma.online.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends onlineFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, onlineFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'online'> extends True ? CheckSelect<T, Prisma__onlineClient<online>, Prisma__onlineClient<onlineGetPayload<T>>> : CheckSelect<T, Prisma__onlineClient<online | null >, Prisma__onlineClient<onlineGetPayload<T> | null >>

    /**
     * Find zero or more Onlines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {onlineFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Onlines
     * const onlines = await prisma.online.findMany()
     * 
     * // Get first 10 Onlines
     * const onlines = await prisma.online.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const onlineWithIdOnly = await prisma.online.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends onlineFindManyArgs>(
      args?: SelectSubset<T, onlineFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<online>>, PrismaPromise<Array<onlineGetPayload<T>>>>

    /**
     * Create a Online.
     * @param {onlineCreateArgs} args - Arguments to create a Online.
     * @example
     * // Create one Online
     * const Online = await prisma.online.create({
     *   data: {
     *     // ... data to create a Online
     *   }
     * })
     * 
    **/
    create<T extends onlineCreateArgs>(
      args: SelectSubset<T, onlineCreateArgs>
    ): CheckSelect<T, Prisma__onlineClient<online>, Prisma__onlineClient<onlineGetPayload<T>>>

    /**
     * Create many Onlines.
     *     @param {onlineCreateManyArgs} args - Arguments to create many Onlines.
     *     @example
     *     // Create many Onlines
     *     const online = await prisma.online.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends onlineCreateManyArgs>(
      args?: SelectSubset<T, onlineCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Online.
     * @param {onlineDeleteArgs} args - Arguments to delete one Online.
     * @example
     * // Delete one Online
     * const Online = await prisma.online.delete({
     *   where: {
     *     // ... filter to delete one Online
     *   }
     * })
     * 
    **/
    delete<T extends onlineDeleteArgs>(
      args: SelectSubset<T, onlineDeleteArgs>
    ): CheckSelect<T, Prisma__onlineClient<online>, Prisma__onlineClient<onlineGetPayload<T>>>

    /**
     * Update one Online.
     * @param {onlineUpdateArgs} args - Arguments to update one Online.
     * @example
     * // Update one Online
     * const online = await prisma.online.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends onlineUpdateArgs>(
      args: SelectSubset<T, onlineUpdateArgs>
    ): CheckSelect<T, Prisma__onlineClient<online>, Prisma__onlineClient<onlineGetPayload<T>>>

    /**
     * Delete zero or more Onlines.
     * @param {onlineDeleteManyArgs} args - Arguments to filter Onlines to delete.
     * @example
     * // Delete a few Onlines
     * const { count } = await prisma.online.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends onlineDeleteManyArgs>(
      args?: SelectSubset<T, onlineDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Onlines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {onlineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Onlines
     * const online = await prisma.online.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends onlineUpdateManyArgs>(
      args: SelectSubset<T, onlineUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Online.
     * @param {onlineUpsertArgs} args - Arguments to update or create a Online.
     * @example
     * // Update or create a Online
     * const online = await prisma.online.upsert({
     *   create: {
     *     // ... data to create a Online
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Online we want to update
     *   }
     * })
    **/
    upsert<T extends onlineUpsertArgs>(
      args: SelectSubset<T, onlineUpsertArgs>
    ): CheckSelect<T, Prisma__onlineClient<online>, Prisma__onlineClient<onlineGetPayload<T>>>

    /**
     * Count the number of Onlines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {onlineCountArgs} args - Arguments to filter Onlines to count.
     * @example
     * // Count the number of Onlines
     * const count = await prisma.online.count({
     *   where: {
     *     // ... the filter for the Onlines we want to count
     *   }
     * })
    **/
    count<T extends onlineCountArgs>(
      args?: Subset<T, onlineCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OnlineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Online.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnlineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OnlineAggregateArgs>(args: Subset<T, OnlineAggregateArgs>): PrismaPromise<GetOnlineAggregateType<T>>

    /**
     * Group by Online.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnlineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OnlineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OnlineGroupByArgs['orderBy'] }
        : { orderBy?: OnlineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OnlineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOnlineGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for online.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__onlineClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * online findUnique
   */
  export type onlineFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the online
     * 
    **/
    select?: onlineSelect | null
    /**
     * Throw an Error if a online can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which online to fetch.
     * 
    **/
    where: onlineWhereUniqueInput
  }


  /**
   * online findFirst
   */
  export type onlineFindFirstArgs = {
    /**
     * Select specific fields to fetch from the online
     * 
    **/
    select?: onlineSelect | null
    /**
     * Throw an Error if a online can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which online to fetch.
     * 
    **/
    where?: onlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of onlines to fetch.
     * 
    **/
    orderBy?: Enumerable<onlineOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for onlines.
     * 
    **/
    cursor?: onlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` onlines from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` onlines.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of onlines.
     * 
    **/
    distinct?: Enumerable<OnlineScalarFieldEnum>
  }


  /**
   * online findMany
   */
  export type onlineFindManyArgs = {
    /**
     * Select specific fields to fetch from the online
     * 
    **/
    select?: onlineSelect | null
    /**
     * Filter, which onlines to fetch.
     * 
    **/
    where?: onlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of onlines to fetch.
     * 
    **/
    orderBy?: Enumerable<onlineOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing onlines.
     * 
    **/
    cursor?: onlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` onlines from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` onlines.
     * 
    **/
    skip?: number
    distinct?: Enumerable<OnlineScalarFieldEnum>
  }


  /**
   * online create
   */
  export type onlineCreateArgs = {
    /**
     * Select specific fields to fetch from the online
     * 
    **/
    select?: onlineSelect | null
    /**
     * The data needed to create a online.
     * 
    **/
    data: XOR<onlineCreateInput, onlineUncheckedCreateInput>
  }


  /**
   * online createMany
   */
  export type onlineCreateManyArgs = {
    data: Enumerable<onlineCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * online update
   */
  export type onlineUpdateArgs = {
    /**
     * Select specific fields to fetch from the online
     * 
    **/
    select?: onlineSelect | null
    /**
     * The data needed to update a online.
     * 
    **/
    data: XOR<onlineUpdateInput, onlineUncheckedUpdateInput>
    /**
     * Choose, which online to update.
     * 
    **/
    where: onlineWhereUniqueInput
  }


  /**
   * online updateMany
   */
  export type onlineUpdateManyArgs = {
    data: XOR<onlineUpdateManyMutationInput, onlineUncheckedUpdateManyInput>
    where?: onlineWhereInput
  }


  /**
   * online upsert
   */
  export type onlineUpsertArgs = {
    /**
     * Select specific fields to fetch from the online
     * 
    **/
    select?: onlineSelect | null
    /**
     * The filter to search for the online to update in case it exists.
     * 
    **/
    where: onlineWhereUniqueInput
    /**
     * In case the online found by the `where` argument doesn't exist, create a new online with this data.
     * 
    **/
    create: XOR<onlineCreateInput, onlineUncheckedCreateInput>
    /**
     * In case the online was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<onlineUpdateInput, onlineUncheckedUpdateInput>
  }


  /**
   * online delete
   */
  export type onlineDeleteArgs = {
    /**
     * Select specific fields to fetch from the online
     * 
    **/
    select?: onlineSelect | null
    /**
     * Filter which online to delete.
     * 
    **/
    where: onlineWhereUniqueInput
  }


  /**
   * online deleteMany
   */
  export type onlineDeleteManyArgs = {
    where?: onlineWhereInput
  }


  /**
   * online without action
   */
  export type onlineArgs = {
    /**
     * Select specific fields to fetch from the online
     * 
    **/
    select?: onlineSelect | null
  }



  /**
   * Model planExtra
   */


  export type AggregatePlanExtra = {
    _count: PlanExtraCountAggregateOutputType | null
    _avg: PlanExtraAvgAggregateOutputType | null
    _sum: PlanExtraSumAggregateOutputType | null
    _min: PlanExtraMinAggregateOutputType | null
    _max: PlanExtraMaxAggregateOutputType | null
  }

  export type PlanExtraAvgAggregateOutputType = {
    planid: number | null
  }

  export type PlanExtraSumAggregateOutputType = {
    planid: number | null
  }

  export type PlanExtraMinAggregateOutputType = {
    planid: number | null
    Sprof: string | null
    Splace: string | null
    Sstart: string | null
    Send: string | null
    Sday: boolean | null
    when: string | null
  }

  export type PlanExtraMaxAggregateOutputType = {
    planid: number | null
    Sprof: string | null
    Splace: string | null
    Sstart: string | null
    Send: string | null
    Sday: boolean | null
    when: string | null
  }

  export type PlanExtraCountAggregateOutputType = {
    planid: number
    Sprof: number
    Splace: number
    Sstart: number
    Send: number
    Sday: number
    when: number
    _all: number
  }


  export type PlanExtraAvgAggregateInputType = {
    planid?: true
  }

  export type PlanExtraSumAggregateInputType = {
    planid?: true
  }

  export type PlanExtraMinAggregateInputType = {
    planid?: true
    Sprof?: true
    Splace?: true
    Sstart?: true
    Send?: true
    Sday?: true
    when?: true
  }

  export type PlanExtraMaxAggregateInputType = {
    planid?: true
    Sprof?: true
    Splace?: true
    Sstart?: true
    Send?: true
    Sday?: true
    when?: true
  }

  export type PlanExtraCountAggregateInputType = {
    planid?: true
    Sprof?: true
    Splace?: true
    Sstart?: true
    Send?: true
    Sday?: true
    when?: true
    _all?: true
  }

  export type PlanExtraAggregateArgs = {
    /**
     * Filter which planExtra to aggregate.
     * 
    **/
    where?: planExtraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of planExtras to fetch.
     * 
    **/
    orderBy?: Enumerable<planExtraOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: planExtraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` planExtras from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` planExtras.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned planExtras
    **/
    _count?: true | PlanExtraCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanExtraAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanExtraSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanExtraMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanExtraMaxAggregateInputType
  }

  export type GetPlanExtraAggregateType<T extends PlanExtraAggregateArgs> = {
        [P in keyof T & keyof AggregatePlanExtra]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlanExtra[P]>
      : GetScalarType<T[P], AggregatePlanExtra[P]>
  }


    
    
  export type PlanExtraGroupByArgs = {
    where?: planExtraWhereInput
    orderBy?: Enumerable<planExtraOrderByWithAggregationInput>
    by: Array<PlanExtraScalarFieldEnum>
    having?: planExtraScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanExtraCountAggregateInputType | true
    _avg?: PlanExtraAvgAggregateInputType
    _sum?: PlanExtraSumAggregateInputType
    _min?: PlanExtraMinAggregateInputType
    _max?: PlanExtraMaxAggregateInputType
  }


  export type PlanExtraGroupByOutputType = {
    planid: number
    Sprof: string | null
    Splace: string | null
    Sstart: string | null
    Send: string | null
    Sday: boolean | null
    when: string | null
    _count: PlanExtraCountAggregateOutputType | null
    _avg: PlanExtraAvgAggregateOutputType | null
    _sum: PlanExtraSumAggregateOutputType | null
    _min: PlanExtraMinAggregateOutputType | null
    _max: PlanExtraMaxAggregateOutputType | null
  }

  type GetPlanExtraGroupByPayload<T extends PlanExtraGroupByArgs> = Promise<
    Array<
      PickArray<PlanExtraGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof PlanExtraGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], PlanExtraGroupByOutputType[P]> 
            : GetScalarType<T[P], PlanExtraGroupByOutputType[P]>
        }
      > 
    >


  export type planExtraSelect = {
    planid?: boolean
    Sprof?: boolean
    Splace?: boolean
    Sstart?: boolean
    Send?: boolean
    Sday?: boolean
    when?: boolean
  }

  export type planExtraGetPayload<
    S extends boolean | null | undefined | planExtraArgs,
    U = keyof S
      > = S extends true
        ? planExtra
    : S extends undefined
    ? never
    : S extends planExtraArgs | planExtraFindManyArgs
    ?'include' extends U
    ? planExtra 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof planExtra ?planExtra [P]
  : 
     never
  } 
    : planExtra
  : planExtra


  type planExtraCountArgs = Merge<
    Omit<planExtraFindManyArgs, 'select' | 'include'> & {
      select?: PlanExtraCountAggregateInputType | true
    }
  >

  export interface planExtraDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one PlanExtra that matches the filter.
     * @param {planExtraFindUniqueArgs} args - Arguments to find a PlanExtra
     * @example
     * // Get one PlanExtra
     * const planExtra = await prisma.planExtra.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends planExtraFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, planExtraFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'planExtra'> extends True ? CheckSelect<T, Prisma__planExtraClient<planExtra>, Prisma__planExtraClient<planExtraGetPayload<T>>> : CheckSelect<T, Prisma__planExtraClient<planExtra | null >, Prisma__planExtraClient<planExtraGetPayload<T> | null >>

    /**
     * Find the first PlanExtra that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {planExtraFindFirstArgs} args - Arguments to find a PlanExtra
     * @example
     * // Get one PlanExtra
     * const planExtra = await prisma.planExtra.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends planExtraFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, planExtraFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'planExtra'> extends True ? CheckSelect<T, Prisma__planExtraClient<planExtra>, Prisma__planExtraClient<planExtraGetPayload<T>>> : CheckSelect<T, Prisma__planExtraClient<planExtra | null >, Prisma__planExtraClient<planExtraGetPayload<T> | null >>

    /**
     * Find zero or more PlanExtras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {planExtraFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlanExtras
     * const planExtras = await prisma.planExtra.findMany()
     * 
     * // Get first 10 PlanExtras
     * const planExtras = await prisma.planExtra.findMany({ take: 10 })
     * 
     * // Only select the `planid`
     * const planExtraWithPlanidOnly = await prisma.planExtra.findMany({ select: { planid: true } })
     * 
    **/
    findMany<T extends planExtraFindManyArgs>(
      args?: SelectSubset<T, planExtraFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<planExtra>>, PrismaPromise<Array<planExtraGetPayload<T>>>>

    /**
     * Create a PlanExtra.
     * @param {planExtraCreateArgs} args - Arguments to create a PlanExtra.
     * @example
     * // Create one PlanExtra
     * const PlanExtra = await prisma.planExtra.create({
     *   data: {
     *     // ... data to create a PlanExtra
     *   }
     * })
     * 
    **/
    create<T extends planExtraCreateArgs>(
      args: SelectSubset<T, planExtraCreateArgs>
    ): CheckSelect<T, Prisma__planExtraClient<planExtra>, Prisma__planExtraClient<planExtraGetPayload<T>>>

    /**
     * Create many PlanExtras.
     *     @param {planExtraCreateManyArgs} args - Arguments to create many PlanExtras.
     *     @example
     *     // Create many PlanExtras
     *     const planExtra = await prisma.planExtra.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends planExtraCreateManyArgs>(
      args?: SelectSubset<T, planExtraCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a PlanExtra.
     * @param {planExtraDeleteArgs} args - Arguments to delete one PlanExtra.
     * @example
     * // Delete one PlanExtra
     * const PlanExtra = await prisma.planExtra.delete({
     *   where: {
     *     // ... filter to delete one PlanExtra
     *   }
     * })
     * 
    **/
    delete<T extends planExtraDeleteArgs>(
      args: SelectSubset<T, planExtraDeleteArgs>
    ): CheckSelect<T, Prisma__planExtraClient<planExtra>, Prisma__planExtraClient<planExtraGetPayload<T>>>

    /**
     * Update one PlanExtra.
     * @param {planExtraUpdateArgs} args - Arguments to update one PlanExtra.
     * @example
     * // Update one PlanExtra
     * const planExtra = await prisma.planExtra.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends planExtraUpdateArgs>(
      args: SelectSubset<T, planExtraUpdateArgs>
    ): CheckSelect<T, Prisma__planExtraClient<planExtra>, Prisma__planExtraClient<planExtraGetPayload<T>>>

    /**
     * Delete zero or more PlanExtras.
     * @param {planExtraDeleteManyArgs} args - Arguments to filter PlanExtras to delete.
     * @example
     * // Delete a few PlanExtras
     * const { count } = await prisma.planExtra.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends planExtraDeleteManyArgs>(
      args?: SelectSubset<T, planExtraDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanExtras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {planExtraUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlanExtras
     * const planExtra = await prisma.planExtra.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends planExtraUpdateManyArgs>(
      args: SelectSubset<T, planExtraUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PlanExtra.
     * @param {planExtraUpsertArgs} args - Arguments to update or create a PlanExtra.
     * @example
     * // Update or create a PlanExtra
     * const planExtra = await prisma.planExtra.upsert({
     *   create: {
     *     // ... data to create a PlanExtra
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlanExtra we want to update
     *   }
     * })
    **/
    upsert<T extends planExtraUpsertArgs>(
      args: SelectSubset<T, planExtraUpsertArgs>
    ): CheckSelect<T, Prisma__planExtraClient<planExtra>, Prisma__planExtraClient<planExtraGetPayload<T>>>

    /**
     * Count the number of PlanExtras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {planExtraCountArgs} args - Arguments to filter PlanExtras to count.
     * @example
     * // Count the number of PlanExtras
     * const count = await prisma.planExtra.count({
     *   where: {
     *     // ... the filter for the PlanExtras we want to count
     *   }
     * })
    **/
    count<T extends planExtraCountArgs>(
      args?: Subset<T, planExtraCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanExtraCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlanExtra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanExtraAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanExtraAggregateArgs>(args: Subset<T, PlanExtraAggregateArgs>): PrismaPromise<GetPlanExtraAggregateType<T>>

    /**
     * Group by PlanExtra.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanExtraGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanExtraGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanExtraGroupByArgs['orderBy'] }
        : { orderBy?: PlanExtraGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanExtraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanExtraGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for planExtra.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__planExtraClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * planExtra findUnique
   */
  export type planExtraFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the planExtra
     * 
    **/
    select?: planExtraSelect | null
    /**
     * Throw an Error if a planExtra can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which planExtra to fetch.
     * 
    **/
    where: planExtraWhereUniqueInput
  }


  /**
   * planExtra findFirst
   */
  export type planExtraFindFirstArgs = {
    /**
     * Select specific fields to fetch from the planExtra
     * 
    **/
    select?: planExtraSelect | null
    /**
     * Throw an Error if a planExtra can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which planExtra to fetch.
     * 
    **/
    where?: planExtraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of planExtras to fetch.
     * 
    **/
    orderBy?: Enumerable<planExtraOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for planExtras.
     * 
    **/
    cursor?: planExtraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` planExtras from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` planExtras.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of planExtras.
     * 
    **/
    distinct?: Enumerable<PlanExtraScalarFieldEnum>
  }


  /**
   * planExtra findMany
   */
  export type planExtraFindManyArgs = {
    /**
     * Select specific fields to fetch from the planExtra
     * 
    **/
    select?: planExtraSelect | null
    /**
     * Filter, which planExtras to fetch.
     * 
    **/
    where?: planExtraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of planExtras to fetch.
     * 
    **/
    orderBy?: Enumerable<planExtraOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing planExtras.
     * 
    **/
    cursor?: planExtraWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` planExtras from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` planExtras.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PlanExtraScalarFieldEnum>
  }


  /**
   * planExtra create
   */
  export type planExtraCreateArgs = {
    /**
     * Select specific fields to fetch from the planExtra
     * 
    **/
    select?: planExtraSelect | null
    /**
     * The data needed to create a planExtra.
     * 
    **/
    data: XOR<planExtraCreateInput, planExtraUncheckedCreateInput>
  }


  /**
   * planExtra createMany
   */
  export type planExtraCreateManyArgs = {
    data: Enumerable<planExtraCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * planExtra update
   */
  export type planExtraUpdateArgs = {
    /**
     * Select specific fields to fetch from the planExtra
     * 
    **/
    select?: planExtraSelect | null
    /**
     * The data needed to update a planExtra.
     * 
    **/
    data: XOR<planExtraUpdateInput, planExtraUncheckedUpdateInput>
    /**
     * Choose, which planExtra to update.
     * 
    **/
    where: planExtraWhereUniqueInput
  }


  /**
   * planExtra updateMany
   */
  export type planExtraUpdateManyArgs = {
    data: XOR<planExtraUpdateManyMutationInput, planExtraUncheckedUpdateManyInput>
    where?: planExtraWhereInput
  }


  /**
   * planExtra upsert
   */
  export type planExtraUpsertArgs = {
    /**
     * Select specific fields to fetch from the planExtra
     * 
    **/
    select?: planExtraSelect | null
    /**
     * The filter to search for the planExtra to update in case it exists.
     * 
    **/
    where: planExtraWhereUniqueInput
    /**
     * In case the planExtra found by the `where` argument doesn't exist, create a new planExtra with this data.
     * 
    **/
    create: XOR<planExtraCreateInput, planExtraUncheckedCreateInput>
    /**
     * In case the planExtra was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<planExtraUpdateInput, planExtraUncheckedUpdateInput>
  }


  /**
   * planExtra delete
   */
  export type planExtraDeleteArgs = {
    /**
     * Select specific fields to fetch from the planExtra
     * 
    **/
    select?: planExtraSelect | null
    /**
     * Filter which planExtra to delete.
     * 
    **/
    where: planExtraWhereUniqueInput
  }


  /**
   * planExtra deleteMany
   */
  export type planExtraDeleteManyArgs = {
    where?: planExtraWhereInput
  }


  /**
   * planExtra without action
   */
  export type planExtraArgs = {
    /**
     * Select specific fields to fetch from the planExtra
     * 
    **/
    select?: planExtraSelect | null
  }



  /**
   * Model planfollow
   */


  export type AggregatePlanfollow = {
    _count: PlanfollowCountAggregateOutputType | null
    _avg: PlanfollowAvgAggregateOutputType | null
    _sum: PlanfollowSumAggregateOutputType | null
    _min: PlanfollowMinAggregateOutputType | null
    _max: PlanfollowMaxAggregateOutputType | null
  }

  export type PlanfollowAvgAggregateOutputType = {
    id: number | null
  }

  export type PlanfollowSumAggregateOutputType = {
    id: number | null
  }

  export type PlanfollowMinAggregateOutputType = {
    id: number | null
    user: string | null
    kl1: boolean | null
    kl2: boolean | null
    kl3: boolean | null
    kl4: boolean | null
  }

  export type PlanfollowMaxAggregateOutputType = {
    id: number | null
    user: string | null
    kl1: boolean | null
    kl2: boolean | null
    kl3: boolean | null
    kl4: boolean | null
  }

  export type PlanfollowCountAggregateOutputType = {
    id: number
    user: number
    kl1: number
    kl2: number
    kl3: number
    kl4: number
    _all: number
  }


  export type PlanfollowAvgAggregateInputType = {
    id?: true
  }

  export type PlanfollowSumAggregateInputType = {
    id?: true
  }

  export type PlanfollowMinAggregateInputType = {
    id?: true
    user?: true
    kl1?: true
    kl2?: true
    kl3?: true
    kl4?: true
  }

  export type PlanfollowMaxAggregateInputType = {
    id?: true
    user?: true
    kl1?: true
    kl2?: true
    kl3?: true
    kl4?: true
  }

  export type PlanfollowCountAggregateInputType = {
    id?: true
    user?: true
    kl1?: true
    kl2?: true
    kl3?: true
    kl4?: true
    _all?: true
  }

  export type PlanfollowAggregateArgs = {
    /**
     * Filter which planfollow to aggregate.
     * 
    **/
    where?: planfollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of planfollows to fetch.
     * 
    **/
    orderBy?: Enumerable<planfollowOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: planfollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` planfollows from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` planfollows.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned planfollows
    **/
    _count?: true | PlanfollowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanfollowAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanfollowSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanfollowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanfollowMaxAggregateInputType
  }

  export type GetPlanfollowAggregateType<T extends PlanfollowAggregateArgs> = {
        [P in keyof T & keyof AggregatePlanfollow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlanfollow[P]>
      : GetScalarType<T[P], AggregatePlanfollow[P]>
  }


    
    
  export type PlanfollowGroupByArgs = {
    where?: planfollowWhereInput
    orderBy?: Enumerable<planfollowOrderByWithAggregationInput>
    by: Array<PlanfollowScalarFieldEnum>
    having?: planfollowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanfollowCountAggregateInputType | true
    _avg?: PlanfollowAvgAggregateInputType
    _sum?: PlanfollowSumAggregateInputType
    _min?: PlanfollowMinAggregateInputType
    _max?: PlanfollowMaxAggregateInputType
  }


  export type PlanfollowGroupByOutputType = {
    id: number
    user: string
    kl1: boolean
    kl2: boolean
    kl3: boolean
    kl4: boolean
    _count: PlanfollowCountAggregateOutputType | null
    _avg: PlanfollowAvgAggregateOutputType | null
    _sum: PlanfollowSumAggregateOutputType | null
    _min: PlanfollowMinAggregateOutputType | null
    _max: PlanfollowMaxAggregateOutputType | null
  }

  type GetPlanfollowGroupByPayload<T extends PlanfollowGroupByArgs> = Promise<
    Array<
      PickArray<PlanfollowGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof PlanfollowGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], PlanfollowGroupByOutputType[P]> 
            : GetScalarType<T[P], PlanfollowGroupByOutputType[P]>
        }
      > 
    >


  export type planfollowSelect = {
    id?: boolean
    user?: boolean
    kl1?: boolean
    kl2?: boolean
    kl3?: boolean
    kl4?: boolean
  }

  export type planfollowGetPayload<
    S extends boolean | null | undefined | planfollowArgs,
    U = keyof S
      > = S extends true
        ? planfollow
    : S extends undefined
    ? never
    : S extends planfollowArgs | planfollowFindManyArgs
    ?'include' extends U
    ? planfollow 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof planfollow ?planfollow [P]
  : 
     never
  } 
    : planfollow
  : planfollow


  type planfollowCountArgs = Merge<
    Omit<planfollowFindManyArgs, 'select' | 'include'> & {
      select?: PlanfollowCountAggregateInputType | true
    }
  >

  export interface planfollowDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Planfollow that matches the filter.
     * @param {planfollowFindUniqueArgs} args - Arguments to find a Planfollow
     * @example
     * // Get one Planfollow
     * const planfollow = await prisma.planfollow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends planfollowFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, planfollowFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'planfollow'> extends True ? CheckSelect<T, Prisma__planfollowClient<planfollow>, Prisma__planfollowClient<planfollowGetPayload<T>>> : CheckSelect<T, Prisma__planfollowClient<planfollow | null >, Prisma__planfollowClient<planfollowGetPayload<T> | null >>

    /**
     * Find the first Planfollow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {planfollowFindFirstArgs} args - Arguments to find a Planfollow
     * @example
     * // Get one Planfollow
     * const planfollow = await prisma.planfollow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends planfollowFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, planfollowFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'planfollow'> extends True ? CheckSelect<T, Prisma__planfollowClient<planfollow>, Prisma__planfollowClient<planfollowGetPayload<T>>> : CheckSelect<T, Prisma__planfollowClient<planfollow | null >, Prisma__planfollowClient<planfollowGetPayload<T> | null >>

    /**
     * Find zero or more Planfollows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {planfollowFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Planfollows
     * const planfollows = await prisma.planfollow.findMany()
     * 
     * // Get first 10 Planfollows
     * const planfollows = await prisma.planfollow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planfollowWithIdOnly = await prisma.planfollow.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends planfollowFindManyArgs>(
      args?: SelectSubset<T, planfollowFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<planfollow>>, PrismaPromise<Array<planfollowGetPayload<T>>>>

    /**
     * Create a Planfollow.
     * @param {planfollowCreateArgs} args - Arguments to create a Planfollow.
     * @example
     * // Create one Planfollow
     * const Planfollow = await prisma.planfollow.create({
     *   data: {
     *     // ... data to create a Planfollow
     *   }
     * })
     * 
    **/
    create<T extends planfollowCreateArgs>(
      args: SelectSubset<T, planfollowCreateArgs>
    ): CheckSelect<T, Prisma__planfollowClient<planfollow>, Prisma__planfollowClient<planfollowGetPayload<T>>>

    /**
     * Create many Planfollows.
     *     @param {planfollowCreateManyArgs} args - Arguments to create many Planfollows.
     *     @example
     *     // Create many Planfollows
     *     const planfollow = await prisma.planfollow.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends planfollowCreateManyArgs>(
      args?: SelectSubset<T, planfollowCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Planfollow.
     * @param {planfollowDeleteArgs} args - Arguments to delete one Planfollow.
     * @example
     * // Delete one Planfollow
     * const Planfollow = await prisma.planfollow.delete({
     *   where: {
     *     // ... filter to delete one Planfollow
     *   }
     * })
     * 
    **/
    delete<T extends planfollowDeleteArgs>(
      args: SelectSubset<T, planfollowDeleteArgs>
    ): CheckSelect<T, Prisma__planfollowClient<planfollow>, Prisma__planfollowClient<planfollowGetPayload<T>>>

    /**
     * Update one Planfollow.
     * @param {planfollowUpdateArgs} args - Arguments to update one Planfollow.
     * @example
     * // Update one Planfollow
     * const planfollow = await prisma.planfollow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends planfollowUpdateArgs>(
      args: SelectSubset<T, planfollowUpdateArgs>
    ): CheckSelect<T, Prisma__planfollowClient<planfollow>, Prisma__planfollowClient<planfollowGetPayload<T>>>

    /**
     * Delete zero or more Planfollows.
     * @param {planfollowDeleteManyArgs} args - Arguments to filter Planfollows to delete.
     * @example
     * // Delete a few Planfollows
     * const { count } = await prisma.planfollow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends planfollowDeleteManyArgs>(
      args?: SelectSubset<T, planfollowDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Planfollows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {planfollowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Planfollows
     * const planfollow = await prisma.planfollow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends planfollowUpdateManyArgs>(
      args: SelectSubset<T, planfollowUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Planfollow.
     * @param {planfollowUpsertArgs} args - Arguments to update or create a Planfollow.
     * @example
     * // Update or create a Planfollow
     * const planfollow = await prisma.planfollow.upsert({
     *   create: {
     *     // ... data to create a Planfollow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Planfollow we want to update
     *   }
     * })
    **/
    upsert<T extends planfollowUpsertArgs>(
      args: SelectSubset<T, planfollowUpsertArgs>
    ): CheckSelect<T, Prisma__planfollowClient<planfollow>, Prisma__planfollowClient<planfollowGetPayload<T>>>

    /**
     * Count the number of Planfollows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {planfollowCountArgs} args - Arguments to filter Planfollows to count.
     * @example
     * // Count the number of Planfollows
     * const count = await prisma.planfollow.count({
     *   where: {
     *     // ... the filter for the Planfollows we want to count
     *   }
     * })
    **/
    count<T extends planfollowCountArgs>(
      args?: Subset<T, planfollowCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanfollowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Planfollow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanfollowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanfollowAggregateArgs>(args: Subset<T, PlanfollowAggregateArgs>): PrismaPromise<GetPlanfollowAggregateType<T>>

    /**
     * Group by Planfollow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanfollowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanfollowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanfollowGroupByArgs['orderBy'] }
        : { orderBy?: PlanfollowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanfollowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanfollowGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for planfollow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__planfollowClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * planfollow findUnique
   */
  export type planfollowFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the planfollow
     * 
    **/
    select?: planfollowSelect | null
    /**
     * Throw an Error if a planfollow can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which planfollow to fetch.
     * 
    **/
    where: planfollowWhereUniqueInput
  }


  /**
   * planfollow findFirst
   */
  export type planfollowFindFirstArgs = {
    /**
     * Select specific fields to fetch from the planfollow
     * 
    **/
    select?: planfollowSelect | null
    /**
     * Throw an Error if a planfollow can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which planfollow to fetch.
     * 
    **/
    where?: planfollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of planfollows to fetch.
     * 
    **/
    orderBy?: Enumerable<planfollowOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for planfollows.
     * 
    **/
    cursor?: planfollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` planfollows from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` planfollows.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of planfollows.
     * 
    **/
    distinct?: Enumerable<PlanfollowScalarFieldEnum>
  }


  /**
   * planfollow findMany
   */
  export type planfollowFindManyArgs = {
    /**
     * Select specific fields to fetch from the planfollow
     * 
    **/
    select?: planfollowSelect | null
    /**
     * Filter, which planfollows to fetch.
     * 
    **/
    where?: planfollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of planfollows to fetch.
     * 
    **/
    orderBy?: Enumerable<planfollowOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing planfollows.
     * 
    **/
    cursor?: planfollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` planfollows from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` planfollows.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PlanfollowScalarFieldEnum>
  }


  /**
   * planfollow create
   */
  export type planfollowCreateArgs = {
    /**
     * Select specific fields to fetch from the planfollow
     * 
    **/
    select?: planfollowSelect | null
    /**
     * The data needed to create a planfollow.
     * 
    **/
    data: XOR<planfollowCreateInput, planfollowUncheckedCreateInput>
  }


  /**
   * planfollow createMany
   */
  export type planfollowCreateManyArgs = {
    data: Enumerable<planfollowCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * planfollow update
   */
  export type planfollowUpdateArgs = {
    /**
     * Select specific fields to fetch from the planfollow
     * 
    **/
    select?: planfollowSelect | null
    /**
     * The data needed to update a planfollow.
     * 
    **/
    data: XOR<planfollowUpdateInput, planfollowUncheckedUpdateInput>
    /**
     * Choose, which planfollow to update.
     * 
    **/
    where: planfollowWhereUniqueInput
  }


  /**
   * planfollow updateMany
   */
  export type planfollowUpdateManyArgs = {
    data: XOR<planfollowUpdateManyMutationInput, planfollowUncheckedUpdateManyInput>
    where?: planfollowWhereInput
  }


  /**
   * planfollow upsert
   */
  export type planfollowUpsertArgs = {
    /**
     * Select specific fields to fetch from the planfollow
     * 
    **/
    select?: planfollowSelect | null
    /**
     * The filter to search for the planfollow to update in case it exists.
     * 
    **/
    where: planfollowWhereUniqueInput
    /**
     * In case the planfollow found by the `where` argument doesn't exist, create a new planfollow with this data.
     * 
    **/
    create: XOR<planfollowCreateInput, planfollowUncheckedCreateInput>
    /**
     * In case the planfollow was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<planfollowUpdateInput, planfollowUncheckedUpdateInput>
  }


  /**
   * planfollow delete
   */
  export type planfollowDeleteArgs = {
    /**
     * Select specific fields to fetch from the planfollow
     * 
    **/
    select?: planfollowSelect | null
    /**
     * Filter which planfollow to delete.
     * 
    **/
    where: planfollowWhereUniqueInput
  }


  /**
   * planfollow deleteMany
   */
  export type planfollowDeleteManyArgs = {
    where?: planfollowWhereInput
  }


  /**
   * planfollow without action
   */
  export type planfollowArgs = {
    /**
     * Select specific fields to fetch from the planfollow
     * 
    **/
    select?: planfollowSelect | null
  }



  /**
   * Model playerInfo
   */


  export type AggregatePlayerInfo = {
    _count: PlayerInfoCountAggregateOutputType | null
    _avg: PlayerInfoAvgAggregateOutputType | null
    _sum: PlayerInfoSumAggregateOutputType | null
    _min: PlayerInfoMinAggregateOutputType | null
    _max: PlayerInfoMaxAggregateOutputType | null
  }

  export type PlayerInfoAvgAggregateOutputType = {
    serial: number | null
    wiek: number | null
    visible: number | null
    archived: number | null
  }

  export type PlayerInfoSumAggregateOutputType = {
    serial: number | null
    wiek: number | null
    visible: number | null
    archived: number | null
  }

  export type PlayerInfoMinAggregateOutputType = {
    serial: number | null
    discord: string | null
    nick: string | null
    uuid: string | null
    displayName: string | null
    plec: string | null
    wiek: number | null
    image: string | null
    visible: number | null
    archived: number | null
  }

  export type PlayerInfoMaxAggregateOutputType = {
    serial: number | null
    discord: string | null
    nick: string | null
    uuid: string | null
    displayName: string | null
    plec: string | null
    wiek: number | null
    image: string | null
    visible: number | null
    archived: number | null
  }

  export type PlayerInfoCountAggregateOutputType = {
    serial: number
    discord: number
    nick: number
    uuid: number
    displayName: number
    plec: number
    wiek: number
    image: number
    visible: number
    archived: number
    _all: number
  }


  export type PlayerInfoAvgAggregateInputType = {
    serial?: true
    wiek?: true
    visible?: true
    archived?: true
  }

  export type PlayerInfoSumAggregateInputType = {
    serial?: true
    wiek?: true
    visible?: true
    archived?: true
  }

  export type PlayerInfoMinAggregateInputType = {
    serial?: true
    discord?: true
    nick?: true
    uuid?: true
    displayName?: true
    plec?: true
    wiek?: true
    image?: true
    visible?: true
    archived?: true
  }

  export type PlayerInfoMaxAggregateInputType = {
    serial?: true
    discord?: true
    nick?: true
    uuid?: true
    displayName?: true
    plec?: true
    wiek?: true
    image?: true
    visible?: true
    archived?: true
  }

  export type PlayerInfoCountAggregateInputType = {
    serial?: true
    discord?: true
    nick?: true
    uuid?: true
    displayName?: true
    plec?: true
    wiek?: true
    image?: true
    visible?: true
    archived?: true
    _all?: true
  }

  export type PlayerInfoAggregateArgs = {
    /**
     * Filter which playerInfo to aggregate.
     * 
    **/
    where?: playerInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playerInfos to fetch.
     * 
    **/
    orderBy?: Enumerable<playerInfoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: playerInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playerInfos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playerInfos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned playerInfos
    **/
    _count?: true | PlayerInfoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlayerInfoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlayerInfoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerInfoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerInfoMaxAggregateInputType
  }

  export type GetPlayerInfoAggregateType<T extends PlayerInfoAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayerInfo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayerInfo[P]>
      : GetScalarType<T[P], AggregatePlayerInfo[P]>
  }


    
    
  export type PlayerInfoGroupByArgs = {
    where?: playerInfoWhereInput
    orderBy?: Enumerable<playerInfoOrderByWithAggregationInput>
    by: Array<PlayerInfoScalarFieldEnum>
    having?: playerInfoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerInfoCountAggregateInputType | true
    _avg?: PlayerInfoAvgAggregateInputType
    _sum?: PlayerInfoSumAggregateInputType
    _min?: PlayerInfoMinAggregateInputType
    _max?: PlayerInfoMaxAggregateInputType
  }


  export type PlayerInfoGroupByOutputType = {
    serial: number
    discord: string | null
    nick: string
    uuid: string
    displayName: string | null
    plec: string | null
    wiek: number | null
    image: string | null
    visible: number
    archived: number
    _count: PlayerInfoCountAggregateOutputType | null
    _avg: PlayerInfoAvgAggregateOutputType | null
    _sum: PlayerInfoSumAggregateOutputType | null
    _min: PlayerInfoMinAggregateOutputType | null
    _max: PlayerInfoMaxAggregateOutputType | null
  }

  type GetPlayerInfoGroupByPayload<T extends PlayerInfoGroupByArgs> = Promise<
    Array<
      PickArray<PlayerInfoGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof PlayerInfoGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], PlayerInfoGroupByOutputType[P]> 
            : GetScalarType<T[P], PlayerInfoGroupByOutputType[P]>
        }
      > 
    >


  export type playerInfoSelect = {
    serial?: boolean
    discord?: boolean
    nick?: boolean
    uuid?: boolean
    displayName?: boolean
    plec?: boolean
    wiek?: boolean
    image?: boolean
    visible?: boolean
    archived?: boolean
  }

  export type playerInfoGetPayload<
    S extends boolean | null | undefined | playerInfoArgs,
    U = keyof S
      > = S extends true
        ? playerInfo
    : S extends undefined
    ? never
    : S extends playerInfoArgs | playerInfoFindManyArgs
    ?'include' extends U
    ? playerInfo 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof playerInfo ?playerInfo [P]
  : 
     never
  } 
    : playerInfo
  : playerInfo


  type playerInfoCountArgs = Merge<
    Omit<playerInfoFindManyArgs, 'select' | 'include'> & {
      select?: PlayerInfoCountAggregateInputType | true
    }
  >

  export interface playerInfoDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one PlayerInfo that matches the filter.
     * @param {playerInfoFindUniqueArgs} args - Arguments to find a PlayerInfo
     * @example
     * // Get one PlayerInfo
     * const playerInfo = await prisma.playerInfo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends playerInfoFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, playerInfoFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'playerInfo'> extends True ? CheckSelect<T, Prisma__playerInfoClient<playerInfo>, Prisma__playerInfoClient<playerInfoGetPayload<T>>> : CheckSelect<T, Prisma__playerInfoClient<playerInfo | null >, Prisma__playerInfoClient<playerInfoGetPayload<T> | null >>

    /**
     * Find the first PlayerInfo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playerInfoFindFirstArgs} args - Arguments to find a PlayerInfo
     * @example
     * // Get one PlayerInfo
     * const playerInfo = await prisma.playerInfo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends playerInfoFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, playerInfoFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'playerInfo'> extends True ? CheckSelect<T, Prisma__playerInfoClient<playerInfo>, Prisma__playerInfoClient<playerInfoGetPayload<T>>> : CheckSelect<T, Prisma__playerInfoClient<playerInfo | null >, Prisma__playerInfoClient<playerInfoGetPayload<T> | null >>

    /**
     * Find zero or more PlayerInfos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playerInfoFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlayerInfos
     * const playerInfos = await prisma.playerInfo.findMany()
     * 
     * // Get first 10 PlayerInfos
     * const playerInfos = await prisma.playerInfo.findMany({ take: 10 })
     * 
     * // Only select the `serial`
     * const playerInfoWithSerialOnly = await prisma.playerInfo.findMany({ select: { serial: true } })
     * 
    **/
    findMany<T extends playerInfoFindManyArgs>(
      args?: SelectSubset<T, playerInfoFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<playerInfo>>, PrismaPromise<Array<playerInfoGetPayload<T>>>>

    /**
     * Create a PlayerInfo.
     * @param {playerInfoCreateArgs} args - Arguments to create a PlayerInfo.
     * @example
     * // Create one PlayerInfo
     * const PlayerInfo = await prisma.playerInfo.create({
     *   data: {
     *     // ... data to create a PlayerInfo
     *   }
     * })
     * 
    **/
    create<T extends playerInfoCreateArgs>(
      args: SelectSubset<T, playerInfoCreateArgs>
    ): CheckSelect<T, Prisma__playerInfoClient<playerInfo>, Prisma__playerInfoClient<playerInfoGetPayload<T>>>

    /**
     * Create many PlayerInfos.
     *     @param {playerInfoCreateManyArgs} args - Arguments to create many PlayerInfos.
     *     @example
     *     // Create many PlayerInfos
     *     const playerInfo = await prisma.playerInfo.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends playerInfoCreateManyArgs>(
      args?: SelectSubset<T, playerInfoCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a PlayerInfo.
     * @param {playerInfoDeleteArgs} args - Arguments to delete one PlayerInfo.
     * @example
     * // Delete one PlayerInfo
     * const PlayerInfo = await prisma.playerInfo.delete({
     *   where: {
     *     // ... filter to delete one PlayerInfo
     *   }
     * })
     * 
    **/
    delete<T extends playerInfoDeleteArgs>(
      args: SelectSubset<T, playerInfoDeleteArgs>
    ): CheckSelect<T, Prisma__playerInfoClient<playerInfo>, Prisma__playerInfoClient<playerInfoGetPayload<T>>>

    /**
     * Update one PlayerInfo.
     * @param {playerInfoUpdateArgs} args - Arguments to update one PlayerInfo.
     * @example
     * // Update one PlayerInfo
     * const playerInfo = await prisma.playerInfo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends playerInfoUpdateArgs>(
      args: SelectSubset<T, playerInfoUpdateArgs>
    ): CheckSelect<T, Prisma__playerInfoClient<playerInfo>, Prisma__playerInfoClient<playerInfoGetPayload<T>>>

    /**
     * Delete zero or more PlayerInfos.
     * @param {playerInfoDeleteManyArgs} args - Arguments to filter PlayerInfos to delete.
     * @example
     * // Delete a few PlayerInfos
     * const { count } = await prisma.playerInfo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends playerInfoDeleteManyArgs>(
      args?: SelectSubset<T, playerInfoDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlayerInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playerInfoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlayerInfos
     * const playerInfo = await prisma.playerInfo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends playerInfoUpdateManyArgs>(
      args: SelectSubset<T, playerInfoUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PlayerInfo.
     * @param {playerInfoUpsertArgs} args - Arguments to update or create a PlayerInfo.
     * @example
     * // Update or create a PlayerInfo
     * const playerInfo = await prisma.playerInfo.upsert({
     *   create: {
     *     // ... data to create a PlayerInfo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlayerInfo we want to update
     *   }
     * })
    **/
    upsert<T extends playerInfoUpsertArgs>(
      args: SelectSubset<T, playerInfoUpsertArgs>
    ): CheckSelect<T, Prisma__playerInfoClient<playerInfo>, Prisma__playerInfoClient<playerInfoGetPayload<T>>>

    /**
     * Count the number of PlayerInfos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {playerInfoCountArgs} args - Arguments to filter PlayerInfos to count.
     * @example
     * // Count the number of PlayerInfos
     * const count = await prisma.playerInfo.count({
     *   where: {
     *     // ... the filter for the PlayerInfos we want to count
     *   }
     * })
    **/
    count<T extends playerInfoCountArgs>(
      args?: Subset<T, playerInfoCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerInfoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlayerInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerInfoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerInfoAggregateArgs>(args: Subset<T, PlayerInfoAggregateArgs>): PrismaPromise<GetPlayerInfoAggregateType<T>>

    /**
     * Group by PlayerInfo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerInfoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerInfoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerInfoGroupByArgs['orderBy'] }
        : { orderBy?: PlayerInfoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerInfoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerInfoGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for playerInfo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__playerInfoClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * playerInfo findUnique
   */
  export type playerInfoFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the playerInfo
     * 
    **/
    select?: playerInfoSelect | null
    /**
     * Throw an Error if a playerInfo can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which playerInfo to fetch.
     * 
    **/
    where: playerInfoWhereUniqueInput
  }


  /**
   * playerInfo findFirst
   */
  export type playerInfoFindFirstArgs = {
    /**
     * Select specific fields to fetch from the playerInfo
     * 
    **/
    select?: playerInfoSelect | null
    /**
     * Throw an Error if a playerInfo can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which playerInfo to fetch.
     * 
    **/
    where?: playerInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playerInfos to fetch.
     * 
    **/
    orderBy?: Enumerable<playerInfoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for playerInfos.
     * 
    **/
    cursor?: playerInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playerInfos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playerInfos.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of playerInfos.
     * 
    **/
    distinct?: Enumerable<PlayerInfoScalarFieldEnum>
  }


  /**
   * playerInfo findMany
   */
  export type playerInfoFindManyArgs = {
    /**
     * Select specific fields to fetch from the playerInfo
     * 
    **/
    select?: playerInfoSelect | null
    /**
     * Filter, which playerInfos to fetch.
     * 
    **/
    where?: playerInfoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of playerInfos to fetch.
     * 
    **/
    orderBy?: Enumerable<playerInfoOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing playerInfos.
     * 
    **/
    cursor?: playerInfoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` playerInfos from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` playerInfos.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PlayerInfoScalarFieldEnum>
  }


  /**
   * playerInfo create
   */
  export type playerInfoCreateArgs = {
    /**
     * Select specific fields to fetch from the playerInfo
     * 
    **/
    select?: playerInfoSelect | null
    /**
     * The data needed to create a playerInfo.
     * 
    **/
    data: XOR<playerInfoCreateInput, playerInfoUncheckedCreateInput>
  }


  /**
   * playerInfo createMany
   */
  export type playerInfoCreateManyArgs = {
    data: Enumerable<playerInfoCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * playerInfo update
   */
  export type playerInfoUpdateArgs = {
    /**
     * Select specific fields to fetch from the playerInfo
     * 
    **/
    select?: playerInfoSelect | null
    /**
     * The data needed to update a playerInfo.
     * 
    **/
    data: XOR<playerInfoUpdateInput, playerInfoUncheckedUpdateInput>
    /**
     * Choose, which playerInfo to update.
     * 
    **/
    where: playerInfoWhereUniqueInput
  }


  /**
   * playerInfo updateMany
   */
  export type playerInfoUpdateManyArgs = {
    data: XOR<playerInfoUpdateManyMutationInput, playerInfoUncheckedUpdateManyInput>
    where?: playerInfoWhereInput
  }


  /**
   * playerInfo upsert
   */
  export type playerInfoUpsertArgs = {
    /**
     * Select specific fields to fetch from the playerInfo
     * 
    **/
    select?: playerInfoSelect | null
    /**
     * The filter to search for the playerInfo to update in case it exists.
     * 
    **/
    where: playerInfoWhereUniqueInput
    /**
     * In case the playerInfo found by the `where` argument doesn't exist, create a new playerInfo with this data.
     * 
    **/
    create: XOR<playerInfoCreateInput, playerInfoUncheckedCreateInput>
    /**
     * In case the playerInfo was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<playerInfoUpdateInput, playerInfoUncheckedUpdateInput>
  }


  /**
   * playerInfo delete
   */
  export type playerInfoDeleteArgs = {
    /**
     * Select specific fields to fetch from the playerInfo
     * 
    **/
    select?: playerInfoSelect | null
    /**
     * Filter which playerInfo to delete.
     * 
    **/
    where: playerInfoWhereUniqueInput
  }


  /**
   * playerInfo deleteMany
   */
  export type playerInfoDeleteManyArgs = {
    where?: playerInfoWhereInput
  }


  /**
   * playerInfo without action
   */
  export type playerInfoArgs = {
    /**
     * Select specific fields to fetch from the playerInfo
     * 
    **/
    select?: playerInfoSelect | null
  }



  /**
   * Model przepisy
   */


  export type AggregatePrzepisy = {
    _count: PrzepisyCountAggregateOutputType | null
    _avg: PrzepisyAvgAggregateOutputType | null
    _sum: PrzepisySumAggregateOutputType | null
    _min: PrzepisyMinAggregateOutputType | null
    _max: PrzepisyMaxAggregateOutputType | null
  }

  export type PrzepisyAvgAggregateOutputType = {
    id: number | null
    ocena: number | null
    cena: number | null
  }

  export type PrzepisySumAggregateOutputType = {
    id: number | null
    ocena: number | null
    cena: number | null
  }

  export type PrzepisyMinAggregateOutputType = {
    id: number | null
    autor: string | null
    eliksir: string | null
    item: string | null
    oceny: string | null
    ocena: number | null
    cena: number | null
  }

  export type PrzepisyMaxAggregateOutputType = {
    id: number | null
    autor: string | null
    eliksir: string | null
    item: string | null
    oceny: string | null
    ocena: number | null
    cena: number | null
  }

  export type PrzepisyCountAggregateOutputType = {
    id: number
    autor: number
    eliksir: number
    item: number
    oceny: number
    ocena: number
    cena: number
    _all: number
  }


  export type PrzepisyAvgAggregateInputType = {
    id?: true
    ocena?: true
    cena?: true
  }

  export type PrzepisySumAggregateInputType = {
    id?: true
    ocena?: true
    cena?: true
  }

  export type PrzepisyMinAggregateInputType = {
    id?: true
    autor?: true
    eliksir?: true
    item?: true
    oceny?: true
    ocena?: true
    cena?: true
  }

  export type PrzepisyMaxAggregateInputType = {
    id?: true
    autor?: true
    eliksir?: true
    item?: true
    oceny?: true
    ocena?: true
    cena?: true
  }

  export type PrzepisyCountAggregateInputType = {
    id?: true
    autor?: true
    eliksir?: true
    item?: true
    oceny?: true
    ocena?: true
    cena?: true
    _all?: true
  }

  export type PrzepisyAggregateArgs = {
    /**
     * Filter which przepisy to aggregate.
     * 
    **/
    where?: przepisyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of przepisies to fetch.
     * 
    **/
    orderBy?: Enumerable<przepisyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: przepisyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` przepisies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` przepisies.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned przepisies
    **/
    _count?: true | PrzepisyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrzepisyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrzepisySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrzepisyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrzepisyMaxAggregateInputType
  }

  export type GetPrzepisyAggregateType<T extends PrzepisyAggregateArgs> = {
        [P in keyof T & keyof AggregatePrzepisy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrzepisy[P]>
      : GetScalarType<T[P], AggregatePrzepisy[P]>
  }


    
    
  export type PrzepisyGroupByArgs = {
    where?: przepisyWhereInput
    orderBy?: Enumerable<przepisyOrderByWithAggregationInput>
    by: Array<PrzepisyScalarFieldEnum>
    having?: przepisyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrzepisyCountAggregateInputType | true
    _avg?: PrzepisyAvgAggregateInputType
    _sum?: PrzepisySumAggregateInputType
    _min?: PrzepisyMinAggregateInputType
    _max?: PrzepisyMaxAggregateInputType
  }


  export type PrzepisyGroupByOutputType = {
    id: number
    autor: string
    eliksir: string
    item: string
    oceny: string
    ocena: number
    cena: number
    _count: PrzepisyCountAggregateOutputType | null
    _avg: PrzepisyAvgAggregateOutputType | null
    _sum: PrzepisySumAggregateOutputType | null
    _min: PrzepisyMinAggregateOutputType | null
    _max: PrzepisyMaxAggregateOutputType | null
  }

  type GetPrzepisyGroupByPayload<T extends PrzepisyGroupByArgs> = Promise<
    Array<
      PickArray<PrzepisyGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof PrzepisyGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], PrzepisyGroupByOutputType[P]> 
            : GetScalarType<T[P], PrzepisyGroupByOutputType[P]>
        }
      > 
    >


  export type przepisySelect = {
    id?: boolean
    autor?: boolean
    eliksir?: boolean
    item?: boolean
    oceny?: boolean
    ocena?: boolean
    cena?: boolean
  }

  export type przepisyGetPayload<
    S extends boolean | null | undefined | przepisyArgs,
    U = keyof S
      > = S extends true
        ? przepisy
    : S extends undefined
    ? never
    : S extends przepisyArgs | przepisyFindManyArgs
    ?'include' extends U
    ? przepisy 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof przepisy ?przepisy [P]
  : 
     never
  } 
    : przepisy
  : przepisy


  type przepisyCountArgs = Merge<
    Omit<przepisyFindManyArgs, 'select' | 'include'> & {
      select?: PrzepisyCountAggregateInputType | true
    }
  >

  export interface przepisyDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Przepisy that matches the filter.
     * @param {przepisyFindUniqueArgs} args - Arguments to find a Przepisy
     * @example
     * // Get one Przepisy
     * const przepisy = await prisma.przepisy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends przepisyFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, przepisyFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'przepisy'> extends True ? CheckSelect<T, Prisma__przepisyClient<przepisy>, Prisma__przepisyClient<przepisyGetPayload<T>>> : CheckSelect<T, Prisma__przepisyClient<przepisy | null >, Prisma__przepisyClient<przepisyGetPayload<T> | null >>

    /**
     * Find the first Przepisy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {przepisyFindFirstArgs} args - Arguments to find a Przepisy
     * @example
     * // Get one Przepisy
     * const przepisy = await prisma.przepisy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends przepisyFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, przepisyFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'przepisy'> extends True ? CheckSelect<T, Prisma__przepisyClient<przepisy>, Prisma__przepisyClient<przepisyGetPayload<T>>> : CheckSelect<T, Prisma__przepisyClient<przepisy | null >, Prisma__przepisyClient<przepisyGetPayload<T> | null >>

    /**
     * Find zero or more Przepisies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {przepisyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Przepisies
     * const przepisies = await prisma.przepisy.findMany()
     * 
     * // Get first 10 Przepisies
     * const przepisies = await prisma.przepisy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const przepisyWithIdOnly = await prisma.przepisy.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends przepisyFindManyArgs>(
      args?: SelectSubset<T, przepisyFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<przepisy>>, PrismaPromise<Array<przepisyGetPayload<T>>>>

    /**
     * Create a Przepisy.
     * @param {przepisyCreateArgs} args - Arguments to create a Przepisy.
     * @example
     * // Create one Przepisy
     * const Przepisy = await prisma.przepisy.create({
     *   data: {
     *     // ... data to create a Przepisy
     *   }
     * })
     * 
    **/
    create<T extends przepisyCreateArgs>(
      args: SelectSubset<T, przepisyCreateArgs>
    ): CheckSelect<T, Prisma__przepisyClient<przepisy>, Prisma__przepisyClient<przepisyGetPayload<T>>>

    /**
     * Create many Przepisies.
     *     @param {przepisyCreateManyArgs} args - Arguments to create many Przepisies.
     *     @example
     *     // Create many Przepisies
     *     const przepisy = await prisma.przepisy.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends przepisyCreateManyArgs>(
      args?: SelectSubset<T, przepisyCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Przepisy.
     * @param {przepisyDeleteArgs} args - Arguments to delete one Przepisy.
     * @example
     * // Delete one Przepisy
     * const Przepisy = await prisma.przepisy.delete({
     *   where: {
     *     // ... filter to delete one Przepisy
     *   }
     * })
     * 
    **/
    delete<T extends przepisyDeleteArgs>(
      args: SelectSubset<T, przepisyDeleteArgs>
    ): CheckSelect<T, Prisma__przepisyClient<przepisy>, Prisma__przepisyClient<przepisyGetPayload<T>>>

    /**
     * Update one Przepisy.
     * @param {przepisyUpdateArgs} args - Arguments to update one Przepisy.
     * @example
     * // Update one Przepisy
     * const przepisy = await prisma.przepisy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends przepisyUpdateArgs>(
      args: SelectSubset<T, przepisyUpdateArgs>
    ): CheckSelect<T, Prisma__przepisyClient<przepisy>, Prisma__przepisyClient<przepisyGetPayload<T>>>

    /**
     * Delete zero or more Przepisies.
     * @param {przepisyDeleteManyArgs} args - Arguments to filter Przepisies to delete.
     * @example
     * // Delete a few Przepisies
     * const { count } = await prisma.przepisy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends przepisyDeleteManyArgs>(
      args?: SelectSubset<T, przepisyDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Przepisies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {przepisyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Przepisies
     * const przepisy = await prisma.przepisy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends przepisyUpdateManyArgs>(
      args: SelectSubset<T, przepisyUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Przepisy.
     * @param {przepisyUpsertArgs} args - Arguments to update or create a Przepisy.
     * @example
     * // Update or create a Przepisy
     * const przepisy = await prisma.przepisy.upsert({
     *   create: {
     *     // ... data to create a Przepisy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Przepisy we want to update
     *   }
     * })
    **/
    upsert<T extends przepisyUpsertArgs>(
      args: SelectSubset<T, przepisyUpsertArgs>
    ): CheckSelect<T, Prisma__przepisyClient<przepisy>, Prisma__przepisyClient<przepisyGetPayload<T>>>

    /**
     * Count the number of Przepisies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {przepisyCountArgs} args - Arguments to filter Przepisies to count.
     * @example
     * // Count the number of Przepisies
     * const count = await prisma.przepisy.count({
     *   where: {
     *     // ... the filter for the Przepisies we want to count
     *   }
     * })
    **/
    count<T extends przepisyCountArgs>(
      args?: Subset<T, przepisyCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrzepisyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Przepisy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrzepisyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrzepisyAggregateArgs>(args: Subset<T, PrzepisyAggregateArgs>): PrismaPromise<GetPrzepisyAggregateType<T>>

    /**
     * Group by Przepisy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrzepisyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PrzepisyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrzepisyGroupByArgs['orderBy'] }
        : { orderBy?: PrzepisyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PrzepisyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrzepisyGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for przepisy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__przepisyClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * przepisy findUnique
   */
  export type przepisyFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the przepisy
     * 
    **/
    select?: przepisySelect | null
    /**
     * Throw an Error if a przepisy can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which przepisy to fetch.
     * 
    **/
    where: przepisyWhereUniqueInput
  }


  /**
   * przepisy findFirst
   */
  export type przepisyFindFirstArgs = {
    /**
     * Select specific fields to fetch from the przepisy
     * 
    **/
    select?: przepisySelect | null
    /**
     * Throw an Error if a przepisy can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which przepisy to fetch.
     * 
    **/
    where?: przepisyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of przepisies to fetch.
     * 
    **/
    orderBy?: Enumerable<przepisyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for przepisies.
     * 
    **/
    cursor?: przepisyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` przepisies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` przepisies.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of przepisies.
     * 
    **/
    distinct?: Enumerable<PrzepisyScalarFieldEnum>
  }


  /**
   * przepisy findMany
   */
  export type przepisyFindManyArgs = {
    /**
     * Select specific fields to fetch from the przepisy
     * 
    **/
    select?: przepisySelect | null
    /**
     * Filter, which przepisies to fetch.
     * 
    **/
    where?: przepisyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of przepisies to fetch.
     * 
    **/
    orderBy?: Enumerable<przepisyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing przepisies.
     * 
    **/
    cursor?: przepisyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` przepisies from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` przepisies.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PrzepisyScalarFieldEnum>
  }


  /**
   * przepisy create
   */
  export type przepisyCreateArgs = {
    /**
     * Select specific fields to fetch from the przepisy
     * 
    **/
    select?: przepisySelect | null
    /**
     * The data needed to create a przepisy.
     * 
    **/
    data: XOR<przepisyCreateInput, przepisyUncheckedCreateInput>
  }


  /**
   * przepisy createMany
   */
  export type przepisyCreateManyArgs = {
    data: Enumerable<przepisyCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * przepisy update
   */
  export type przepisyUpdateArgs = {
    /**
     * Select specific fields to fetch from the przepisy
     * 
    **/
    select?: przepisySelect | null
    /**
     * The data needed to update a przepisy.
     * 
    **/
    data: XOR<przepisyUpdateInput, przepisyUncheckedUpdateInput>
    /**
     * Choose, which przepisy to update.
     * 
    **/
    where: przepisyWhereUniqueInput
  }


  /**
   * przepisy updateMany
   */
  export type przepisyUpdateManyArgs = {
    data: XOR<przepisyUpdateManyMutationInput, przepisyUncheckedUpdateManyInput>
    where?: przepisyWhereInput
  }


  /**
   * przepisy upsert
   */
  export type przepisyUpsertArgs = {
    /**
     * Select specific fields to fetch from the przepisy
     * 
    **/
    select?: przepisySelect | null
    /**
     * The filter to search for the przepisy to update in case it exists.
     * 
    **/
    where: przepisyWhereUniqueInput
    /**
     * In case the przepisy found by the `where` argument doesn't exist, create a new przepisy with this data.
     * 
    **/
    create: XOR<przepisyCreateInput, przepisyUncheckedCreateInput>
    /**
     * In case the przepisy was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<przepisyUpdateInput, przepisyUncheckedUpdateInput>
  }


  /**
   * przepisy delete
   */
  export type przepisyDeleteArgs = {
    /**
     * Select specific fields to fetch from the przepisy
     * 
    **/
    select?: przepisySelect | null
    /**
     * Filter which przepisy to delete.
     * 
    **/
    where: przepisyWhereUniqueInput
  }


  /**
   * przepisy deleteMany
   */
  export type przepisyDeleteManyArgs = {
    where?: przepisyWhereInput
  }


  /**
   * przepisy without action
   */
  export type przepisyArgs = {
    /**
     * Select specific fields to fetch from the przepisy
     * 
    **/
    select?: przepisySelect | null
  }



  /**
   * Model roles
   */


  export type AggregateRoles = {
    _count: RolesCountAggregateOutputType | null
    _avg: RolesAvgAggregateOutputType | null
    _sum: RolesSumAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  export type RolesAvgAggregateOutputType = {
    id: number | null
    dcperms: number | null
  }

  export type RolesSumAggregateOutputType = {
    id: number | null
    dcperms: bigint | null
  }

  export type RolesMinAggregateOutputType = {
    id: number | null
    name: string | null
    displayname: string | null
    creator: string | null
    parent: string | null
    dcperms: bigint | null
    dcid: string | null
    dccolor: string | null
    verified: boolean | null
    canResign: boolean | null
    isFree: boolean | null
    canApply: boolean | null
  }

  export type RolesMaxAggregateOutputType = {
    id: number | null
    name: string | null
    displayname: string | null
    creator: string | null
    parent: string | null
    dcperms: bigint | null
    dcid: string | null
    dccolor: string | null
    verified: boolean | null
    canResign: boolean | null
    isFree: boolean | null
    canApply: boolean | null
  }

  export type RolesCountAggregateOutputType = {
    id: number
    name: number
    displayname: number
    creator: number
    parent: number
    dcperms: number
    dcid: number
    dccolor: number
    verified: number
    canResign: number
    isFree: number
    canApply: number
    _all: number
  }


  export type RolesAvgAggregateInputType = {
    id?: true
    dcperms?: true
  }

  export type RolesSumAggregateInputType = {
    id?: true
    dcperms?: true
  }

  export type RolesMinAggregateInputType = {
    id?: true
    name?: true
    displayname?: true
    creator?: true
    parent?: true
    dcperms?: true
    dcid?: true
    dccolor?: true
    verified?: true
    canResign?: true
    isFree?: true
    canApply?: true
  }

  export type RolesMaxAggregateInputType = {
    id?: true
    name?: true
    displayname?: true
    creator?: true
    parent?: true
    dcperms?: true
    dcid?: true
    dccolor?: true
    verified?: true
    canResign?: true
    isFree?: true
    canApply?: true
  }

  export type RolesCountAggregateInputType = {
    id?: true
    name?: true
    displayname?: true
    creator?: true
    parent?: true
    dcperms?: true
    dcid?: true
    dccolor?: true
    verified?: true
    canResign?: true
    isFree?: true
    canApply?: true
    _all?: true
  }

  export type RolesAggregateArgs = {
    /**
     * Filter which roles to aggregate.
     * 
    **/
    where?: rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of roles to fetch.
     * 
    **/
    orderBy?: Enumerable<rolesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` roles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` roles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned roles
    **/
    _count?: true | RolesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RolesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RolesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolesMaxAggregateInputType
  }

  export type GetRolesAggregateType<T extends RolesAggregateArgs> = {
        [P in keyof T & keyof AggregateRoles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoles[P]>
      : GetScalarType<T[P], AggregateRoles[P]>
  }


    
    
  export type RolesGroupByArgs = {
    where?: rolesWhereInput
    orderBy?: Enumerable<rolesOrderByWithAggregationInput>
    by: Array<RolesScalarFieldEnum>
    having?: rolesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolesCountAggregateInputType | true
    _avg?: RolesAvgAggregateInputType
    _sum?: RolesSumAggregateInputType
    _min?: RolesMinAggregateInputType
    _max?: RolesMaxAggregateInputType
  }


  export type RolesGroupByOutputType = {
    id: number
    name: string
    displayname: string | null
    creator: string | null
    parent: string | null
    dcperms: bigint | null
    dcid: string | null
    dccolor: string | null
    verified: boolean
    canResign: boolean | null
    isFree: boolean | null
    canApply: boolean | null
    _count: RolesCountAggregateOutputType | null
    _avg: RolesAvgAggregateOutputType | null
    _sum: RolesSumAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  type GetRolesGroupByPayload<T extends RolesGroupByArgs> = Promise<
    Array<
      PickArray<RolesGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof RolesGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], RolesGroupByOutputType[P]> 
            : GetScalarType<T[P], RolesGroupByOutputType[P]>
        }
      > 
    >


  export type rolesSelect = {
    id?: boolean
    name?: boolean
    displayname?: boolean
    creator?: boolean
    parent?: boolean
    dcperms?: boolean
    dcid?: boolean
    dccolor?: boolean
    verified?: boolean
    canResign?: boolean
    isFree?: boolean
    canApply?: boolean
  }

  export type rolesGetPayload<
    S extends boolean | null | undefined | rolesArgs,
    U = keyof S
      > = S extends true
        ? roles
    : S extends undefined
    ? never
    : S extends rolesArgs | rolesFindManyArgs
    ?'include' extends U
    ? roles 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof roles ?roles [P]
  : 
     never
  } 
    : roles
  : roles


  type rolesCountArgs = Merge<
    Omit<rolesFindManyArgs, 'select' | 'include'> & {
      select?: RolesCountAggregateInputType | true
    }
  >

  export interface rolesDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Roles that matches the filter.
     * @param {rolesFindUniqueArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends rolesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, rolesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'roles'> extends True ? CheckSelect<T, Prisma__rolesClient<roles>, Prisma__rolesClient<rolesGetPayload<T>>> : CheckSelect<T, Prisma__rolesClient<roles | null >, Prisma__rolesClient<rolesGetPayload<T> | null >>

    /**
     * Find the first Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesFindFirstArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends rolesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, rolesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'roles'> extends True ? CheckSelect<T, Prisma__rolesClient<roles>, Prisma__rolesClient<rolesGetPayload<T>>> : CheckSelect<T, Prisma__rolesClient<roles | null >, Prisma__rolesClient<rolesGetPayload<T> | null >>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.roles.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.roles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolesWithIdOnly = await prisma.roles.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends rolesFindManyArgs>(
      args?: SelectSubset<T, rolesFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<roles>>, PrismaPromise<Array<rolesGetPayload<T>>>>

    /**
     * Create a Roles.
     * @param {rolesCreateArgs} args - Arguments to create a Roles.
     * @example
     * // Create one Roles
     * const Roles = await prisma.roles.create({
     *   data: {
     *     // ... data to create a Roles
     *   }
     * })
     * 
    **/
    create<T extends rolesCreateArgs>(
      args: SelectSubset<T, rolesCreateArgs>
    ): CheckSelect<T, Prisma__rolesClient<roles>, Prisma__rolesClient<rolesGetPayload<T>>>

    /**
     * Create many Roles.
     *     @param {rolesCreateManyArgs} args - Arguments to create many Roles.
     *     @example
     *     // Create many Roles
     *     const roles = await prisma.roles.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends rolesCreateManyArgs>(
      args?: SelectSubset<T, rolesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Roles.
     * @param {rolesDeleteArgs} args - Arguments to delete one Roles.
     * @example
     * // Delete one Roles
     * const Roles = await prisma.roles.delete({
     *   where: {
     *     // ... filter to delete one Roles
     *   }
     * })
     * 
    **/
    delete<T extends rolesDeleteArgs>(
      args: SelectSubset<T, rolesDeleteArgs>
    ): CheckSelect<T, Prisma__rolesClient<roles>, Prisma__rolesClient<rolesGetPayload<T>>>

    /**
     * Update one Roles.
     * @param {rolesUpdateArgs} args - Arguments to update one Roles.
     * @example
     * // Update one Roles
     * const roles = await prisma.roles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends rolesUpdateArgs>(
      args: SelectSubset<T, rolesUpdateArgs>
    ): CheckSelect<T, Prisma__rolesClient<roles>, Prisma__rolesClient<rolesGetPayload<T>>>

    /**
     * Delete zero or more Roles.
     * @param {rolesDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.roles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends rolesDeleteManyArgs>(
      args?: SelectSubset<T, rolesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const roles = await prisma.roles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends rolesUpdateManyArgs>(
      args: SelectSubset<T, rolesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Roles.
     * @param {rolesUpsertArgs} args - Arguments to update or create a Roles.
     * @example
     * // Update or create a Roles
     * const roles = await prisma.roles.upsert({
     *   create: {
     *     // ... data to create a Roles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Roles we want to update
     *   }
     * })
    **/
    upsert<T extends rolesUpsertArgs>(
      args: SelectSubset<T, rolesUpsertArgs>
    ): CheckSelect<T, Prisma__rolesClient<roles>, Prisma__rolesClient<rolesGetPayload<T>>>

    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.roles.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends rolesCountArgs>(
      args?: Subset<T, rolesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolesAggregateArgs>(args: Subset<T, RolesAggregateArgs>): PrismaPromise<GetRolesAggregateType<T>>

    /**
     * Group by Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RolesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolesGroupByArgs['orderBy'] }
        : { orderBy?: RolesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolesGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for roles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__rolesClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * roles findUnique
   */
  export type rolesFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the roles
     * 
    **/
    select?: rolesSelect | null
    /**
     * Throw an Error if a roles can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which roles to fetch.
     * 
    **/
    where: rolesWhereUniqueInput
  }


  /**
   * roles findFirst
   */
  export type rolesFindFirstArgs = {
    /**
     * Select specific fields to fetch from the roles
     * 
    **/
    select?: rolesSelect | null
    /**
     * Throw an Error if a roles can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which roles to fetch.
     * 
    **/
    where?: rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of roles to fetch.
     * 
    **/
    orderBy?: Enumerable<rolesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for roles.
     * 
    **/
    cursor?: rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` roles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` roles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of roles.
     * 
    **/
    distinct?: Enumerable<RolesScalarFieldEnum>
  }


  /**
   * roles findMany
   */
  export type rolesFindManyArgs = {
    /**
     * Select specific fields to fetch from the roles
     * 
    **/
    select?: rolesSelect | null
    /**
     * Filter, which roles to fetch.
     * 
    **/
    where?: rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of roles to fetch.
     * 
    **/
    orderBy?: Enumerable<rolesOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing roles.
     * 
    **/
    cursor?: rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` roles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` roles.
     * 
    **/
    skip?: number
    distinct?: Enumerable<RolesScalarFieldEnum>
  }


  /**
   * roles create
   */
  export type rolesCreateArgs = {
    /**
     * Select specific fields to fetch from the roles
     * 
    **/
    select?: rolesSelect | null
    /**
     * The data needed to create a roles.
     * 
    **/
    data: XOR<rolesCreateInput, rolesUncheckedCreateInput>
  }


  /**
   * roles createMany
   */
  export type rolesCreateManyArgs = {
    data: Enumerable<rolesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * roles update
   */
  export type rolesUpdateArgs = {
    /**
     * Select specific fields to fetch from the roles
     * 
    **/
    select?: rolesSelect | null
    /**
     * The data needed to update a roles.
     * 
    **/
    data: XOR<rolesUpdateInput, rolesUncheckedUpdateInput>
    /**
     * Choose, which roles to update.
     * 
    **/
    where: rolesWhereUniqueInput
  }


  /**
   * roles updateMany
   */
  export type rolesUpdateManyArgs = {
    data: XOR<rolesUpdateManyMutationInput, rolesUncheckedUpdateManyInput>
    where?: rolesWhereInput
  }


  /**
   * roles upsert
   */
  export type rolesUpsertArgs = {
    /**
     * Select specific fields to fetch from the roles
     * 
    **/
    select?: rolesSelect | null
    /**
     * The filter to search for the roles to update in case it exists.
     * 
    **/
    where: rolesWhereUniqueInput
    /**
     * In case the roles found by the `where` argument doesn't exist, create a new roles with this data.
     * 
    **/
    create: XOR<rolesCreateInput, rolesUncheckedCreateInput>
    /**
     * In case the roles was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<rolesUpdateInput, rolesUncheckedUpdateInput>
  }


  /**
   * roles delete
   */
  export type rolesDeleteArgs = {
    /**
     * Select specific fields to fetch from the roles
     * 
    **/
    select?: rolesSelect | null
    /**
     * Filter which roles to delete.
     * 
    **/
    where: rolesWhereUniqueInput
  }


  /**
   * roles deleteMany
   */
  export type rolesDeleteManyArgs = {
    where?: rolesWhereInput
  }


  /**
   * roles without action
   */
  export type rolesArgs = {
    /**
     * Select specific fields to fetch from the roles
     * 
    **/
    select?: rolesSelect | null
  }



  /**
   * Model sessions
   */


  export type AggregateSessions = {
    _count: SessionsCountAggregateOutputType | null
    _avg: SessionsAvgAggregateOutputType | null
    _sum: SessionsSumAggregateOutputType | null
    _min: SessionsMinAggregateOutputType | null
    _max: SessionsMaxAggregateOutputType | null
  }

  export type SessionsAvgAggregateOutputType = {
    expires: number | null
  }

  export type SessionsSumAggregateOutputType = {
    expires: number | null
  }

  export type SessionsMinAggregateOutputType = {
    session_id: string | null
    expires: number | null
    data: string | null
  }

  export type SessionsMaxAggregateOutputType = {
    session_id: string | null
    expires: number | null
    data: string | null
  }

  export type SessionsCountAggregateOutputType = {
    session_id: number
    expires: number
    data: number
    _all: number
  }


  export type SessionsAvgAggregateInputType = {
    expires?: true
  }

  export type SessionsSumAggregateInputType = {
    expires?: true
  }

  export type SessionsMinAggregateInputType = {
    session_id?: true
    expires?: true
    data?: true
  }

  export type SessionsMaxAggregateInputType = {
    session_id?: true
    expires?: true
    data?: true
  }

  export type SessionsCountAggregateInputType = {
    session_id?: true
    expires?: true
    data?: true
    _all?: true
  }

  export type SessionsAggregateArgs = {
    /**
     * Filter which sessions to aggregate.
     * 
    **/
    where?: sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<sessionsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sessions
    **/
    _count?: true | SessionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionsMaxAggregateInputType
  }

  export type GetSessionsAggregateType<T extends SessionsAggregateArgs> = {
        [P in keyof T & keyof AggregateSessions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSessions[P]>
      : GetScalarType<T[P], AggregateSessions[P]>
  }


    
    
  export type SessionsGroupByArgs = {
    where?: sessionsWhereInput
    orderBy?: Enumerable<sessionsOrderByWithAggregationInput>
    by: Array<SessionsScalarFieldEnum>
    having?: sessionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionsCountAggregateInputType | true
    _avg?: SessionsAvgAggregateInputType
    _sum?: SessionsSumAggregateInputType
    _min?: SessionsMinAggregateInputType
    _max?: SessionsMaxAggregateInputType
  }


  export type SessionsGroupByOutputType = {
    session_id: string
    expires: number
    data: string | null
    _count: SessionsCountAggregateOutputType | null
    _avg: SessionsAvgAggregateOutputType | null
    _sum: SessionsSumAggregateOutputType | null
    _min: SessionsMinAggregateOutputType | null
    _max: SessionsMaxAggregateOutputType | null
  }

  type GetSessionsGroupByPayload<T extends SessionsGroupByArgs> = Promise<
    Array<
      PickArray<SessionsGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof SessionsGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], SessionsGroupByOutputType[P]> 
            : GetScalarType<T[P], SessionsGroupByOutputType[P]>
        }
      > 
    >


  export type sessionsSelect = {
    session_id?: boolean
    expires?: boolean
    data?: boolean
  }

  export type sessionsGetPayload<
    S extends boolean | null | undefined | sessionsArgs,
    U = keyof S
      > = S extends true
        ? sessions
    : S extends undefined
    ? never
    : S extends sessionsArgs | sessionsFindManyArgs
    ?'include' extends U
    ? sessions 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof sessions ?sessions [P]
  : 
     never
  } 
    : sessions
  : sessions


  type sessionsCountArgs = Merge<
    Omit<sessionsFindManyArgs, 'select' | 'include'> & {
      select?: SessionsCountAggregateInputType | true
    }
  >

  export interface sessionsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Sessions that matches the filter.
     * @param {sessionsFindUniqueArgs} args - Arguments to find a Sessions
     * @example
     * // Get one Sessions
     * const sessions = await prisma.sessions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends sessionsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, sessionsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'sessions'> extends True ? CheckSelect<T, Prisma__sessionsClient<sessions>, Prisma__sessionsClient<sessionsGetPayload<T>>> : CheckSelect<T, Prisma__sessionsClient<sessions | null >, Prisma__sessionsClient<sessionsGetPayload<T> | null >>

    /**
     * Find the first Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionsFindFirstArgs} args - Arguments to find a Sessions
     * @example
     * // Get one Sessions
     * const sessions = await prisma.sessions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends sessionsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, sessionsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'sessions'> extends True ? CheckSelect<T, Prisma__sessionsClient<sessions>, Prisma__sessionsClient<sessionsGetPayload<T>>> : CheckSelect<T, Prisma__sessionsClient<sessions | null >, Prisma__sessionsClient<sessionsGetPayload<T> | null >>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.sessions.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.sessions.findMany({ take: 10 })
     * 
     * // Only select the `session_id`
     * const sessionsWithSession_idOnly = await prisma.sessions.findMany({ select: { session_id: true } })
     * 
    **/
    findMany<T extends sessionsFindManyArgs>(
      args?: SelectSubset<T, sessionsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<sessions>>, PrismaPromise<Array<sessionsGetPayload<T>>>>

    /**
     * Create a Sessions.
     * @param {sessionsCreateArgs} args - Arguments to create a Sessions.
     * @example
     * // Create one Sessions
     * const Sessions = await prisma.sessions.create({
     *   data: {
     *     // ... data to create a Sessions
     *   }
     * })
     * 
    **/
    create<T extends sessionsCreateArgs>(
      args: SelectSubset<T, sessionsCreateArgs>
    ): CheckSelect<T, Prisma__sessionsClient<sessions>, Prisma__sessionsClient<sessionsGetPayload<T>>>

    /**
     * Create many Sessions.
     *     @param {sessionsCreateManyArgs} args - Arguments to create many Sessions.
     *     @example
     *     // Create many Sessions
     *     const sessions = await prisma.sessions.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends sessionsCreateManyArgs>(
      args?: SelectSubset<T, sessionsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Sessions.
     * @param {sessionsDeleteArgs} args - Arguments to delete one Sessions.
     * @example
     * // Delete one Sessions
     * const Sessions = await prisma.sessions.delete({
     *   where: {
     *     // ... filter to delete one Sessions
     *   }
     * })
     * 
    **/
    delete<T extends sessionsDeleteArgs>(
      args: SelectSubset<T, sessionsDeleteArgs>
    ): CheckSelect<T, Prisma__sessionsClient<sessions>, Prisma__sessionsClient<sessionsGetPayload<T>>>

    /**
     * Update one Sessions.
     * @param {sessionsUpdateArgs} args - Arguments to update one Sessions.
     * @example
     * // Update one Sessions
     * const sessions = await prisma.sessions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends sessionsUpdateArgs>(
      args: SelectSubset<T, sessionsUpdateArgs>
    ): CheckSelect<T, Prisma__sessionsClient<sessions>, Prisma__sessionsClient<sessionsGetPayload<T>>>

    /**
     * Delete zero or more Sessions.
     * @param {sessionsDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.sessions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends sessionsDeleteManyArgs>(
      args?: SelectSubset<T, sessionsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const sessions = await prisma.sessions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends sessionsUpdateManyArgs>(
      args: SelectSubset<T, sessionsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Sessions.
     * @param {sessionsUpsertArgs} args - Arguments to update or create a Sessions.
     * @example
     * // Update or create a Sessions
     * const sessions = await prisma.sessions.upsert({
     *   create: {
     *     // ... data to create a Sessions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sessions we want to update
     *   }
     * })
    **/
    upsert<T extends sessionsUpsertArgs>(
      args: SelectSubset<T, sessionsUpsertArgs>
    ): CheckSelect<T, Prisma__sessionsClient<sessions>, Prisma__sessionsClient<sessionsGetPayload<T>>>

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionsCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.sessions.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends sessionsCountArgs>(
      args?: Subset<T, sessionsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionsAggregateArgs>(args: Subset<T, SessionsAggregateArgs>): PrismaPromise<GetSessionsAggregateType<T>>

    /**
     * Group by Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionsGroupByArgs['orderBy'] }
        : { orderBy?: SessionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionsGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for sessions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__sessionsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * sessions findUnique
   */
  export type sessionsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the sessions
     * 
    **/
    select?: sessionsSelect | null
    /**
     * Throw an Error if a sessions can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which sessions to fetch.
     * 
    **/
    where: sessionsWhereUniqueInput
  }


  /**
   * sessions findFirst
   */
  export type sessionsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the sessions
     * 
    **/
    select?: sessionsSelect | null
    /**
     * Throw an Error if a sessions can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which sessions to fetch.
     * 
    **/
    where?: sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<sessionsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sessions.
     * 
    **/
    cursor?: sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sessions.
     * 
    **/
    distinct?: Enumerable<SessionsScalarFieldEnum>
  }


  /**
   * sessions findMany
   */
  export type sessionsFindManyArgs = {
    /**
     * Select specific fields to fetch from the sessions
     * 
    **/
    select?: sessionsSelect | null
    /**
     * Filter, which sessions to fetch.
     * 
    **/
    where?: sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<sessionsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sessions.
     * 
    **/
    cursor?: sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SessionsScalarFieldEnum>
  }


  /**
   * sessions create
   */
  export type sessionsCreateArgs = {
    /**
     * Select specific fields to fetch from the sessions
     * 
    **/
    select?: sessionsSelect | null
    /**
     * The data needed to create a sessions.
     * 
    **/
    data: XOR<sessionsCreateInput, sessionsUncheckedCreateInput>
  }


  /**
   * sessions createMany
   */
  export type sessionsCreateManyArgs = {
    data: Enumerable<sessionsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * sessions update
   */
  export type sessionsUpdateArgs = {
    /**
     * Select specific fields to fetch from the sessions
     * 
    **/
    select?: sessionsSelect | null
    /**
     * The data needed to update a sessions.
     * 
    **/
    data: XOR<sessionsUpdateInput, sessionsUncheckedUpdateInput>
    /**
     * Choose, which sessions to update.
     * 
    **/
    where: sessionsWhereUniqueInput
  }


  /**
   * sessions updateMany
   */
  export type sessionsUpdateManyArgs = {
    data: XOR<sessionsUpdateManyMutationInput, sessionsUncheckedUpdateManyInput>
    where?: sessionsWhereInput
  }


  /**
   * sessions upsert
   */
  export type sessionsUpsertArgs = {
    /**
     * Select specific fields to fetch from the sessions
     * 
    **/
    select?: sessionsSelect | null
    /**
     * The filter to search for the sessions to update in case it exists.
     * 
    **/
    where: sessionsWhereUniqueInput
    /**
     * In case the sessions found by the `where` argument doesn't exist, create a new sessions with this data.
     * 
    **/
    create: XOR<sessionsCreateInput, sessionsUncheckedCreateInput>
    /**
     * In case the sessions was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<sessionsUpdateInput, sessionsUncheckedUpdateInput>
  }


  /**
   * sessions delete
   */
  export type sessionsDeleteArgs = {
    /**
     * Select specific fields to fetch from the sessions
     * 
    **/
    select?: sessionsSelect | null
    /**
     * Filter which sessions to delete.
     * 
    **/
    where: sessionsWhereUniqueInput
  }


  /**
   * sessions deleteMany
   */
  export type sessionsDeleteManyArgs = {
    where?: sessionsWhereInput
  }


  /**
   * sessions without action
   */
  export type sessionsArgs = {
    /**
     * Select specific fields to fetch from the sessions
     * 
    **/
    select?: sessionsSelect | null
  }



  /**
   * Model Listener
   */


  export type AggregateListener = {
    _count: ListenerCountAggregateOutputType | null
    _avg: ListenerAvgAggregateOutputType | null
    _sum: ListenerSumAggregateOutputType | null
    _min: ListenerMinAggregateOutputType | null
    _max: ListenerMaxAggregateOutputType | null
  }

  export type ListenerAvgAggregateOutputType = {
    id: number | null
  }

  export type ListenerSumAggregateOutputType = {
    id: number | null
  }

  export type ListenerMinAggregateOutputType = {
    id: number | null
    guild: string | null
    channel: string | null
    emoji: string | null
    role: string | null
    message: string | null
  }

  export type ListenerMaxAggregateOutputType = {
    id: number | null
    guild: string | null
    channel: string | null
    emoji: string | null
    role: string | null
    message: string | null
  }

  export type ListenerCountAggregateOutputType = {
    id: number
    guild: number
    channel: number
    emoji: number
    role: number
    message: number
    _all: number
  }


  export type ListenerAvgAggregateInputType = {
    id?: true
  }

  export type ListenerSumAggregateInputType = {
    id?: true
  }

  export type ListenerMinAggregateInputType = {
    id?: true
    guild?: true
    channel?: true
    emoji?: true
    role?: true
    message?: true
  }

  export type ListenerMaxAggregateInputType = {
    id?: true
    guild?: true
    channel?: true
    emoji?: true
    role?: true
    message?: true
  }

  export type ListenerCountAggregateInputType = {
    id?: true
    guild?: true
    channel?: true
    emoji?: true
    role?: true
    message?: true
    _all?: true
  }

  export type ListenerAggregateArgs = {
    /**
     * Filter which Listener to aggregate.
     * 
    **/
    where?: ListenerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listeners to fetch.
     * 
    **/
    orderBy?: Enumerable<ListenerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ListenerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listeners from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listeners.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Listeners
    **/
    _count?: true | ListenerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ListenerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ListenerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListenerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListenerMaxAggregateInputType
  }

  export type GetListenerAggregateType<T extends ListenerAggregateArgs> = {
        [P in keyof T & keyof AggregateListener]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListener[P]>
      : GetScalarType<T[P], AggregateListener[P]>
  }


    
    
  export type ListenerGroupByArgs = {
    where?: ListenerWhereInput
    orderBy?: Enumerable<ListenerOrderByWithAggregationInput>
    by: Array<ListenerScalarFieldEnum>
    having?: ListenerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListenerCountAggregateInputType | true
    _avg?: ListenerAvgAggregateInputType
    _sum?: ListenerSumAggregateInputType
    _min?: ListenerMinAggregateInputType
    _max?: ListenerMaxAggregateInputType
  }


  export type ListenerGroupByOutputType = {
    id: number
    guild: string
    channel: string
    emoji: string
    role: string
    message: string
    _count: ListenerCountAggregateOutputType | null
    _avg: ListenerAvgAggregateOutputType | null
    _sum: ListenerSumAggregateOutputType | null
    _min: ListenerMinAggregateOutputType | null
    _max: ListenerMaxAggregateOutputType | null
  }

  type GetListenerGroupByPayload<T extends ListenerGroupByArgs> = Promise<
    Array<
      PickArray<ListenerGroupByOutputType, T['by']> & 
        {
          [P in ((keyof T) & (keyof ListenerGroupByOutputType))]: P extends '_count' 
            ? T[P] extends boolean 
              ? number 
              : GetScalarType<T[P], ListenerGroupByOutputType[P]> 
            : GetScalarType<T[P], ListenerGroupByOutputType[P]>
        }
      > 
    >


  export type ListenerSelect = {
    id?: boolean
    guild?: boolean
    channel?: boolean
    emoji?: boolean
    role?: boolean
    message?: boolean
  }

  export type ListenerGetPayload<
    S extends boolean | null | undefined | ListenerArgs,
    U = keyof S
      > = S extends true
        ? Listener
    : S extends undefined
    ? never
    : S extends ListenerArgs | ListenerFindManyArgs
    ?'include' extends U
    ? Listener 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof Listener ?Listener [P]
  : 
     never
  } 
    : Listener
  : Listener


  type ListenerCountArgs = Merge<
    Omit<ListenerFindManyArgs, 'select' | 'include'> & {
      select?: ListenerCountAggregateInputType | true
    }
  >

  export interface ListenerDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Listener that matches the filter.
     * @param {ListenerFindUniqueArgs} args - Arguments to find a Listener
     * @example
     * // Get one Listener
     * const listener = await prisma.listener.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ListenerFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ListenerFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Listener'> extends True ? CheckSelect<T, Prisma__ListenerClient<Listener>, Prisma__ListenerClient<ListenerGetPayload<T>>> : CheckSelect<T, Prisma__ListenerClient<Listener | null >, Prisma__ListenerClient<ListenerGetPayload<T> | null >>

    /**
     * Find the first Listener that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListenerFindFirstArgs} args - Arguments to find a Listener
     * @example
     * // Get one Listener
     * const listener = await prisma.listener.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ListenerFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ListenerFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Listener'> extends True ? CheckSelect<T, Prisma__ListenerClient<Listener>, Prisma__ListenerClient<ListenerGetPayload<T>>> : CheckSelect<T, Prisma__ListenerClient<Listener | null >, Prisma__ListenerClient<ListenerGetPayload<T> | null >>

    /**
     * Find zero or more Listeners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListenerFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Listeners
     * const listeners = await prisma.listener.findMany()
     * 
     * // Get first 10 Listeners
     * const listeners = await prisma.listener.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listenerWithIdOnly = await prisma.listener.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ListenerFindManyArgs>(
      args?: SelectSubset<T, ListenerFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Listener>>, PrismaPromise<Array<ListenerGetPayload<T>>>>

    /**
     * Create a Listener.
     * @param {ListenerCreateArgs} args - Arguments to create a Listener.
     * @example
     * // Create one Listener
     * const Listener = await prisma.listener.create({
     *   data: {
     *     // ... data to create a Listener
     *   }
     * })
     * 
    **/
    create<T extends ListenerCreateArgs>(
      args: SelectSubset<T, ListenerCreateArgs>
    ): CheckSelect<T, Prisma__ListenerClient<Listener>, Prisma__ListenerClient<ListenerGetPayload<T>>>

    /**
     * Create many Listeners.
     *     @param {ListenerCreateManyArgs} args - Arguments to create many Listeners.
     *     @example
     *     // Create many Listeners
     *     const listener = await prisma.listener.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ListenerCreateManyArgs>(
      args?: SelectSubset<T, ListenerCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Listener.
     * @param {ListenerDeleteArgs} args - Arguments to delete one Listener.
     * @example
     * // Delete one Listener
     * const Listener = await prisma.listener.delete({
     *   where: {
     *     // ... filter to delete one Listener
     *   }
     * })
     * 
    **/
    delete<T extends ListenerDeleteArgs>(
      args: SelectSubset<T, ListenerDeleteArgs>
    ): CheckSelect<T, Prisma__ListenerClient<Listener>, Prisma__ListenerClient<ListenerGetPayload<T>>>

    /**
     * Update one Listener.
     * @param {ListenerUpdateArgs} args - Arguments to update one Listener.
     * @example
     * // Update one Listener
     * const listener = await prisma.listener.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ListenerUpdateArgs>(
      args: SelectSubset<T, ListenerUpdateArgs>
    ): CheckSelect<T, Prisma__ListenerClient<Listener>, Prisma__ListenerClient<ListenerGetPayload<T>>>

    /**
     * Delete zero or more Listeners.
     * @param {ListenerDeleteManyArgs} args - Arguments to filter Listeners to delete.
     * @example
     * // Delete a few Listeners
     * const { count } = await prisma.listener.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ListenerDeleteManyArgs>(
      args?: SelectSubset<T, ListenerDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Listeners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListenerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Listeners
     * const listener = await prisma.listener.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ListenerUpdateManyArgs>(
      args: SelectSubset<T, ListenerUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Listener.
     * @param {ListenerUpsertArgs} args - Arguments to update or create a Listener.
     * @example
     * // Update or create a Listener
     * const listener = await prisma.listener.upsert({
     *   create: {
     *     // ... data to create a Listener
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Listener we want to update
     *   }
     * })
    **/
    upsert<T extends ListenerUpsertArgs>(
      args: SelectSubset<T, ListenerUpsertArgs>
    ): CheckSelect<T, Prisma__ListenerClient<Listener>, Prisma__ListenerClient<ListenerGetPayload<T>>>

    /**
     * Count the number of Listeners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListenerCountArgs} args - Arguments to filter Listeners to count.
     * @example
     * // Count the number of Listeners
     * const count = await prisma.listener.count({
     *   where: {
     *     // ... the filter for the Listeners we want to count
     *   }
     * })
    **/
    count<T extends ListenerCountArgs>(
      args?: Subset<T, ListenerCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListenerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Listener.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListenerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListenerAggregateArgs>(args: Subset<T, ListenerAggregateArgs>): PrismaPromise<GetListenerAggregateType<T>>

    /**
     * Group by Listener.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListenerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListenerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListenerGroupByArgs['orderBy'] }
        : { orderBy?: ListenerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListenerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListenerGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Listener.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ListenerClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Listener findUnique
   */
  export type ListenerFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Listener
     * 
    **/
    select?: ListenerSelect | null
    /**
     * Throw an Error if a Listener can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Listener to fetch.
     * 
    **/
    where: ListenerWhereUniqueInput
  }


  /**
   * Listener findFirst
   */
  export type ListenerFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Listener
     * 
    **/
    select?: ListenerSelect | null
    /**
     * Throw an Error if a Listener can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Listener to fetch.
     * 
    **/
    where?: ListenerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listeners to fetch.
     * 
    **/
    orderBy?: Enumerable<ListenerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Listeners.
     * 
    **/
    cursor?: ListenerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listeners from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listeners.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listeners.
     * 
    **/
    distinct?: Enumerable<ListenerScalarFieldEnum>
  }


  /**
   * Listener findMany
   */
  export type ListenerFindManyArgs = {
    /**
     * Select specific fields to fetch from the Listener
     * 
    **/
    select?: ListenerSelect | null
    /**
     * Filter, which Listeners to fetch.
     * 
    **/
    where?: ListenerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listeners to fetch.
     * 
    **/
    orderBy?: Enumerable<ListenerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Listeners.
     * 
    **/
    cursor?: ListenerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listeners from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listeners.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ListenerScalarFieldEnum>
  }


  /**
   * Listener create
   */
  export type ListenerCreateArgs = {
    /**
     * Select specific fields to fetch from the Listener
     * 
    **/
    select?: ListenerSelect | null
    /**
     * The data needed to create a Listener.
     * 
    **/
    data: XOR<ListenerCreateInput, ListenerUncheckedCreateInput>
  }


  /**
   * Listener createMany
   */
  export type ListenerCreateManyArgs = {
    data: Enumerable<ListenerCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Listener update
   */
  export type ListenerUpdateArgs = {
    /**
     * Select specific fields to fetch from the Listener
     * 
    **/
    select?: ListenerSelect | null
    /**
     * The data needed to update a Listener.
     * 
    **/
    data: XOR<ListenerUpdateInput, ListenerUncheckedUpdateInput>
    /**
     * Choose, which Listener to update.
     * 
    **/
    where: ListenerWhereUniqueInput
  }


  /**
   * Listener updateMany
   */
  export type ListenerUpdateManyArgs = {
    data: XOR<ListenerUpdateManyMutationInput, ListenerUncheckedUpdateManyInput>
    where?: ListenerWhereInput
  }


  /**
   * Listener upsert
   */
  export type ListenerUpsertArgs = {
    /**
     * Select specific fields to fetch from the Listener
     * 
    **/
    select?: ListenerSelect | null
    /**
     * The filter to search for the Listener to update in case it exists.
     * 
    **/
    where: ListenerWhereUniqueInput
    /**
     * In case the Listener found by the `where` argument doesn't exist, create a new Listener with this data.
     * 
    **/
    create: XOR<ListenerCreateInput, ListenerUncheckedCreateInput>
    /**
     * In case the Listener was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ListenerUpdateInput, ListenerUncheckedUpdateInput>
  }


  /**
   * Listener delete
   */
  export type ListenerDeleteArgs = {
    /**
     * Select specific fields to fetch from the Listener
     * 
    **/
    select?: ListenerSelect | null
    /**
     * Filter which Listener to delete.
     * 
    **/
    where: ListenerWhereUniqueInput
  }


  /**
   * Listener deleteMany
   */
  export type ListenerDeleteManyArgs = {
    where?: ListenerWhereInput
  }


  /**
   * Listener without action
   */
  export type ListenerArgs = {
    /**
     * Select specific fields to fetch from the Listener
     * 
    **/
    select?: ListenerSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const EliksiryScalarFieldEnum: {
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
  };

  export type EliksiryScalarFieldEnum = (typeof EliksiryScalarFieldEnum)[keyof typeof EliksiryScalarFieldEnum]


  export const OczekujaceScalarFieldEnum: {
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
  };

  export type OczekujaceScalarFieldEnum = (typeof OczekujaceScalarFieldEnum)[keyof typeof OczekujaceScalarFieldEnum]


  export const SkladnikiScalarFieldEnum: {
    serial: 'serial',
    nazwa: 'nazwa',
    typ: 'typ',
    cena: 'cena',
    ilosc: 'ilosc',
    jednostka: 'jednostka',
    dostepny: 'dostepny'
  };

  export type SkladnikiScalarFieldEnum = (typeof SkladnikiScalarFieldEnum)[keyof typeof SkladnikiScalarFieldEnum]


  export const ZlaneScalarFieldEnum: {
    id: 'id',
    json: 'json',
    data: 'data'
  };

  export type ZlaneScalarFieldEnum = (typeof ZlaneScalarFieldEnum)[keyof typeof ZlaneScalarFieldEnum]


  export const AutoRolesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    dcid: 'dcid'
  };

  export type AutoRolesScalarFieldEnum = (typeof AutoRolesScalarFieldEnum)[keyof typeof AutoRolesScalarFieldEnum]


  export const BetaTestsScalarFieldEnum: {
    id: 'id',
    ip: 'ip'
  };

  export type BetaTestsScalarFieldEnum = (typeof BetaTestsScalarFieldEnum)[keyof typeof BetaTestsScalarFieldEnum]


  export const CennikScalarFieldEnum: {
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
  };

  export type CennikScalarFieldEnum = (typeof CennikScalarFieldEnum)[keyof typeof CennikScalarFieldEnum]


  export const DiscordInfoScalarFieldEnum: {
    discord: 'discord',
    username: 'username',
    blocked: 'blocked',
    created: 'created',
    discriminator: 'discriminator',
    avatar: 'avatar',
    guilds: 'guilds',
    email: 'email'
  };

  export type DiscordInfoScalarFieldEnum = (typeof DiscordInfoScalarFieldEnum)[keyof typeof DiscordInfoScalarFieldEnum]


  export const KartyScalarFieldEnum: {
    numer: 'numer',
    typ: 'typ',
    nazwa: 'nazwa',
    opis: 'opis'
  };

  export type KartyScalarFieldEnum = (typeof KartyScalarFieldEnum)[keyof typeof KartyScalarFieldEnum]


  export const KopieScalarFieldEnum: {
    serial: 'serial',
    id: 'id',
    uuid: 'uuid',
    nazwa: 'nazwa',
    itemy: 'itemy',
    data: 'data'
  };

  export type KopieScalarFieldEnum = (typeof KopieScalarFieldEnum)[keyof typeof KopieScalarFieldEnum]


  export const LekcjeScalarFieldEnum: {
    id: 'id',
    day: 'day',
    class: 'class',
    repeating: 'repeating',
    name: 'name',
    start: 'start',
    end: 'end',
    place: 'place',
    prof: 'prof'
  };

  export type LekcjeScalarFieldEnum = (typeof LekcjeScalarFieldEnum)[keyof typeof LekcjeScalarFieldEnum]


  export const MainScalarFieldEnum: {
    serial: 'serial',
    id: 'id',
    uuid: 'uuid',
    nazwa: 'nazwa',
    itemy: 'itemy',
    aktualizacja: 'aktualizacja'
  };

  export type MainScalarFieldEnum = (typeof MainScalarFieldEnum)[keyof typeof MainScalarFieldEnum]


  export const MojeKartyScalarFieldEnum: {
    serial: 'serial',
    karta: 'karta',
    uuid: 'uuid'
  };

  export type MojeKartyScalarFieldEnum = (typeof MojeKartyScalarFieldEnum)[keyof typeof MojeKartyScalarFieldEnum]


  export const OnlineScalarFieldEnum: {
    id: 'id',
    data: 'data',
    ilosc: 'ilosc',
    czas: 'czas',
    gracze: 'gracze'
  };

  export type OnlineScalarFieldEnum = (typeof OnlineScalarFieldEnum)[keyof typeof OnlineScalarFieldEnum]


  export const PlanExtraScalarFieldEnum: {
    planid: 'planid',
    Sprof: 'Sprof',
    Splace: 'Splace',
    Sstart: 'Sstart',
    Send: 'Send',
    Sday: 'Sday',
    when: 'when'
  };

  export type PlanExtraScalarFieldEnum = (typeof PlanExtraScalarFieldEnum)[keyof typeof PlanExtraScalarFieldEnum]


  export const PlanfollowScalarFieldEnum: {
    id: 'id',
    user: 'user',
    kl1: 'kl1',
    kl2: 'kl2',
    kl3: 'kl3',
    kl4: 'kl4'
  };

  export type PlanfollowScalarFieldEnum = (typeof PlanfollowScalarFieldEnum)[keyof typeof PlanfollowScalarFieldEnum]


  export const PlayerInfoScalarFieldEnum: {
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
  };

  export type PlayerInfoScalarFieldEnum = (typeof PlayerInfoScalarFieldEnum)[keyof typeof PlayerInfoScalarFieldEnum]


  export const PrzepisyScalarFieldEnum: {
    id: 'id',
    autor: 'autor',
    eliksir: 'eliksir',
    item: 'item',
    oceny: 'oceny',
    ocena: 'ocena',
    cena: 'cena'
  };

  export type PrzepisyScalarFieldEnum = (typeof PrzepisyScalarFieldEnum)[keyof typeof PrzepisyScalarFieldEnum]


  export const RolesScalarFieldEnum: {
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
  };

  export type RolesScalarFieldEnum = (typeof RolesScalarFieldEnum)[keyof typeof RolesScalarFieldEnum]


  export const SessionsScalarFieldEnum: {
    session_id: 'session_id',
    expires: 'expires',
    data: 'data'
  };

  export type SessionsScalarFieldEnum = (typeof SessionsScalarFieldEnum)[keyof typeof SessionsScalarFieldEnum]


  export const ListenerScalarFieldEnum: {
    id: 'id',
    guild: 'guild',
    channel: 'channel',
    emoji: 'emoji',
    role: 'role',
    message: 'message'
  };

  export type ListenerScalarFieldEnum = (typeof ListenerScalarFieldEnum)[keyof typeof ListenerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Deep Input Types
   */


  export type EliksiryWhereInput = {
    AND?: Enumerable<EliksiryWhereInput>
    OR?: Enumerable<EliksiryWhereInput>
    NOT?: Enumerable<EliksiryWhereInput>
    serial?: IntFilter | number
    nazwa?: StringFilter | string
    kolor?: StringFilter | string
    hex?: StringFilter | string
    zapach?: StringFilter | string
    smak?: StringFilter | string
    data?: IntFilter | number
    czas?: StringFilter | string
    inokreacja?: StringFilter | string
    pcena?: IntNullableFilter | number | null
    ile?: IntFilter | number
  }

  export type EliksiryOrderByWithRelationInput = {
    serial?: SortOrder
    nazwa?: SortOrder
    kolor?: SortOrder
    hex?: SortOrder
    zapach?: SortOrder
    smak?: SortOrder
    data?: SortOrder
    czas?: SortOrder
    inokreacja?: SortOrder
    pcena?: SortOrder
    ile?: SortOrder
  }

  export type EliksiryWhereUniqueInput = {
    serial_nazwa?: EliksirySerialNazwaCompoundUniqueInput
  }

  export type EliksiryOrderByWithAggregationInput = {
    serial?: SortOrder
    nazwa?: SortOrder
    kolor?: SortOrder
    hex?: SortOrder
    zapach?: SortOrder
    smak?: SortOrder
    data?: SortOrder
    czas?: SortOrder
    inokreacja?: SortOrder
    pcena?: SortOrder
    ile?: SortOrder
    _count?: EliksiryCountOrderByAggregateInput
    _avg?: EliksiryAvgOrderByAggregateInput
    _max?: EliksiryMaxOrderByAggregateInput
    _min?: EliksiryMinOrderByAggregateInput
    _sum?: EliksirySumOrderByAggregateInput
  }

  export type EliksiryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EliksiryScalarWhereWithAggregatesInput>
    OR?: Enumerable<EliksiryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EliksiryScalarWhereWithAggregatesInput>
    serial?: IntWithAggregatesFilter | number
    nazwa?: StringWithAggregatesFilter | string
    kolor?: StringWithAggregatesFilter | string
    hex?: StringWithAggregatesFilter | string
    zapach?: StringWithAggregatesFilter | string
    smak?: StringWithAggregatesFilter | string
    data?: IntWithAggregatesFilter | number
    czas?: StringWithAggregatesFilter | string
    inokreacja?: StringWithAggregatesFilter | string
    pcena?: IntNullableWithAggregatesFilter | number | null
    ile?: IntWithAggregatesFilter | number
  }

  export type OczekujaceWhereInput = {
    AND?: Enumerable<OczekujaceWhereInput>
    OR?: Enumerable<OczekujaceWhereInput>
    NOT?: Enumerable<OczekujaceWhereInput>
    id?: StringFilter | string
    eliksir?: StringFilter | string
    gracz?: StringFilter | string
    uuid?: StringFilter | string
    discord?: StringNullableFilter | string | null
    przepis?: StringFilter | string
    cena?: IntFilter | number
    odebrane?: IntFilter | number
    weryfikowane?: IntFilter | number
    data_odebrania?: StringNullableFilter | string | null
    kociolek?: StringNullableFilter | string | null
    pdata?: StringNullableFilter | string | null
    pile?: IntNullableFilter | number | null
  }

  export type OczekujaceOrderByWithRelationInput = {
    id?: SortOrder
    eliksir?: SortOrder
    gracz?: SortOrder
    uuid?: SortOrder
    discord?: SortOrder
    przepis?: SortOrder
    cena?: SortOrder
    odebrane?: SortOrder
    weryfikowane?: SortOrder
    data_odebrania?: SortOrder
    kociolek?: SortOrder
    pdata?: SortOrder
    pile?: SortOrder
  }

  export type OczekujaceWhereUniqueInput = {
    id_eliksir?: OczekujaceIdEliksirCompoundUniqueInput
  }

  export type OczekujaceOrderByWithAggregationInput = {
    id?: SortOrder
    eliksir?: SortOrder
    gracz?: SortOrder
    uuid?: SortOrder
    discord?: SortOrder
    przepis?: SortOrder
    cena?: SortOrder
    odebrane?: SortOrder
    weryfikowane?: SortOrder
    data_odebrania?: SortOrder
    kociolek?: SortOrder
    pdata?: SortOrder
    pile?: SortOrder
    _count?: OczekujaceCountOrderByAggregateInput
    _avg?: OczekujaceAvgOrderByAggregateInput
    _max?: OczekujaceMaxOrderByAggregateInput
    _min?: OczekujaceMinOrderByAggregateInput
    _sum?: OczekujaceSumOrderByAggregateInput
  }

  export type OczekujaceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<OczekujaceScalarWhereWithAggregatesInput>
    OR?: Enumerable<OczekujaceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<OczekujaceScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    eliksir?: StringWithAggregatesFilter | string
    gracz?: StringWithAggregatesFilter | string
    uuid?: StringWithAggregatesFilter | string
    discord?: StringNullableWithAggregatesFilter | string | null
    przepis?: StringWithAggregatesFilter | string
    cena?: IntWithAggregatesFilter | number
    odebrane?: IntWithAggregatesFilter | number
    weryfikowane?: IntWithAggregatesFilter | number
    data_odebrania?: StringNullableWithAggregatesFilter | string | null
    kociolek?: StringNullableWithAggregatesFilter | string | null
    pdata?: StringNullableWithAggregatesFilter | string | null
    pile?: IntNullableWithAggregatesFilter | number | null
  }

  export type SkladnikiWhereInput = {
    AND?: Enumerable<SkladnikiWhereInput>
    OR?: Enumerable<SkladnikiWhereInput>
    NOT?: Enumerable<SkladnikiWhereInput>
    serial?: IntFilter | number
    nazwa?: StringFilter | string
    typ?: StringFilter | string
    cena?: FloatFilter | number
    ilosc?: IntFilter | number
    jednostka?: StringFilter | string
    dostepny?: IntFilter | number
  }

  export type SkladnikiOrderByWithRelationInput = {
    serial?: SortOrder
    nazwa?: SortOrder
    typ?: SortOrder
    cena?: SortOrder
    ilosc?: SortOrder
    jednostka?: SortOrder
    dostepny?: SortOrder
  }

  export type SkladnikiWhereUniqueInput = {
    serial?: number
  }

  export type SkladnikiOrderByWithAggregationInput = {
    serial?: SortOrder
    nazwa?: SortOrder
    typ?: SortOrder
    cena?: SortOrder
    ilosc?: SortOrder
    jednostka?: SortOrder
    dostepny?: SortOrder
    _count?: SkladnikiCountOrderByAggregateInput
    _avg?: SkladnikiAvgOrderByAggregateInput
    _max?: SkladnikiMaxOrderByAggregateInput
    _min?: SkladnikiMinOrderByAggregateInput
    _sum?: SkladnikiSumOrderByAggregateInput
  }

  export type SkladnikiScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SkladnikiScalarWhereWithAggregatesInput>
    OR?: Enumerable<SkladnikiScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SkladnikiScalarWhereWithAggregatesInput>
    serial?: IntWithAggregatesFilter | number
    nazwa?: StringWithAggregatesFilter | string
    typ?: StringWithAggregatesFilter | string
    cena?: FloatWithAggregatesFilter | number
    ilosc?: IntWithAggregatesFilter | number
    jednostka?: StringWithAggregatesFilter | string
    dostepny?: IntWithAggregatesFilter | number
  }

  export type ZlaneWhereInput = {
    AND?: Enumerable<ZlaneWhereInput>
    OR?: Enumerable<ZlaneWhereInput>
    NOT?: Enumerable<ZlaneWhereInput>
    id?: StringFilter | string
    json?: StringFilter | string
    data?: StringFilter | string
  }

  export type ZlaneOrderByWithRelationInput = {
    id?: SortOrder
    json?: SortOrder
    data?: SortOrder
  }

  export type ZlaneWhereUniqueInput = {
    id?: string
  }

  export type ZlaneOrderByWithAggregationInput = {
    id?: SortOrder
    json?: SortOrder
    data?: SortOrder
    _count?: ZlaneCountOrderByAggregateInput
    _max?: ZlaneMaxOrderByAggregateInput
    _min?: ZlaneMinOrderByAggregateInput
  }

  export type ZlaneScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ZlaneScalarWhereWithAggregatesInput>
    OR?: Enumerable<ZlaneScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ZlaneScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    json?: StringWithAggregatesFilter | string
    data?: StringWithAggregatesFilter | string
  }

  export type autoRolesWhereInput = {
    AND?: Enumerable<autoRolesWhereInput>
    OR?: Enumerable<autoRolesWhereInput>
    NOT?: Enumerable<autoRolesWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    dcid?: StringFilter | string
  }

  export type autoRolesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    dcid?: SortOrder
  }

  export type autoRolesWhereUniqueInput = {
    id_name?: autoRolesIdNameCompoundUniqueInput
  }

  export type autoRolesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    dcid?: SortOrder
    _count?: autoRolesCountOrderByAggregateInput
    _avg?: autoRolesAvgOrderByAggregateInput
    _max?: autoRolesMaxOrderByAggregateInput
    _min?: autoRolesMinOrderByAggregateInput
    _sum?: autoRolesSumOrderByAggregateInput
  }

  export type autoRolesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<autoRolesScalarWhereWithAggregatesInput>
    OR?: Enumerable<autoRolesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<autoRolesScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    dcid?: StringWithAggregatesFilter | string
  }

  export type betaTestsWhereInput = {
    AND?: Enumerable<betaTestsWhereInput>
    OR?: Enumerable<betaTestsWhereInput>
    NOT?: Enumerable<betaTestsWhereInput>
    id?: IntFilter | number
    ip?: StringFilter | string
  }

  export type betaTestsOrderByWithRelationInput = {
    id?: SortOrder
    ip?: SortOrder
  }

  export type betaTestsWhereUniqueInput = {
    id?: number
  }

  export type betaTestsOrderByWithAggregationInput = {
    id?: SortOrder
    ip?: SortOrder
    _count?: betaTestsCountOrderByAggregateInput
    _avg?: betaTestsAvgOrderByAggregateInput
    _max?: betaTestsMaxOrderByAggregateInput
    _min?: betaTestsMinOrderByAggregateInput
    _sum?: betaTestsSumOrderByAggregateInput
  }

  export type betaTestsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<betaTestsScalarWhereWithAggregatesInput>
    OR?: Enumerable<betaTestsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<betaTestsScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    ip?: StringWithAggregatesFilter | string
  }

  export type cennikWhereInput = {
    AND?: Enumerable<cennikWhereInput>
    OR?: Enumerable<cennikWhereInput>
    NOT?: Enumerable<cennikWhereInput>
    id?: IntFilter | number
    nazwa?: StringFilter | string
    item?: StringNullableFilter | string | null
    cena?: FloatFilter | number
    dostepne?: IntFilter | number
    sale?: IntNullableFilter | number | null
    monly?: IntFilter | number
    msale?: IntNullableFilter | number | null
    wer?: IntFilter | number
    opis?: StringNullableFilter | string | null
    tagi?: StringNullableFilter | string | null
    autor?: StringNullableFilter | string | null
  }

  export type cennikOrderByWithRelationInput = {
    id?: SortOrder
    nazwa?: SortOrder
    item?: SortOrder
    cena?: SortOrder
    dostepne?: SortOrder
    sale?: SortOrder
    monly?: SortOrder
    msale?: SortOrder
    wer?: SortOrder
    opis?: SortOrder
    tagi?: SortOrder
    autor?: SortOrder
  }

  export type cennikWhereUniqueInput = {
    id?: number
  }

  export type cennikOrderByWithAggregationInput = {
    id?: SortOrder
    nazwa?: SortOrder
    item?: SortOrder
    cena?: SortOrder
    dostepne?: SortOrder
    sale?: SortOrder
    monly?: SortOrder
    msale?: SortOrder
    wer?: SortOrder
    opis?: SortOrder
    tagi?: SortOrder
    autor?: SortOrder
    _count?: cennikCountOrderByAggregateInput
    _avg?: cennikAvgOrderByAggregateInput
    _max?: cennikMaxOrderByAggregateInput
    _min?: cennikMinOrderByAggregateInput
    _sum?: cennikSumOrderByAggregateInput
  }

  export type cennikScalarWhereWithAggregatesInput = {
    AND?: Enumerable<cennikScalarWhereWithAggregatesInput>
    OR?: Enumerable<cennikScalarWhereWithAggregatesInput>
    NOT?: Enumerable<cennikScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    nazwa?: StringWithAggregatesFilter | string
    item?: StringNullableWithAggregatesFilter | string | null
    cena?: FloatWithAggregatesFilter | number
    dostepne?: IntWithAggregatesFilter | number
    sale?: IntNullableWithAggregatesFilter | number | null
    monly?: IntWithAggregatesFilter | number
    msale?: IntNullableWithAggregatesFilter | number | null
    wer?: IntWithAggregatesFilter | number
    opis?: StringNullableWithAggregatesFilter | string | null
    tagi?: StringNullableWithAggregatesFilter | string | null
    autor?: StringNullableWithAggregatesFilter | string | null
  }

  export type discordInfoWhereInput = {
    AND?: Enumerable<discordInfoWhereInput>
    OR?: Enumerable<discordInfoWhereInput>
    NOT?: Enumerable<discordInfoWhereInput>
    discord?: StringFilter | string
    username?: StringFilter | string
    blocked?: BoolFilter | boolean
    created?: DateTimeFilter | Date | string
    discriminator?: StringFilter | string
    avatar?: StringNullableFilter | string | null
    guilds?: StringNullableFilter | string | null
    email?: StringNullableFilter | string | null
  }

  export type discordInfoOrderByWithRelationInput = {
    discord?: SortOrder
    username?: SortOrder
    blocked?: SortOrder
    created?: SortOrder
    discriminator?: SortOrder
    avatar?: SortOrder
    guilds?: SortOrder
    email?: SortOrder
  }

  export type discordInfoWhereUniqueInput = {
    discord?: string
  }

  export type discordInfoOrderByWithAggregationInput = {
    discord?: SortOrder
    username?: SortOrder
    blocked?: SortOrder
    created?: SortOrder
    discriminator?: SortOrder
    avatar?: SortOrder
    guilds?: SortOrder
    email?: SortOrder
    _count?: discordInfoCountOrderByAggregateInput
    _max?: discordInfoMaxOrderByAggregateInput
    _min?: discordInfoMinOrderByAggregateInput
  }

  export type discordInfoScalarWhereWithAggregatesInput = {
    AND?: Enumerable<discordInfoScalarWhereWithAggregatesInput>
    OR?: Enumerable<discordInfoScalarWhereWithAggregatesInput>
    NOT?: Enumerable<discordInfoScalarWhereWithAggregatesInput>
    discord?: StringWithAggregatesFilter | string
    username?: StringWithAggregatesFilter | string
    blocked?: BoolWithAggregatesFilter | boolean
    created?: DateTimeWithAggregatesFilter | Date | string
    discriminator?: StringWithAggregatesFilter | string
    avatar?: StringNullableWithAggregatesFilter | string | null
    guilds?: StringNullableWithAggregatesFilter | string | null
    email?: StringNullableWithAggregatesFilter | string | null
  }

  export type kartyWhereInput = {
    AND?: Enumerable<kartyWhereInput>
    OR?: Enumerable<kartyWhereInput>
    NOT?: Enumerable<kartyWhereInput>
    numer?: IntFilter | number
    typ?: StringFilter | string
    nazwa?: StringFilter | string
    opis?: StringFilter | string
  }

  export type kartyOrderByWithRelationInput = {
    numer?: SortOrder
    typ?: SortOrder
    nazwa?: SortOrder
    opis?: SortOrder
  }

  export type kartyWhereUniqueInput = {
    numer?: number
  }

  export type kartyOrderByWithAggregationInput = {
    numer?: SortOrder
    typ?: SortOrder
    nazwa?: SortOrder
    opis?: SortOrder
    _count?: kartyCountOrderByAggregateInput
    _avg?: kartyAvgOrderByAggregateInput
    _max?: kartyMaxOrderByAggregateInput
    _min?: kartyMinOrderByAggregateInput
    _sum?: kartySumOrderByAggregateInput
  }

  export type kartyScalarWhereWithAggregatesInput = {
    AND?: Enumerable<kartyScalarWhereWithAggregatesInput>
    OR?: Enumerable<kartyScalarWhereWithAggregatesInput>
    NOT?: Enumerable<kartyScalarWhereWithAggregatesInput>
    numer?: IntWithAggregatesFilter | number
    typ?: StringWithAggregatesFilter | string
    nazwa?: StringWithAggregatesFilter | string
    opis?: StringWithAggregatesFilter | string
  }

  export type kopieWhereInput = {
    AND?: Enumerable<kopieWhereInput>
    OR?: Enumerable<kopieWhereInput>
    NOT?: Enumerable<kopieWhereInput>
    serial?: IntFilter | number
    id?: IntFilter | number
    uuid?: StringFilter | string
    nazwa?: StringFilter | string
    itemy?: StringFilter | string
    data?: BigIntFilter | bigint | number
  }

  export type kopieOrderByWithRelationInput = {
    serial?: SortOrder
    id?: SortOrder
    uuid?: SortOrder
    nazwa?: SortOrder
    itemy?: SortOrder
    data?: SortOrder
  }

  export type kopieWhereUniqueInput = {
    serial?: number
  }

  export type kopieOrderByWithAggregationInput = {
    serial?: SortOrder
    id?: SortOrder
    uuid?: SortOrder
    nazwa?: SortOrder
    itemy?: SortOrder
    data?: SortOrder
    _count?: kopieCountOrderByAggregateInput
    _avg?: kopieAvgOrderByAggregateInput
    _max?: kopieMaxOrderByAggregateInput
    _min?: kopieMinOrderByAggregateInput
    _sum?: kopieSumOrderByAggregateInput
  }

  export type kopieScalarWhereWithAggregatesInput = {
    AND?: Enumerable<kopieScalarWhereWithAggregatesInput>
    OR?: Enumerable<kopieScalarWhereWithAggregatesInput>
    NOT?: Enumerable<kopieScalarWhereWithAggregatesInput>
    serial?: IntWithAggregatesFilter | number
    id?: IntWithAggregatesFilter | number
    uuid?: StringWithAggregatesFilter | string
    nazwa?: StringWithAggregatesFilter | string
    itemy?: StringWithAggregatesFilter | string
    data?: BigIntWithAggregatesFilter | bigint | number
  }

  export type lekcjeWhereInput = {
    AND?: Enumerable<lekcjeWhereInput>
    OR?: Enumerable<lekcjeWhereInput>
    NOT?: Enumerable<lekcjeWhereInput>
    id?: IntFilter | number
    day?: BoolFilter | boolean
    class?: BoolFilter | boolean
    repeating?: IntNullableFilter | number | null
    name?: StringFilter | string
    start?: StringFilter | string
    end?: StringFilter | string
    place?: StringNullableFilter | string | null
    prof?: StringNullableFilter | string | null
  }

  export type lekcjeOrderByWithRelationInput = {
    id?: SortOrder
    day?: SortOrder
    class?: SortOrder
    repeating?: SortOrder
    name?: SortOrder
    start?: SortOrder
    end?: SortOrder
    place?: SortOrder
    prof?: SortOrder
  }

  export type lekcjeWhereUniqueInput = {
    id?: number
  }

  export type lekcjeOrderByWithAggregationInput = {
    id?: SortOrder
    day?: SortOrder
    class?: SortOrder
    repeating?: SortOrder
    name?: SortOrder
    start?: SortOrder
    end?: SortOrder
    place?: SortOrder
    prof?: SortOrder
    _count?: lekcjeCountOrderByAggregateInput
    _avg?: lekcjeAvgOrderByAggregateInput
    _max?: lekcjeMaxOrderByAggregateInput
    _min?: lekcjeMinOrderByAggregateInput
    _sum?: lekcjeSumOrderByAggregateInput
  }

  export type lekcjeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<lekcjeScalarWhereWithAggregatesInput>
    OR?: Enumerable<lekcjeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<lekcjeScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    day?: BoolWithAggregatesFilter | boolean
    class?: BoolWithAggregatesFilter | boolean
    repeating?: IntNullableWithAggregatesFilter | number | null
    name?: StringWithAggregatesFilter | string
    start?: StringWithAggregatesFilter | string
    end?: StringWithAggregatesFilter | string
    place?: StringNullableWithAggregatesFilter | string | null
    prof?: StringNullableWithAggregatesFilter | string | null
  }

  export type mainWhereInput = {
    AND?: Enumerable<mainWhereInput>
    OR?: Enumerable<mainWhereInput>
    NOT?: Enumerable<mainWhereInput>
    serial?: IntFilter | number
    id?: IntFilter | number
    uuid?: StringFilter | string
    nazwa?: StringFilter | string
    itemy?: StringFilter | string
    aktualizacja?: BigIntFilter | bigint | number
  }

  export type mainOrderByWithRelationInput = {
    serial?: SortOrder
    id?: SortOrder
    uuid?: SortOrder
    nazwa?: SortOrder
    itemy?: SortOrder
    aktualizacja?: SortOrder
  }

  export type mainWhereUniqueInput = {
    serial?: number
  }

  export type mainOrderByWithAggregationInput = {
    serial?: SortOrder
    id?: SortOrder
    uuid?: SortOrder
    nazwa?: SortOrder
    itemy?: SortOrder
    aktualizacja?: SortOrder
    _count?: mainCountOrderByAggregateInput
    _avg?: mainAvgOrderByAggregateInput
    _max?: mainMaxOrderByAggregateInput
    _min?: mainMinOrderByAggregateInput
    _sum?: mainSumOrderByAggregateInput
  }

  export type mainScalarWhereWithAggregatesInput = {
    AND?: Enumerable<mainScalarWhereWithAggregatesInput>
    OR?: Enumerable<mainScalarWhereWithAggregatesInput>
    NOT?: Enumerable<mainScalarWhereWithAggregatesInput>
    serial?: IntWithAggregatesFilter | number
    id?: IntWithAggregatesFilter | number
    uuid?: StringWithAggregatesFilter | string
    nazwa?: StringWithAggregatesFilter | string
    itemy?: StringWithAggregatesFilter | string
    aktualizacja?: BigIntWithAggregatesFilter | bigint | number
  }

  export type mojeKartyWhereInput = {
    AND?: Enumerable<mojeKartyWhereInput>
    OR?: Enumerable<mojeKartyWhereInput>
    NOT?: Enumerable<mojeKartyWhereInput>
    serial?: IntFilter | number
    karta?: IntFilter | number
    uuid?: StringFilter | string
  }

  export type mojeKartyOrderByWithRelationInput = {
    serial?: SortOrder
    karta?: SortOrder
    uuid?: SortOrder
  }

  export type mojeKartyWhereUniqueInput = {
    serial?: number
  }

  export type mojeKartyOrderByWithAggregationInput = {
    serial?: SortOrder
    karta?: SortOrder
    uuid?: SortOrder
    _count?: mojeKartyCountOrderByAggregateInput
    _avg?: mojeKartyAvgOrderByAggregateInput
    _max?: mojeKartyMaxOrderByAggregateInput
    _min?: mojeKartyMinOrderByAggregateInput
    _sum?: mojeKartySumOrderByAggregateInput
  }

  export type mojeKartyScalarWhereWithAggregatesInput = {
    AND?: Enumerable<mojeKartyScalarWhereWithAggregatesInput>
    OR?: Enumerable<mojeKartyScalarWhereWithAggregatesInput>
    NOT?: Enumerable<mojeKartyScalarWhereWithAggregatesInput>
    serial?: IntWithAggregatesFilter | number
    karta?: IntWithAggregatesFilter | number
    uuid?: StringWithAggregatesFilter | string
  }

  export type onlineWhereInput = {
    AND?: Enumerable<onlineWhereInput>
    OR?: Enumerable<onlineWhereInput>
    NOT?: Enumerable<onlineWhereInput>
    id?: IntFilter | number
    data?: DateTimeFilter | Date | string
    ilosc?: IntFilter | number
    czas?: StringFilter | string
    gracze?: StringFilter | string
  }

  export type onlineOrderByWithRelationInput = {
    id?: SortOrder
    data?: SortOrder
    ilosc?: SortOrder
    czas?: SortOrder
    gracze?: SortOrder
  }

  export type onlineWhereUniqueInput = {
    id?: number
  }

  export type onlineOrderByWithAggregationInput = {
    id?: SortOrder
    data?: SortOrder
    ilosc?: SortOrder
    czas?: SortOrder
    gracze?: SortOrder
    _count?: onlineCountOrderByAggregateInput
    _avg?: onlineAvgOrderByAggregateInput
    _max?: onlineMaxOrderByAggregateInput
    _min?: onlineMinOrderByAggregateInput
    _sum?: onlineSumOrderByAggregateInput
  }

  export type onlineScalarWhereWithAggregatesInput = {
    AND?: Enumerable<onlineScalarWhereWithAggregatesInput>
    OR?: Enumerable<onlineScalarWhereWithAggregatesInput>
    NOT?: Enumerable<onlineScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    data?: DateTimeWithAggregatesFilter | Date | string
    ilosc?: IntWithAggregatesFilter | number
    czas?: StringWithAggregatesFilter | string
    gracze?: StringWithAggregatesFilter | string
  }

  export type planExtraWhereInput = {
    AND?: Enumerable<planExtraWhereInput>
    OR?: Enumerable<planExtraWhereInput>
    NOT?: Enumerable<planExtraWhereInput>
    planid?: IntFilter | number
    Sprof?: StringNullableFilter | string | null
    Splace?: StringNullableFilter | string | null
    Sstart?: StringNullableFilter | string | null
    Send?: StringNullableFilter | string | null
    Sday?: BoolNullableFilter | boolean | null
    when?: StringNullableFilter | string | null
  }

  export type planExtraOrderByWithRelationInput = {
    planid?: SortOrder
    Sprof?: SortOrder
    Splace?: SortOrder
    Sstart?: SortOrder
    Send?: SortOrder
    Sday?: SortOrder
    when?: SortOrder
  }

  export type planExtraWhereUniqueInput = {
    planid?: number
  }

  export type planExtraOrderByWithAggregationInput = {
    planid?: SortOrder
    Sprof?: SortOrder
    Splace?: SortOrder
    Sstart?: SortOrder
    Send?: SortOrder
    Sday?: SortOrder
    when?: SortOrder
    _count?: planExtraCountOrderByAggregateInput
    _avg?: planExtraAvgOrderByAggregateInput
    _max?: planExtraMaxOrderByAggregateInput
    _min?: planExtraMinOrderByAggregateInput
    _sum?: planExtraSumOrderByAggregateInput
  }

  export type planExtraScalarWhereWithAggregatesInput = {
    AND?: Enumerable<planExtraScalarWhereWithAggregatesInput>
    OR?: Enumerable<planExtraScalarWhereWithAggregatesInput>
    NOT?: Enumerable<planExtraScalarWhereWithAggregatesInput>
    planid?: IntWithAggregatesFilter | number
    Sprof?: StringNullableWithAggregatesFilter | string | null
    Splace?: StringNullableWithAggregatesFilter | string | null
    Sstart?: StringNullableWithAggregatesFilter | string | null
    Send?: StringNullableWithAggregatesFilter | string | null
    Sday?: BoolNullableWithAggregatesFilter | boolean | null
    when?: StringNullableWithAggregatesFilter | string | null
  }

  export type planfollowWhereInput = {
    AND?: Enumerable<planfollowWhereInput>
    OR?: Enumerable<planfollowWhereInput>
    NOT?: Enumerable<planfollowWhereInput>
    id?: IntFilter | number
    user?: StringFilter | string
    kl1?: BoolFilter | boolean
    kl2?: BoolFilter | boolean
    kl3?: BoolFilter | boolean
    kl4?: BoolFilter | boolean
  }

  export type planfollowOrderByWithRelationInput = {
    id?: SortOrder
    user?: SortOrder
    kl1?: SortOrder
    kl2?: SortOrder
    kl3?: SortOrder
    kl4?: SortOrder
  }

  export type planfollowWhereUniqueInput = {
    id?: number
  }

  export type planfollowOrderByWithAggregationInput = {
    id?: SortOrder
    user?: SortOrder
    kl1?: SortOrder
    kl2?: SortOrder
    kl3?: SortOrder
    kl4?: SortOrder
    _count?: planfollowCountOrderByAggregateInput
    _avg?: planfollowAvgOrderByAggregateInput
    _max?: planfollowMaxOrderByAggregateInput
    _min?: planfollowMinOrderByAggregateInput
    _sum?: planfollowSumOrderByAggregateInput
  }

  export type planfollowScalarWhereWithAggregatesInput = {
    AND?: Enumerable<planfollowScalarWhereWithAggregatesInput>
    OR?: Enumerable<planfollowScalarWhereWithAggregatesInput>
    NOT?: Enumerable<planfollowScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    user?: StringWithAggregatesFilter | string
    kl1?: BoolWithAggregatesFilter | boolean
    kl2?: BoolWithAggregatesFilter | boolean
    kl3?: BoolWithAggregatesFilter | boolean
    kl4?: BoolWithAggregatesFilter | boolean
  }

  export type playerInfoWhereInput = {
    AND?: Enumerable<playerInfoWhereInput>
    OR?: Enumerable<playerInfoWhereInput>
    NOT?: Enumerable<playerInfoWhereInput>
    serial?: IntFilter | number
    discord?: StringNullableFilter | string | null
    nick?: StringFilter | string
    uuid?: StringFilter | string
    displayName?: StringNullableFilter | string | null
    plec?: StringNullableFilter | string | null
    wiek?: IntNullableFilter | number | null
    image?: StringNullableFilter | string | null
    visible?: IntFilter | number
    archived?: IntFilter | number
  }

  export type playerInfoOrderByWithRelationInput = {
    serial?: SortOrder
    discord?: SortOrder
    nick?: SortOrder
    uuid?: SortOrder
    displayName?: SortOrder
    plec?: SortOrder
    wiek?: SortOrder
    image?: SortOrder
    visible?: SortOrder
    archived?: SortOrder
  }

  export type playerInfoWhereUniqueInput = {
    serial?: number
  }

  export type playerInfoOrderByWithAggregationInput = {
    serial?: SortOrder
    discord?: SortOrder
    nick?: SortOrder
    uuid?: SortOrder
    displayName?: SortOrder
    plec?: SortOrder
    wiek?: SortOrder
    image?: SortOrder
    visible?: SortOrder
    archived?: SortOrder
    _count?: playerInfoCountOrderByAggregateInput
    _avg?: playerInfoAvgOrderByAggregateInput
    _max?: playerInfoMaxOrderByAggregateInput
    _min?: playerInfoMinOrderByAggregateInput
    _sum?: playerInfoSumOrderByAggregateInput
  }

  export type playerInfoScalarWhereWithAggregatesInput = {
    AND?: Enumerable<playerInfoScalarWhereWithAggregatesInput>
    OR?: Enumerable<playerInfoScalarWhereWithAggregatesInput>
    NOT?: Enumerable<playerInfoScalarWhereWithAggregatesInput>
    serial?: IntWithAggregatesFilter | number
    discord?: StringNullableWithAggregatesFilter | string | null
    nick?: StringWithAggregatesFilter | string
    uuid?: StringWithAggregatesFilter | string
    displayName?: StringNullableWithAggregatesFilter | string | null
    plec?: StringNullableWithAggregatesFilter | string | null
    wiek?: IntNullableWithAggregatesFilter | number | null
    image?: StringNullableWithAggregatesFilter | string | null
    visible?: IntWithAggregatesFilter | number
    archived?: IntWithAggregatesFilter | number
  }

  export type przepisyWhereInput = {
    AND?: Enumerable<przepisyWhereInput>
    OR?: Enumerable<przepisyWhereInput>
    NOT?: Enumerable<przepisyWhereInput>
    id?: IntFilter | number
    autor?: StringFilter | string
    eliksir?: StringFilter | string
    item?: StringFilter | string
    oceny?: StringFilter | string
    ocena?: IntFilter | number
    cena?: IntFilter | number
  }

  export type przepisyOrderByWithRelationInput = {
    id?: SortOrder
    autor?: SortOrder
    eliksir?: SortOrder
    item?: SortOrder
    oceny?: SortOrder
    ocena?: SortOrder
    cena?: SortOrder
  }

  export type przepisyWhereUniqueInput = {
    id?: number
  }

  export type przepisyOrderByWithAggregationInput = {
    id?: SortOrder
    autor?: SortOrder
    eliksir?: SortOrder
    item?: SortOrder
    oceny?: SortOrder
    ocena?: SortOrder
    cena?: SortOrder
    _count?: przepisyCountOrderByAggregateInput
    _avg?: przepisyAvgOrderByAggregateInput
    _max?: przepisyMaxOrderByAggregateInput
    _min?: przepisyMinOrderByAggregateInput
    _sum?: przepisySumOrderByAggregateInput
  }

  export type przepisyScalarWhereWithAggregatesInput = {
    AND?: Enumerable<przepisyScalarWhereWithAggregatesInput>
    OR?: Enumerable<przepisyScalarWhereWithAggregatesInput>
    NOT?: Enumerable<przepisyScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    autor?: StringWithAggregatesFilter | string
    eliksir?: StringWithAggregatesFilter | string
    item?: StringWithAggregatesFilter | string
    oceny?: StringWithAggregatesFilter | string
    ocena?: IntWithAggregatesFilter | number
    cena?: IntWithAggregatesFilter | number
  }

  export type rolesWhereInput = {
    AND?: Enumerable<rolesWhereInput>
    OR?: Enumerable<rolesWhereInput>
    NOT?: Enumerable<rolesWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    displayname?: StringNullableFilter | string | null
    creator?: StringNullableFilter | string | null
    parent?: StringNullableFilter | string | null
    dcperms?: BigIntNullableFilter | bigint | number | null
    dcid?: StringNullableFilter | string | null
    dccolor?: StringNullableFilter | string | null
    verified?: BoolFilter | boolean
    canResign?: BoolNullableFilter | boolean | null
    isFree?: BoolNullableFilter | boolean | null
    canApply?: BoolNullableFilter | boolean | null
  }

  export type rolesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    displayname?: SortOrder
    creator?: SortOrder
    parent?: SortOrder
    dcperms?: SortOrder
    dcid?: SortOrder
    dccolor?: SortOrder
    verified?: SortOrder
    canResign?: SortOrder
    isFree?: SortOrder
    canApply?: SortOrder
  }

  export type rolesWhereUniqueInput = {
    id_name?: rolesIdNameCompoundUniqueInput
  }

  export type rolesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    displayname?: SortOrder
    creator?: SortOrder
    parent?: SortOrder
    dcperms?: SortOrder
    dcid?: SortOrder
    dccolor?: SortOrder
    verified?: SortOrder
    canResign?: SortOrder
    isFree?: SortOrder
    canApply?: SortOrder
    _count?: rolesCountOrderByAggregateInput
    _avg?: rolesAvgOrderByAggregateInput
    _max?: rolesMaxOrderByAggregateInput
    _min?: rolesMinOrderByAggregateInput
    _sum?: rolesSumOrderByAggregateInput
  }

  export type rolesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<rolesScalarWhereWithAggregatesInput>
    OR?: Enumerable<rolesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<rolesScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    displayname?: StringNullableWithAggregatesFilter | string | null
    creator?: StringNullableWithAggregatesFilter | string | null
    parent?: StringNullableWithAggregatesFilter | string | null
    dcperms?: BigIntNullableWithAggregatesFilter | bigint | number | null
    dcid?: StringNullableWithAggregatesFilter | string | null
    dccolor?: StringNullableWithAggregatesFilter | string | null
    verified?: BoolWithAggregatesFilter | boolean
    canResign?: BoolNullableWithAggregatesFilter | boolean | null
    isFree?: BoolNullableWithAggregatesFilter | boolean | null
    canApply?: BoolNullableWithAggregatesFilter | boolean | null
  }

  export type sessionsWhereInput = {
    AND?: Enumerable<sessionsWhereInput>
    OR?: Enumerable<sessionsWhereInput>
    NOT?: Enumerable<sessionsWhereInput>
    session_id?: StringFilter | string
    expires?: IntFilter | number
    data?: StringNullableFilter | string | null
  }

  export type sessionsOrderByWithRelationInput = {
    session_id?: SortOrder
    expires?: SortOrder
    data?: SortOrder
  }

  export type sessionsWhereUniqueInput = {
    session_id?: string
  }

  export type sessionsOrderByWithAggregationInput = {
    session_id?: SortOrder
    expires?: SortOrder
    data?: SortOrder
    _count?: sessionsCountOrderByAggregateInput
    _avg?: sessionsAvgOrderByAggregateInput
    _max?: sessionsMaxOrderByAggregateInput
    _min?: sessionsMinOrderByAggregateInput
    _sum?: sessionsSumOrderByAggregateInput
  }

  export type sessionsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<sessionsScalarWhereWithAggregatesInput>
    OR?: Enumerable<sessionsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<sessionsScalarWhereWithAggregatesInput>
    session_id?: StringWithAggregatesFilter | string
    expires?: IntWithAggregatesFilter | number
    data?: StringNullableWithAggregatesFilter | string | null
  }

  export type ListenerWhereInput = {
    AND?: Enumerable<ListenerWhereInput>
    OR?: Enumerable<ListenerWhereInput>
    NOT?: Enumerable<ListenerWhereInput>
    id?: IntFilter | number
    guild?: StringFilter | string
    channel?: StringFilter | string
    emoji?: StringFilter | string
    role?: StringFilter | string
    message?: StringFilter | string
  }

  export type ListenerOrderByWithRelationInput = {
    id?: SortOrder
    guild?: SortOrder
    channel?: SortOrder
    emoji?: SortOrder
    role?: SortOrder
    message?: SortOrder
  }

  export type ListenerWhereUniqueInput = {
    id?: number
  }

  export type ListenerOrderByWithAggregationInput = {
    id?: SortOrder
    guild?: SortOrder
    channel?: SortOrder
    emoji?: SortOrder
    role?: SortOrder
    message?: SortOrder
    _count?: ListenerCountOrderByAggregateInput
    _avg?: ListenerAvgOrderByAggregateInput
    _max?: ListenerMaxOrderByAggregateInput
    _min?: ListenerMinOrderByAggregateInput
    _sum?: ListenerSumOrderByAggregateInput
  }

  export type ListenerScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ListenerScalarWhereWithAggregatesInput>
    OR?: Enumerable<ListenerScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ListenerScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    guild?: StringWithAggregatesFilter | string
    channel?: StringWithAggregatesFilter | string
    emoji?: StringWithAggregatesFilter | string
    role?: StringWithAggregatesFilter | string
    message?: StringWithAggregatesFilter | string
  }

  export type EliksiryCreateInput = {
    serial?: number
    nazwa: string
    kolor: string
    hex: string
    zapach?: string
    smak?: string
    data?: number
    czas?: string
    inokreacja: string
    pcena?: number | null
    ile?: number
  }

  export type EliksiryUncheckedCreateInput = {
    serial?: number
    nazwa: string
    kolor: string
    hex: string
    zapach?: string
    smak?: string
    data?: number
    czas?: string
    inokreacja: string
    pcena?: number | null
    ile?: number
  }

  export type EliksiryUpdateInput = {
    serial?: IntFieldUpdateOperationsInput | number
    nazwa?: StringFieldUpdateOperationsInput | string
    kolor?: StringFieldUpdateOperationsInput | string
    hex?: StringFieldUpdateOperationsInput | string
    zapach?: StringFieldUpdateOperationsInput | string
    smak?: StringFieldUpdateOperationsInput | string
    data?: IntFieldUpdateOperationsInput | number
    czas?: StringFieldUpdateOperationsInput | string
    inokreacja?: StringFieldUpdateOperationsInput | string
    pcena?: NullableIntFieldUpdateOperationsInput | number | null
    ile?: IntFieldUpdateOperationsInput | number
  }

  export type EliksiryUncheckedUpdateInput = {
    serial?: IntFieldUpdateOperationsInput | number
    nazwa?: StringFieldUpdateOperationsInput | string
    kolor?: StringFieldUpdateOperationsInput | string
    hex?: StringFieldUpdateOperationsInput | string
    zapach?: StringFieldUpdateOperationsInput | string
    smak?: StringFieldUpdateOperationsInput | string
    data?: IntFieldUpdateOperationsInput | number
    czas?: StringFieldUpdateOperationsInput | string
    inokreacja?: StringFieldUpdateOperationsInput | string
    pcena?: NullableIntFieldUpdateOperationsInput | number | null
    ile?: IntFieldUpdateOperationsInput | number
  }

  export type EliksiryCreateManyInput = {
    serial?: number
    nazwa: string
    kolor: string
    hex: string
    zapach?: string
    smak?: string
    data?: number
    czas?: string
    inokreacja: string
    pcena?: number | null
    ile?: number
  }

  export type EliksiryUpdateManyMutationInput = {
    serial?: IntFieldUpdateOperationsInput | number
    nazwa?: StringFieldUpdateOperationsInput | string
    kolor?: StringFieldUpdateOperationsInput | string
    hex?: StringFieldUpdateOperationsInput | string
    zapach?: StringFieldUpdateOperationsInput | string
    smak?: StringFieldUpdateOperationsInput | string
    data?: IntFieldUpdateOperationsInput | number
    czas?: StringFieldUpdateOperationsInput | string
    inokreacja?: StringFieldUpdateOperationsInput | string
    pcena?: NullableIntFieldUpdateOperationsInput | number | null
    ile?: IntFieldUpdateOperationsInput | number
  }

  export type EliksiryUncheckedUpdateManyInput = {
    serial?: IntFieldUpdateOperationsInput | number
    nazwa?: StringFieldUpdateOperationsInput | string
    kolor?: StringFieldUpdateOperationsInput | string
    hex?: StringFieldUpdateOperationsInput | string
    zapach?: StringFieldUpdateOperationsInput | string
    smak?: StringFieldUpdateOperationsInput | string
    data?: IntFieldUpdateOperationsInput | number
    czas?: StringFieldUpdateOperationsInput | string
    inokreacja?: StringFieldUpdateOperationsInput | string
    pcena?: NullableIntFieldUpdateOperationsInput | number | null
    ile?: IntFieldUpdateOperationsInput | number
  }

  export type OczekujaceCreateInput = {
    id: string
    eliksir: string
    gracz: string
    uuid: string
    discord?: string | null
    przepis: string
    cena?: number
    odebrane?: number
    weryfikowane?: number
    data_odebrania?: string | null
    kociolek?: string | null
    pdata?: string | null
    pile?: number | null
  }

  export type OczekujaceUncheckedCreateInput = {
    id: string
    eliksir: string
    gracz: string
    uuid: string
    discord?: string | null
    przepis: string
    cena?: number
    odebrane?: number
    weryfikowane?: number
    data_odebrania?: string | null
    kociolek?: string | null
    pdata?: string | null
    pile?: number | null
  }

  export type OczekujaceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eliksir?: StringFieldUpdateOperationsInput | string
    gracz?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    przepis?: StringFieldUpdateOperationsInput | string
    cena?: IntFieldUpdateOperationsInput | number
    odebrane?: IntFieldUpdateOperationsInput | number
    weryfikowane?: IntFieldUpdateOperationsInput | number
    data_odebrania?: NullableStringFieldUpdateOperationsInput | string | null
    kociolek?: NullableStringFieldUpdateOperationsInput | string | null
    pdata?: NullableStringFieldUpdateOperationsInput | string | null
    pile?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type OczekujaceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eliksir?: StringFieldUpdateOperationsInput | string
    gracz?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    przepis?: StringFieldUpdateOperationsInput | string
    cena?: IntFieldUpdateOperationsInput | number
    odebrane?: IntFieldUpdateOperationsInput | number
    weryfikowane?: IntFieldUpdateOperationsInput | number
    data_odebrania?: NullableStringFieldUpdateOperationsInput | string | null
    kociolek?: NullableStringFieldUpdateOperationsInput | string | null
    pdata?: NullableStringFieldUpdateOperationsInput | string | null
    pile?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type OczekujaceCreateManyInput = {
    id: string
    eliksir: string
    gracz: string
    uuid: string
    discord?: string | null
    przepis: string
    cena?: number
    odebrane?: number
    weryfikowane?: number
    data_odebrania?: string | null
    kociolek?: string | null
    pdata?: string | null
    pile?: number | null
  }

  export type OczekujaceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eliksir?: StringFieldUpdateOperationsInput | string
    gracz?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    przepis?: StringFieldUpdateOperationsInput | string
    cena?: IntFieldUpdateOperationsInput | number
    odebrane?: IntFieldUpdateOperationsInput | number
    weryfikowane?: IntFieldUpdateOperationsInput | number
    data_odebrania?: NullableStringFieldUpdateOperationsInput | string | null
    kociolek?: NullableStringFieldUpdateOperationsInput | string | null
    pdata?: NullableStringFieldUpdateOperationsInput | string | null
    pile?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type OczekujaceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eliksir?: StringFieldUpdateOperationsInput | string
    gracz?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    przepis?: StringFieldUpdateOperationsInput | string
    cena?: IntFieldUpdateOperationsInput | number
    odebrane?: IntFieldUpdateOperationsInput | number
    weryfikowane?: IntFieldUpdateOperationsInput | number
    data_odebrania?: NullableStringFieldUpdateOperationsInput | string | null
    kociolek?: NullableStringFieldUpdateOperationsInput | string | null
    pdata?: NullableStringFieldUpdateOperationsInput | string | null
    pile?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SkladnikiCreateInput = {
    nazwa: string
    typ: string
    cena: number
    ilosc: number
    jednostka: string
    dostepny?: number
  }

  export type SkladnikiUncheckedCreateInput = {
    serial?: number
    nazwa: string
    typ: string
    cena: number
    ilosc: number
    jednostka: string
    dostepny?: number
  }

  export type SkladnikiUpdateInput = {
    nazwa?: StringFieldUpdateOperationsInput | string
    typ?: StringFieldUpdateOperationsInput | string
    cena?: FloatFieldUpdateOperationsInput | number
    ilosc?: IntFieldUpdateOperationsInput | number
    jednostka?: StringFieldUpdateOperationsInput | string
    dostepny?: IntFieldUpdateOperationsInput | number
  }

  export type SkladnikiUncheckedUpdateInput = {
    serial?: IntFieldUpdateOperationsInput | number
    nazwa?: StringFieldUpdateOperationsInput | string
    typ?: StringFieldUpdateOperationsInput | string
    cena?: FloatFieldUpdateOperationsInput | number
    ilosc?: IntFieldUpdateOperationsInput | number
    jednostka?: StringFieldUpdateOperationsInput | string
    dostepny?: IntFieldUpdateOperationsInput | number
  }

  export type SkladnikiCreateManyInput = {
    serial?: number
    nazwa: string
    typ: string
    cena: number
    ilosc: number
    jednostka: string
    dostepny?: number
  }

  export type SkladnikiUpdateManyMutationInput = {
    nazwa?: StringFieldUpdateOperationsInput | string
    typ?: StringFieldUpdateOperationsInput | string
    cena?: FloatFieldUpdateOperationsInput | number
    ilosc?: IntFieldUpdateOperationsInput | number
    jednostka?: StringFieldUpdateOperationsInput | string
    dostepny?: IntFieldUpdateOperationsInput | number
  }

  export type SkladnikiUncheckedUpdateManyInput = {
    serial?: IntFieldUpdateOperationsInput | number
    nazwa?: StringFieldUpdateOperationsInput | string
    typ?: StringFieldUpdateOperationsInput | string
    cena?: FloatFieldUpdateOperationsInput | number
    ilosc?: IntFieldUpdateOperationsInput | number
    jednostka?: StringFieldUpdateOperationsInput | string
    dostepny?: IntFieldUpdateOperationsInput | number
  }

  export type ZlaneCreateInput = {
    id: string
    json: string
    data: string
  }

  export type ZlaneUncheckedCreateInput = {
    id: string
    json: string
    data: string
  }

  export type ZlaneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    json?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
  }

  export type ZlaneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    json?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
  }

  export type ZlaneCreateManyInput = {
    id: string
    json: string
    data: string
  }

  export type ZlaneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    json?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
  }

  export type ZlaneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    json?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
  }

  export type autoRolesCreateInput = {
    id?: number
    name: string
    dcid: string
  }

  export type autoRolesUncheckedCreateInput = {
    id?: number
    name: string
    dcid: string
  }

  export type autoRolesUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    dcid?: StringFieldUpdateOperationsInput | string
  }

  export type autoRolesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    dcid?: StringFieldUpdateOperationsInput | string
  }

  export type autoRolesCreateManyInput = {
    id?: number
    name: string
    dcid: string
  }

  export type autoRolesUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    dcid?: StringFieldUpdateOperationsInput | string
  }

  export type autoRolesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    dcid?: StringFieldUpdateOperationsInput | string
  }

  export type betaTestsCreateInput = {
    ip: string
  }

  export type betaTestsUncheckedCreateInput = {
    id?: number
    ip: string
  }

  export type betaTestsUpdateInput = {
    ip?: StringFieldUpdateOperationsInput | string
  }

  export type betaTestsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    ip?: StringFieldUpdateOperationsInput | string
  }

  export type betaTestsCreateManyInput = {
    id?: number
    ip: string
  }

  export type betaTestsUpdateManyMutationInput = {
    ip?: StringFieldUpdateOperationsInput | string
  }

  export type betaTestsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    ip?: StringFieldUpdateOperationsInput | string
  }

  export type cennikCreateInput = {
    nazwa: string
    item?: string | null
    cena?: number
    dostepne?: number
    sale?: number | null
    monly?: number
    msale?: number | null
    wer?: number
    opis?: string | null
    tagi?: string | null
    autor?: string | null
  }

  export type cennikUncheckedCreateInput = {
    id?: number
    nazwa: string
    item?: string | null
    cena?: number
    dostepne?: number
    sale?: number | null
    monly?: number
    msale?: number | null
    wer?: number
    opis?: string | null
    tagi?: string | null
    autor?: string | null
  }

  export type cennikUpdateInput = {
    nazwa?: StringFieldUpdateOperationsInput | string
    item?: NullableStringFieldUpdateOperationsInput | string | null
    cena?: FloatFieldUpdateOperationsInput | number
    dostepne?: IntFieldUpdateOperationsInput | number
    sale?: NullableIntFieldUpdateOperationsInput | number | null
    monly?: IntFieldUpdateOperationsInput | number
    msale?: NullableIntFieldUpdateOperationsInput | number | null
    wer?: IntFieldUpdateOperationsInput | number
    opis?: NullableStringFieldUpdateOperationsInput | string | null
    tagi?: NullableStringFieldUpdateOperationsInput | string | null
    autor?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type cennikUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nazwa?: StringFieldUpdateOperationsInput | string
    item?: NullableStringFieldUpdateOperationsInput | string | null
    cena?: FloatFieldUpdateOperationsInput | number
    dostepne?: IntFieldUpdateOperationsInput | number
    sale?: NullableIntFieldUpdateOperationsInput | number | null
    monly?: IntFieldUpdateOperationsInput | number
    msale?: NullableIntFieldUpdateOperationsInput | number | null
    wer?: IntFieldUpdateOperationsInput | number
    opis?: NullableStringFieldUpdateOperationsInput | string | null
    tagi?: NullableStringFieldUpdateOperationsInput | string | null
    autor?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type cennikCreateManyInput = {
    id?: number
    nazwa: string
    item?: string | null
    cena?: number
    dostepne?: number
    sale?: number | null
    monly?: number
    msale?: number | null
    wer?: number
    opis?: string | null
    tagi?: string | null
    autor?: string | null
  }

  export type cennikUpdateManyMutationInput = {
    nazwa?: StringFieldUpdateOperationsInput | string
    item?: NullableStringFieldUpdateOperationsInput | string | null
    cena?: FloatFieldUpdateOperationsInput | number
    dostepne?: IntFieldUpdateOperationsInput | number
    sale?: NullableIntFieldUpdateOperationsInput | number | null
    monly?: IntFieldUpdateOperationsInput | number
    msale?: NullableIntFieldUpdateOperationsInput | number | null
    wer?: IntFieldUpdateOperationsInput | number
    opis?: NullableStringFieldUpdateOperationsInput | string | null
    tagi?: NullableStringFieldUpdateOperationsInput | string | null
    autor?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type cennikUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nazwa?: StringFieldUpdateOperationsInput | string
    item?: NullableStringFieldUpdateOperationsInput | string | null
    cena?: FloatFieldUpdateOperationsInput | number
    dostepne?: IntFieldUpdateOperationsInput | number
    sale?: NullableIntFieldUpdateOperationsInput | number | null
    monly?: IntFieldUpdateOperationsInput | number
    msale?: NullableIntFieldUpdateOperationsInput | number | null
    wer?: IntFieldUpdateOperationsInput | number
    opis?: NullableStringFieldUpdateOperationsInput | string | null
    tagi?: NullableStringFieldUpdateOperationsInput | string | null
    autor?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type discordInfoCreateInput = {
    discord: string
    username: string
    blocked?: boolean
    created?: Date | string
    discriminator: string
    avatar?: string | null
    guilds?: string | null
    email?: string | null
  }

  export type discordInfoUncheckedCreateInput = {
    discord: string
    username: string
    blocked?: boolean
    created?: Date | string
    discriminator: string
    avatar?: string | null
    guilds?: string | null
    email?: string | null
  }

  export type discordInfoUpdateInput = {
    discord?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    blocked?: BoolFieldUpdateOperationsInput | boolean
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    discriminator?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    guilds?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type discordInfoUncheckedUpdateInput = {
    discord?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    blocked?: BoolFieldUpdateOperationsInput | boolean
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    discriminator?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    guilds?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type discordInfoCreateManyInput = {
    discord: string
    username: string
    blocked?: boolean
    created?: Date | string
    discriminator: string
    avatar?: string | null
    guilds?: string | null
    email?: string | null
  }

  export type discordInfoUpdateManyMutationInput = {
    discord?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    blocked?: BoolFieldUpdateOperationsInput | boolean
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    discriminator?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    guilds?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type discordInfoUncheckedUpdateManyInput = {
    discord?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    blocked?: BoolFieldUpdateOperationsInput | boolean
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    discriminator?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    guilds?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type kartyCreateInput = {
    typ: string
    nazwa: string
    opis: string
  }

  export type kartyUncheckedCreateInput = {
    numer?: number
    typ: string
    nazwa: string
    opis: string
  }

  export type kartyUpdateInput = {
    typ?: StringFieldUpdateOperationsInput | string
    nazwa?: StringFieldUpdateOperationsInput | string
    opis?: StringFieldUpdateOperationsInput | string
  }

  export type kartyUncheckedUpdateInput = {
    numer?: IntFieldUpdateOperationsInput | number
    typ?: StringFieldUpdateOperationsInput | string
    nazwa?: StringFieldUpdateOperationsInput | string
    opis?: StringFieldUpdateOperationsInput | string
  }

  export type kartyCreateManyInput = {
    numer?: number
    typ: string
    nazwa: string
    opis: string
  }

  export type kartyUpdateManyMutationInput = {
    typ?: StringFieldUpdateOperationsInput | string
    nazwa?: StringFieldUpdateOperationsInput | string
    opis?: StringFieldUpdateOperationsInput | string
  }

  export type kartyUncheckedUpdateManyInput = {
    numer?: IntFieldUpdateOperationsInput | number
    typ?: StringFieldUpdateOperationsInput | string
    nazwa?: StringFieldUpdateOperationsInput | string
    opis?: StringFieldUpdateOperationsInput | string
  }

  export type kopieCreateInput = {
    id: number
    uuid?: string
    nazwa?: string
    itemy: string
    data: bigint | number
  }

  export type kopieUncheckedCreateInput = {
    serial?: number
    id: number
    uuid?: string
    nazwa?: string
    itemy: string
    data: bigint | number
  }

  export type kopieUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    nazwa?: StringFieldUpdateOperationsInput | string
    itemy?: StringFieldUpdateOperationsInput | string
    data?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type kopieUncheckedUpdateInput = {
    serial?: IntFieldUpdateOperationsInput | number
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    nazwa?: StringFieldUpdateOperationsInput | string
    itemy?: StringFieldUpdateOperationsInput | string
    data?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type kopieCreateManyInput = {
    serial?: number
    id: number
    uuid?: string
    nazwa?: string
    itemy: string
    data: bigint | number
  }

  export type kopieUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    nazwa?: StringFieldUpdateOperationsInput | string
    itemy?: StringFieldUpdateOperationsInput | string
    data?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type kopieUncheckedUpdateManyInput = {
    serial?: IntFieldUpdateOperationsInput | number
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    nazwa?: StringFieldUpdateOperationsInput | string
    itemy?: StringFieldUpdateOperationsInput | string
    data?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type lekcjeCreateInput = {
    day?: boolean
    class?: boolean
    repeating?: number | null
    name: string
    start: string
    end: string
    place?: string | null
    prof?: string | null
  }

  export type lekcjeUncheckedCreateInput = {
    id?: number
    day?: boolean
    class?: boolean
    repeating?: number | null
    name: string
    start: string
    end: string
    place?: string | null
    prof?: string | null
  }

  export type lekcjeUpdateInput = {
    day?: BoolFieldUpdateOperationsInput | boolean
    class?: BoolFieldUpdateOperationsInput | boolean
    repeating?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    start?: StringFieldUpdateOperationsInput | string
    end?: StringFieldUpdateOperationsInput | string
    place?: NullableStringFieldUpdateOperationsInput | string | null
    prof?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type lekcjeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    day?: BoolFieldUpdateOperationsInput | boolean
    class?: BoolFieldUpdateOperationsInput | boolean
    repeating?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    start?: StringFieldUpdateOperationsInput | string
    end?: StringFieldUpdateOperationsInput | string
    place?: NullableStringFieldUpdateOperationsInput | string | null
    prof?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type lekcjeCreateManyInput = {
    id?: number
    day?: boolean
    class?: boolean
    repeating?: number | null
    name: string
    start: string
    end: string
    place?: string | null
    prof?: string | null
  }

  export type lekcjeUpdateManyMutationInput = {
    day?: BoolFieldUpdateOperationsInput | boolean
    class?: BoolFieldUpdateOperationsInput | boolean
    repeating?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    start?: StringFieldUpdateOperationsInput | string
    end?: StringFieldUpdateOperationsInput | string
    place?: NullableStringFieldUpdateOperationsInput | string | null
    prof?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type lekcjeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    day?: BoolFieldUpdateOperationsInput | boolean
    class?: BoolFieldUpdateOperationsInput | boolean
    repeating?: NullableIntFieldUpdateOperationsInput | number | null
    name?: StringFieldUpdateOperationsInput | string
    start?: StringFieldUpdateOperationsInput | string
    end?: StringFieldUpdateOperationsInput | string
    place?: NullableStringFieldUpdateOperationsInput | string | null
    prof?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type mainCreateInput = {
    id: number
    uuid?: string
    nazwa?: string
    itemy: string
    aktualizacja: bigint | number
  }

  export type mainUncheckedCreateInput = {
    serial?: number
    id: number
    uuid?: string
    nazwa?: string
    itemy: string
    aktualizacja: bigint | number
  }

  export type mainUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    nazwa?: StringFieldUpdateOperationsInput | string
    itemy?: StringFieldUpdateOperationsInput | string
    aktualizacja?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type mainUncheckedUpdateInput = {
    serial?: IntFieldUpdateOperationsInput | number
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    nazwa?: StringFieldUpdateOperationsInput | string
    itemy?: StringFieldUpdateOperationsInput | string
    aktualizacja?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type mainCreateManyInput = {
    serial?: number
    id: number
    uuid?: string
    nazwa?: string
    itemy: string
    aktualizacja: bigint | number
  }

  export type mainUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    nazwa?: StringFieldUpdateOperationsInput | string
    itemy?: StringFieldUpdateOperationsInput | string
    aktualizacja?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type mainUncheckedUpdateManyInput = {
    serial?: IntFieldUpdateOperationsInput | number
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    nazwa?: StringFieldUpdateOperationsInput | string
    itemy?: StringFieldUpdateOperationsInput | string
    aktualizacja?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type mojeKartyCreateInput = {
    karta: number
    uuid: string
  }

  export type mojeKartyUncheckedCreateInput = {
    serial?: number
    karta: number
    uuid: string
  }

  export type mojeKartyUpdateInput = {
    karta?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type mojeKartyUncheckedUpdateInput = {
    serial?: IntFieldUpdateOperationsInput | number
    karta?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type mojeKartyCreateManyInput = {
    serial?: number
    karta: number
    uuid: string
  }

  export type mojeKartyUpdateManyMutationInput = {
    karta?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type mojeKartyUncheckedUpdateManyInput = {
    serial?: IntFieldUpdateOperationsInput | number
    karta?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type onlineCreateInput = {
    data: Date | string
    ilosc: number
    czas: string
    gracze: string
  }

  export type onlineUncheckedCreateInput = {
    id?: number
    data: Date | string
    ilosc: number
    czas: string
    gracze: string
  }

  export type onlineUpdateInput = {
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    ilosc?: IntFieldUpdateOperationsInput | number
    czas?: StringFieldUpdateOperationsInput | string
    gracze?: StringFieldUpdateOperationsInput | string
  }

  export type onlineUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    ilosc?: IntFieldUpdateOperationsInput | number
    czas?: StringFieldUpdateOperationsInput | string
    gracze?: StringFieldUpdateOperationsInput | string
  }

  export type onlineCreateManyInput = {
    id?: number
    data: Date | string
    ilosc: number
    czas: string
    gracze: string
  }

  export type onlineUpdateManyMutationInput = {
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    ilosc?: IntFieldUpdateOperationsInput | number
    czas?: StringFieldUpdateOperationsInput | string
    gracze?: StringFieldUpdateOperationsInput | string
  }

  export type onlineUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    ilosc?: IntFieldUpdateOperationsInput | number
    czas?: StringFieldUpdateOperationsInput | string
    gracze?: StringFieldUpdateOperationsInput | string
  }

  export type planExtraCreateInput = {
    planid: number
    Sprof?: string | null
    Splace?: string | null
    Sstart?: string | null
    Send?: string | null
    Sday?: boolean | null
    when?: string | null
  }

  export type planExtraUncheckedCreateInput = {
    planid: number
    Sprof?: string | null
    Splace?: string | null
    Sstart?: string | null
    Send?: string | null
    Sday?: boolean | null
    when?: string | null
  }

  export type planExtraUpdateInput = {
    planid?: IntFieldUpdateOperationsInput | number
    Sprof?: NullableStringFieldUpdateOperationsInput | string | null
    Splace?: NullableStringFieldUpdateOperationsInput | string | null
    Sstart?: NullableStringFieldUpdateOperationsInput | string | null
    Send?: NullableStringFieldUpdateOperationsInput | string | null
    Sday?: NullableBoolFieldUpdateOperationsInput | boolean | null
    when?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type planExtraUncheckedUpdateInput = {
    planid?: IntFieldUpdateOperationsInput | number
    Sprof?: NullableStringFieldUpdateOperationsInput | string | null
    Splace?: NullableStringFieldUpdateOperationsInput | string | null
    Sstart?: NullableStringFieldUpdateOperationsInput | string | null
    Send?: NullableStringFieldUpdateOperationsInput | string | null
    Sday?: NullableBoolFieldUpdateOperationsInput | boolean | null
    when?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type planExtraCreateManyInput = {
    planid: number
    Sprof?: string | null
    Splace?: string | null
    Sstart?: string | null
    Send?: string | null
    Sday?: boolean | null
    when?: string | null
  }

  export type planExtraUpdateManyMutationInput = {
    planid?: IntFieldUpdateOperationsInput | number
    Sprof?: NullableStringFieldUpdateOperationsInput | string | null
    Splace?: NullableStringFieldUpdateOperationsInput | string | null
    Sstart?: NullableStringFieldUpdateOperationsInput | string | null
    Send?: NullableStringFieldUpdateOperationsInput | string | null
    Sday?: NullableBoolFieldUpdateOperationsInput | boolean | null
    when?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type planExtraUncheckedUpdateManyInput = {
    planid?: IntFieldUpdateOperationsInput | number
    Sprof?: NullableStringFieldUpdateOperationsInput | string | null
    Splace?: NullableStringFieldUpdateOperationsInput | string | null
    Sstart?: NullableStringFieldUpdateOperationsInput | string | null
    Send?: NullableStringFieldUpdateOperationsInput | string | null
    Sday?: NullableBoolFieldUpdateOperationsInput | boolean | null
    when?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type planfollowCreateInput = {
    user: string
    kl1?: boolean
    kl2?: boolean
    kl3?: boolean
    kl4?: boolean
  }

  export type planfollowUncheckedCreateInput = {
    id?: number
    user: string
    kl1?: boolean
    kl2?: boolean
    kl3?: boolean
    kl4?: boolean
  }

  export type planfollowUpdateInput = {
    user?: StringFieldUpdateOperationsInput | string
    kl1?: BoolFieldUpdateOperationsInput | boolean
    kl2?: BoolFieldUpdateOperationsInput | boolean
    kl3?: BoolFieldUpdateOperationsInput | boolean
    kl4?: BoolFieldUpdateOperationsInput | boolean
  }

  export type planfollowUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    kl1?: BoolFieldUpdateOperationsInput | boolean
    kl2?: BoolFieldUpdateOperationsInput | boolean
    kl3?: BoolFieldUpdateOperationsInput | boolean
    kl4?: BoolFieldUpdateOperationsInput | boolean
  }

  export type planfollowCreateManyInput = {
    id?: number
    user: string
    kl1?: boolean
    kl2?: boolean
    kl3?: boolean
    kl4?: boolean
  }

  export type planfollowUpdateManyMutationInput = {
    user?: StringFieldUpdateOperationsInput | string
    kl1?: BoolFieldUpdateOperationsInput | boolean
    kl2?: BoolFieldUpdateOperationsInput | boolean
    kl3?: BoolFieldUpdateOperationsInput | boolean
    kl4?: BoolFieldUpdateOperationsInput | boolean
  }

  export type planfollowUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    kl1?: BoolFieldUpdateOperationsInput | boolean
    kl2?: BoolFieldUpdateOperationsInput | boolean
    kl3?: BoolFieldUpdateOperationsInput | boolean
    kl4?: BoolFieldUpdateOperationsInput | boolean
  }

  export type playerInfoCreateInput = {
    discord?: string | null
    nick: string
    uuid: string
    displayName?: string | null
    plec?: string | null
    wiek?: number | null
    image?: string | null
    visible?: number
    archived?: number
  }

  export type playerInfoUncheckedCreateInput = {
    serial?: number
    discord?: string | null
    nick: string
    uuid: string
    displayName?: string | null
    plec?: string | null
    wiek?: number | null
    image?: string | null
    visible?: number
    archived?: number
  }

  export type playerInfoUpdateInput = {
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    nick?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    plec?: NullableStringFieldUpdateOperationsInput | string | null
    wiek?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: IntFieldUpdateOperationsInput | number
    archived?: IntFieldUpdateOperationsInput | number
  }

  export type playerInfoUncheckedUpdateInput = {
    serial?: IntFieldUpdateOperationsInput | number
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    nick?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    plec?: NullableStringFieldUpdateOperationsInput | string | null
    wiek?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: IntFieldUpdateOperationsInput | number
    archived?: IntFieldUpdateOperationsInput | number
  }

  export type playerInfoCreateManyInput = {
    serial?: number
    discord?: string | null
    nick: string
    uuid: string
    displayName?: string | null
    plec?: string | null
    wiek?: number | null
    image?: string | null
    visible?: number
    archived?: number
  }

  export type playerInfoUpdateManyMutationInput = {
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    nick?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    plec?: NullableStringFieldUpdateOperationsInput | string | null
    wiek?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: IntFieldUpdateOperationsInput | number
    archived?: IntFieldUpdateOperationsInput | number
  }

  export type playerInfoUncheckedUpdateManyInput = {
    serial?: IntFieldUpdateOperationsInput | number
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    nick?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    plec?: NullableStringFieldUpdateOperationsInput | string | null
    wiek?: NullableIntFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: IntFieldUpdateOperationsInput | number
    archived?: IntFieldUpdateOperationsInput | number
  }

  export type przepisyCreateInput = {
    autor: string
    eliksir: string
    item: string
    oceny?: string
    ocena?: number
    cena?: number
  }

  export type przepisyUncheckedCreateInput = {
    id?: number
    autor: string
    eliksir: string
    item: string
    oceny?: string
    ocena?: number
    cena?: number
  }

  export type przepisyUpdateInput = {
    autor?: StringFieldUpdateOperationsInput | string
    eliksir?: StringFieldUpdateOperationsInput | string
    item?: StringFieldUpdateOperationsInput | string
    oceny?: StringFieldUpdateOperationsInput | string
    ocena?: IntFieldUpdateOperationsInput | number
    cena?: IntFieldUpdateOperationsInput | number
  }

  export type przepisyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    autor?: StringFieldUpdateOperationsInput | string
    eliksir?: StringFieldUpdateOperationsInput | string
    item?: StringFieldUpdateOperationsInput | string
    oceny?: StringFieldUpdateOperationsInput | string
    ocena?: IntFieldUpdateOperationsInput | number
    cena?: IntFieldUpdateOperationsInput | number
  }

  export type przepisyCreateManyInput = {
    id?: number
    autor: string
    eliksir: string
    item: string
    oceny?: string
    ocena?: number
    cena?: number
  }

  export type przepisyUpdateManyMutationInput = {
    autor?: StringFieldUpdateOperationsInput | string
    eliksir?: StringFieldUpdateOperationsInput | string
    item?: StringFieldUpdateOperationsInput | string
    oceny?: StringFieldUpdateOperationsInput | string
    ocena?: IntFieldUpdateOperationsInput | number
    cena?: IntFieldUpdateOperationsInput | number
  }

  export type przepisyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    autor?: StringFieldUpdateOperationsInput | string
    eliksir?: StringFieldUpdateOperationsInput | string
    item?: StringFieldUpdateOperationsInput | string
    oceny?: StringFieldUpdateOperationsInput | string
    ocena?: IntFieldUpdateOperationsInput | number
    cena?: IntFieldUpdateOperationsInput | number
  }

  export type rolesCreateInput = {
    id?: number
    name: string
    displayname?: string | null
    creator?: string | null
    parent?: string | null
    dcperms?: bigint | number | null
    dcid?: string | null
    dccolor?: string | null
    verified?: boolean
    canResign?: boolean | null
    isFree?: boolean | null
    canApply?: boolean | null
  }

  export type rolesUncheckedCreateInput = {
    id?: number
    name: string
    displayname?: string | null
    creator?: string | null
    parent?: string | null
    dcperms?: bigint | number | null
    dcid?: string | null
    dccolor?: string | null
    verified?: boolean
    canResign?: boolean | null
    isFree?: boolean | null
    canApply?: boolean | null
  }

  export type rolesUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    displayname?: NullableStringFieldUpdateOperationsInput | string | null
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    parent?: NullableStringFieldUpdateOperationsInput | string | null
    dcperms?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    dcid?: NullableStringFieldUpdateOperationsInput | string | null
    dccolor?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    canResign?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isFree?: NullableBoolFieldUpdateOperationsInput | boolean | null
    canApply?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type rolesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    displayname?: NullableStringFieldUpdateOperationsInput | string | null
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    parent?: NullableStringFieldUpdateOperationsInput | string | null
    dcperms?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    dcid?: NullableStringFieldUpdateOperationsInput | string | null
    dccolor?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    canResign?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isFree?: NullableBoolFieldUpdateOperationsInput | boolean | null
    canApply?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type rolesCreateManyInput = {
    id?: number
    name: string
    displayname?: string | null
    creator?: string | null
    parent?: string | null
    dcperms?: bigint | number | null
    dcid?: string | null
    dccolor?: string | null
    verified?: boolean
    canResign?: boolean | null
    isFree?: boolean | null
    canApply?: boolean | null
  }

  export type rolesUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    displayname?: NullableStringFieldUpdateOperationsInput | string | null
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    parent?: NullableStringFieldUpdateOperationsInput | string | null
    dcperms?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    dcid?: NullableStringFieldUpdateOperationsInput | string | null
    dccolor?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    canResign?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isFree?: NullableBoolFieldUpdateOperationsInput | boolean | null
    canApply?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type rolesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    displayname?: NullableStringFieldUpdateOperationsInput | string | null
    creator?: NullableStringFieldUpdateOperationsInput | string | null
    parent?: NullableStringFieldUpdateOperationsInput | string | null
    dcperms?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    dcid?: NullableStringFieldUpdateOperationsInput | string | null
    dccolor?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    canResign?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isFree?: NullableBoolFieldUpdateOperationsInput | boolean | null
    canApply?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type sessionsCreateInput = {
    session_id: string
    expires: number
    data?: string | null
  }

  export type sessionsUncheckedCreateInput = {
    session_id: string
    expires: number
    data?: string | null
  }

  export type sessionsUpdateInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    expires?: IntFieldUpdateOperationsInput | number
    data?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sessionsUncheckedUpdateInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    expires?: IntFieldUpdateOperationsInput | number
    data?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sessionsCreateManyInput = {
    session_id: string
    expires: number
    data?: string | null
  }

  export type sessionsUpdateManyMutationInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    expires?: IntFieldUpdateOperationsInput | number
    data?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sessionsUncheckedUpdateManyInput = {
    session_id?: StringFieldUpdateOperationsInput | string
    expires?: IntFieldUpdateOperationsInput | number
    data?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ListenerCreateInput = {
    guild: string
    channel: string
    emoji: string
    role: string
    message: string
  }

  export type ListenerUncheckedCreateInput = {
    id?: number
    guild: string
    channel: string
    emoji: string
    role: string
    message: string
  }

  export type ListenerUpdateInput = {
    guild?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
  }

  export type ListenerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    guild?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
  }

  export type ListenerCreateManyInput = {
    id?: number
    guild: string
    channel: string
    emoji: string
    role: string
    message: string
  }

  export type ListenerUpdateManyMutationInput = {
    guild?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
  }

  export type ListenerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    guild?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    emoji?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type EliksirySerialNazwaCompoundUniqueInput = {
    serial: number
    nazwa: string
  }

  export type EliksiryCountOrderByAggregateInput = {
    serial?: SortOrder
    nazwa?: SortOrder
    kolor?: SortOrder
    hex?: SortOrder
    zapach?: SortOrder
    smak?: SortOrder
    data?: SortOrder
    czas?: SortOrder
    inokreacja?: SortOrder
    pcena?: SortOrder
    ile?: SortOrder
  }

  export type EliksiryAvgOrderByAggregateInput = {
    serial?: SortOrder
    data?: SortOrder
    pcena?: SortOrder
    ile?: SortOrder
  }

  export type EliksiryMaxOrderByAggregateInput = {
    serial?: SortOrder
    nazwa?: SortOrder
    kolor?: SortOrder
    hex?: SortOrder
    zapach?: SortOrder
    smak?: SortOrder
    data?: SortOrder
    czas?: SortOrder
    inokreacja?: SortOrder
    pcena?: SortOrder
    ile?: SortOrder
  }

  export type EliksiryMinOrderByAggregateInput = {
    serial?: SortOrder
    nazwa?: SortOrder
    kolor?: SortOrder
    hex?: SortOrder
    zapach?: SortOrder
    smak?: SortOrder
    data?: SortOrder
    czas?: SortOrder
    inokreacja?: SortOrder
    pcena?: SortOrder
    ile?: SortOrder
  }

  export type EliksirySumOrderByAggregateInput = {
    serial?: SortOrder
    data?: SortOrder
    pcena?: SortOrder
    ile?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type OczekujaceIdEliksirCompoundUniqueInput = {
    id: string
    eliksir: string
  }

  export type OczekujaceCountOrderByAggregateInput = {
    id?: SortOrder
    eliksir?: SortOrder
    gracz?: SortOrder
    uuid?: SortOrder
    discord?: SortOrder
    przepis?: SortOrder
    cena?: SortOrder
    odebrane?: SortOrder
    weryfikowane?: SortOrder
    data_odebrania?: SortOrder
    kociolek?: SortOrder
    pdata?: SortOrder
    pile?: SortOrder
  }

  export type OczekujaceAvgOrderByAggregateInput = {
    cena?: SortOrder
    odebrane?: SortOrder
    weryfikowane?: SortOrder
    pile?: SortOrder
  }

  export type OczekujaceMaxOrderByAggregateInput = {
    id?: SortOrder
    eliksir?: SortOrder
    gracz?: SortOrder
    uuid?: SortOrder
    discord?: SortOrder
    przepis?: SortOrder
    cena?: SortOrder
    odebrane?: SortOrder
    weryfikowane?: SortOrder
    data_odebrania?: SortOrder
    kociolek?: SortOrder
    pdata?: SortOrder
    pile?: SortOrder
  }

  export type OczekujaceMinOrderByAggregateInput = {
    id?: SortOrder
    eliksir?: SortOrder
    gracz?: SortOrder
    uuid?: SortOrder
    discord?: SortOrder
    przepis?: SortOrder
    cena?: SortOrder
    odebrane?: SortOrder
    weryfikowane?: SortOrder
    data_odebrania?: SortOrder
    kociolek?: SortOrder
    pdata?: SortOrder
    pile?: SortOrder
  }

  export type OczekujaceSumOrderByAggregateInput = {
    cena?: SortOrder
    odebrane?: SortOrder
    weryfikowane?: SortOrder
    pile?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type FloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type SkladnikiCountOrderByAggregateInput = {
    serial?: SortOrder
    nazwa?: SortOrder
    typ?: SortOrder
    cena?: SortOrder
    ilosc?: SortOrder
    jednostka?: SortOrder
    dostepny?: SortOrder
  }

  export type SkladnikiAvgOrderByAggregateInput = {
    serial?: SortOrder
    cena?: SortOrder
    ilosc?: SortOrder
    dostepny?: SortOrder
  }

  export type SkladnikiMaxOrderByAggregateInput = {
    serial?: SortOrder
    nazwa?: SortOrder
    typ?: SortOrder
    cena?: SortOrder
    ilosc?: SortOrder
    jednostka?: SortOrder
    dostepny?: SortOrder
  }

  export type SkladnikiMinOrderByAggregateInput = {
    serial?: SortOrder
    nazwa?: SortOrder
    typ?: SortOrder
    cena?: SortOrder
    ilosc?: SortOrder
    jednostka?: SortOrder
    dostepny?: SortOrder
  }

  export type SkladnikiSumOrderByAggregateInput = {
    serial?: SortOrder
    cena?: SortOrder
    ilosc?: SortOrder
    dostepny?: SortOrder
  }

  export type FloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type ZlaneCountOrderByAggregateInput = {
    id?: SortOrder
    json?: SortOrder
    data?: SortOrder
  }

  export type ZlaneMaxOrderByAggregateInput = {
    id?: SortOrder
    json?: SortOrder
    data?: SortOrder
  }

  export type ZlaneMinOrderByAggregateInput = {
    id?: SortOrder
    json?: SortOrder
    data?: SortOrder
  }

  export type autoRolesIdNameCompoundUniqueInput = {
    id: number
    name: string
  }

  export type autoRolesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    dcid?: SortOrder
  }

  export type autoRolesAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type autoRolesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    dcid?: SortOrder
  }

  export type autoRolesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    dcid?: SortOrder
  }

  export type autoRolesSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type betaTestsCountOrderByAggregateInput = {
    id?: SortOrder
    ip?: SortOrder
  }

  export type betaTestsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type betaTestsMaxOrderByAggregateInput = {
    id?: SortOrder
    ip?: SortOrder
  }

  export type betaTestsMinOrderByAggregateInput = {
    id?: SortOrder
    ip?: SortOrder
  }

  export type betaTestsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type cennikCountOrderByAggregateInput = {
    id?: SortOrder
    nazwa?: SortOrder
    item?: SortOrder
    cena?: SortOrder
    dostepne?: SortOrder
    sale?: SortOrder
    monly?: SortOrder
    msale?: SortOrder
    wer?: SortOrder
    opis?: SortOrder
    tagi?: SortOrder
    autor?: SortOrder
  }

  export type cennikAvgOrderByAggregateInput = {
    id?: SortOrder
    cena?: SortOrder
    dostepne?: SortOrder
    sale?: SortOrder
    monly?: SortOrder
    msale?: SortOrder
    wer?: SortOrder
  }

  export type cennikMaxOrderByAggregateInput = {
    id?: SortOrder
    nazwa?: SortOrder
    item?: SortOrder
    cena?: SortOrder
    dostepne?: SortOrder
    sale?: SortOrder
    monly?: SortOrder
    msale?: SortOrder
    wer?: SortOrder
    opis?: SortOrder
    tagi?: SortOrder
    autor?: SortOrder
  }

  export type cennikMinOrderByAggregateInput = {
    id?: SortOrder
    nazwa?: SortOrder
    item?: SortOrder
    cena?: SortOrder
    dostepne?: SortOrder
    sale?: SortOrder
    monly?: SortOrder
    msale?: SortOrder
    wer?: SortOrder
    opis?: SortOrder
    tagi?: SortOrder
    autor?: SortOrder
  }

  export type cennikSumOrderByAggregateInput = {
    id?: SortOrder
    cena?: SortOrder
    dostepne?: SortOrder
    sale?: SortOrder
    monly?: SortOrder
    msale?: SortOrder
    wer?: SortOrder
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type discordInfoCountOrderByAggregateInput = {
    discord?: SortOrder
    username?: SortOrder
    blocked?: SortOrder
    created?: SortOrder
    discriminator?: SortOrder
    avatar?: SortOrder
    guilds?: SortOrder
    email?: SortOrder
  }

  export type discordInfoMaxOrderByAggregateInput = {
    discord?: SortOrder
    username?: SortOrder
    blocked?: SortOrder
    created?: SortOrder
    discriminator?: SortOrder
    avatar?: SortOrder
    guilds?: SortOrder
    email?: SortOrder
  }

  export type discordInfoMinOrderByAggregateInput = {
    discord?: SortOrder
    username?: SortOrder
    blocked?: SortOrder
    created?: SortOrder
    discriminator?: SortOrder
    avatar?: SortOrder
    guilds?: SortOrder
    email?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type kartyCountOrderByAggregateInput = {
    numer?: SortOrder
    typ?: SortOrder
    nazwa?: SortOrder
    opis?: SortOrder
  }

  export type kartyAvgOrderByAggregateInput = {
    numer?: SortOrder
  }

  export type kartyMaxOrderByAggregateInput = {
    numer?: SortOrder
    typ?: SortOrder
    nazwa?: SortOrder
    opis?: SortOrder
  }

  export type kartyMinOrderByAggregateInput = {
    numer?: SortOrder
    typ?: SortOrder
    nazwa?: SortOrder
    opis?: SortOrder
  }

  export type kartySumOrderByAggregateInput = {
    numer?: SortOrder
  }

  export type BigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type kopieCountOrderByAggregateInput = {
    serial?: SortOrder
    id?: SortOrder
    uuid?: SortOrder
    nazwa?: SortOrder
    itemy?: SortOrder
    data?: SortOrder
  }

  export type kopieAvgOrderByAggregateInput = {
    serial?: SortOrder
    id?: SortOrder
    data?: SortOrder
  }

  export type kopieMaxOrderByAggregateInput = {
    serial?: SortOrder
    id?: SortOrder
    uuid?: SortOrder
    nazwa?: SortOrder
    itemy?: SortOrder
    data?: SortOrder
  }

  export type kopieMinOrderByAggregateInput = {
    serial?: SortOrder
    id?: SortOrder
    uuid?: SortOrder
    nazwa?: SortOrder
    itemy?: SortOrder
    data?: SortOrder
  }

  export type kopieSumOrderByAggregateInput = {
    serial?: SortOrder
    id?: SortOrder
    data?: SortOrder
  }

  export type BigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
  }

  export type lekcjeCountOrderByAggregateInput = {
    id?: SortOrder
    day?: SortOrder
    class?: SortOrder
    repeating?: SortOrder
    name?: SortOrder
    start?: SortOrder
    end?: SortOrder
    place?: SortOrder
    prof?: SortOrder
  }

  export type lekcjeAvgOrderByAggregateInput = {
    id?: SortOrder
    repeating?: SortOrder
  }

  export type lekcjeMaxOrderByAggregateInput = {
    id?: SortOrder
    day?: SortOrder
    class?: SortOrder
    repeating?: SortOrder
    name?: SortOrder
    start?: SortOrder
    end?: SortOrder
    place?: SortOrder
    prof?: SortOrder
  }

  export type lekcjeMinOrderByAggregateInput = {
    id?: SortOrder
    day?: SortOrder
    class?: SortOrder
    repeating?: SortOrder
    name?: SortOrder
    start?: SortOrder
    end?: SortOrder
    place?: SortOrder
    prof?: SortOrder
  }

  export type lekcjeSumOrderByAggregateInput = {
    id?: SortOrder
    repeating?: SortOrder
  }

  export type mainCountOrderByAggregateInput = {
    serial?: SortOrder
    id?: SortOrder
    uuid?: SortOrder
    nazwa?: SortOrder
    itemy?: SortOrder
    aktualizacja?: SortOrder
  }

  export type mainAvgOrderByAggregateInput = {
    serial?: SortOrder
    id?: SortOrder
    aktualizacja?: SortOrder
  }

  export type mainMaxOrderByAggregateInput = {
    serial?: SortOrder
    id?: SortOrder
    uuid?: SortOrder
    nazwa?: SortOrder
    itemy?: SortOrder
    aktualizacja?: SortOrder
  }

  export type mainMinOrderByAggregateInput = {
    serial?: SortOrder
    id?: SortOrder
    uuid?: SortOrder
    nazwa?: SortOrder
    itemy?: SortOrder
    aktualizacja?: SortOrder
  }

  export type mainSumOrderByAggregateInput = {
    serial?: SortOrder
    id?: SortOrder
    aktualizacja?: SortOrder
  }

  export type mojeKartyCountOrderByAggregateInput = {
    serial?: SortOrder
    karta?: SortOrder
    uuid?: SortOrder
  }

  export type mojeKartyAvgOrderByAggregateInput = {
    serial?: SortOrder
    karta?: SortOrder
  }

  export type mojeKartyMaxOrderByAggregateInput = {
    serial?: SortOrder
    karta?: SortOrder
    uuid?: SortOrder
  }

  export type mojeKartyMinOrderByAggregateInput = {
    serial?: SortOrder
    karta?: SortOrder
    uuid?: SortOrder
  }

  export type mojeKartySumOrderByAggregateInput = {
    serial?: SortOrder
    karta?: SortOrder
  }

  export type onlineCountOrderByAggregateInput = {
    id?: SortOrder
    data?: SortOrder
    ilosc?: SortOrder
    czas?: SortOrder
    gracze?: SortOrder
  }

  export type onlineAvgOrderByAggregateInput = {
    id?: SortOrder
    ilosc?: SortOrder
  }

  export type onlineMaxOrderByAggregateInput = {
    id?: SortOrder
    data?: SortOrder
    ilosc?: SortOrder
    czas?: SortOrder
    gracze?: SortOrder
  }

  export type onlineMinOrderByAggregateInput = {
    id?: SortOrder
    data?: SortOrder
    ilosc?: SortOrder
    czas?: SortOrder
    gracze?: SortOrder
  }

  export type onlineSumOrderByAggregateInput = {
    id?: SortOrder
    ilosc?: SortOrder
  }

  export type BoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type planExtraCountOrderByAggregateInput = {
    planid?: SortOrder
    Sprof?: SortOrder
    Splace?: SortOrder
    Sstart?: SortOrder
    Send?: SortOrder
    Sday?: SortOrder
    when?: SortOrder
  }

  export type planExtraAvgOrderByAggregateInput = {
    planid?: SortOrder
  }

  export type planExtraMaxOrderByAggregateInput = {
    planid?: SortOrder
    Sprof?: SortOrder
    Splace?: SortOrder
    Sstart?: SortOrder
    Send?: SortOrder
    Sday?: SortOrder
    when?: SortOrder
  }

  export type planExtraMinOrderByAggregateInput = {
    planid?: SortOrder
    Sprof?: SortOrder
    Splace?: SortOrder
    Sstart?: SortOrder
    Send?: SortOrder
    Sday?: SortOrder
    when?: SortOrder
  }

  export type planExtraSumOrderByAggregateInput = {
    planid?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type planfollowCountOrderByAggregateInput = {
    id?: SortOrder
    user?: SortOrder
    kl1?: SortOrder
    kl2?: SortOrder
    kl3?: SortOrder
    kl4?: SortOrder
  }

  export type planfollowAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type planfollowMaxOrderByAggregateInput = {
    id?: SortOrder
    user?: SortOrder
    kl1?: SortOrder
    kl2?: SortOrder
    kl3?: SortOrder
    kl4?: SortOrder
  }

  export type planfollowMinOrderByAggregateInput = {
    id?: SortOrder
    user?: SortOrder
    kl1?: SortOrder
    kl2?: SortOrder
    kl3?: SortOrder
    kl4?: SortOrder
  }

  export type planfollowSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type playerInfoCountOrderByAggregateInput = {
    serial?: SortOrder
    discord?: SortOrder
    nick?: SortOrder
    uuid?: SortOrder
    displayName?: SortOrder
    plec?: SortOrder
    wiek?: SortOrder
    image?: SortOrder
    visible?: SortOrder
    archived?: SortOrder
  }

  export type playerInfoAvgOrderByAggregateInput = {
    serial?: SortOrder
    wiek?: SortOrder
    visible?: SortOrder
    archived?: SortOrder
  }

  export type playerInfoMaxOrderByAggregateInput = {
    serial?: SortOrder
    discord?: SortOrder
    nick?: SortOrder
    uuid?: SortOrder
    displayName?: SortOrder
    plec?: SortOrder
    wiek?: SortOrder
    image?: SortOrder
    visible?: SortOrder
    archived?: SortOrder
  }

  export type playerInfoMinOrderByAggregateInput = {
    serial?: SortOrder
    discord?: SortOrder
    nick?: SortOrder
    uuid?: SortOrder
    displayName?: SortOrder
    plec?: SortOrder
    wiek?: SortOrder
    image?: SortOrder
    visible?: SortOrder
    archived?: SortOrder
  }

  export type playerInfoSumOrderByAggregateInput = {
    serial?: SortOrder
    wiek?: SortOrder
    visible?: SortOrder
    archived?: SortOrder
  }

  export type przepisyCountOrderByAggregateInput = {
    id?: SortOrder
    autor?: SortOrder
    eliksir?: SortOrder
    item?: SortOrder
    oceny?: SortOrder
    ocena?: SortOrder
    cena?: SortOrder
  }

  export type przepisyAvgOrderByAggregateInput = {
    id?: SortOrder
    ocena?: SortOrder
    cena?: SortOrder
  }

  export type przepisyMaxOrderByAggregateInput = {
    id?: SortOrder
    autor?: SortOrder
    eliksir?: SortOrder
    item?: SortOrder
    oceny?: SortOrder
    ocena?: SortOrder
    cena?: SortOrder
  }

  export type przepisyMinOrderByAggregateInput = {
    id?: SortOrder
    autor?: SortOrder
    eliksir?: SortOrder
    item?: SortOrder
    oceny?: SortOrder
    ocena?: SortOrder
    cena?: SortOrder
  }

  export type przepisySumOrderByAggregateInput = {
    id?: SortOrder
    ocena?: SortOrder
    cena?: SortOrder
  }

  export type BigIntNullableFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableFilter | bigint | number | null
  }

  export type rolesIdNameCompoundUniqueInput = {
    id: number
    name: string
  }

  export type rolesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    displayname?: SortOrder
    creator?: SortOrder
    parent?: SortOrder
    dcperms?: SortOrder
    dcid?: SortOrder
    dccolor?: SortOrder
    verified?: SortOrder
    canResign?: SortOrder
    isFree?: SortOrder
    canApply?: SortOrder
  }

  export type rolesAvgOrderByAggregateInput = {
    id?: SortOrder
    dcperms?: SortOrder
  }

  export type rolesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    displayname?: SortOrder
    creator?: SortOrder
    parent?: SortOrder
    dcperms?: SortOrder
    dcid?: SortOrder
    dccolor?: SortOrder
    verified?: SortOrder
    canResign?: SortOrder
    isFree?: SortOrder
    canApply?: SortOrder
  }

  export type rolesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    displayname?: SortOrder
    creator?: SortOrder
    parent?: SortOrder
    dcperms?: SortOrder
    dcid?: SortOrder
    dccolor?: SortOrder
    verified?: SortOrder
    canResign?: SortOrder
    isFree?: SortOrder
    canApply?: SortOrder
  }

  export type rolesSumOrderByAggregateInput = {
    id?: SortOrder
    dcperms?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableWithAggregatesFilter | bigint | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedBigIntNullableFilter
    _min?: NestedBigIntNullableFilter
    _max?: NestedBigIntNullableFilter
  }

  export type sessionsCountOrderByAggregateInput = {
    session_id?: SortOrder
    expires?: SortOrder
    data?: SortOrder
  }

  export type sessionsAvgOrderByAggregateInput = {
    expires?: SortOrder
  }

  export type sessionsMaxOrderByAggregateInput = {
    session_id?: SortOrder
    expires?: SortOrder
    data?: SortOrder
  }

  export type sessionsMinOrderByAggregateInput = {
    session_id?: SortOrder
    expires?: SortOrder
    data?: SortOrder
  }

  export type sessionsSumOrderByAggregateInput = {
    expires?: SortOrder
  }

  export type ListenerCountOrderByAggregateInput = {
    id?: SortOrder
    guild?: SortOrder
    channel?: SortOrder
    emoji?: SortOrder
    role?: SortOrder
    message?: SortOrder
  }

  export type ListenerAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ListenerMaxOrderByAggregateInput = {
    id?: SortOrder
    guild?: SortOrder
    channel?: SortOrder
    emoji?: SortOrder
    role?: SortOrder
    message?: SortOrder
  }

  export type ListenerMinOrderByAggregateInput = {
    id?: SortOrder
    guild?: SortOrder
    channel?: SortOrder
    emoji?: SortOrder
    role?: SortOrder
    message?: SortOrder
  }

  export type ListenerSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedFloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedBigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
  }

  export type NestedBoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type NestedBigIntNullableFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableFilter | bigint | number | null
  }

  export type NestedBigIntNullableWithAggregatesFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableWithAggregatesFilter | bigint | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedBigIntNullableFilter
    _min?: NestedBigIntNullableFilter
    _max?: NestedBigIntNullableFilter
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}