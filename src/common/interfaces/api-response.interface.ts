import { Types } from "mongoose";

// Generic API Response Interface
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

// Pagination Meta Interface with `_id` field for type safety
export interface PaginationMeta {
  _id: Types.ObjectId;
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Paginated Response Interface
export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta: PaginationMeta;
}
