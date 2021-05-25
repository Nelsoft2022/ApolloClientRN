import React, { FC } from "react";
import { IProduct } from "./product.Type";
import { FlatList, Text, View } from "react-native";

import { gql, useQuery } from "@apollo/client";

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
  const { loading, error, data } = useQuery<productData>(PRODUCTS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error:{error}</Text>;
  if (!data) return <Text>No Data</Text>;
  return (
    <FlatList
      data={data.products}
      keyExtractor={(item) => String(item._id)}
      renderItem={({ item }) => (
        <Text>{` Brand : ${item.brand}   - description : ${item.description}  `}</Text>
      )}
    />
  );
};

export default ProductList;
