export type ViewState = 'HOME' | 'NEXUS' | 'IDYR' | 'TRUST' | 'ARES' | 'ORACLE' | 'HELIX' | 'GUILD';

export interface Product {
  id: ViewState;
  name: string;
  tagline: string;
  price: number;
  description: string;
  features: string[];
}

export interface Task {
  id: string;
  title: string;
  division: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate: string;
  delegatedTo?: string;
}

export interface Agent {
  name: string;
  role: string;
  status: 'Idle' | 'Processing' | 'Learning';
}