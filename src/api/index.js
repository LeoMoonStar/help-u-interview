import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://native-shrimp-21.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
});

export default client;
