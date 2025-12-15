import { LucideIcon } from 'lucide-react';

export interface PersonaCard {
  title: string;
  description: string;
  icon: LucideIcon;
  highlight: string;
}

export interface AssetCategory {
  title: string;
  description: string;
  partners: string[];
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export enum AIScenarioType {
  HUNTER = 'HUNTER',
  GUARDIAN = 'GUARDIAN',
  EXPERT = 'EXPERT'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}