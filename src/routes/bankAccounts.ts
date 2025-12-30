/**
 * AGM Store Builder - Bank Account Routes (Alias)
 * Direct bank account endpoints for frontend convenience
 */

import { Router } from 'express';
import * as paymentController from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';
import { validateBody } from '../middleware/validation';
import { rateLimiter } from '../middleware/rateLimiter';
import { addBankAccountSchema } from '../validators/paymentValidator';

const router = Router();

/**
 * POST /bank-accounts
 * Add bank account (protected)
 */
router.post(
  '/',
  authenticate,
  rateLimiter,
  validateBody(addBankAccountSchema),
  paymentController.addBankAccount
);

/**
 * GET /bank-accounts
 * List bank accounts (protected)
 */
router.get(
  '/',
  authenticate,
  rateLimiter,
  paymentController.listBankAccounts
);

/**
 * DELETE /bank-accounts/:accountId
 * Delete bank account (protected)
 */
router.delete(
  '/:accountId',
  authenticate,
  rateLimiter,
  paymentController.deleteBankAccount
);

/**
 * PATCH /bank-accounts/:accountId/primary
 * Set primary bank account (protected)
 */
router.patch(
  '/:accountId/primary',
  authenticate,
  rateLimiter,
  paymentController.setPrimaryBankAccount
);

export default router;
