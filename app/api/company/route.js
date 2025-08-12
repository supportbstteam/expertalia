import { NextResponse } from "next/server";
import { getAuthUser } from '@/lib/getAuthUser';
import Company from '@/models/Company';
import dbConnect from '@/lib/dbconnect';

export async function GET(req) {
    const user = await getAuthUser(req);
    await dbConnect();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const company = await Company.find({ user: user?._id });

    console.log("company",company);
    return NextResponse.json({ company });
}

export async function POST(req) {
    const user = await getAuthUser(req);
    await dbConnect();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const company = new Company({
        name: "new",
        nif: "new",
        user: user?._id,
    });
    await company.save();
    return NextResponse.json({ company });
}

// export async function DELETE(req) {
//     const user = await getAuthUser(req);
//     await dbConnect();
//     if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     const company = await Company.findOneAndDelete({ user: user?._id });
//     return NextResponse.json({ company });
// }

export async function DELETE(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const _id = searchParams.get('_id');

    if (!_id) {
      return new Response(JSON.stringify({ error: "Missing ID" }), { status: 400 });
    }

    const deleted = await Company.findByIdAndDelete(_id);

    if (!deleted) {
      return new Response(JSON.stringify({ error: "Company not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Company deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Delete error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}