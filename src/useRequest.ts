import { DocumentNode, useQuery } from "@apollo/react-hooks";
import { IProducts } from "./product.Type";

export function useProductQuery(gqlQuery: DocumentNode) {
    const { loading, error, data } = useQuery<IProducts>(gqlQuery);
    return { loading, error, data };
}

