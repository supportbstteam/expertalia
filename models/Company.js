import mongoose from 'mongoose';

const EntitySchema = new mongoose.Schema({}, { strict: false }); // Flexible schema

const CompanySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: false
    },
    nif: {
        type: String,
    },
    zipCode: {
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
    currentAssets: {
        type: Map,
        of: String,
        default: {}
    },
    treasury: {
        type: Map,
        of: String,
        default: {}
    },
    nonCurrentAsset: {
        type: Map,
        of: String,
        default: {}
    },
    totalActive: {
        type: Map,
        of: String,
        default: {}
    },
    currentLiabilities: {
        type: Map,
        of: String,
        default: {}
    },
    shortTermDebts: {
        type: Map,
        of: String,
        default: {}
    },
    nonCurrentLiabilities: {
        type: Map,
        of: String,
        default: {}
    },
    longTermDebts: {
        type: Map,
        of: String,
        default: {}
    },
    netWorth: {
        type: Map,
        of: String,
        default: {}
    },
    totalLiabilitiesAndNetWorth: {
        type: Map,
        of: String,
        default: {}
    },
    bp_sales: {
        type: Map,
        of: String, // Store value like "1.450.000"
        default: {}
    },
    bp_provisioning: {
        type: Map,
        of: String,
        default: {}
    },
    bp_grossMargin: {
        type: Map,
        of: String,
        default: {}
    },
    bp_personnelCosts: {
        type: Map,
        of: String,
        default: {}
    },
    bp_otherOperatingCosts: {
        type: Map,
        of: String,
        default: {}
    },
    bp_ebitda: {
        type: Map,
        of: String,
        default: {}
    },
    clients: {
        type: Map,
        of: EntitySchema, // each value is an object with dynamic structure
        default: {},
    },
    products: {
        type: Map,
        of: EntitySchema,
        default: {},
    },
    shareholders: {
        type: Map,
        of: EntitySchema,
        default: {},
    },
    cc: {
        type: Map,
        of: String,
        default: {},
    },
    clientType: {
        type: Number,
        default: 1,
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