import { z } from 'zod';

export const CompanySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  industry: z.string().min(1),
  employeeCount: z.coerce.number().int().min(1),
  revenue: z.coerce.number().positive(),
  location: z.string().min(1),
  yearFounded: z.coerce.number().int().optional(),
  website: z.string().url().optional(),
  email: z.string().email(),
  phone: z.string().min(1),
  documents: z.array(z.object({
    type: z.string(),
    description: z.string().optional()
  })).optional(),
  askingPrice: z.coerce.number().positive(),
  listingStatus: z.enum(['draft', 'active', 'under-negotiation', 'sold', 'inactive']).default('draft'),
});

// module.exports = { CompanySchema };
