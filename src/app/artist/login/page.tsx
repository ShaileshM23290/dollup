'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  UserPlus,
  AlertCircle,
  Palette
} from 'lucide-react';

export default function ArtistLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/artist/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store artist data in localStorage for client-side access
        localStorage.setItem('artist', JSON.stringify(data.artist));
        
        // Redirect to artist dashboard
        router.push('/artist/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f0] via-white to-[#e8d5b7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-[#4e4528] mb-2">Dollup</h1>
            <p className="text-[#8b7355]">Professional Makeup Artistry</p>
          </Link>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#e8d5b7]">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#d4a574] rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#2c2c2c] mb-2">Artist Login</h2>
            <p className="text-[#6b6b6b]">Access your artist dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8b7355]" />
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2c2c2c] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8b7355]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-[#e8d5b7] rounded-xl focus:ring-2 focus:ring-[#d4a574] focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8b7355] hover:text-[#6b6b6b] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-[#e8d5b7] text-[#d4a574] focus:ring-[#d4a574]"
                />
                <span className="ml-2 text-sm text-[#6b6b6b]">Remember me</span>
              </label>
              <Link
                href="/artist/forgot-password"
                className="text-sm text-[#d4a574] hover:text-[#c4956a] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#d4a574] text-white py-3 px-4 rounded-xl hover:bg-[#c4956a] transition-all duration-300 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#6b6b6b]">
              Don't have an artist account?{' '}
              <Link
                href="/artist/register"
                className="text-[#d4a574] hover:text-[#c4956a] font-medium transition-colors"
              >
                Apply now
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-[#f0f0f0]">
            <div className="text-center">
              <p className="text-sm text-[#8b7355] mb-4">Are you a customer?</p>
              <Link
                href="/auth/login"
                className="text-[#d4a574] hover:text-[#c4956a] font-medium transition-colors"
              >
                Customer Login
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-[#8b7355] hover:text-[#6b6b6b] transition-colors"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
} 