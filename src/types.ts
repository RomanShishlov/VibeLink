export interface UserPreferences {
  maxDistance: number;
  ageRange: [number, number];
  interests: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  type: 'personal' | 'business';
  preferences?: UserPreferences;
}

export interface BusinessProfile {
  id: string;
  userId: string;
  businessName: string;
  description: string;
  category: string;
  address: string;
  phone: string;
  website?: string;
  photos: {
    id: string;
    url: string;
    caption?: string;
  }[];
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  operatingHours?: {
    [key: string]: { open: string; close: string };
  };
}

export interface Deal {
  id: string;
  businessId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  discount: string;
  terms?: string;
  imageUrl?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}