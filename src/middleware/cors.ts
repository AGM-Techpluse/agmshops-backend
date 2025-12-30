/**
 * AGM Store Builder - CORS Configuration
 * Handles Cross-Origin Resource Sharing
 */

import cors from 'cors';
import { config } from '../config/env';

// Log allowed origins on startup
console.log('CORS Allowed Origins:', config.allowedOrigins);

/**
 * CORS configuration
 */
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // Check if wildcard is allowed
    if (config.allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    const isAllowed = config.allowedOrigins.some((allowedOrigin) => {
      // Support wildcard subdomains
      if (allowedOrigin.includes('*')) {
        const regex = new RegExp(
          allowedOrigin.replace(/\./g, '\\.').replace(/\*/g, '.*')
        );
        return regex.test(origin);
      }
      return origin === allowedOrigin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      // Don't throw error, just reject with false
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],
  exposedHeaders: ['X-Total-Count', 'X-Page', 'X-Per-Page'],
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export const corsMiddleware = cors(corsOptions);
