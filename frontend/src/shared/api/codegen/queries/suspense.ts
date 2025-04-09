// generated with @7nohe/openapi-react-query-codegen@2.0.0-beta.3 

import { type Options } from "@hey-api/client-fetch";
import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { get, list } from "../requests/services.gen";
import { GetData, GetError, ListError } from "../requests/types.gen";
import * as Common from "./common";
export const useListSuspense = <TData = Common.ListDefaultResponse, TError = ListError, TQueryKey extends Array<unknown> = unknown[]>(clientOptions: Options<unknown, true> = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseListKeyFn(clientOptions, queryKey), queryFn: () => list({ ...clientOptions }).then(response => response.data as TData) as TData, ...options });
export const useGetSuspense = <TData = Common.GetDefaultResponse, TError = GetError, TQueryKey extends Array<unknown> = unknown[]>(clientOptions: Options<GetData, true>, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGetKeyFn(clientOptions, queryKey), queryFn: () => get({ ...clientOptions }).then(response => response.data as TData) as TData, ...options });
