import gql from "graphql-tag";

export const PRODUCTS = gql`
  {
    products{
      _id
      brand
      description
      price
    }
  }
`;