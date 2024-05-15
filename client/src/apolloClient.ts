import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {apiConfig, clientConfig} from "./config";

const httpLink = createHttpLink({
  uri: apiConfig.host,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(clientConfig.tokenName);

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
