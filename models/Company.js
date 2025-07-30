import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    nif: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    sectors: [{
        category: {
            type: String,
        },
        name: {
            type: String,
        }
    }],
    sales: {
        type: Map,
        of: String, // Store value like "1.450.000"
        default: {}
    },
    provisioning: {
        type: Map,
        of: String,
        default: {}
    },
    grossMargin: {
        type: Map,
        of: String,
        default: {}
    },
    personnelCosts: {
        type: Map,
        of: String,
        default: {}
    },
    otherOperatingCosts: {
        type: Map,
        of: String,
        default: {}
    },
    ebitda: {
        type: Map,
        of: String,
        default: {}
    },
    adjustedEbitda: {
        type: Map,
        of: String,
        default: {}
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
CompanySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);