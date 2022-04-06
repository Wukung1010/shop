export type Address = {
  phone: string;
  name: string;
  address: string;
  remarks: string;
}

export type Time = {
  createdAt?: number;
  updatedAt?: number;
}

export type Commodity = {
  id: number;
  code: string;
  title: string;
  price: number;
  priceUnit: string;
  fare: number;
  count: number;
} & Time

export type BuyCommodity = Pick<Commodity, 'id'|'code'|'title'|'price'|'fare'|'priceUnit'> & { buyCount: number }

export type Order = {
  id: number;
  code: string;
  state: OrderState;
  distributor: number;
  phone: string;
  farePrice: number;
  commoditiesPrice: number;
  total: number;
  name: string;
  address: string;
  remarks: string;
  commodities: BuyCommodity[];
} & Time

export enum OrderState {
  PRE_PAY,
  CANNEL,
  DONE,
  DEL,
}

export type Distributor = {
  id: number;
  code: string;
  name: string;
  phone: number;
  address: string;
  remarks: string;
} & Time

export type Sys = {
  dPriceUnit: string;
  dFare: number;
}
