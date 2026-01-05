export enum FeedingStatus {
  NORMAL = 'Normal',
  LOW = 'Low', // < 5 days
  EMPTY = 'Empty'
}

export enum PoopStatus {
  NORMAL = 'Normal',
  ABNORMAL = 'Abnormal'
}

export interface Recipe {
  id: string;
  dogId: string;
  name: string;
  tags: string[];
  meatPercentage: number;
  ingredients: string[];
  lastUpdated: string;
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  allergens: string[]; // New field for allergens
  avatarUrl: string;
  currentWeight: number; // kg
  age: number; // years
  isNeutered: boolean;
  inventoryDays: number;
  totalFoodWeight: number; // kg
  remainingFoodWeight: number; // kg
  status: 'active' | 'archived';
  recipe?: Recipe;
}

export interface OrderItem {
  dogId: string;
  quantity: number;
  price: number;
}

export interface User {
  id: string;
  name: string;
  mobile: string;
}

// Global Context State
export interface AppState {
  dogs: Dog[];
  currentDogId: string | null;
  user: User;
  isLoading: boolean;
}