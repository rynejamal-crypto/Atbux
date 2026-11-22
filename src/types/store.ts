export interface RobuxPackage {
  amount: number;
  priceIdr: number;
}

export interface OrderFormValues {
  robloxUsername: string;
  selectedAmount: number;
  whatsappNumber: string;
  buyerName: string;
}

export interface OrderValidationErrors {
  robloxUsername?: string;
  whatsappNumber?: string;
}

export interface SubmittedOrderSummary {
  orderCode: string;
  robloxUsername: string;
  buyerName: string;
  amount: number;
  totalIdr: number;
  whatsappNumber: string;
  waUrl: string;
  plainMessage: string;
  createdAt: string;
}
