export type Tenant = {
  id: string;
  name: string;
  slug: string;
  plan: 'starter' | 'growth' | 'enterprise';
  active: boolean;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
  icon: string;
  parentId?: string | null;
};

export type Location = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radiusKm: number;
};

export type Vendor = {
  id: string;
  tenantId: string;
  name: string;
  logoUrl: string;
  description: string;
  rating: number;
  reviewCount: number;
  address: string;
  latitude: number;
  longitude: number;
  categories: string[];
  serviceAreas: string[];
  businessHours: Record<string, { open: string; close: string } | null>;
  contactEmail: string;
  contactPhone: string;
  verified: boolean;
  featured: boolean;
  commissionRate: number;
  lastSeen: string;
};

export type Service = {
  id: string;
  tenantId: string;
  vendorId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  unit: 'each' | 'hour' | 'day';
  availability: number;
  rating: number;
  reviewCount: number;
  images: string[];
  tags: string[];
  promoted: boolean;
  updatedAt: string;
};

export type UserAccount = {
  id: string;
  email: string;
  fullName: string;
  role: 'customer' | 'vendor-admin' | 'tenant-admin' | 'super-admin';
  tenantId?: string | null;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  lastLogin?: string;
};

export type Order = {
  id: string;
  tenantId: string;
  vendorId: string;
  userId: string;
  items: Array<{
    serviceId: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  placedAt: string;
  updatedAt: string;
  locationId: string;
};

export type ActivityLog = {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
};

export type RealtimeEvent =
  | { type: 'service.availability'; serviceId: string; availability: number }
  | { type: 'service.price'; serviceId: string; price: number }
  | { type: 'order.status'; orderId: string; status: Order['status'] }
  | { type: 'vendor.location'; vendorId: string; latitude: number; longitude: number }
  | { type: 'tenant.plan'; tenantId: string; plan: Tenant['plan'] };
