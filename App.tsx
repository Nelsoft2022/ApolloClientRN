import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createHttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";

import { ApolloClient } from "apollo-client";
import ProductList from "./src/ProductList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    color: "#29302E",
    fontWeight: "600",
    fontSize: 20,
    paddingHorizontal: 20,
  },
});

const httpLink = createHttpLink({
  uri: "http://localhost:3045/graphql",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

const AppGraphql: FC = () => {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <ProductList />
      </View>
    </ApolloProvider>
  );
};

export default AppGraphql;
