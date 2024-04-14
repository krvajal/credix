export type ShippingLocation = {
  address1: string;
  address2: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  email: string;
};

export type ProductInfo = {
  sku: string;
  name: string;
  quantity: number;
  unitCost: number;
};

export type Cart = {
  products: ProductInfo[];
};

export type PaymentInformation = {
  term: string;
};

export type BuyerInfo = {
  taxId: string;
  companyName: string;
};

export type CreateOrderDto = {
  buyer: BuyerInfo;
  cart: Cart;
  discountAmount: number;
  shippingCost: number;
  shippingLocation: ShippingLocation;
  payment: PaymentInformation;
};
