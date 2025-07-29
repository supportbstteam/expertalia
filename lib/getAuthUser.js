import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function getAuthUser(req) {
  const token = await getToken({ req, secret });

  if (!token) return null;

  return {
    _id: token._id,
    email: token.email,
  };
}
