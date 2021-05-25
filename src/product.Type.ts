export interface IProduct {
    _id: string;
    brand: string;
    description: string;
    price: number;
}

export interface IProducts {
    products: IProduct[];
}

