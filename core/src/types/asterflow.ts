import type { AnyRouter, Method, Router } from '@asterflow/router'

export type Tuple<T extends readonly any[]> = readonly [...T];

export type NormalizePath<Path extends string> =
  Path extends `${infer Head}//${infer Tail}`
    ? NormalizePath<`${Head}/${Tail}`>
    : Path;

export type CombinePaths<
  Base extends string,
  Path extends string
> = NormalizePath<`${Base}${Path}`>
  

export type InferPath<T> = 
  T extends Router<infer P, any, any, any, any, any, any> ? CombinePaths<'/', P> :
  T extends Method<any, infer P, any, any, any, any, any> ? CombinePaths<'/', P> :
  never;

export type CombinedRoutes<
  Base extends string,
  Routes extends readonly AnyRouter[]
> = {
  [K in keyof Routes]: Routes[K] extends infer R
  ? Map<CombinePaths<Base, InferPath<R>>, R>
  : never;
}[number];