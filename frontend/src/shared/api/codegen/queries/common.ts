// generated with @7nohe/openapi-react-query-codegen@2.0.0-beta.3 

import { type Options } from "@hey-api/client-fetch";
import { UseQueryResult } from "@tanstack/react-query";
import { auth, get, list, update } from "../requests/services.gen";
export type ListDefaultResponse = Awaited<ReturnType<typeof list>>["data"];
export type ListQueryResult<TData = ListDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useListKey = "List";
export const UseListKeyFn = (clientOptions: Options<unknown, true> = {}, queryKey?: Array<unknown>) => [useListKey, ...(queryKey ?? [clientOptions])];
export type GetDefaultResponse = Awaited<ReturnType<typeof get>>["data"];
export type GetQueryResult<TData = GetDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGetKey = "Get";
export const UseGetKeyFn = (clientOptions: Options<unknown, true>, queryKey?: Array<unknown>) => [useGetKey, ...(queryKey ?? [clientOptions])];
export type AuthMutationResult = Awaited<ReturnType<typeof auth>>;
export const useAuthKey = "Auth";
export const UseAuthKeyFn = (mutationKey?: Array<unknown>) => [useAuthKey, ...(mutationKey ?? [])];
export type UpdateMutationResult = Awaited<ReturnType<typeof update>>;
export const useUpdateKey = "Update";
export const UseUpdateKeyFn = (mutationKey?: Array<unknown>) => [useUpdateKey, ...(mutationKey ?? [])];
