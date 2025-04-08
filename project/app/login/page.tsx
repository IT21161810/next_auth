'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { validateCredentials } from '@/lib/auth';
import { useAuthStore } from '@/lib/store';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (validateCredentials(data.email, data.password)) {
      login(data.email);
      router.push('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Invalid credentials',
        description: 'Please check your email and password',
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111]">
      <div className="w-full max-w-[1200px] h-[600px] mx-4 flex rounded-2xl overflow-hidden bg-[#1a1a1a] shadow-2xl">
        <div className="w-1/2 p-12 flex flex-col">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-[#7C3AED] rounded-lg"></div>
            <span className="text-white font-semibold">ROOM.ME</span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">Welcome back to Room.me!</h1>
          <p className="text-gray-400 mb-8">Room.me is an innovative video conference product that revolutionizes virtual meetings.</p>
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <Input
                {...register('email')}
                type="email"
                placeholder="Enter your email address"
                className={`bg-[#2a2a2a] border-0 text-white h-12 ${errors.email ? 'ring-red-500' : 'focus:ring-[#7C3AED]'}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`bg-[#2a2a2a] border-0 text-white h-12 ${errors.password ? 'ring-red-500' : 'focus:ring-[#7C3AED]'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-600 bg-[#2a2a2a] text-[#7C3AED] focus:ring-[#7C3AED]"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                  Remember for 30 days
                </label>
              </div>
              <a href="#" className="text-sm text-[#7C3AED] hover:text-[#9461FF]">
                Forgot password?
              </a>
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full h-12 bg-[#7C3AED] hover:bg-[#9461FF] text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 bg-white hover:bg-gray-50 text-black border-0"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Sign in with Google
              </Button>
            </div>

            <p className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <a href="#" className="text-[#7C3AED] hover:text-[#9461FF]">
                Sign up
              </a>
            </p>
          </form>
        </div>

        <div className="w-1/2 relative bg-gradient-to-br from-[#7C3AED]/10 to-[#9461FF]/10">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')" }}></div>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="absolute bottom-12 left-12 right-12 p-6 bg-black/40 backdrop-blur-md rounded-xl text-white">
            <p className="text-lg mb-4">
              "We love the screen sharing and whiteboarding features, which have improved our presentations. Room.me has become an essential tool for our team, allowing us to collaborate effectively. Highly recommended!"
            </p>
            <p className="font-medium">Sarah Markivoc - Project Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}