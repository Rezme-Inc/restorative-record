'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Verify() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/terms');
  };

  return (
    <div className="relative min-h-screen w-full bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <Card className="mx-auto w-full max-w-lg bg-white p-8">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-4xl font-bold tracking-tight">
                JOIN RESTORATIVE RECORD
              </h1>
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link href="/" className="text-primary hover:underline">
                  Click here to login
                </Link>
              </p>
            </div>

            <div className="space-y-4 text-center">
              <p className="text-sm text-gray-600">
                Please take a moment to locate the code we&apos;ve sent to your email. 
                This code is essential to confirm your address and continue with the registration process.
              </p>

              <form onSubmit={handleSubmit} className="mx-auto max-w-xs space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="code">CODE</Label>
                  <Input
                    id="code"
                    className="bg-white text-center uppercase tracking-widest"
                    placeholder="XXXXXX"
                    maxLength={6}
                    required
                  />
                </div>

                <Button className="bg-black text-white" type="submit">
                  VERIFY CODE
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}