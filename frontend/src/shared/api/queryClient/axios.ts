// import { client } from '../codegen/requests/services.gen';
import { client } from '../api_schema/requests/services.gen';

// const defineAxiosConfig = (headers: any) => {
// };
client.setConfig({
  baseUrl: 'http://localhost:8000',
  throwOnError: true,
  // headers,
});

export {
  client,
};

// client.options({
//   headers
// })
