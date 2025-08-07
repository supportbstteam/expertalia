import { redirect } from 'next/navigation';
import dbConnect from '@/lib/dbconnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function register(formData) {
    'use server';

    await dbConnect();

    const first_name = formData.get('first_name');
    const last_name = formData.get('last_name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const userType = formData.get('userType');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!first_name || !last_name || !email || !phone || !password) {
        redirect('/register?error=All fields are required');
    }
    if (!phoneRegex.test(phone)) {
        redirect('/register?error=Invalid phone number format');
    }
    if (!emailRegex.test(email)) {
        redirect('/register?error=Invalid email format');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        redirect('/register?error=Email already registered');
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
        first_name,
        last_name,
        email,
        phone,
        password: hashedPassword,
        userType,
    });

    if (!user) {
        redirect('/register?error=Registration failed');
    }
    if (userType === 'buyer') {
        redirect('/?success=Registration successful');
    } else if (userType === 'seller') {
        redirect('/seller/dashboard?success=Registration successful');
    }
}