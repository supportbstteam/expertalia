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
        bp_sales: company.bp_sales,
        bp_provisioning: company.bp_provisioning,
        bp_grossMargin: company.bp_grossMargin,
        bp_personnelCosts: company.bp_personnelCosts,
        bp_otherOperatingCosts: company.bp_otherOperatingCosts,
        bp_ebitda: company.bp_ebitda,
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
    const { _id, bp_sales, bp_provisioning, bp_grossMargin, bp_personnelCosts, bp_otherOperatingCosts, bp_ebitda } = await req.json();
    let company;
    if (_id) {
      company = await Company.findOneAndUpdate(
        { _id: _id, user: user._id },
        { bp_sales, bp_provisioning, bp_grossMargin, bp_personnelCosts, bp_otherOperatingCosts, bp_ebitda },
        { new: true, runValidators: true }
      );
    } else {
      company = new Company({
        user: user._id,
        bp_sales,
        bp_provisioning,
        bp_grossMargin,
        bp_personnelCosts,
        bp_otherOperatingCosts,
        bp_ebitda,
      });
      await company.save();
    }
    return NextResponse.json({ company });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}