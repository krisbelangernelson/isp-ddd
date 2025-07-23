export type OrderType = {
  id: number;
  serviceId: number;
  customerId: number;
  serviceStreet: string;
  serviceCity: string;
  serviceProvince: string;
  servicePostalCode: string;
  state: number;
  orderDate: string;
};

export type CreateOrderBody = {
  offerId: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  customerId: number;
};
