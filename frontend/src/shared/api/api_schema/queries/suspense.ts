// generated with @7nohe/openapi-react-query-codegen@2.0.0-beta.3 

import { type Options } from "@hey-api/client-fetch";
import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getSuppliedTokenListHandler } from "../requests/services.gen";
import { GetSuppliedTokenListHandlerData, GetSuppliedTokenListHandlerError } from "../requests/types.gen";
import * as Common from "./common";
export const useGetSuppliedTokenListHandlerSuspense = <TData = Common.GetSuppliedTokenListHandlerDefaultResponse, TError = GetSuppliedTokenListHandlerError, TQueryKey extends Array<unknown> = unknown[]>(clientOptions: Options<GetSuppliedTokenListHandlerData, true> = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGetSuppliedTokenListHandlerKeyFn(clientOptions, queryKey), queryFn: () => getSuppliedTokenListHandler({ ...clientOptions }).then(response => response.data as TData) as TData, ...options });
