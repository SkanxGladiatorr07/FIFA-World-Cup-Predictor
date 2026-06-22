'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

export const LoginForm = () => {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  
  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!validateForm()) return;
    
    try {
      await login(formData.username, formData.password);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (err) {
      toast.error(error || 'Login failed');
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Username"
        name="username"
        type="text"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        autoComplete="username"
        disabled={isLoading}
      />
      
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        autoComplete="current-password"
        disabled={isLoading}
      />
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isLoading}
      >
        Sign In
      </Button>
      
      <div className="text-center">
        <p className="text-gray-400">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-gold hover:text-gold-light font-semibold transition-smooth">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};
