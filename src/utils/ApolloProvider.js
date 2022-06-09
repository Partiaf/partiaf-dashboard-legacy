import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import App from "../App";

const httpLink = createHttpLink({
  uri: "http://localhost:5100",
});

const authLink = setContext(() => {
  console.log(localStorage.getItem("userInfo"));
  const token = JSON.parse(localStorage.getItem("userInfo"));

  console.log(token);
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
