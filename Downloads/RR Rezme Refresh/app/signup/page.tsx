'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store email in localStorage for persistence
    localStorage.setItem('userEmail', email);
    router.push('/verify');
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
              <p className="text-sm text-gray-600">
                Enter your details to join Restorative Record Portal
              </p>
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link href="/" className="text-primary hover:underline">
                  Click here to login
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">
                  EMAIL
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="bg-white"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  It is important to use the same email address as the one used for job applications
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  PASSWORD
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="bg-white pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-900"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-32 bg-primary text-white hover:bg-primary/90"
              >
                SIGN UP
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}