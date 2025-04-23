// generated with @7nohe/openapi-react-query-codegen@2.0.0-beta.3 

import { type Options } from "@hey-api/client-fetch";
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { createSuppliedTokenHandler, getSuppliedTokenListHandler } from "../requests/services.gen";
import { CreateSuppliedTokenHandlerData, CreateSuppliedTokenHandlerError, GetSuppliedTokenListHandlerData, GetSuppliedTokenListHandlerError } from "../requests/types.gen";
import * as Common from "./common";
export const useGetSuppliedTokenListHandler = <TData = Common.GetSuppliedTokenListHandlerDefaultResponse, TError = GetSuppliedTokenListHandlerError, TQueryKey extends Array<unknown> = unknown[]>(clientOptions: Options<GetSuppliedTokenListHandlerData, true> = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGetSuppliedTokenListHandlerKeyFn(clientOptions, queryKey), queryFn: () => getSuppliedTokenListHandler({ ...clientOptions }).then(response => response.data as TData) as TData, ...options });
export const useCreateSuppliedTokenHandler = <TData = Common.CreateSuppliedTokenHandlerMutationResult, TError = CreateSuppliedTokenHandlerError, TQueryKey extends Array<unknown> = unknown[], TContext = unknown>(mutationKey?: TQueryKey, options?: Omit<UseMutationOptions<TData, TError, Options<CreateSuppliedTokenHandlerData, true>, TContext>, "mutationKey" | "mutationFn">) => useMutation<TData, TError, Options<CreateSuppliedTokenHandlerData, true>, TContext>({ mutationKey: Common.UseCreateSuppliedTokenHandlerKeyFn(mutationKey), mutationFn: clientOptions => createSuppliedTokenHandler(clientOptions) as unknown as Promise<TData>, ...options });
