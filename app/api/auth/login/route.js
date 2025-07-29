import dbConnect from '@/lib/dbconnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.json();
        await dbConnect();

    const email = body.email;
    const password = body.password;
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({
            error: 'Invalid credentials',
        });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json({
            error: 'Invalid credentials',
        });
    }
    return NextResponse.json({user: user});
}
