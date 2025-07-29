import { redirect } from 'next/navigation';
import dbConnect from '@/lib/dbconnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function login(formData) {
    'use server';

    await dbConnect();

    const email = formData.get('email');
    const password = formData.get('password');
    const user = await User.findOne({ email });
    if (!user) {
        redirect('/login?error=Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        redirect('/login?error=Invalid credentials');
    }

    if (user.userType === 'seller') {
        redirect('/seller/dashboard?success=Login successful');
    }
    if (user.userType === 'buyer') {
        redirect('/?success=Login successful');
    }
    redirect('/login?success=Login successful');
}