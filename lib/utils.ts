import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function calculateConfidenceLevel(score: number): {
  level: 'high' | 'medium' | 'low';
  color: string;
  description: string;
} {
  if (score >= 0.7) {
    return {
      level: 'high',
      color: 'text-green-600',
      description: 'High confidence - Very relevant match'
    };
  } else if (score >= 0.5) {
    return {
      level: 'medium',
      color: 'text-yellow-600',
      description: 'Medium confidence - Moderately relevant'
    };
  } else {
    return {
      level: 'low',
      color: 'text-red-600',
      description: 'Low confidence - May not be relevant'
    };
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function highlightKeywords(text: string, keywords: string[]): string {
  let highlighted = text;
  keywords.forEach(keyword => {
    const regex = new RegExp(`(${keyword})`, 'gi');
    highlighted = highlighted.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  });
  return highlighted;
}
