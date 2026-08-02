export interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
}

export interface Problem {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  estimatedImpact: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  impact: string;
  confidence: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "success" | "warning" | "info" | "error";
}