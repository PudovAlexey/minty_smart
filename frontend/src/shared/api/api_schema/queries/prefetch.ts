// generated with @7nohe/openapi-react-query-codegen@2.0.0-beta.3 

import { type Options } from "@hey-api/client-fetch";
import { type QueryClient } from "@tanstack/react-query";
import { getSuppliedTokenListHandler } from "../requests/services.gen";
import { GetSuppliedTokenListHandlerData } from "../requests/types.gen";
import * as Common from "./common";
export const prefetchUseGetSuppliedTokenListHandler = (queryClient: QueryClient, clientOptions: Options<GetSuppliedTokenListHandlerData, true> = {}) => queryClient.prefetchQuery({ queryKey: Common.UseGetSuppliedTokenListHandlerKeyFn(clientOptions), queryFn: () => getSuppliedTokenListHandler({ ...clientOptions }).then(response => response.data) });
