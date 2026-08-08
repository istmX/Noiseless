
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Watch
 * 
 */
export type Watch = $Result.DefaultSelection<Prisma.$WatchPayload>
/**
 * Model Finding
 * 
 */
export type Finding = $Result.DefaultSelection<Prisma.$FindingPayload>
/**
 * Model Digest
 * 
 */
export type Digest = $Result.DefaultSelection<Prisma.$DigestPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.watch`: Exposes CRUD operations for the **Watch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Watches
    * const watches = await prisma.watch.findMany()
    * ```
    */
  get watch(): Prisma.WatchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.finding`: Exposes CRUD operations for the **Finding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Findings
    * const findings = await prisma.finding.findMany()
    * ```
    */
  get finding(): Prisma.FindingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.digest`: Exposes CRUD operations for the **Digest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Digests
    * const digests = await prisma.digest.findMany()
    * ```
    */
  get digest(): Prisma.DigestDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

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

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
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

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

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

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Watch: 'Watch',
    Finding: 'Finding',
    Digest: 'Digest'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "watch" | "finding" | "digest"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Watch: {
        payload: Prisma.$WatchPayload<ExtArgs>
        fields: Prisma.WatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchPayload>
          }
          findFirst: {
            args: Prisma.WatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchPayload>
          }
          findMany: {
            args: Prisma.WatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchPayload>[]
          }
          create: {
            args: Prisma.WatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchPayload>
          }
          createMany: {
            args: Prisma.WatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchPayload>[]
          }
          delete: {
            args: Prisma.WatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchPayload>
          }
          update: {
            args: Prisma.WatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchPayload>
          }
          deleteMany: {
            args: Prisma.WatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchPayload>[]
          }
          upsert: {
            args: Prisma.WatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchPayload>
          }
          aggregate: {
            args: Prisma.WatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWatch>
          }
          groupBy: {
            args: Prisma.WatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<WatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.WatchCountArgs<ExtArgs>
            result: $Utils.Optional<WatchCountAggregateOutputType> | number
          }
        }
      }
      Finding: {
        payload: Prisma.$FindingPayload<ExtArgs>
        fields: Prisma.FindingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FindingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FindingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingPayload>
          }
          findFirst: {
            args: Prisma.FindingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FindingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingPayload>
          }
          findMany: {
            args: Prisma.FindingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingPayload>[]
          }
          create: {
            args: Prisma.FindingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingPayload>
          }
          createMany: {
            args: Prisma.FindingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FindingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingPayload>[]
          }
          delete: {
            args: Prisma.FindingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingPayload>
          }
          update: {
            args: Prisma.FindingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingPayload>
          }
          deleteMany: {
            args: Prisma.FindingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FindingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FindingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingPayload>[]
          }
          upsert: {
            args: Prisma.FindingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FindingPayload>
          }
          aggregate: {
            args: Prisma.FindingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFinding>
          }
          groupBy: {
            args: Prisma.FindingGroupByArgs<ExtArgs>
            result: $Utils.Optional<FindingGroupByOutputType>[]
          }
          count: {
            args: Prisma.FindingCountArgs<ExtArgs>
            result: $Utils.Optional<FindingCountAggregateOutputType> | number
          }
        }
      }
      Digest: {
        payload: Prisma.$DigestPayload<ExtArgs>
        fields: Prisma.DigestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DigestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DigestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigestPayload>
          }
          findFirst: {
            args: Prisma.DigestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DigestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigestPayload>
          }
          findMany: {
            args: Prisma.DigestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigestPayload>[]
          }
          create: {
            args: Prisma.DigestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigestPayload>
          }
          createMany: {
            args: Prisma.DigestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DigestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigestPayload>[]
          }
          delete: {
            args: Prisma.DigestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigestPayload>
          }
          update: {
            args: Prisma.DigestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigestPayload>
          }
          deleteMany: {
            args: Prisma.DigestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DigestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DigestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigestPayload>[]
          }
          upsert: {
            args: Prisma.DigestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigestPayload>
          }
          aggregate: {
            args: Prisma.DigestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDigest>
          }
          groupBy: {
            args: Prisma.DigestGroupByArgs<ExtArgs>
            result: $Utils.Optional<DigestGroupByOutputType>[]
          }
          count: {
            args: Prisma.DigestCountArgs<ExtArgs>
            result: $Utils.Optional<DigestCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    watch?: WatchOmit
    finding?: FindingOmit
    digest?: DigestOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    watches: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watches?: boolean | UserCountOutputTypeCountWatchesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchWhereInput
  }


  /**
   * Count Type WatchCountOutputType
   */

  export type WatchCountOutputType = {
    findings: number
    digests: number
  }

  export type WatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    findings?: boolean | WatchCountOutputTypeCountFindingsArgs
    digests?: boolean | WatchCountOutputTypeCountDigestsArgs
  }

  // Custom InputTypes
  /**
   * WatchCountOutputType without action
   */
  export type WatchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchCountOutputType
     */
    select?: WatchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WatchCountOutputType without action
   */
  export type WatchCountOutputTypeCountFindingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FindingWhereInput
  }

  /**
   * WatchCountOutputType without action
   */
  export type WatchCountOutputTypeCountDigestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DigestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    password: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    watches?: boolean | User$watchesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watches?: boolean | User$watchesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      watches: Prisma.$WatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      password: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    watches<T extends User$watchesArgs<ExtArgs> = {}>(args?: Subset<T, User$watchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.watches
   */
  export type User$watchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watch
     */
    select?: WatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watch
     */
    omit?: WatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchInclude<ExtArgs> | null
    where?: WatchWhereInput
    orderBy?: WatchOrderByWithRelationInput | WatchOrderByWithRelationInput[]
    cursor?: WatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchScalarFieldEnum | WatchScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Watch
   */

  export type AggregateWatch = {
    _count: WatchCountAggregateOutputType | null
    _avg: WatchAvgAggregateOutputType | null
    _sum: WatchSumAggregateOutputType | null
    _min: WatchMinAggregateOutputType | null
    _max: WatchMaxAggregateOutputType | null
  }

  export type WatchAvgAggregateOutputType = {
    significanceThreshold: number | null
  }

  export type WatchSumAggregateOutputType = {
    significanceThreshold: number | null
  }

  export type WatchMinAggregateOutputType = {
    id: string | null
    userId: string | null
    topic: string | null
    frequency: string | null
    significanceThreshold: number | null
    notificationEmail: string | null
    notificationSlackWebhook: string | null
    active: boolean | null
    lastRunAt: Date | null
    runInProgress: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WatchMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    topic: string | null
    frequency: string | null
    significanceThreshold: number | null
    notificationEmail: string | null
    notificationSlackWebhook: string | null
    active: boolean | null
    lastRunAt: Date | null
    runInProgress: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WatchCountAggregateOutputType = {
    id: number
    userId: number
    topic: number
    searchQueries: number
    frequency: number
    significanceThreshold: number
    notificationEmail: number
    notificationSlackWebhook: number
    active: number
    lastRunAt: number
    runInProgress: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WatchAvgAggregateInputType = {
    significanceThreshold?: true
  }

  export type WatchSumAggregateInputType = {
    significanceThreshold?: true
  }

  export type WatchMinAggregateInputType = {
    id?: true
    userId?: true
    topic?: true
    frequency?: true
    significanceThreshold?: true
    notificationEmail?: true
    notificationSlackWebhook?: true
    active?: true
    lastRunAt?: true
    runInProgress?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WatchMaxAggregateInputType = {
    id?: true
    userId?: true
    topic?: true
    frequency?: true
    significanceThreshold?: true
    notificationEmail?: true
    notificationSlackWebhook?: true
    active?: true
    lastRunAt?: true
    runInProgress?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WatchCountAggregateInputType = {
    id?: true
    userId?: true
    topic?: true
    searchQueries?: true
    frequency?: true
    significanceThreshold?: true
    notificationEmail?: true
    notificationSlackWebhook?: true
    active?: true
    lastRunAt?: true
    runInProgress?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Watch to aggregate.
     */
    where?: WatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watches to fetch.
     */
    orderBy?: WatchOrderByWithRelationInput | WatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Watches
    **/
    _count?: true | WatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WatchMaxAggregateInputType
  }

  export type GetWatchAggregateType<T extends WatchAggregateArgs> = {
        [P in keyof T & keyof AggregateWatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWatch[P]>
      : GetScalarType<T[P], AggregateWatch[P]>
  }




  export type WatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchWhereInput
    orderBy?: WatchOrderByWithAggregationInput | WatchOrderByWithAggregationInput[]
    by: WatchScalarFieldEnum[] | WatchScalarFieldEnum
    having?: WatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WatchCountAggregateInputType | true
    _avg?: WatchAvgAggregateInputType
    _sum?: WatchSumAggregateInputType
    _min?: WatchMinAggregateInputType
    _max?: WatchMaxAggregateInputType
  }

  export type WatchGroupByOutputType = {
    id: string
    userId: string
    topic: string
    searchQueries: string[]
    frequency: string
    significanceThreshold: number
    notificationEmail: string | null
    notificationSlackWebhook: string | null
    active: boolean
    lastRunAt: Date | null
    runInProgress: boolean
    createdAt: Date
    updatedAt: Date
    _count: WatchCountAggregateOutputType | null
    _avg: WatchAvgAggregateOutputType | null
    _sum: WatchSumAggregateOutputType | null
    _min: WatchMinAggregateOutputType | null
    _max: WatchMaxAggregateOutputType | null
  }

  type GetWatchGroupByPayload<T extends WatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WatchGroupByOutputType[P]>
            : GetScalarType<T[P], WatchGroupByOutputType[P]>
        }
      >
    >


  export type WatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    topic?: boolean
    searchQueries?: boolean
    frequency?: boolean
    significanceThreshold?: boolean
    notificationEmail?: boolean
    notificationSlackWebhook?: boolean
    active?: boolean
    lastRunAt?: boolean
    runInProgress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    findings?: boolean | Watch$findingsArgs<ExtArgs>
    digests?: boolean | Watch$digestsArgs<ExtArgs>
    _count?: boolean | WatchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watch"]>

  export type WatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    topic?: boolean
    searchQueries?: boolean
    frequency?: boolean
    significanceThreshold?: boolean
    notificationEmail?: boolean
    notificationSlackWebhook?: boolean
    active?: boolean
    lastRunAt?: boolean
    runInProgress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watch"]>

  export type WatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    topic?: boolean
    searchQueries?: boolean
    frequency?: boolean
    significanceThreshold?: boolean
    notificationEmail?: boolean
    notificationSlackWebhook?: boolean
    active?: boolean
    lastRunAt?: boolean
    runInProgress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watch"]>

  export type WatchSelectScalar = {
    id?: boolean
    userId?: boolean
    topic?: boolean
    searchQueries?: boolean
    frequency?: boolean
    significanceThreshold?: boolean
    notificationEmail?: boolean
    notificationSlackWebhook?: boolean
    active?: boolean
    lastRunAt?: boolean
    runInProgress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "topic" | "searchQueries" | "frequency" | "significanceThreshold" | "notificationEmail" | "notificationSlackWebhook" | "active" | "lastRunAt" | "runInProgress" | "createdAt" | "updatedAt", ExtArgs["result"]["watch"]>
  export type WatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    findings?: boolean | Watch$findingsArgs<ExtArgs>
    digests?: boolean | Watch$digestsArgs<ExtArgs>
    _count?: boolean | WatchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Watch"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      findings: Prisma.$FindingPayload<ExtArgs>[]
      digests: Prisma.$DigestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      topic: string
      searchQueries: string[]
      frequency: string
      significanceThreshold: number
      notificationEmail: string | null
      notificationSlackWebhook: string | null
      active: boolean
      lastRunAt: Date | null
      runInProgress: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["watch"]>
    composites: {}
  }

  type WatchGetPayload<S extends boolean | null | undefined | WatchDefaultArgs> = $Result.GetResult<Prisma.$WatchPayload, S>

  type WatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WatchCountAggregateInputType | true
    }

  export interface WatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Watch'], meta: { name: 'Watch' } }
    /**
     * Find zero or one Watch that matches the filter.
     * @param {WatchFindUniqueArgs} args - Arguments to find a Watch
     * @example
     * // Get one Watch
     * const watch = await prisma.watch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WatchFindUniqueArgs>(args: SelectSubset<T, WatchFindUniqueArgs<ExtArgs>>): Prisma__WatchClient<$Result.GetResult<Prisma.$WatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Watch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WatchFindUniqueOrThrowArgs} args - Arguments to find a Watch
     * @example
     * // Get one Watch
     * const watch = await prisma.watch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WatchFindUniqueOrThrowArgs>(args: SelectSubset<T, WatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WatchClient<$Result.GetResult<Prisma.$WatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Watch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchFindFirstArgs} args - Arguments to find a Watch
     * @example
     * // Get one Watch
     * const watch = await prisma.watch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WatchFindFirstArgs>(args?: SelectSubset<T, WatchFindFirstArgs<ExtArgs>>): Prisma__WatchClient<$Result.GetResult<Prisma.$WatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Watch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchFindFirstOrThrowArgs} args - Arguments to find a Watch
     * @example
     * // Get one Watch
     * const watch = await prisma.watch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WatchFindFirstOrThrowArgs>(args?: SelectSubset<T, WatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__WatchClient<$Result.GetResult<Prisma.$WatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Watches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Watches
     * const watches = await prisma.watch.findMany()
     * 
     * // Get first 10 Watches
     * const watches = await prisma.watch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const watchWithIdOnly = await prisma.watch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WatchFindManyArgs>(args?: SelectSubset<T, WatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Watch.
     * @param {WatchCreateArgs} args - Arguments to create a Watch.
     * @example
     * // Create one Watch
     * const Watch = await prisma.watch.create({
     *   data: {
     *     // ... data to create a Watch
     *   }
     * })
     * 
     */
    create<T extends WatchCreateArgs>(args: SelectSubset<T, WatchCreateArgs<ExtArgs>>): Prisma__WatchClient<$Result.GetResult<Prisma.$WatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Watches.
     * @param {WatchCreateManyArgs} args - Arguments to create many Watches.
     * @example
     * // Create many Watches
     * const watch = await prisma.watch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WatchCreateManyArgs>(args?: SelectSubset<T, WatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Watches and returns the data saved in the database.
     * @param {WatchCreateManyAndReturnArgs} args - Arguments to create many Watches.
     * @example
     * // Create many Watches
     * const watch = await prisma.watch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Watches and only return the `id`
     * const watchWithIdOnly = await prisma.watch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WatchCreateManyAndReturnArgs>(args?: SelectSubset<T, WatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Watch.
     * @param {WatchDeleteArgs} args - Arguments to delete one Watch.
     * @example
     * // Delete one Watch
     * const Watch = await prisma.watch.delete({
     *   where: {
     *     // ... filter to delete one Watch
     *   }
     * })
     * 
     */
    delete<T extends WatchDeleteArgs>(args: SelectSubset<T, WatchDeleteArgs<ExtArgs>>): Prisma__WatchClient<$Result.GetResult<Prisma.$WatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Watch.
     * @param {WatchUpdateArgs} args - Arguments to update one Watch.
     * @example
     * // Update one Watch
     * const watch = await prisma.watch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WatchUpdateArgs>(args: SelectSubset<T, WatchUpdateArgs<ExtArgs>>): Prisma__WatchClient<$Result.GetResult<Prisma.$WatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Watches.
     * @param {WatchDeleteManyArgs} args - Arguments to filter Watches to delete.
     * @example
     * // Delete a few Watches
     * const { count } = await prisma.watch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WatchDeleteManyArgs>(args?: SelectSubset<T, WatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Watches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Watches
     * const watch = await prisma.watch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WatchUpdateManyArgs>(args: SelectSubset<T, WatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Watches and returns the data updated in the database.
     * @param {WatchUpdateManyAndReturnArgs} args - Arguments to update many Watches.
     * @example
     * // Update many Watches
     * const watch = await prisma.watch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Watches and only return the `id`
     * const watchWithIdOnly = await prisma.watch.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WatchUpdateManyAndReturnArgs>(args: SelectSubset<T, WatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Watch.
     * @param {WatchUpsertArgs} args - Arguments to update or create a Watch.
     * @example
     * // Update or create a Watch
     * const watch = await prisma.watch.upsert({
     *   create: {
     *     // ... data to create a Watch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Watch we want to update
     *   }
     * })
     */
    upsert<T extends WatchUpsertArgs>(args: SelectSubset<T, WatchUpsertArgs<ExtArgs>>): Prisma__WatchClient<$Result.GetResult<Prisma.$WatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Watches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchCountArgs} args - Arguments to filter Watches to count.
     * @example
     * // Count the number of Watches
     * const count = await prisma.watch.count({
     *   where: {
     *     // ... the filter for the Watches we want to count
     *   }
     * })
    **/
    count<T extends WatchCountArgs>(
      args?: Subset<T, WatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Watch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WatchAggregateArgs>(args: Subset<T, WatchAggregateArgs>): Prisma.PrismaPromise<GetWatchAggregateType<T>>

    /**
     * Group by Watch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchGroupByArgs} args - Group by arguments.
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
      T extends WatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WatchGroupByArgs['orderBy'] }
        : { orderBy?: WatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, WatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Watch model
   */
  readonly fields: WatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Watch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    findings<T extends Watch$findingsArgs<ExtArgs> = {}>(args?: Subset<T, Watch$findingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FindingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    digests<T extends Watch$digestsArgs<ExtArgs> = {}>(args?: Subset<T, Watch$digestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DigestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Watch model
   */
  interface WatchFieldRefs {
    readonly id: FieldRef<"Watch", 'String'>
    readonly userId: FieldRef<"Watch", 'String'>
    readonly topic: FieldRef<"Watch", 'String'>
    readonly searchQueries: FieldRef<"Watch", 'String[]'>
    readonly frequency: FieldRef<"Watch", 'String'>
    readonly significanceThreshold: FieldRef<"Watch", 'Int'>
    readonly notificationEmail: FieldRef<"Watch", 'String'>
    readonly notificationSlackWebhook: FieldRef<"Watch", 'String'>
    readonly active: FieldRef<"Watch", 'Boolean'>
    readonly lastRunAt: FieldRef<"Watch", 'DateTime'>
    readonly runInProgress: FieldRef<"Watch", 'Boolean'>
    readonly createdAt: FieldRef<"Watch", 'DateTime'>
    readonly updatedAt: FieldRef<"Watch", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Watch findUnique
   */
  export type WatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watch
     */
    select?: WatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watch
     */
    omit?: WatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchInclude<ExtArgs> | null
    /**
     * Filter, which Watch to fetch.
     */
    where: WatchWhereUniqueInput
  }

  /**
   * Watch findUniqueOrThrow
   */
  export type WatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watch
     */
    select?: WatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watch
     */
    omit?: WatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchInclude<ExtArgs> | null
    /**
     * Filter, which Watch to fetch.
     */
    where: WatchWhereUniqueInput
  }

  /**
   * Watch findFirst
   */
  export type WatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watch
     */
    select?: WatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watch
     */
    omit?: WatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchInclude<ExtArgs> | null
    /**
     * Filter, which Watch to fetch.
     */
    where?: WatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watches to fetch.
     */
    orderBy?: WatchOrderByWithRelationInput | WatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Watches.
     */
    cursor?: WatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Watches.
     */
    distinct?: WatchScalarFieldEnum | WatchScalarFieldEnum[]
  }

  /**
   * Watch findFirstOrThrow
   */
  export type WatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watch
     */
    select?: WatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watch
     */
    omit?: WatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchInclude<ExtArgs> | null
    /**
     * Filter, which Watch to fetch.
     */
    where?: WatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watches to fetch.
     */
    orderBy?: WatchOrderByWithRelationInput | WatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Watches.
     */
    cursor?: WatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Watches.
     */
    distinct?: WatchScalarFieldEnum | WatchScalarFieldEnum[]
  }

  /**
   * Watch findMany
   */
  export type WatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watch
     */
    select?: WatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watch
     */
    omit?: WatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchInclude<ExtArgs> | null
    /**
     * Filter, which Watches to fetch.
     */
    where?: WatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watches to fetch.
     */
    orderBy?: WatchOrderByWithRelationInput | WatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Watches.
     */
    cursor?: WatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Watches.
     */
    distinct?: WatchScalarFieldEnum | WatchScalarFieldEnum[]
  }

  /**
   * Watch create
   */
  export type WatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watch
     */
    select?: WatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watch
     */
    omit?: WatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchInclude<ExtArgs> | null
    /**
     * The data needed to create a Watch.
     */
    data: XOR<WatchCreateInput, WatchUncheckedCreateInput>
  }

  /**
   * Watch createMany
   */
  export type WatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Watches.
     */
    data: WatchCreateManyInput | WatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Watch createManyAndReturn
   */
  export type WatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watch
     */
    select?: WatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Watch
     */
    omit?: WatchOmit<ExtArgs> | null
    /**
     * The data used to create many Watches.
     */
    data: WatchCreateManyInput | WatchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Watch update
   */
  export type WatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watch
     */
    select?: WatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watch
     */
    omit?: WatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchInclude<ExtArgs> | null
    /**
     * The data needed to update a Watch.
     */
    data: XOR<WatchUpdateInput, WatchUncheckedUpdateInput>
    /**
     * Choose, which Watch to update.
     */
    where: WatchWhereUniqueInput
  }

  /**
   * Watch updateMany
   */
  export type WatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Watches.
     */
    data: XOR<WatchUpdateManyMutationInput, WatchUncheckedUpdateManyInput>
    /**
     * Filter which Watches to update
     */
    where?: WatchWhereInput
    /**
     * Limit how many Watches to update.
     */
    limit?: number
  }

  /**
   * Watch updateManyAndReturn
   */
  export type WatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watch
     */
    select?: WatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Watch
     */
    omit?: WatchOmit<ExtArgs> | null
    /**
     * The data used to update Watches.
     */
    data: XOR<WatchUpdateManyMutationInput, WatchUncheckedUpdateManyInput>
    /**
     * Filter which Watches to update
     */
    where?: WatchWhereInput
    /**
     * Limit how many Watches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Watch upsert
   */
  export type WatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watch
     */
    select?: WatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watch
     */
    omit?: WatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchInclude<ExtArgs> | null
    /**
     * The filter to search for the Watch to update in case it exists.
     */
    where: WatchWhereUniqueInput
    /**
     * In case the Watch found by the `where` argument doesn't exist, create a new Watch with this data.
     */
    create: XOR<WatchCreateInput, WatchUncheckedCreateInput>
    /**
     * In case the Watch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WatchUpdateInput, WatchUncheckedUpdateInput>
  }

  /**
   * Watch delete
   */
  export type WatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watch
     */
    select?: WatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watch
     */
    omit?: WatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchInclude<ExtArgs> | null
    /**
     * Filter which Watch to delete.
     */
    where: WatchWhereUniqueInput
  }

  /**
   * Watch deleteMany
   */
  export type WatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Watches to delete
     */
    where?: WatchWhereInput
    /**
     * Limit how many Watches to delete.
     */
    limit?: number
  }

  /**
   * Watch.findings
   */
  export type Watch$findingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Finding
     */
    select?: FindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Finding
     */
    omit?: FindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingInclude<ExtArgs> | null
    where?: FindingWhereInput
    orderBy?: FindingOrderByWithRelationInput | FindingOrderByWithRelationInput[]
    cursor?: FindingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FindingScalarFieldEnum | FindingScalarFieldEnum[]
  }

  /**
   * Watch.digests
   */
  export type Watch$digestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Digest
     */
    select?: DigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Digest
     */
    omit?: DigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigestInclude<ExtArgs> | null
    where?: DigestWhereInput
    orderBy?: DigestOrderByWithRelationInput | DigestOrderByWithRelationInput[]
    cursor?: DigestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DigestScalarFieldEnum | DigestScalarFieldEnum[]
  }

  /**
   * Watch without action
   */
  export type WatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watch
     */
    select?: WatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watch
     */
    omit?: WatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchInclude<ExtArgs> | null
  }


  /**
   * Model Finding
   */

  export type AggregateFinding = {
    _count: FindingCountAggregateOutputType | null
    _avg: FindingAvgAggregateOutputType | null
    _sum: FindingSumAggregateOutputType | null
    _min: FindingMinAggregateOutputType | null
    _max: FindingMaxAggregateOutputType | null
  }

  export type FindingAvgAggregateOutputType = {
    score: number | null
  }

  export type FindingSumAggregateOutputType = {
    score: number | null
  }

  export type FindingMinAggregateOutputType = {
    id: string | null
    watchId: string | null
    url: string | null
    title: string | null
    content: string | null
    score: number | null
    category: string | null
    keyFact: string | null
    createdAt: Date | null
  }

  export type FindingMaxAggregateOutputType = {
    id: string | null
    watchId: string | null
    url: string | null
    title: string | null
    content: string | null
    score: number | null
    category: string | null
    keyFact: string | null
    createdAt: Date | null
  }

  export type FindingCountAggregateOutputType = {
    id: number
    watchId: number
    url: number
    title: number
    content: number
    score: number
    category: number
    keyFact: number
    createdAt: number
    _all: number
  }


  export type FindingAvgAggregateInputType = {
    score?: true
  }

  export type FindingSumAggregateInputType = {
    score?: true
  }

  export type FindingMinAggregateInputType = {
    id?: true
    watchId?: true
    url?: true
    title?: true
    content?: true
    score?: true
    category?: true
    keyFact?: true
    createdAt?: true
  }

  export type FindingMaxAggregateInputType = {
    id?: true
    watchId?: true
    url?: true
    title?: true
    content?: true
    score?: true
    category?: true
    keyFact?: true
    createdAt?: true
  }

  export type FindingCountAggregateInputType = {
    id?: true
    watchId?: true
    url?: true
    title?: true
    content?: true
    score?: true
    category?: true
    keyFact?: true
    createdAt?: true
    _all?: true
  }

  export type FindingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Finding to aggregate.
     */
    where?: FindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Findings to fetch.
     */
    orderBy?: FindingOrderByWithRelationInput | FindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Findings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Findings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Findings
    **/
    _count?: true | FindingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FindingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FindingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FindingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FindingMaxAggregateInputType
  }

  export type GetFindingAggregateType<T extends FindingAggregateArgs> = {
        [P in keyof T & keyof AggregateFinding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFinding[P]>
      : GetScalarType<T[P], AggregateFinding[P]>
  }




  export type FindingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FindingWhereInput
    orderBy?: FindingOrderByWithAggregationInput | FindingOrderByWithAggregationInput[]
    by: FindingScalarFieldEnum[] | FindingScalarFieldEnum
    having?: FindingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FindingCountAggregateInputType | true
    _avg?: FindingAvgAggregateInputType
    _sum?: FindingSumAggregateInputType
    _min?: FindingMinAggregateInputType
    _max?: FindingMaxAggregateInputType
  }

  export type FindingGroupByOutputType = {
    id: string
    watchId: string
    url: string
    title: string
    content: string
    score: number
    category: string
    keyFact: string
    createdAt: Date
    _count: FindingCountAggregateOutputType | null
    _avg: FindingAvgAggregateOutputType | null
    _sum: FindingSumAggregateOutputType | null
    _min: FindingMinAggregateOutputType | null
    _max: FindingMaxAggregateOutputType | null
  }

  type GetFindingGroupByPayload<T extends FindingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FindingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FindingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FindingGroupByOutputType[P]>
            : GetScalarType<T[P], FindingGroupByOutputType[P]>
        }
      >
    >


  export type FindingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    watchId?: boolean
    url?: boolean
    title?: boolean
    content?: boolean
    score?: boolean
    category?: boolean
    keyFact?: boolean
    createdAt?: boolean
    watch?: boolean | WatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["finding"]>

  export type FindingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    watchId?: boolean
    url?: boolean
    title?: boolean
    content?: boolean
    score?: boolean
    category?: boolean
    keyFact?: boolean
    createdAt?: boolean
    watch?: boolean | WatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["finding"]>

  export type FindingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    watchId?: boolean
    url?: boolean
    title?: boolean
    content?: boolean
    score?: boolean
    category?: boolean
    keyFact?: boolean
    createdAt?: boolean
    watch?: boolean | WatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["finding"]>

  export type FindingSelectScalar = {
    id?: boolean
    watchId?: boolean
    url?: boolean
    title?: boolean
    content?: boolean
    score?: boolean
    category?: boolean
    keyFact?: boolean
    createdAt?: boolean
  }

  export type FindingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "watchId" | "url" | "title" | "content" | "score" | "category" | "keyFact" | "createdAt", ExtArgs["result"]["finding"]>
  export type FindingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watch?: boolean | WatchDefaultArgs<ExtArgs>
  }
  export type FindingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watch?: boolean | WatchDefaultArgs<ExtArgs>
  }
  export type FindingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watch?: boolean | WatchDefaultArgs<ExtArgs>
  }

  export type $FindingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Finding"
    objects: {
      watch: Prisma.$WatchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      watchId: string
      url: string
      title: string
      content: string
      score: number
      category: string
      keyFact: string
      createdAt: Date
    }, ExtArgs["result"]["finding"]>
    composites: {}
  }

  type FindingGetPayload<S extends boolean | null | undefined | FindingDefaultArgs> = $Result.GetResult<Prisma.$FindingPayload, S>

  type FindingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FindingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FindingCountAggregateInputType | true
    }

  export interface FindingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Finding'], meta: { name: 'Finding' } }
    /**
     * Find zero or one Finding that matches the filter.
     * @param {FindingFindUniqueArgs} args - Arguments to find a Finding
     * @example
     * // Get one Finding
     * const finding = await prisma.finding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FindingFindUniqueArgs>(args: SelectSubset<T, FindingFindUniqueArgs<ExtArgs>>): Prisma__FindingClient<$Result.GetResult<Prisma.$FindingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Finding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FindingFindUniqueOrThrowArgs} args - Arguments to find a Finding
     * @example
     * // Get one Finding
     * const finding = await prisma.finding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FindingFindUniqueOrThrowArgs>(args: SelectSubset<T, FindingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FindingClient<$Result.GetResult<Prisma.$FindingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Finding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindingFindFirstArgs} args - Arguments to find a Finding
     * @example
     * // Get one Finding
     * const finding = await prisma.finding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FindingFindFirstArgs>(args?: SelectSubset<T, FindingFindFirstArgs<ExtArgs>>): Prisma__FindingClient<$Result.GetResult<Prisma.$FindingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Finding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindingFindFirstOrThrowArgs} args - Arguments to find a Finding
     * @example
     * // Get one Finding
     * const finding = await prisma.finding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FindingFindFirstOrThrowArgs>(args?: SelectSubset<T, FindingFindFirstOrThrowArgs<ExtArgs>>): Prisma__FindingClient<$Result.GetResult<Prisma.$FindingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Findings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Findings
     * const findings = await prisma.finding.findMany()
     * 
     * // Get first 10 Findings
     * const findings = await prisma.finding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const findingWithIdOnly = await prisma.finding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FindingFindManyArgs>(args?: SelectSubset<T, FindingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FindingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Finding.
     * @param {FindingCreateArgs} args - Arguments to create a Finding.
     * @example
     * // Create one Finding
     * const Finding = await prisma.finding.create({
     *   data: {
     *     // ... data to create a Finding
     *   }
     * })
     * 
     */
    create<T extends FindingCreateArgs>(args: SelectSubset<T, FindingCreateArgs<ExtArgs>>): Prisma__FindingClient<$Result.GetResult<Prisma.$FindingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Findings.
     * @param {FindingCreateManyArgs} args - Arguments to create many Findings.
     * @example
     * // Create many Findings
     * const finding = await prisma.finding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FindingCreateManyArgs>(args?: SelectSubset<T, FindingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Findings and returns the data saved in the database.
     * @param {FindingCreateManyAndReturnArgs} args - Arguments to create many Findings.
     * @example
     * // Create many Findings
     * const finding = await prisma.finding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Findings and only return the `id`
     * const findingWithIdOnly = await prisma.finding.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FindingCreateManyAndReturnArgs>(args?: SelectSubset<T, FindingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FindingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Finding.
     * @param {FindingDeleteArgs} args - Arguments to delete one Finding.
     * @example
     * // Delete one Finding
     * const Finding = await prisma.finding.delete({
     *   where: {
     *     // ... filter to delete one Finding
     *   }
     * })
     * 
     */
    delete<T extends FindingDeleteArgs>(args: SelectSubset<T, FindingDeleteArgs<ExtArgs>>): Prisma__FindingClient<$Result.GetResult<Prisma.$FindingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Finding.
     * @param {FindingUpdateArgs} args - Arguments to update one Finding.
     * @example
     * // Update one Finding
     * const finding = await prisma.finding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FindingUpdateArgs>(args: SelectSubset<T, FindingUpdateArgs<ExtArgs>>): Prisma__FindingClient<$Result.GetResult<Prisma.$FindingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Findings.
     * @param {FindingDeleteManyArgs} args - Arguments to filter Findings to delete.
     * @example
     * // Delete a few Findings
     * const { count } = await prisma.finding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FindingDeleteManyArgs>(args?: SelectSubset<T, FindingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Findings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Findings
     * const finding = await prisma.finding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FindingUpdateManyArgs>(args: SelectSubset<T, FindingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Findings and returns the data updated in the database.
     * @param {FindingUpdateManyAndReturnArgs} args - Arguments to update many Findings.
     * @example
     * // Update many Findings
     * const finding = await prisma.finding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Findings and only return the `id`
     * const findingWithIdOnly = await prisma.finding.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FindingUpdateManyAndReturnArgs>(args: SelectSubset<T, FindingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FindingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Finding.
     * @param {FindingUpsertArgs} args - Arguments to update or create a Finding.
     * @example
     * // Update or create a Finding
     * const finding = await prisma.finding.upsert({
     *   create: {
     *     // ... data to create a Finding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Finding we want to update
     *   }
     * })
     */
    upsert<T extends FindingUpsertArgs>(args: SelectSubset<T, FindingUpsertArgs<ExtArgs>>): Prisma__FindingClient<$Result.GetResult<Prisma.$FindingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Findings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindingCountArgs} args - Arguments to filter Findings to count.
     * @example
     * // Count the number of Findings
     * const count = await prisma.finding.count({
     *   where: {
     *     // ... the filter for the Findings we want to count
     *   }
     * })
    **/
    count<T extends FindingCountArgs>(
      args?: Subset<T, FindingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FindingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Finding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FindingAggregateArgs>(args: Subset<T, FindingAggregateArgs>): Prisma.PrismaPromise<GetFindingAggregateType<T>>

    /**
     * Group by Finding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FindingGroupByArgs} args - Group by arguments.
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
      T extends FindingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FindingGroupByArgs['orderBy'] }
        : { orderBy?: FindingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, FindingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFindingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Finding model
   */
  readonly fields: FindingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Finding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FindingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    watch<T extends WatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WatchDefaultArgs<ExtArgs>>): Prisma__WatchClient<$Result.GetResult<Prisma.$WatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Finding model
   */
  interface FindingFieldRefs {
    readonly id: FieldRef<"Finding", 'String'>
    readonly watchId: FieldRef<"Finding", 'String'>
    readonly url: FieldRef<"Finding", 'String'>
    readonly title: FieldRef<"Finding", 'String'>
    readonly content: FieldRef<"Finding", 'String'>
    readonly score: FieldRef<"Finding", 'Int'>
    readonly category: FieldRef<"Finding", 'String'>
    readonly keyFact: FieldRef<"Finding", 'String'>
    readonly createdAt: FieldRef<"Finding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Finding findUnique
   */
  export type FindingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Finding
     */
    select?: FindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Finding
     */
    omit?: FindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingInclude<ExtArgs> | null
    /**
     * Filter, which Finding to fetch.
     */
    where: FindingWhereUniqueInput
  }

  /**
   * Finding findUniqueOrThrow
   */
  export type FindingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Finding
     */
    select?: FindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Finding
     */
    omit?: FindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingInclude<ExtArgs> | null
    /**
     * Filter, which Finding to fetch.
     */
    where: FindingWhereUniqueInput
  }

  /**
   * Finding findFirst
   */
  export type FindingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Finding
     */
    select?: FindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Finding
     */
    omit?: FindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingInclude<ExtArgs> | null
    /**
     * Filter, which Finding to fetch.
     */
    where?: FindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Findings to fetch.
     */
    orderBy?: FindingOrderByWithRelationInput | FindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Findings.
     */
    cursor?: FindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Findings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Findings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Findings.
     */
    distinct?: FindingScalarFieldEnum | FindingScalarFieldEnum[]
  }

  /**
   * Finding findFirstOrThrow
   */
  export type FindingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Finding
     */
    select?: FindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Finding
     */
    omit?: FindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingInclude<ExtArgs> | null
    /**
     * Filter, which Finding to fetch.
     */
    where?: FindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Findings to fetch.
     */
    orderBy?: FindingOrderByWithRelationInput | FindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Findings.
     */
    cursor?: FindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Findings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Findings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Findings.
     */
    distinct?: FindingScalarFieldEnum | FindingScalarFieldEnum[]
  }

  /**
   * Finding findMany
   */
  export type FindingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Finding
     */
    select?: FindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Finding
     */
    omit?: FindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingInclude<ExtArgs> | null
    /**
     * Filter, which Findings to fetch.
     */
    where?: FindingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Findings to fetch.
     */
    orderBy?: FindingOrderByWithRelationInput | FindingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Findings.
     */
    cursor?: FindingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Findings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Findings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Findings.
     */
    distinct?: FindingScalarFieldEnum | FindingScalarFieldEnum[]
  }

  /**
   * Finding create
   */
  export type FindingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Finding
     */
    select?: FindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Finding
     */
    omit?: FindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingInclude<ExtArgs> | null
    /**
     * The data needed to create a Finding.
     */
    data: XOR<FindingCreateInput, FindingUncheckedCreateInput>
  }

  /**
   * Finding createMany
   */
  export type FindingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Findings.
     */
    data: FindingCreateManyInput | FindingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Finding createManyAndReturn
   */
  export type FindingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Finding
     */
    select?: FindingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Finding
     */
    omit?: FindingOmit<ExtArgs> | null
    /**
     * The data used to create many Findings.
     */
    data: FindingCreateManyInput | FindingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Finding update
   */
  export type FindingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Finding
     */
    select?: FindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Finding
     */
    omit?: FindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingInclude<ExtArgs> | null
    /**
     * The data needed to update a Finding.
     */
    data: XOR<FindingUpdateInput, FindingUncheckedUpdateInput>
    /**
     * Choose, which Finding to update.
     */
    where: FindingWhereUniqueInput
  }

  /**
   * Finding updateMany
   */
  export type FindingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Findings.
     */
    data: XOR<FindingUpdateManyMutationInput, FindingUncheckedUpdateManyInput>
    /**
     * Filter which Findings to update
     */
    where?: FindingWhereInput
    /**
     * Limit how many Findings to update.
     */
    limit?: number
  }

  /**
   * Finding updateManyAndReturn
   */
  export type FindingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Finding
     */
    select?: FindingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Finding
     */
    omit?: FindingOmit<ExtArgs> | null
    /**
     * The data used to update Findings.
     */
    data: XOR<FindingUpdateManyMutationInput, FindingUncheckedUpdateManyInput>
    /**
     * Filter which Findings to update
     */
    where?: FindingWhereInput
    /**
     * Limit how many Findings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Finding upsert
   */
  export type FindingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Finding
     */
    select?: FindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Finding
     */
    omit?: FindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingInclude<ExtArgs> | null
    /**
     * The filter to search for the Finding to update in case it exists.
     */
    where: FindingWhereUniqueInput
    /**
     * In case the Finding found by the `where` argument doesn't exist, create a new Finding with this data.
     */
    create: XOR<FindingCreateInput, FindingUncheckedCreateInput>
    /**
     * In case the Finding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FindingUpdateInput, FindingUncheckedUpdateInput>
  }

  /**
   * Finding delete
   */
  export type FindingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Finding
     */
    select?: FindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Finding
     */
    omit?: FindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingInclude<ExtArgs> | null
    /**
     * Filter which Finding to delete.
     */
    where: FindingWhereUniqueInput
  }

  /**
   * Finding deleteMany
   */
  export type FindingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Findings to delete
     */
    where?: FindingWhereInput
    /**
     * Limit how many Findings to delete.
     */
    limit?: number
  }

  /**
   * Finding without action
   */
  export type FindingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Finding
     */
    select?: FindingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Finding
     */
    omit?: FindingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FindingInclude<ExtArgs> | null
  }


  /**
   * Model Digest
   */

  export type AggregateDigest = {
    _count: DigestCountAggregateOutputType | null
    _min: DigestMinAggregateOutputType | null
    _max: DigestMaxAggregateOutputType | null
  }

  export type DigestMinAggregateOutputType = {
    id: string | null
    watchId: string | null
    summary: string | null
    sentAt: Date | null
  }

  export type DigestMaxAggregateOutputType = {
    id: string | null
    watchId: string | null
    summary: string | null
    sentAt: Date | null
  }

  export type DigestCountAggregateOutputType = {
    id: number
    watchId: number
    summary: number
    sentAt: number
    _all: number
  }


  export type DigestMinAggregateInputType = {
    id?: true
    watchId?: true
    summary?: true
    sentAt?: true
  }

  export type DigestMaxAggregateInputType = {
    id?: true
    watchId?: true
    summary?: true
    sentAt?: true
  }

  export type DigestCountAggregateInputType = {
    id?: true
    watchId?: true
    summary?: true
    sentAt?: true
    _all?: true
  }

  export type DigestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Digest to aggregate.
     */
    where?: DigestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Digests to fetch.
     */
    orderBy?: DigestOrderByWithRelationInput | DigestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DigestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Digests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Digests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Digests
    **/
    _count?: true | DigestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DigestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DigestMaxAggregateInputType
  }

  export type GetDigestAggregateType<T extends DigestAggregateArgs> = {
        [P in keyof T & keyof AggregateDigest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDigest[P]>
      : GetScalarType<T[P], AggregateDigest[P]>
  }




  export type DigestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DigestWhereInput
    orderBy?: DigestOrderByWithAggregationInput | DigestOrderByWithAggregationInput[]
    by: DigestScalarFieldEnum[] | DigestScalarFieldEnum
    having?: DigestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DigestCountAggregateInputType | true
    _min?: DigestMinAggregateInputType
    _max?: DigestMaxAggregateInputType
  }

  export type DigestGroupByOutputType = {
    id: string
    watchId: string
    summary: string
    sentAt: Date
    _count: DigestCountAggregateOutputType | null
    _min: DigestMinAggregateOutputType | null
    _max: DigestMaxAggregateOutputType | null
  }

  type GetDigestGroupByPayload<T extends DigestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DigestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DigestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DigestGroupByOutputType[P]>
            : GetScalarType<T[P], DigestGroupByOutputType[P]>
        }
      >
    >


  export type DigestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    watchId?: boolean
    summary?: boolean
    sentAt?: boolean
    watch?: boolean | WatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["digest"]>

  export type DigestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    watchId?: boolean
    summary?: boolean
    sentAt?: boolean
    watch?: boolean | WatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["digest"]>

  export type DigestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    watchId?: boolean
    summary?: boolean
    sentAt?: boolean
    watch?: boolean | WatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["digest"]>

  export type DigestSelectScalar = {
    id?: boolean
    watchId?: boolean
    summary?: boolean
    sentAt?: boolean
  }

  export type DigestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "watchId" | "summary" | "sentAt", ExtArgs["result"]["digest"]>
  export type DigestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watch?: boolean | WatchDefaultArgs<ExtArgs>
  }
  export type DigestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watch?: boolean | WatchDefaultArgs<ExtArgs>
  }
  export type DigestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watch?: boolean | WatchDefaultArgs<ExtArgs>
  }

  export type $DigestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Digest"
    objects: {
      watch: Prisma.$WatchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      watchId: string
      summary: string
      sentAt: Date
    }, ExtArgs["result"]["digest"]>
    composites: {}
  }

  type DigestGetPayload<S extends boolean | null | undefined | DigestDefaultArgs> = $Result.GetResult<Prisma.$DigestPayload, S>

  type DigestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DigestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DigestCountAggregateInputType | true
    }

  export interface DigestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Digest'], meta: { name: 'Digest' } }
    /**
     * Find zero or one Digest that matches the filter.
     * @param {DigestFindUniqueArgs} args - Arguments to find a Digest
     * @example
     * // Get one Digest
     * const digest = await prisma.digest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DigestFindUniqueArgs>(args: SelectSubset<T, DigestFindUniqueArgs<ExtArgs>>): Prisma__DigestClient<$Result.GetResult<Prisma.$DigestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Digest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DigestFindUniqueOrThrowArgs} args - Arguments to find a Digest
     * @example
     * // Get one Digest
     * const digest = await prisma.digest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DigestFindUniqueOrThrowArgs>(args: SelectSubset<T, DigestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DigestClient<$Result.GetResult<Prisma.$DigestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Digest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigestFindFirstArgs} args - Arguments to find a Digest
     * @example
     * // Get one Digest
     * const digest = await prisma.digest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DigestFindFirstArgs>(args?: SelectSubset<T, DigestFindFirstArgs<ExtArgs>>): Prisma__DigestClient<$Result.GetResult<Prisma.$DigestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Digest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigestFindFirstOrThrowArgs} args - Arguments to find a Digest
     * @example
     * // Get one Digest
     * const digest = await prisma.digest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DigestFindFirstOrThrowArgs>(args?: SelectSubset<T, DigestFindFirstOrThrowArgs<ExtArgs>>): Prisma__DigestClient<$Result.GetResult<Prisma.$DigestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Digests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Digests
     * const digests = await prisma.digest.findMany()
     * 
     * // Get first 10 Digests
     * const digests = await prisma.digest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const digestWithIdOnly = await prisma.digest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DigestFindManyArgs>(args?: SelectSubset<T, DigestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DigestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Digest.
     * @param {DigestCreateArgs} args - Arguments to create a Digest.
     * @example
     * // Create one Digest
     * const Digest = await prisma.digest.create({
     *   data: {
     *     // ... data to create a Digest
     *   }
     * })
     * 
     */
    create<T extends DigestCreateArgs>(args: SelectSubset<T, DigestCreateArgs<ExtArgs>>): Prisma__DigestClient<$Result.GetResult<Prisma.$DigestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Digests.
     * @param {DigestCreateManyArgs} args - Arguments to create many Digests.
     * @example
     * // Create many Digests
     * const digest = await prisma.digest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DigestCreateManyArgs>(args?: SelectSubset<T, DigestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Digests and returns the data saved in the database.
     * @param {DigestCreateManyAndReturnArgs} args - Arguments to create many Digests.
     * @example
     * // Create many Digests
     * const digest = await prisma.digest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Digests and only return the `id`
     * const digestWithIdOnly = await prisma.digest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DigestCreateManyAndReturnArgs>(args?: SelectSubset<T, DigestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DigestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Digest.
     * @param {DigestDeleteArgs} args - Arguments to delete one Digest.
     * @example
     * // Delete one Digest
     * const Digest = await prisma.digest.delete({
     *   where: {
     *     // ... filter to delete one Digest
     *   }
     * })
     * 
     */
    delete<T extends DigestDeleteArgs>(args: SelectSubset<T, DigestDeleteArgs<ExtArgs>>): Prisma__DigestClient<$Result.GetResult<Prisma.$DigestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Digest.
     * @param {DigestUpdateArgs} args - Arguments to update one Digest.
     * @example
     * // Update one Digest
     * const digest = await prisma.digest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DigestUpdateArgs>(args: SelectSubset<T, DigestUpdateArgs<ExtArgs>>): Prisma__DigestClient<$Result.GetResult<Prisma.$DigestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Digests.
     * @param {DigestDeleteManyArgs} args - Arguments to filter Digests to delete.
     * @example
     * // Delete a few Digests
     * const { count } = await prisma.digest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DigestDeleteManyArgs>(args?: SelectSubset<T, DigestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Digests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Digests
     * const digest = await prisma.digest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DigestUpdateManyArgs>(args: SelectSubset<T, DigestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Digests and returns the data updated in the database.
     * @param {DigestUpdateManyAndReturnArgs} args - Arguments to update many Digests.
     * @example
     * // Update many Digests
     * const digest = await prisma.digest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Digests and only return the `id`
     * const digestWithIdOnly = await prisma.digest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DigestUpdateManyAndReturnArgs>(args: SelectSubset<T, DigestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DigestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Digest.
     * @param {DigestUpsertArgs} args - Arguments to update or create a Digest.
     * @example
     * // Update or create a Digest
     * const digest = await prisma.digest.upsert({
     *   create: {
     *     // ... data to create a Digest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Digest we want to update
     *   }
     * })
     */
    upsert<T extends DigestUpsertArgs>(args: SelectSubset<T, DigestUpsertArgs<ExtArgs>>): Prisma__DigestClient<$Result.GetResult<Prisma.$DigestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Digests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigestCountArgs} args - Arguments to filter Digests to count.
     * @example
     * // Count the number of Digests
     * const count = await prisma.digest.count({
     *   where: {
     *     // ... the filter for the Digests we want to count
     *   }
     * })
    **/
    count<T extends DigestCountArgs>(
      args?: Subset<T, DigestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DigestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Digest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DigestAggregateArgs>(args: Subset<T, DigestAggregateArgs>): Prisma.PrismaPromise<GetDigestAggregateType<T>>

    /**
     * Group by Digest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigestGroupByArgs} args - Group by arguments.
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
      T extends DigestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DigestGroupByArgs['orderBy'] }
        : { orderBy?: DigestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, DigestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDigestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Digest model
   */
  readonly fields: DigestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Digest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DigestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    watch<T extends WatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WatchDefaultArgs<ExtArgs>>): Prisma__WatchClient<$Result.GetResult<Prisma.$WatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Digest model
   */
  interface DigestFieldRefs {
    readonly id: FieldRef<"Digest", 'String'>
    readonly watchId: FieldRef<"Digest", 'String'>
    readonly summary: FieldRef<"Digest", 'String'>
    readonly sentAt: FieldRef<"Digest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Digest findUnique
   */
  export type DigestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Digest
     */
    select?: DigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Digest
     */
    omit?: DigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigestInclude<ExtArgs> | null
    /**
     * Filter, which Digest to fetch.
     */
    where: DigestWhereUniqueInput
  }

  /**
   * Digest findUniqueOrThrow
   */
  export type DigestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Digest
     */
    select?: DigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Digest
     */
    omit?: DigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigestInclude<ExtArgs> | null
    /**
     * Filter, which Digest to fetch.
     */
    where: DigestWhereUniqueInput
  }

  /**
   * Digest findFirst
   */
  export type DigestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Digest
     */
    select?: DigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Digest
     */
    omit?: DigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigestInclude<ExtArgs> | null
    /**
     * Filter, which Digest to fetch.
     */
    where?: DigestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Digests to fetch.
     */
    orderBy?: DigestOrderByWithRelationInput | DigestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Digests.
     */
    cursor?: DigestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Digests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Digests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Digests.
     */
    distinct?: DigestScalarFieldEnum | DigestScalarFieldEnum[]
  }

  /**
   * Digest findFirstOrThrow
   */
  export type DigestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Digest
     */
    select?: DigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Digest
     */
    omit?: DigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigestInclude<ExtArgs> | null
    /**
     * Filter, which Digest to fetch.
     */
    where?: DigestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Digests to fetch.
     */
    orderBy?: DigestOrderByWithRelationInput | DigestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Digests.
     */
    cursor?: DigestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Digests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Digests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Digests.
     */
    distinct?: DigestScalarFieldEnum | DigestScalarFieldEnum[]
  }

  /**
   * Digest findMany
   */
  export type DigestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Digest
     */
    select?: DigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Digest
     */
    omit?: DigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigestInclude<ExtArgs> | null
    /**
     * Filter, which Digests to fetch.
     */
    where?: DigestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Digests to fetch.
     */
    orderBy?: DigestOrderByWithRelationInput | DigestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Digests.
     */
    cursor?: DigestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Digests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Digests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Digests.
     */
    distinct?: DigestScalarFieldEnum | DigestScalarFieldEnum[]
  }

  /**
   * Digest create
   */
  export type DigestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Digest
     */
    select?: DigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Digest
     */
    omit?: DigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigestInclude<ExtArgs> | null
    /**
     * The data needed to create a Digest.
     */
    data: XOR<DigestCreateInput, DigestUncheckedCreateInput>
  }

  /**
   * Digest createMany
   */
  export type DigestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Digests.
     */
    data: DigestCreateManyInput | DigestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Digest createManyAndReturn
   */
  export type DigestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Digest
     */
    select?: DigestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Digest
     */
    omit?: DigestOmit<ExtArgs> | null
    /**
     * The data used to create many Digests.
     */
    data: DigestCreateManyInput | DigestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Digest update
   */
  export type DigestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Digest
     */
    select?: DigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Digest
     */
    omit?: DigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigestInclude<ExtArgs> | null
    /**
     * The data needed to update a Digest.
     */
    data: XOR<DigestUpdateInput, DigestUncheckedUpdateInput>
    /**
     * Choose, which Digest to update.
     */
    where: DigestWhereUniqueInput
  }

  /**
   * Digest updateMany
   */
  export type DigestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Digests.
     */
    data: XOR<DigestUpdateManyMutationInput, DigestUncheckedUpdateManyInput>
    /**
     * Filter which Digests to update
     */
    where?: DigestWhereInput
    /**
     * Limit how many Digests to update.
     */
    limit?: number
  }

  /**
   * Digest updateManyAndReturn
   */
  export type DigestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Digest
     */
    select?: DigestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Digest
     */
    omit?: DigestOmit<ExtArgs> | null
    /**
     * The data used to update Digests.
     */
    data: XOR<DigestUpdateManyMutationInput, DigestUncheckedUpdateManyInput>
    /**
     * Filter which Digests to update
     */
    where?: DigestWhereInput
    /**
     * Limit how many Digests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Digest upsert
   */
  export type DigestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Digest
     */
    select?: DigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Digest
     */
    omit?: DigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigestInclude<ExtArgs> | null
    /**
     * The filter to search for the Digest to update in case it exists.
     */
    where: DigestWhereUniqueInput
    /**
     * In case the Digest found by the `where` argument doesn't exist, create a new Digest with this data.
     */
    create: XOR<DigestCreateInput, DigestUncheckedCreateInput>
    /**
     * In case the Digest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DigestUpdateInput, DigestUncheckedUpdateInput>
  }

  /**
   * Digest delete
   */
  export type DigestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Digest
     */
    select?: DigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Digest
     */
    omit?: DigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigestInclude<ExtArgs> | null
    /**
     * Filter which Digest to delete.
     */
    where: DigestWhereUniqueInput
  }

  /**
   * Digest deleteMany
   */
  export type DigestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Digests to delete
     */
    where?: DigestWhereInput
    /**
     * Limit how many Digests to delete.
     */
    limit?: number
  }

  /**
   * Digest without action
   */
  export type DigestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Digest
     */
    select?: DigestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Digest
     */
    omit?: DigestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigestInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WatchScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    topic: 'topic',
    searchQueries: 'searchQueries',
    frequency: 'frequency',
    significanceThreshold: 'significanceThreshold',
    notificationEmail: 'notificationEmail',
    notificationSlackWebhook: 'notificationSlackWebhook',
    active: 'active',
    lastRunAt: 'lastRunAt',
    runInProgress: 'runInProgress',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WatchScalarFieldEnum = (typeof WatchScalarFieldEnum)[keyof typeof WatchScalarFieldEnum]


  export const FindingScalarFieldEnum: {
    id: 'id',
    watchId: 'watchId',
    url: 'url',
    title: 'title',
    content: 'content',
    score: 'score',
    category: 'category',
    keyFact: 'keyFact',
    createdAt: 'createdAt'
  };

  export type FindingScalarFieldEnum = (typeof FindingScalarFieldEnum)[keyof typeof FindingScalarFieldEnum]


  export const DigestScalarFieldEnum: {
    id: 'id',
    watchId: 'watchId',
    summary: 'summary',
    sentAt: 'sentAt'
  };

  export type DigestScalarFieldEnum = (typeof DigestScalarFieldEnum)[keyof typeof DigestScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    watches?: WatchListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    watches?: WatchOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    watches?: WatchListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type WatchWhereInput = {
    AND?: WatchWhereInput | WatchWhereInput[]
    OR?: WatchWhereInput[]
    NOT?: WatchWhereInput | WatchWhereInput[]
    id?: StringFilter<"Watch"> | string
    userId?: StringFilter<"Watch"> | string
    topic?: StringFilter<"Watch"> | string
    searchQueries?: StringNullableListFilter<"Watch">
    frequency?: StringFilter<"Watch"> | string
    significanceThreshold?: IntFilter<"Watch"> | number
    notificationEmail?: StringNullableFilter<"Watch"> | string | null
    notificationSlackWebhook?: StringNullableFilter<"Watch"> | string | null
    active?: BoolFilter<"Watch"> | boolean
    lastRunAt?: DateTimeNullableFilter<"Watch"> | Date | string | null
    runInProgress?: BoolFilter<"Watch"> | boolean
    createdAt?: DateTimeFilter<"Watch"> | Date | string
    updatedAt?: DateTimeFilter<"Watch"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    findings?: FindingListRelationFilter
    digests?: DigestListRelationFilter
  }

  export type WatchOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    topic?: SortOrder
    searchQueries?: SortOrder
    frequency?: SortOrder
    significanceThreshold?: SortOrder
    notificationEmail?: SortOrderInput | SortOrder
    notificationSlackWebhook?: SortOrderInput | SortOrder
    active?: SortOrder
    lastRunAt?: SortOrderInput | SortOrder
    runInProgress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    findings?: FindingOrderByRelationAggregateInput
    digests?: DigestOrderByRelationAggregateInput
  }

  export type WatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WatchWhereInput | WatchWhereInput[]
    OR?: WatchWhereInput[]
    NOT?: WatchWhereInput | WatchWhereInput[]
    userId?: StringFilter<"Watch"> | string
    topic?: StringFilter<"Watch"> | string
    searchQueries?: StringNullableListFilter<"Watch">
    frequency?: StringFilter<"Watch"> | string
    significanceThreshold?: IntFilter<"Watch"> | number
    notificationEmail?: StringNullableFilter<"Watch"> | string | null
    notificationSlackWebhook?: StringNullableFilter<"Watch"> | string | null
    active?: BoolFilter<"Watch"> | boolean
    lastRunAt?: DateTimeNullableFilter<"Watch"> | Date | string | null
    runInProgress?: BoolFilter<"Watch"> | boolean
    createdAt?: DateTimeFilter<"Watch"> | Date | string
    updatedAt?: DateTimeFilter<"Watch"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    findings?: FindingListRelationFilter
    digests?: DigestListRelationFilter
  }, "id">

  export type WatchOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    topic?: SortOrder
    searchQueries?: SortOrder
    frequency?: SortOrder
    significanceThreshold?: SortOrder
    notificationEmail?: SortOrderInput | SortOrder
    notificationSlackWebhook?: SortOrderInput | SortOrder
    active?: SortOrder
    lastRunAt?: SortOrderInput | SortOrder
    runInProgress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WatchCountOrderByAggregateInput
    _avg?: WatchAvgOrderByAggregateInput
    _max?: WatchMaxOrderByAggregateInput
    _min?: WatchMinOrderByAggregateInput
    _sum?: WatchSumOrderByAggregateInput
  }

  export type WatchScalarWhereWithAggregatesInput = {
    AND?: WatchScalarWhereWithAggregatesInput | WatchScalarWhereWithAggregatesInput[]
    OR?: WatchScalarWhereWithAggregatesInput[]
    NOT?: WatchScalarWhereWithAggregatesInput | WatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Watch"> | string
    userId?: StringWithAggregatesFilter<"Watch"> | string
    topic?: StringWithAggregatesFilter<"Watch"> | string
    searchQueries?: StringNullableListFilter<"Watch">
    frequency?: StringWithAggregatesFilter<"Watch"> | string
    significanceThreshold?: IntWithAggregatesFilter<"Watch"> | number
    notificationEmail?: StringNullableWithAggregatesFilter<"Watch"> | string | null
    notificationSlackWebhook?: StringNullableWithAggregatesFilter<"Watch"> | string | null
    active?: BoolWithAggregatesFilter<"Watch"> | boolean
    lastRunAt?: DateTimeNullableWithAggregatesFilter<"Watch"> | Date | string | null
    runInProgress?: BoolWithAggregatesFilter<"Watch"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Watch"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Watch"> | Date | string
  }

  export type FindingWhereInput = {
    AND?: FindingWhereInput | FindingWhereInput[]
    OR?: FindingWhereInput[]
    NOT?: FindingWhereInput | FindingWhereInput[]
    id?: StringFilter<"Finding"> | string
    watchId?: StringFilter<"Finding"> | string
    url?: StringFilter<"Finding"> | string
    title?: StringFilter<"Finding"> | string
    content?: StringFilter<"Finding"> | string
    score?: IntFilter<"Finding"> | number
    category?: StringFilter<"Finding"> | string
    keyFact?: StringFilter<"Finding"> | string
    createdAt?: DateTimeFilter<"Finding"> | Date | string
    watch?: XOR<WatchScalarRelationFilter, WatchWhereInput>
  }

  export type FindingOrderByWithRelationInput = {
    id?: SortOrder
    watchId?: SortOrder
    url?: SortOrder
    title?: SortOrder
    content?: SortOrder
    score?: SortOrder
    category?: SortOrder
    keyFact?: SortOrder
    createdAt?: SortOrder
    watch?: WatchOrderByWithRelationInput
  }

  export type FindingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FindingWhereInput | FindingWhereInput[]
    OR?: FindingWhereInput[]
    NOT?: FindingWhereInput | FindingWhereInput[]
    watchId?: StringFilter<"Finding"> | string
    url?: StringFilter<"Finding"> | string
    title?: StringFilter<"Finding"> | string
    content?: StringFilter<"Finding"> | string
    score?: IntFilter<"Finding"> | number
    category?: StringFilter<"Finding"> | string
    keyFact?: StringFilter<"Finding"> | string
    createdAt?: DateTimeFilter<"Finding"> | Date | string
    watch?: XOR<WatchScalarRelationFilter, WatchWhereInput>
  }, "id">

  export type FindingOrderByWithAggregationInput = {
    id?: SortOrder
    watchId?: SortOrder
    url?: SortOrder
    title?: SortOrder
    content?: SortOrder
    score?: SortOrder
    category?: SortOrder
    keyFact?: SortOrder
    createdAt?: SortOrder
    _count?: FindingCountOrderByAggregateInput
    _avg?: FindingAvgOrderByAggregateInput
    _max?: FindingMaxOrderByAggregateInput
    _min?: FindingMinOrderByAggregateInput
    _sum?: FindingSumOrderByAggregateInput
  }

  export type FindingScalarWhereWithAggregatesInput = {
    AND?: FindingScalarWhereWithAggregatesInput | FindingScalarWhereWithAggregatesInput[]
    OR?: FindingScalarWhereWithAggregatesInput[]
    NOT?: FindingScalarWhereWithAggregatesInput | FindingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Finding"> | string
    watchId?: StringWithAggregatesFilter<"Finding"> | string
    url?: StringWithAggregatesFilter<"Finding"> | string
    title?: StringWithAggregatesFilter<"Finding"> | string
    content?: StringWithAggregatesFilter<"Finding"> | string
    score?: IntWithAggregatesFilter<"Finding"> | number
    category?: StringWithAggregatesFilter<"Finding"> | string
    keyFact?: StringWithAggregatesFilter<"Finding"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Finding"> | Date | string
  }

  export type DigestWhereInput = {
    AND?: DigestWhereInput | DigestWhereInput[]
    OR?: DigestWhereInput[]
    NOT?: DigestWhereInput | DigestWhereInput[]
    id?: StringFilter<"Digest"> | string
    watchId?: StringFilter<"Digest"> | string
    summary?: StringFilter<"Digest"> | string
    sentAt?: DateTimeFilter<"Digest"> | Date | string
    watch?: XOR<WatchScalarRelationFilter, WatchWhereInput>
  }

  export type DigestOrderByWithRelationInput = {
    id?: SortOrder
    watchId?: SortOrder
    summary?: SortOrder
    sentAt?: SortOrder
    watch?: WatchOrderByWithRelationInput
  }

  export type DigestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DigestWhereInput | DigestWhereInput[]
    OR?: DigestWhereInput[]
    NOT?: DigestWhereInput | DigestWhereInput[]
    watchId?: StringFilter<"Digest"> | string
    summary?: StringFilter<"Digest"> | string
    sentAt?: DateTimeFilter<"Digest"> | Date | string
    watch?: XOR<WatchScalarRelationFilter, WatchWhereInput>
  }, "id">

  export type DigestOrderByWithAggregationInput = {
    id?: SortOrder
    watchId?: SortOrder
    summary?: SortOrder
    sentAt?: SortOrder
    _count?: DigestCountOrderByAggregateInput
    _max?: DigestMaxOrderByAggregateInput
    _min?: DigestMinOrderByAggregateInput
  }

  export type DigestScalarWhereWithAggregatesInput = {
    AND?: DigestScalarWhereWithAggregatesInput | DigestScalarWhereWithAggregatesInput[]
    OR?: DigestScalarWhereWithAggregatesInput[]
    NOT?: DigestScalarWhereWithAggregatesInput | DigestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Digest"> | string
    watchId?: StringWithAggregatesFilter<"Digest"> | string
    summary?: StringWithAggregatesFilter<"Digest"> | string
    sentAt?: DateTimeWithAggregatesFilter<"Digest"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    watches?: WatchCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    watches?: WatchUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watches?: WatchUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watches?: WatchUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchCreateInput = {
    id?: string
    topic: string
    searchQueries?: WatchCreatesearchQueriesInput | string[]
    frequency: string
    significanceThreshold: number
    notificationEmail?: string | null
    notificationSlackWebhook?: string | null
    active?: boolean
    lastRunAt?: Date | string | null
    runInProgress?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWatchesInput
    findings?: FindingCreateNestedManyWithoutWatchInput
    digests?: DigestCreateNestedManyWithoutWatchInput
  }

  export type WatchUncheckedCreateInput = {
    id?: string
    userId: string
    topic: string
    searchQueries?: WatchCreatesearchQueriesInput | string[]
    frequency: string
    significanceThreshold: number
    notificationEmail?: string | null
    notificationSlackWebhook?: string | null
    active?: boolean
    lastRunAt?: Date | string | null
    runInProgress?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    findings?: FindingUncheckedCreateNestedManyWithoutWatchInput
    digests?: DigestUncheckedCreateNestedManyWithoutWatchInput
  }

  export type WatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    searchQueries?: WatchUpdatesearchQueriesInput | string[]
    frequency?: StringFieldUpdateOperationsInput | string
    significanceThreshold?: IntFieldUpdateOperationsInput | number
    notificationEmail?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSlackWebhook?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runInProgress?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWatchesNestedInput
    findings?: FindingUpdateManyWithoutWatchNestedInput
    digests?: DigestUpdateManyWithoutWatchNestedInput
  }

  export type WatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    searchQueries?: WatchUpdatesearchQueriesInput | string[]
    frequency?: StringFieldUpdateOperationsInput | string
    significanceThreshold?: IntFieldUpdateOperationsInput | number
    notificationEmail?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSlackWebhook?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runInProgress?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    findings?: FindingUncheckedUpdateManyWithoutWatchNestedInput
    digests?: DigestUncheckedUpdateManyWithoutWatchNestedInput
  }

  export type WatchCreateManyInput = {
    id?: string
    userId: string
    topic: string
    searchQueries?: WatchCreatesearchQueriesInput | string[]
    frequency: string
    significanceThreshold: number
    notificationEmail?: string | null
    notificationSlackWebhook?: string | null
    active?: boolean
    lastRunAt?: Date | string | null
    runInProgress?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    searchQueries?: WatchUpdatesearchQueriesInput | string[]
    frequency?: StringFieldUpdateOperationsInput | string
    significanceThreshold?: IntFieldUpdateOperationsInput | number
    notificationEmail?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSlackWebhook?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runInProgress?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    searchQueries?: WatchUpdatesearchQueriesInput | string[]
    frequency?: StringFieldUpdateOperationsInput | string
    significanceThreshold?: IntFieldUpdateOperationsInput | number
    notificationEmail?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSlackWebhook?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runInProgress?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FindingCreateInput = {
    id?: string
    url: string
    title: string
    content: string
    score: number
    category: string
    keyFact: string
    createdAt?: Date | string
    watch: WatchCreateNestedOneWithoutFindingsInput
  }

  export type FindingUncheckedCreateInput = {
    id?: string
    watchId: string
    url: string
    title: string
    content: string
    score: number
    category: string
    keyFact: string
    createdAt?: Date | string
  }

  export type FindingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    keyFact?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watch?: WatchUpdateOneRequiredWithoutFindingsNestedInput
  }

  export type FindingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    keyFact?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FindingCreateManyInput = {
    id?: string
    watchId: string
    url: string
    title: string
    content: string
    score: number
    category: string
    keyFact: string
    createdAt?: Date | string
  }

  export type FindingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    keyFact?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FindingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    keyFact?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigestCreateInput = {
    id?: string
    summary: string
    sentAt?: Date | string
    watch: WatchCreateNestedOneWithoutDigestsInput
  }

  export type DigestUncheckedCreateInput = {
    id?: string
    watchId: string
    summary: string
    sentAt?: Date | string
  }

  export type DigestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watch?: WatchUpdateOneRequiredWithoutDigestsNestedInput
  }

  export type DigestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigestCreateManyInput = {
    id?: string
    watchId: string
    summary: string
    sentAt?: Date | string
  }

  export type DigestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    watchId?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type WatchListRelationFilter = {
    every?: WatchWhereInput
    some?: WatchWhereInput
    none?: WatchWhereInput
  }

  export type WatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type FindingListRelationFilter = {
    every?: FindingWhereInput
    some?: FindingWhereInput
    none?: FindingWhereInput
  }

  export type DigestListRelationFilter = {
    every?: DigestWhereInput
    some?: DigestWhereInput
    none?: DigestWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FindingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DigestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WatchCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    topic?: SortOrder
    searchQueries?: SortOrder
    frequency?: SortOrder
    significanceThreshold?: SortOrder
    notificationEmail?: SortOrder
    notificationSlackWebhook?: SortOrder
    active?: SortOrder
    lastRunAt?: SortOrder
    runInProgress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchAvgOrderByAggregateInput = {
    significanceThreshold?: SortOrder
  }

  export type WatchMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    topic?: SortOrder
    frequency?: SortOrder
    significanceThreshold?: SortOrder
    notificationEmail?: SortOrder
    notificationSlackWebhook?: SortOrder
    active?: SortOrder
    lastRunAt?: SortOrder
    runInProgress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    topic?: SortOrder
    frequency?: SortOrder
    significanceThreshold?: SortOrder
    notificationEmail?: SortOrder
    notificationSlackWebhook?: SortOrder
    active?: SortOrder
    lastRunAt?: SortOrder
    runInProgress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchSumOrderByAggregateInput = {
    significanceThreshold?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type WatchScalarRelationFilter = {
    is?: WatchWhereInput
    isNot?: WatchWhereInput
  }

  export type FindingCountOrderByAggregateInput = {
    id?: SortOrder
    watchId?: SortOrder
    url?: SortOrder
    title?: SortOrder
    content?: SortOrder
    score?: SortOrder
    category?: SortOrder
    keyFact?: SortOrder
    createdAt?: SortOrder
  }

  export type FindingAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type FindingMaxOrderByAggregateInput = {
    id?: SortOrder
    watchId?: SortOrder
    url?: SortOrder
    title?: SortOrder
    content?: SortOrder
    score?: SortOrder
    category?: SortOrder
    keyFact?: SortOrder
    createdAt?: SortOrder
  }

  export type FindingMinOrderByAggregateInput = {
    id?: SortOrder
    watchId?: SortOrder
    url?: SortOrder
    title?: SortOrder
    content?: SortOrder
    score?: SortOrder
    category?: SortOrder
    keyFact?: SortOrder
    createdAt?: SortOrder
  }

  export type FindingSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type DigestCountOrderByAggregateInput = {
    id?: SortOrder
    watchId?: SortOrder
    summary?: SortOrder
    sentAt?: SortOrder
  }

  export type DigestMaxOrderByAggregateInput = {
    id?: SortOrder
    watchId?: SortOrder
    summary?: SortOrder
    sentAt?: SortOrder
  }

  export type DigestMinOrderByAggregateInput = {
    id?: SortOrder
    watchId?: SortOrder
    summary?: SortOrder
    sentAt?: SortOrder
  }

  export type WatchCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchCreateWithoutUserInput, WatchUncheckedCreateWithoutUserInput> | WatchCreateWithoutUserInput[] | WatchUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchCreateOrConnectWithoutUserInput | WatchCreateOrConnectWithoutUserInput[]
    createMany?: WatchCreateManyUserInputEnvelope
    connect?: WatchWhereUniqueInput | WatchWhereUniqueInput[]
  }

  export type WatchUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchCreateWithoutUserInput, WatchUncheckedCreateWithoutUserInput> | WatchCreateWithoutUserInput[] | WatchUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchCreateOrConnectWithoutUserInput | WatchCreateOrConnectWithoutUserInput[]
    createMany?: WatchCreateManyUserInputEnvelope
    connect?: WatchWhereUniqueInput | WatchWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WatchUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchCreateWithoutUserInput, WatchUncheckedCreateWithoutUserInput> | WatchCreateWithoutUserInput[] | WatchUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchCreateOrConnectWithoutUserInput | WatchCreateOrConnectWithoutUserInput[]
    upsert?: WatchUpsertWithWhereUniqueWithoutUserInput | WatchUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchCreateManyUserInputEnvelope
    set?: WatchWhereUniqueInput | WatchWhereUniqueInput[]
    disconnect?: WatchWhereUniqueInput | WatchWhereUniqueInput[]
    delete?: WatchWhereUniqueInput | WatchWhereUniqueInput[]
    connect?: WatchWhereUniqueInput | WatchWhereUniqueInput[]
    update?: WatchUpdateWithWhereUniqueWithoutUserInput | WatchUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchUpdateManyWithWhereWithoutUserInput | WatchUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchScalarWhereInput | WatchScalarWhereInput[]
  }

  export type WatchUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchCreateWithoutUserInput, WatchUncheckedCreateWithoutUserInput> | WatchCreateWithoutUserInput[] | WatchUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchCreateOrConnectWithoutUserInput | WatchCreateOrConnectWithoutUserInput[]
    upsert?: WatchUpsertWithWhereUniqueWithoutUserInput | WatchUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchCreateManyUserInputEnvelope
    set?: WatchWhereUniqueInput | WatchWhereUniqueInput[]
    disconnect?: WatchWhereUniqueInput | WatchWhereUniqueInput[]
    delete?: WatchWhereUniqueInput | WatchWhereUniqueInput[]
    connect?: WatchWhereUniqueInput | WatchWhereUniqueInput[]
    update?: WatchUpdateWithWhereUniqueWithoutUserInput | WatchUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchUpdateManyWithWhereWithoutUserInput | WatchUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchScalarWhereInput | WatchScalarWhereInput[]
  }

  export type WatchCreatesearchQueriesInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutWatchesInput = {
    create?: XOR<UserCreateWithoutWatchesInput, UserUncheckedCreateWithoutWatchesInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchesInput
    connect?: UserWhereUniqueInput
  }

  export type FindingCreateNestedManyWithoutWatchInput = {
    create?: XOR<FindingCreateWithoutWatchInput, FindingUncheckedCreateWithoutWatchInput> | FindingCreateWithoutWatchInput[] | FindingUncheckedCreateWithoutWatchInput[]
    connectOrCreate?: FindingCreateOrConnectWithoutWatchInput | FindingCreateOrConnectWithoutWatchInput[]
    createMany?: FindingCreateManyWatchInputEnvelope
    connect?: FindingWhereUniqueInput | FindingWhereUniqueInput[]
  }

  export type DigestCreateNestedManyWithoutWatchInput = {
    create?: XOR<DigestCreateWithoutWatchInput, DigestUncheckedCreateWithoutWatchInput> | DigestCreateWithoutWatchInput[] | DigestUncheckedCreateWithoutWatchInput[]
    connectOrCreate?: DigestCreateOrConnectWithoutWatchInput | DigestCreateOrConnectWithoutWatchInput[]
    createMany?: DigestCreateManyWatchInputEnvelope
    connect?: DigestWhereUniqueInput | DigestWhereUniqueInput[]
  }

  export type FindingUncheckedCreateNestedManyWithoutWatchInput = {
    create?: XOR<FindingCreateWithoutWatchInput, FindingUncheckedCreateWithoutWatchInput> | FindingCreateWithoutWatchInput[] | FindingUncheckedCreateWithoutWatchInput[]
    connectOrCreate?: FindingCreateOrConnectWithoutWatchInput | FindingCreateOrConnectWithoutWatchInput[]
    createMany?: FindingCreateManyWatchInputEnvelope
    connect?: FindingWhereUniqueInput | FindingWhereUniqueInput[]
  }

  export type DigestUncheckedCreateNestedManyWithoutWatchInput = {
    create?: XOR<DigestCreateWithoutWatchInput, DigestUncheckedCreateWithoutWatchInput> | DigestCreateWithoutWatchInput[] | DigestUncheckedCreateWithoutWatchInput[]
    connectOrCreate?: DigestCreateOrConnectWithoutWatchInput | DigestCreateOrConnectWithoutWatchInput[]
    createMany?: DigestCreateManyWatchInputEnvelope
    connect?: DigestWhereUniqueInput | DigestWhereUniqueInput[]
  }

  export type WatchUpdatesearchQueriesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutWatchesNestedInput = {
    create?: XOR<UserCreateWithoutWatchesInput, UserUncheckedCreateWithoutWatchesInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchesInput
    upsert?: UserUpsertWithoutWatchesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWatchesInput, UserUpdateWithoutWatchesInput>, UserUncheckedUpdateWithoutWatchesInput>
  }

  export type FindingUpdateManyWithoutWatchNestedInput = {
    create?: XOR<FindingCreateWithoutWatchInput, FindingUncheckedCreateWithoutWatchInput> | FindingCreateWithoutWatchInput[] | FindingUncheckedCreateWithoutWatchInput[]
    connectOrCreate?: FindingCreateOrConnectWithoutWatchInput | FindingCreateOrConnectWithoutWatchInput[]
    upsert?: FindingUpsertWithWhereUniqueWithoutWatchInput | FindingUpsertWithWhereUniqueWithoutWatchInput[]
    createMany?: FindingCreateManyWatchInputEnvelope
    set?: FindingWhereUniqueInput | FindingWhereUniqueInput[]
    disconnect?: FindingWhereUniqueInput | FindingWhereUniqueInput[]
    delete?: FindingWhereUniqueInput | FindingWhereUniqueInput[]
    connect?: FindingWhereUniqueInput | FindingWhereUniqueInput[]
    update?: FindingUpdateWithWhereUniqueWithoutWatchInput | FindingUpdateWithWhereUniqueWithoutWatchInput[]
    updateMany?: FindingUpdateManyWithWhereWithoutWatchInput | FindingUpdateManyWithWhereWithoutWatchInput[]
    deleteMany?: FindingScalarWhereInput | FindingScalarWhereInput[]
  }

  export type DigestUpdateManyWithoutWatchNestedInput = {
    create?: XOR<DigestCreateWithoutWatchInput, DigestUncheckedCreateWithoutWatchInput> | DigestCreateWithoutWatchInput[] | DigestUncheckedCreateWithoutWatchInput[]
    connectOrCreate?: DigestCreateOrConnectWithoutWatchInput | DigestCreateOrConnectWithoutWatchInput[]
    upsert?: DigestUpsertWithWhereUniqueWithoutWatchInput | DigestUpsertWithWhereUniqueWithoutWatchInput[]
    createMany?: DigestCreateManyWatchInputEnvelope
    set?: DigestWhereUniqueInput | DigestWhereUniqueInput[]
    disconnect?: DigestWhereUniqueInput | DigestWhereUniqueInput[]
    delete?: DigestWhereUniqueInput | DigestWhereUniqueInput[]
    connect?: DigestWhereUniqueInput | DigestWhereUniqueInput[]
    update?: DigestUpdateWithWhereUniqueWithoutWatchInput | DigestUpdateWithWhereUniqueWithoutWatchInput[]
    updateMany?: DigestUpdateManyWithWhereWithoutWatchInput | DigestUpdateManyWithWhereWithoutWatchInput[]
    deleteMany?: DigestScalarWhereInput | DigestScalarWhereInput[]
  }

  export type FindingUncheckedUpdateManyWithoutWatchNestedInput = {
    create?: XOR<FindingCreateWithoutWatchInput, FindingUncheckedCreateWithoutWatchInput> | FindingCreateWithoutWatchInput[] | FindingUncheckedCreateWithoutWatchInput[]
    connectOrCreate?: FindingCreateOrConnectWithoutWatchInput | FindingCreateOrConnectWithoutWatchInput[]
    upsert?: FindingUpsertWithWhereUniqueWithoutWatchInput | FindingUpsertWithWhereUniqueWithoutWatchInput[]
    createMany?: FindingCreateManyWatchInputEnvelope
    set?: FindingWhereUniqueInput | FindingWhereUniqueInput[]
    disconnect?: FindingWhereUniqueInput | FindingWhereUniqueInput[]
    delete?: FindingWhereUniqueInput | FindingWhereUniqueInput[]
    connect?: FindingWhereUniqueInput | FindingWhereUniqueInput[]
    update?: FindingUpdateWithWhereUniqueWithoutWatchInput | FindingUpdateWithWhereUniqueWithoutWatchInput[]
    updateMany?: FindingUpdateManyWithWhereWithoutWatchInput | FindingUpdateManyWithWhereWithoutWatchInput[]
    deleteMany?: FindingScalarWhereInput | FindingScalarWhereInput[]
  }

  export type DigestUncheckedUpdateManyWithoutWatchNestedInput = {
    create?: XOR<DigestCreateWithoutWatchInput, DigestUncheckedCreateWithoutWatchInput> | DigestCreateWithoutWatchInput[] | DigestUncheckedCreateWithoutWatchInput[]
    connectOrCreate?: DigestCreateOrConnectWithoutWatchInput | DigestCreateOrConnectWithoutWatchInput[]
    upsert?: DigestUpsertWithWhereUniqueWithoutWatchInput | DigestUpsertWithWhereUniqueWithoutWatchInput[]
    createMany?: DigestCreateManyWatchInputEnvelope
    set?: DigestWhereUniqueInput | DigestWhereUniqueInput[]
    disconnect?: DigestWhereUniqueInput | DigestWhereUniqueInput[]
    delete?: DigestWhereUniqueInput | DigestWhereUniqueInput[]
    connect?: DigestWhereUniqueInput | DigestWhereUniqueInput[]
    update?: DigestUpdateWithWhereUniqueWithoutWatchInput | DigestUpdateWithWhereUniqueWithoutWatchInput[]
    updateMany?: DigestUpdateManyWithWhereWithoutWatchInput | DigestUpdateManyWithWhereWithoutWatchInput[]
    deleteMany?: DigestScalarWhereInput | DigestScalarWhereInput[]
  }

  export type WatchCreateNestedOneWithoutFindingsInput = {
    create?: XOR<WatchCreateWithoutFindingsInput, WatchUncheckedCreateWithoutFindingsInput>
    connectOrCreate?: WatchCreateOrConnectWithoutFindingsInput
    connect?: WatchWhereUniqueInput
  }

  export type WatchUpdateOneRequiredWithoutFindingsNestedInput = {
    create?: XOR<WatchCreateWithoutFindingsInput, WatchUncheckedCreateWithoutFindingsInput>
    connectOrCreate?: WatchCreateOrConnectWithoutFindingsInput
    upsert?: WatchUpsertWithoutFindingsInput
    connect?: WatchWhereUniqueInput
    update?: XOR<XOR<WatchUpdateToOneWithWhereWithoutFindingsInput, WatchUpdateWithoutFindingsInput>, WatchUncheckedUpdateWithoutFindingsInput>
  }

  export type WatchCreateNestedOneWithoutDigestsInput = {
    create?: XOR<WatchCreateWithoutDigestsInput, WatchUncheckedCreateWithoutDigestsInput>
    connectOrCreate?: WatchCreateOrConnectWithoutDigestsInput
    connect?: WatchWhereUniqueInput
  }

  export type WatchUpdateOneRequiredWithoutDigestsNestedInput = {
    create?: XOR<WatchCreateWithoutDigestsInput, WatchUncheckedCreateWithoutDigestsInput>
    connectOrCreate?: WatchCreateOrConnectWithoutDigestsInput
    upsert?: WatchUpsertWithoutDigestsInput
    connect?: WatchWhereUniqueInput
    update?: XOR<XOR<WatchUpdateToOneWithWhereWithoutDigestsInput, WatchUpdateWithoutDigestsInput>, WatchUncheckedUpdateWithoutDigestsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type WatchCreateWithoutUserInput = {
    id?: string
    topic: string
    searchQueries?: WatchCreatesearchQueriesInput | string[]
    frequency: string
    significanceThreshold: number
    notificationEmail?: string | null
    notificationSlackWebhook?: string | null
    active?: boolean
    lastRunAt?: Date | string | null
    runInProgress?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    findings?: FindingCreateNestedManyWithoutWatchInput
    digests?: DigestCreateNestedManyWithoutWatchInput
  }

  export type WatchUncheckedCreateWithoutUserInput = {
    id?: string
    topic: string
    searchQueries?: WatchCreatesearchQueriesInput | string[]
    frequency: string
    significanceThreshold: number
    notificationEmail?: string | null
    notificationSlackWebhook?: string | null
    active?: boolean
    lastRunAt?: Date | string | null
    runInProgress?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    findings?: FindingUncheckedCreateNestedManyWithoutWatchInput
    digests?: DigestUncheckedCreateNestedManyWithoutWatchInput
  }

  export type WatchCreateOrConnectWithoutUserInput = {
    where: WatchWhereUniqueInput
    create: XOR<WatchCreateWithoutUserInput, WatchUncheckedCreateWithoutUserInput>
  }

  export type WatchCreateManyUserInputEnvelope = {
    data: WatchCreateManyUserInput | WatchCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WatchUpsertWithWhereUniqueWithoutUserInput = {
    where: WatchWhereUniqueInput
    update: XOR<WatchUpdateWithoutUserInput, WatchUncheckedUpdateWithoutUserInput>
    create: XOR<WatchCreateWithoutUserInput, WatchUncheckedCreateWithoutUserInput>
  }

  export type WatchUpdateWithWhereUniqueWithoutUserInput = {
    where: WatchWhereUniqueInput
    data: XOR<WatchUpdateWithoutUserInput, WatchUncheckedUpdateWithoutUserInput>
  }

  export type WatchUpdateManyWithWhereWithoutUserInput = {
    where: WatchScalarWhereInput
    data: XOR<WatchUpdateManyMutationInput, WatchUncheckedUpdateManyWithoutUserInput>
  }

  export type WatchScalarWhereInput = {
    AND?: WatchScalarWhereInput | WatchScalarWhereInput[]
    OR?: WatchScalarWhereInput[]
    NOT?: WatchScalarWhereInput | WatchScalarWhereInput[]
    id?: StringFilter<"Watch"> | string
    userId?: StringFilter<"Watch"> | string
    topic?: StringFilter<"Watch"> | string
    searchQueries?: StringNullableListFilter<"Watch">
    frequency?: StringFilter<"Watch"> | string
    significanceThreshold?: IntFilter<"Watch"> | number
    notificationEmail?: StringNullableFilter<"Watch"> | string | null
    notificationSlackWebhook?: StringNullableFilter<"Watch"> | string | null
    active?: BoolFilter<"Watch"> | boolean
    lastRunAt?: DateTimeNullableFilter<"Watch"> | Date | string | null
    runInProgress?: BoolFilter<"Watch"> | boolean
    createdAt?: DateTimeFilter<"Watch"> | Date | string
    updatedAt?: DateTimeFilter<"Watch"> | Date | string
  }

  export type UserCreateWithoutWatchesInput = {
    id?: string
    email: string
    name: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutWatchesInput = {
    id?: string
    email: string
    name: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutWatchesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWatchesInput, UserUncheckedCreateWithoutWatchesInput>
  }

  export type FindingCreateWithoutWatchInput = {
    id?: string
    url: string
    title: string
    content: string
    score: number
    category: string
    keyFact: string
    createdAt?: Date | string
  }

  export type FindingUncheckedCreateWithoutWatchInput = {
    id?: string
    url: string
    title: string
    content: string
    score: number
    category: string
    keyFact: string
    createdAt?: Date | string
  }

  export type FindingCreateOrConnectWithoutWatchInput = {
    where: FindingWhereUniqueInput
    create: XOR<FindingCreateWithoutWatchInput, FindingUncheckedCreateWithoutWatchInput>
  }

  export type FindingCreateManyWatchInputEnvelope = {
    data: FindingCreateManyWatchInput | FindingCreateManyWatchInput[]
    skipDuplicates?: boolean
  }

  export type DigestCreateWithoutWatchInput = {
    id?: string
    summary: string
    sentAt?: Date | string
  }

  export type DigestUncheckedCreateWithoutWatchInput = {
    id?: string
    summary: string
    sentAt?: Date | string
  }

  export type DigestCreateOrConnectWithoutWatchInput = {
    where: DigestWhereUniqueInput
    create: XOR<DigestCreateWithoutWatchInput, DigestUncheckedCreateWithoutWatchInput>
  }

  export type DigestCreateManyWatchInputEnvelope = {
    data: DigestCreateManyWatchInput | DigestCreateManyWatchInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWatchesInput = {
    update: XOR<UserUpdateWithoutWatchesInput, UserUncheckedUpdateWithoutWatchesInput>
    create: XOR<UserCreateWithoutWatchesInput, UserUncheckedCreateWithoutWatchesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWatchesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWatchesInput, UserUncheckedUpdateWithoutWatchesInput>
  }

  export type UserUpdateWithoutWatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutWatchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FindingUpsertWithWhereUniqueWithoutWatchInput = {
    where: FindingWhereUniqueInput
    update: XOR<FindingUpdateWithoutWatchInput, FindingUncheckedUpdateWithoutWatchInput>
    create: XOR<FindingCreateWithoutWatchInput, FindingUncheckedCreateWithoutWatchInput>
  }

  export type FindingUpdateWithWhereUniqueWithoutWatchInput = {
    where: FindingWhereUniqueInput
    data: XOR<FindingUpdateWithoutWatchInput, FindingUncheckedUpdateWithoutWatchInput>
  }

  export type FindingUpdateManyWithWhereWithoutWatchInput = {
    where: FindingScalarWhereInput
    data: XOR<FindingUpdateManyMutationInput, FindingUncheckedUpdateManyWithoutWatchInput>
  }

  export type FindingScalarWhereInput = {
    AND?: FindingScalarWhereInput | FindingScalarWhereInput[]
    OR?: FindingScalarWhereInput[]
    NOT?: FindingScalarWhereInput | FindingScalarWhereInput[]
    id?: StringFilter<"Finding"> | string
    watchId?: StringFilter<"Finding"> | string
    url?: StringFilter<"Finding"> | string
    title?: StringFilter<"Finding"> | string
    content?: StringFilter<"Finding"> | string
    score?: IntFilter<"Finding"> | number
    category?: StringFilter<"Finding"> | string
    keyFact?: StringFilter<"Finding"> | string
    createdAt?: DateTimeFilter<"Finding"> | Date | string
  }

  export type DigestUpsertWithWhereUniqueWithoutWatchInput = {
    where: DigestWhereUniqueInput
    update: XOR<DigestUpdateWithoutWatchInput, DigestUncheckedUpdateWithoutWatchInput>
    create: XOR<DigestCreateWithoutWatchInput, DigestUncheckedCreateWithoutWatchInput>
  }

  export type DigestUpdateWithWhereUniqueWithoutWatchInput = {
    where: DigestWhereUniqueInput
    data: XOR<DigestUpdateWithoutWatchInput, DigestUncheckedUpdateWithoutWatchInput>
  }

  export type DigestUpdateManyWithWhereWithoutWatchInput = {
    where: DigestScalarWhereInput
    data: XOR<DigestUpdateManyMutationInput, DigestUncheckedUpdateManyWithoutWatchInput>
  }

  export type DigestScalarWhereInput = {
    AND?: DigestScalarWhereInput | DigestScalarWhereInput[]
    OR?: DigestScalarWhereInput[]
    NOT?: DigestScalarWhereInput | DigestScalarWhereInput[]
    id?: StringFilter<"Digest"> | string
    watchId?: StringFilter<"Digest"> | string
    summary?: StringFilter<"Digest"> | string
    sentAt?: DateTimeFilter<"Digest"> | Date | string
  }

  export type WatchCreateWithoutFindingsInput = {
    id?: string
    topic: string
    searchQueries?: WatchCreatesearchQueriesInput | string[]
    frequency: string
    significanceThreshold: number
    notificationEmail?: string | null
    notificationSlackWebhook?: string | null
    active?: boolean
    lastRunAt?: Date | string | null
    runInProgress?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWatchesInput
    digests?: DigestCreateNestedManyWithoutWatchInput
  }

  export type WatchUncheckedCreateWithoutFindingsInput = {
    id?: string
    userId: string
    topic: string
    searchQueries?: WatchCreatesearchQueriesInput | string[]
    frequency: string
    significanceThreshold: number
    notificationEmail?: string | null
    notificationSlackWebhook?: string | null
    active?: boolean
    lastRunAt?: Date | string | null
    runInProgress?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    digests?: DigestUncheckedCreateNestedManyWithoutWatchInput
  }

  export type WatchCreateOrConnectWithoutFindingsInput = {
    where: WatchWhereUniqueInput
    create: XOR<WatchCreateWithoutFindingsInput, WatchUncheckedCreateWithoutFindingsInput>
  }

  export type WatchUpsertWithoutFindingsInput = {
    update: XOR<WatchUpdateWithoutFindingsInput, WatchUncheckedUpdateWithoutFindingsInput>
    create: XOR<WatchCreateWithoutFindingsInput, WatchUncheckedCreateWithoutFindingsInput>
    where?: WatchWhereInput
  }

  export type WatchUpdateToOneWithWhereWithoutFindingsInput = {
    where?: WatchWhereInput
    data: XOR<WatchUpdateWithoutFindingsInput, WatchUncheckedUpdateWithoutFindingsInput>
  }

  export type WatchUpdateWithoutFindingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    searchQueries?: WatchUpdatesearchQueriesInput | string[]
    frequency?: StringFieldUpdateOperationsInput | string
    significanceThreshold?: IntFieldUpdateOperationsInput | number
    notificationEmail?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSlackWebhook?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runInProgress?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWatchesNestedInput
    digests?: DigestUpdateManyWithoutWatchNestedInput
  }

  export type WatchUncheckedUpdateWithoutFindingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    searchQueries?: WatchUpdatesearchQueriesInput | string[]
    frequency?: StringFieldUpdateOperationsInput | string
    significanceThreshold?: IntFieldUpdateOperationsInput | number
    notificationEmail?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSlackWebhook?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runInProgress?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    digests?: DigestUncheckedUpdateManyWithoutWatchNestedInput
  }

  export type WatchCreateWithoutDigestsInput = {
    id?: string
    topic: string
    searchQueries?: WatchCreatesearchQueriesInput | string[]
    frequency: string
    significanceThreshold: number
    notificationEmail?: string | null
    notificationSlackWebhook?: string | null
    active?: boolean
    lastRunAt?: Date | string | null
    runInProgress?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWatchesInput
    findings?: FindingCreateNestedManyWithoutWatchInput
  }

  export type WatchUncheckedCreateWithoutDigestsInput = {
    id?: string
    userId: string
    topic: string
    searchQueries?: WatchCreatesearchQueriesInput | string[]
    frequency: string
    significanceThreshold: number
    notificationEmail?: string | null
    notificationSlackWebhook?: string | null
    active?: boolean
    lastRunAt?: Date | string | null
    runInProgress?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    findings?: FindingUncheckedCreateNestedManyWithoutWatchInput
  }

  export type WatchCreateOrConnectWithoutDigestsInput = {
    where: WatchWhereUniqueInput
    create: XOR<WatchCreateWithoutDigestsInput, WatchUncheckedCreateWithoutDigestsInput>
  }

  export type WatchUpsertWithoutDigestsInput = {
    update: XOR<WatchUpdateWithoutDigestsInput, WatchUncheckedUpdateWithoutDigestsInput>
    create: XOR<WatchCreateWithoutDigestsInput, WatchUncheckedCreateWithoutDigestsInput>
    where?: WatchWhereInput
  }

  export type WatchUpdateToOneWithWhereWithoutDigestsInput = {
    where?: WatchWhereInput
    data: XOR<WatchUpdateWithoutDigestsInput, WatchUncheckedUpdateWithoutDigestsInput>
  }

  export type WatchUpdateWithoutDigestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    searchQueries?: WatchUpdatesearchQueriesInput | string[]
    frequency?: StringFieldUpdateOperationsInput | string
    significanceThreshold?: IntFieldUpdateOperationsInput | number
    notificationEmail?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSlackWebhook?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runInProgress?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWatchesNestedInput
    findings?: FindingUpdateManyWithoutWatchNestedInput
  }

  export type WatchUncheckedUpdateWithoutDigestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    searchQueries?: WatchUpdatesearchQueriesInput | string[]
    frequency?: StringFieldUpdateOperationsInput | string
    significanceThreshold?: IntFieldUpdateOperationsInput | number
    notificationEmail?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSlackWebhook?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runInProgress?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    findings?: FindingUncheckedUpdateManyWithoutWatchNestedInput
  }

  export type WatchCreateManyUserInput = {
    id?: string
    topic: string
    searchQueries?: WatchCreatesearchQueriesInput | string[]
    frequency: string
    significanceThreshold: number
    notificationEmail?: string | null
    notificationSlackWebhook?: string | null
    active?: boolean
    lastRunAt?: Date | string | null
    runInProgress?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    searchQueries?: WatchUpdatesearchQueriesInput | string[]
    frequency?: StringFieldUpdateOperationsInput | string
    significanceThreshold?: IntFieldUpdateOperationsInput | number
    notificationEmail?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSlackWebhook?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runInProgress?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    findings?: FindingUpdateManyWithoutWatchNestedInput
    digests?: DigestUpdateManyWithoutWatchNestedInput
  }

  export type WatchUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    searchQueries?: WatchUpdatesearchQueriesInput | string[]
    frequency?: StringFieldUpdateOperationsInput | string
    significanceThreshold?: IntFieldUpdateOperationsInput | number
    notificationEmail?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSlackWebhook?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runInProgress?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    findings?: FindingUncheckedUpdateManyWithoutWatchNestedInput
    digests?: DigestUncheckedUpdateManyWithoutWatchNestedInput
  }

  export type WatchUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    topic?: StringFieldUpdateOperationsInput | string
    searchQueries?: WatchUpdatesearchQueriesInput | string[]
    frequency?: StringFieldUpdateOperationsInput | string
    significanceThreshold?: IntFieldUpdateOperationsInput | number
    notificationEmail?: NullableStringFieldUpdateOperationsInput | string | null
    notificationSlackWebhook?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    runInProgress?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FindingCreateManyWatchInput = {
    id?: string
    url: string
    title: string
    content: string
    score: number
    category: string
    keyFact: string
    createdAt?: Date | string
  }

  export type DigestCreateManyWatchInput = {
    id?: string
    summary: string
    sentAt?: Date | string
  }

  export type FindingUpdateWithoutWatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    keyFact?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FindingUncheckedUpdateWithoutWatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    keyFact?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FindingUncheckedUpdateManyWithoutWatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    keyFact?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigestUpdateWithoutWatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigestUncheckedUpdateWithoutWatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigestUncheckedUpdateManyWithoutWatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    sentAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
  export const dmmf: runtime.BaseDMMF
}