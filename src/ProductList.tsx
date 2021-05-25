import React, { FC, useEffect, useState } from "react";
import { IProduct } from "./product.Type";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { gql, useQuery, useLazyQuery } from "@apollo/client";

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
    fontSize: 16,
    paddingVertical: 20,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    color: "#29302E",
    fontWeight: "600",
    fontSize: 20,
    paddingHorizontal: 50,
    paddingVertical: 50,
  },
});

const PRODUCTS = gql`
  {
    products {
      _id
      brand
      description
      price
    }
  }
`;

type productData = {
  products: {
    _id: string;
    brand: string;
    description: string;
    price: number;
  }[];
};

const ProductList: FC = () => {
  // const { idle, fetching, loading, data, error, refetch } =
  //   useQuery<productData>(PRODUCTS);

  const [loadProducts, { called, loading, data }] =
    useLazyQuery<productData>(PRODUCTS);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.highlight}>
            Get Products List with Apollo Client.
          </Text>
          <Button title="Get Products" onPress={() => loadProducts()}></Button>
        </View>
        {!data ? (
          <View>
            <Text style={styles.dateText}>No Data</Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={data.products}
              keyExtractor={(item) => String(item._id)}
              renderItem={({ item }) => (
                <Text
                  style={styles.dateText}
                >{` - Brand : ${item.brand}   - Description : ${item.description}   - Price : ${item.price}`}</Text>
              )}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductList;
