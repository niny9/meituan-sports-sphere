
import { LucideIcon } from "lucide-react";

export interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
  description: string;
  popularity: number;
  intentScore: number;
  latitude?: number;
  longitude?: number;
  nearbyServices?: boolean;
  tags: string[];
}

export interface Service {
  id: string;
  type: 'food' | 'accommodation' | 'transportation' | 'entertainment';
  title: string;
  description: string;
  price: string;
  rating: number;
  distance: string;
  imageUrl: string;
  availability?: string;
  features?: string[];
  discount?: string;
  region?: string;
  regionFeatures?: string[];
}

export interface IntentCategory {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface NaviMenuItem {
  id: string;
  title: string;
  icon: LucideIcon;
  features: string[];
}

export type IntentLevel = 'high' | 'medium' | 'low' | null;

export interface UserProfile {
  id?: string;
  intentLevel: IntentLevel;
  lastQuizDate?: Date;
  searchHistory?: string[];
  viewedEvents?: string[];
}

export interface IntentQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    value: 'high' | 'medium' | 'low';
  }[];
}
