'use server';

import dbConnect from '@/lib/dbconnect';
import Company from '@/models/Company';
import { CompanySchema } from '@/schemas/CompanySchema';

export async function createCompany(formData) {
  const values = Object.fromEntries(formData);

  const validatedData = CompanySchema.safeParse(values);

  if (!validatedData.success) {
    const allErrors = validatedData.error.issues
      .map((issue) => issue.message)
      .join("\n"); // Join with comma or any separator
    return { success: false, message: allErrors };
  }

  await dbConnect();

  const companyData = {
    name: formData.get('name'),
    description: formData.get('description'),
    industry: formData.get('industry'),
    employeeCount: parseInt(formData.get('employeeCount')),
    revenue: parseFloat(formData.get('revenue')),
    location: formData.get('location'),
    yearFounded: parseInt(formData.get('yearFounded')),
    website: formData.get('website'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    // documents: [], // Handle file uploads separately if needed
    // financials: [], // Handle file uploads separately if needed
    listingStatus: formData.get('listingStatus'),
    askingPrice: parseFloat(formData.get('askingPrice')),
  };

  try {
    const newCompany = new Company(companyData);
    await newCompany.save();
    return { success: true, message: 'Company listed successfully!' };
  } catch (error) {
    console.error('Error creating company:', error);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return { success: false, message: messages.join('\n') };
    }

    // Handle MongoDB duplicate key error (code 11000)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      return {
        success: false,
        message: `Duplicate value: "${value}" for field "${field}". Please use a unique value.`
      };
    }

    // Generic error
    return {
      success: false,
      message: 'Failed to list company. Please try again.'
    };
  }
}