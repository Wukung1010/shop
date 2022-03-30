export type CommodityInfo = {
  id: string;
  title: string;
  price: number;
  priceUnit: string;
  count: number;
}

export type UserInfo = {
  phone: string;
  name: string;
  adress: string;
  remarks: string;
}

export type CommodityOrder = {
  buyCount: number;
} & CommodityInfo

export type OrderInfo = {
  id: string;
  totalPrice: string;
  created: number;
  userInfo: UserInfo;
  commodities: CommodityOrder[]
}

export type Store = {
  title: string;
  user: UserInfo;
  loadedCommodities: boolean;
  commodities: CommodityInfo[];
  orders: CommodityOrder[];
}
