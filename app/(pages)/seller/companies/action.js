import dbConnect from '@/lib/dbconnect';
import Company from '@/models/Company';

export default async function action() {
    await dbConnect();

    const companies = await Company.find();
    console.log(companies);
    return companies;
}