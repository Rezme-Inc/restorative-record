'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';

export default function Terms() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <Card className="mx-auto w-full max-w-lg bg-white p-8">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-4xl font-bold tracking-tight">
                Welcome to Restorative Record
              </h1>
              <p className="text-sm text-gray-600">
                Congratulations on taking the first steps towards your career
              </p>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">
                Start building your Restorative Record
              </h2>
              <p className="text-sm text-gray-600">
                Restorative Record allows you to meet with potential employers that 
                would be looking to offer you your dream role. Complete your profile 
                here with us to meet the right people.
              </p>

              <div className="mt-6 flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                />
                <label 
                  htmlFor="terms" 
                  className="text-sm text-gray-600"
                >
                  I agree with{' '}
                  <a href="#" className="text-primary hover:underline">
                    terms of use
                  </a>
                </label>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                className="w-32"
                onClick={() => router.push('/signup')}
              >
                LOGOUT
              </Button>
              <Button
                className="w-32 bg-primary text-white hover:bg-primary/90"
                disabled={!agreed}
                onClick={() => router.push('/dashboard')}
              >
                GET STARTED
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}