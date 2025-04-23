// generated with @7nohe/openapi-react-query-codegen@2.0.0-beta.3 

import { type Options } from "@hey-api/client-fetch";
import { UseQueryResult } from "@tanstack/react-query";
import { createSuppliedTokenHandler, getSuppliedTokenListHandler } from "../requests/services.gen";
export type GetSuppliedTokenListHandlerDefaultResponse = Awaited<ReturnType<typeof getSuppliedTokenListHandler>>["data"];
export type GetSuppliedTokenListHandlerQueryResult<TData = GetSuppliedTokenListHandlerDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGetSuppliedTokenListHandlerKey = "GetSuppliedTokenListHandler";
export const UseGetSuppliedTokenListHandlerKeyFn = (clientOptions: Options<unknown, true> = {}, queryKey?: Array<unknown>) => [useGetSuppliedTokenListHandlerKey, ...(queryKey ?? [clientOptions])];
export type CreateSuppliedTokenHandlerMutationResult = Awaited<ReturnType<typeof createSuppliedTokenHandler>>;
export const useCreateSuppliedTokenHandlerKey = "CreateSuppliedTokenHandler";
export const UseCreateSuppliedTokenHandlerKeyFn = (mutationKey?: Array<unknown>) => [useCreateSuppliedTokenHandlerKey, ...(mutationKey ?? [])];
