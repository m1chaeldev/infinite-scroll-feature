export interface IProductRes {
  products: IProduct[];
  total: number;
  limit: number;
  skip: number;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  images: string[];
}
