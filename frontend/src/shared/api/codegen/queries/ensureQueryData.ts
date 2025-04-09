// generated with @7nohe/openapi-react-query-codegen@2.0.0-beta.3 

import { type Options } from "@hey-api/client-fetch";
import { type QueryClient } from "@tanstack/react-query";
import { get, list } from "../requests/services.gen";
import { GetData } from "../requests/types.gen";
import * as Common from "./common";
export const ensureUseListData = (queryClient: QueryClient, clientOptions: Options<unknown, true> = {}) => queryClient.ensureQueryData({ queryKey: Common.UseListKeyFn(clientOptions), queryFn: () => list({ ...clientOptions }).then(response => response.data) });
export const ensureUseGetData = (queryClient: QueryClient, clientOptions: Options<GetData, true>) => queryClient.ensureQueryData({ queryKey: Common.UseGetKeyFn(clientOptions), queryFn: () => get({ ...clientOptions }).then(response => response.data) });
