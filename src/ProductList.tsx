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

import { gql, useQuery } from "@apollo/client";

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
    fontWeight: "700",
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
  const { idle, fetching, loading, data, error, refetch } =
    useQuery<productData>(PRODUCTS);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.highlight}>Get Products with Apollo Client.</Text>
          <Button title="Get Products" onPress={() => refetch()}></Button>
        </View>
        {!data ? (
          <View>
            <Text>No Data</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.highlight}>Product List: </Text>
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
