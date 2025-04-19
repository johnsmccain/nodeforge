import { PROCESSOR_OPTIONS, RAM_OPTIONS, STORAGE_OPTIONS } from "../config/constants";

export interface NodeConfig {
  software: string;
  ram: string;
  storage: string;
  processor: string;
}


export type SoftwareOption = {
  name: string;
  price: number;
};

export type CPUOption = {
  model: string;
  price: number;
};

export type RAMOption = {
  size: string;
  price: number;
};

export type StorageOption = {
  type: string;
  price: number;
};

export type Product = {
  _id?: string;
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  specs: {
    software: string;
    defaultSpecs: {
      processor: string;
      ram: string;
      storage: string;
    };
  };
  options: {
    software: SoftwareOption[];
    processor: CPUOption[];
    ram: RAMOption[];
    storage: StorageOption[];
  };
  createdAt?: string;
  updatedAt?: string;
};


export interface CartItem extends Product {
  quantity: number;
  config: NodeConfig;
  totalPrice: number;
}

export interface PaymentConfig {
  currency: string;
  amount: number;
  receiver: string;
}

declare global {
  interface Window {
    cloudinary: any; // or the actual type of the cloudinary object
  }
}

export type RAMOptionKey = keyof typeof RAM_OPTIONS;
export type STORAGEOptionKey = keyof typeof STORAGE_OPTIONS;
export type PROCESSOROptionKey = keyof typeof PROCESSOR_OPTIONS;

