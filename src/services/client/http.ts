import {Endpoint} from "./types.ts";

// using the .env variable concat it with the endpoint
const getUrlFromEndpoint = (endpoint: Endpoint) => {
  console.log(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`);
  return `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;
};
const getMethod = async <T extends object>(url: Endpoint): Promise<T[]> => {
  const res = await fetch(getUrlFromEndpoint(url));
  return res.json() as Promise<T[]>;
};

const writeMethod =
  (method: "POST" | "PATCH") =>
  async <T extends object>(url: Endpoint, body: T) => {
    const res = await fetch(getUrlFromEndpoint(url), {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await res.json();
  };

const postMethod = writeMethod("POST");
const patchMethod = writeMethod("PATCH");

const deleteMethod = (url: Endpoint) => {
  return fetch(getUrlFromEndpoint(url), {
    method: "DELETE",
  });
};

export const http = {
  get: getMethod,
  post: postMethod,
  patch: patchMethod,
  delete: deleteMethod,
};
