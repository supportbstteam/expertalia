import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
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