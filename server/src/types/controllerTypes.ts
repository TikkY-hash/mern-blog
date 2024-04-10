import { Request } from 'express';

export interface AuthRequest extends Request {
    userId?: string;
}

export interface SortOptions {
    [key: string]: string
}