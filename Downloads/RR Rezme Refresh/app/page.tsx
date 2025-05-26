'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, Apple } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="relative flex min-h-screen items-center justify-center px-4">
        <Card className="mx-auto w-full max-w-md bg-white p-8">
          <div className="space-y-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to Restorative Record
            </h1>
            
            <p className="text-muted-foreground">
              Create an Account to get started
            </p>

            <div className="space-y-4">
              <Button 
                className="w-full bg-primary hover:bg-primary/90" 
                size="lg"
                onClick={() => router.push('/signup')}
              >
                CREATE ACCOUNT
              </Button>
              
              <Button
                variant="outline"
                className="w-full border-primary/20 hover:bg-primary/5"
                size="lg"
              >
                LOGIN
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Or continue using
              </p>
              
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  className="h-10 w-10 rounded-full p-0"
                  size="icon"
                >
                  <Image
                    src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                </Button>

                <Button
                  variant="outline"
                  className="h-10 w-10 rounded-full p-0"
                  size="icon"
                >
                  <Phone className="h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  className="h-10 w-10 rounded-full p-0 text-black"
                  size="icon"
                >
                  <Apple className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}