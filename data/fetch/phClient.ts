import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    }
  };
});

const phClient = new ApolloClient({
  uri: "https://prod.backend.prop.house/graphql",
  cache: new InMemoryCache()
});

export default phClient;