import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const token = process.env.NEXT_PUBLIC_GITHUB_GRAPHQL_APIKEY;

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Token ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(
    new HttpLink({ uri: "https://api.github.com/graphql" })
  ),
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query ViewerQuery {
        viewer {
          login
        }
      }
    `,
  })
  .then((resp) => console.log(resp.data.viewer.login))
  .catch((error) => console.error(error));

export default client;