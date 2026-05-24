import { NextResponse } from 'next/server';
import { resetUserData } from '@/lib/actions/admin';
import { getUserIdFromSession } from '@/lib/authServer';

export async function POST(req: Request) {
  // ensure this request is from an authenticated user
  const userId = await getUserIdFromSession();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const res = await resetUserData(userId);
  if (res.success) return NextResponse.json({ success: true, deleted: (res as any).deleted });
  return NextResponse.json({ error: res.error || 'failed' }, { status: 500 });
}
