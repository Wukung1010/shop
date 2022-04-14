export type Address = {
  phone: string;
  name: string;
  address: string;
  remarks: string;
}

export type Time = {
  createdAt?: string;
  updatedAt?: string;
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

export type BuyCommodity = Commodity & { buyCount: number }

export type Order = {
  id: number;
  code: string;
  state: OrderState;
  distributor: string;
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
  PRE_SEND,
  SENDED,
  PRE_CANNEL
}

export type Distributor = {
  id: number;
  code: string;
  name: string;
  phone: string;
  address: string;
  remarks: string;
} & Time

export type Sys = {
  phone: string;
  dPriceUnit: string;
  dFare: number;
}
