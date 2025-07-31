import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/getAuthUser';
import Company from '@/models/Company';
import dbConnect from '@/lib/dbconnect';

export async function GET(req) {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const company = await Company.findOne({ user: user._id });
    const data = {
        currentAssets: company.currentAssets,
        treasury: company.treasury,
        nonCurrentAsset: company.nonCurrentAsset,
        totalActive: company.totalActive,
        currentLiabilities: company.currentLiabilities,
        shortTermDebts: company.shortTermDebts,
        nonCurrentLiabilities: company.nonCurrentLiabilities,
        longTermDebts: company.longTermDebts,
        netWorth: company.netWorth,
        totalLiabilitiesAndNetWorth: company.totalLiabilitiesAndNetWorth,
        _id: company._id,
    }
    return NextResponse.json({ data });
}

export async function POST(req) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { _id, currentAssets, treasury, nonCurrentAsset, totalActive, currentLiabilities, shortTermDebts, nonCurrentLiabilities, longTermDebts, netWorth, totalLiabilitiesAndNetWorth } = await req.json();
    let company;
    if (_id) {
      company = await Company.findOneAndUpdate(
        { _id: _id, user: user._id },
        { currentAssets, treasury, nonCurrentAsset, totalActive, currentLiabilities, shortTermDebts, nonCurrentLiabilities, longTermDebts, netWorth, totalLiabilitiesAndNetWorth },
        { new: true, runValidators: true }
      );
    } else {
      company = new Company({
        user: user._id,
        currentAssets,
        treasury,
        nonCurrentAsset,
        totalActive,
        currentLiabilities,
        shortTermDebts,
        nonCurrentLiabilities,
        longTermDebts,
        netWorth,
        totalLiabilitiesAndNetWorth,
      });
      await company.save();
    }
    return NextResponse.json({ company });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}