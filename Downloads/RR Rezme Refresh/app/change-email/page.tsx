'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ChangeEmail() {
  const [newEmail, setNewEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store the new email and redirect to verification
    localStorage.setItem('userEmail', newEmail);
    router.push('/verify');
  };

  return (
    <div className="relative min-h-screen w-full bg-black">
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <Card className="mx-auto w-full max-w-lg bg-black text-white">
          <div className="space-y-6 p-8">
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tight">
                CHANGE EMAIL
              </h1>
              <p className="text-sm text-gray-400">
                Enter your email to get a Verification Code for change email
              </p>
              <p className="text-sm text-gray-400">
                Don't want to change email?{' '}
                <Link href="/dashboard" className="text-white hover:underline">
                  Click here to go back to your dashboard and profile
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  className="border-gray-700 bg-transparent text-white placeholder:text-gray-500"
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-black text-white"
                >
                  SUBMIT
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}