
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  trending: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface StoreContact {
  owner: string;
  brandName: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
}
