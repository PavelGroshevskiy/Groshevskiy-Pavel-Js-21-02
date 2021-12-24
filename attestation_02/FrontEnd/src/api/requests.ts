import { BASE_URL } from '../constants/api/myApi';
import { METHOD_GET, METHOD_POST } from '../constants/common';

export const doGetRequest = (path: string, searchParams?: Record<string, any>) => {
  const url = new URL(path, BASE_URL);
  searchParams
    && Object.entries(searchParams).forEach((params) => {
      url.searchParams.append(params[0], params[1].toString());
    });
  return fetch(url.toString(), {
    method: METHOD_GET,
    // headers: new Headers({
    //   [APP_ID_FIELD]: APP_ID_VALUE,
    // }),
  }).then((resp: Response) => resp.json());
};

export const doPostRequest = (path: string, formParams?: Record<string, any>, method = METHOD_POST) => {
  const url = new URL(path, BASE_URL);
  return fetch(url.toString(), {
    method,
    headers: new Headers({
      // [APP_ID_FIELD]: APP_ID_VALUE,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(formParams),
  }).then((resp: Response) => resp.json());
};
