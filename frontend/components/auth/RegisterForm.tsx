'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

export const RegisterForm = () => {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<{
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return username.length >= 3 && username.length <= 20 && usernameRegex.test(username);
  };
  
  const validatePassword = (password: string) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
  };
  
  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!validateUsername(formData.username)) {
      newErrors.username = 'Username must be 3-20 characters and alphanumeric';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be 8+ characters with uppercase, lowercase, and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!validateForm()) return;
    
    try {
      await register(formData.email, formData.username, formData.password);
      toast.success('Registration successful! Please login.');
      router.push('/auth/login');
    } catch (err) {
      toast.error(error || 'Registration failed');
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
  
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength <= 2) return { strength, label: 'Weak', color: 'bg-error' };
    if (strength === 3) return { strength, label: 'Fair', color: 'bg-warning' };
    if (strength === 4) return { strength, label: 'Good', color: 'bg-info' };
    return { strength, label: 'Strong', color: 'bg-success' };
  };
  
  const passwordStrength = getPasswordStrength();
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
        disabled={isLoading}
      />
      
      <Input
        label="Username"
        name="username"
        type="text"
        placeholder="Choose a username (3-20 characters)"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        helperText="Only letters, numbers, and underscores"
        autoComplete="username"
        disabled={isLoading}
      />
      
      <div>
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
          disabled={isLoading}
        />
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-2 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400">{passwordStrength.label}</span>
            </div>
          </div>
        )}
      </div>
      
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        autoComplete="new-password"
        disabled={isLoading}
      />
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isLoading}
      >
        Sign Up
      </Button>
      
      <div className="text-center">
        <p className="text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-gold hover:text-gold-light font-semibold transition-smooth">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};
