import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    employeeCount: {
        type: Number,
        required: true
    },
    revenue: {
        type: Number,
        required: true
    },
    // location: {
    //     address: String,
    //     city: String,
    //     state: String,
    //     country: String,
    //     postalCode: String
    // },
    location: {
        type: String,
        required: true
    },
    yearFounded: Number,
    website: {
        type: String,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    documents: [{
        type: String,  // URLs or file paths to company documents
        description: String
    }],
    // financials: {
    //     annualRevenue: Number,
    //     ebitda: Number,
    //     netProfit: Number,
    //     assetValue: Number
    // },
    askingPrice: {
        type: Number,
        required: true
    },
    listingStatus: {
        type: String,
        enum: ['draft', 'active', 'under-negotiation', 'sold', 'inactive'],
        default: 'draft'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
CompanySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);