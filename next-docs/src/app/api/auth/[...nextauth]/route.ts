import NextAuth from 'next-auth';
import { getAuthOptions } from '@/lib/nextAuthOptions';

export async function GET(request: Request) {
	const handler = NextAuth(await getAuthOptions());
	return handler(request);
}

export async function POST(request: Request) {
	const handler = NextAuth(await getAuthOptions());
	return handler(request);
}
