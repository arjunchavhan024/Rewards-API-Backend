import { Types } from "mongoose";
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    timestamp?: string;
}
export interface PaginationMeta {
    _id: Types.ObjectId;
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export interface PaginatedResponse<T> extends ApiResponse<T> {
    meta: PaginationMeta;
}
