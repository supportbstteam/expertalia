import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/getAuthUser';
import Company from '@/models/Company';
import dbConnect from '@/lib/dbconnect';

export async function GET(req) {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await dbConnect();
    const company = await Company.findOne({ user: user._id });
    return NextResponse.json({ company });
}

export async function POST(req) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { _id, name, nif, postalCode, sectors } = await req.json();

    let company;

    if (_id) {
      // If _id is provided, try to find and update the existing company
      company = await Company.findOneAndUpdate(
        { _id: _id, user: user._id },
        { name, nif, postalCode, sectors },
        { new: true, runValidators: true }
      );

      if (!company) {
        return NextResponse.json({ error: "Company not found or unauthorized" }, { status: 404 });
      }
    } else {
      // Otherwise, create a new company
      company = new Company({
        name,
        nif,
        postalCode,
        sectors,
        user: user._id,
      });
      await company.save();
    }

    return NextResponse.json({ company });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}