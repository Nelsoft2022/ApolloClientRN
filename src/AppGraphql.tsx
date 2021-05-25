import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
// import ApolloClient from "apollo-boost";
// import { InMemoryCache } from "@apollo/client";
// import { ApolloProvider } from "@apollo/react-hooks";
import {
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from "@apollo/client";

import { ApolloClient } from "apollo-client";
import { RestLink } from "apollo-link-rest";

import { PRODUCTS } from "./graphql";
import { useProductQuery } from "./useRequest";
import ProductList from "./ProductList";
import { IProduct, IProducts } from "./product.Type";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
        <Text>Product List</Text>
        <StatusBar style="auto" />
        <ProductList />
      </View>
    </ApolloProvider>
  );
};

export default AppGraphql;
