'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { LoadingSpinner } from '@/shared/components/feedback/loading-spinner';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface ReferralSource {
  id: number;
  name: string;
}

export const RegisterForm = () => {
  const { handleRegister, isLoading, error } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [referralSources, setReferralSources] = useState<ReferralSource[]>([]);
  const [loadingSources, setLoadingSources] = useState(false);
  const [showReferralCode, setShowReferralCode] = useState(false);

  const userRepository = new UserRepositoryImpl();

  useEffect(() => {
    const fetchReferralSources = async () => {
      try {
        setLoadingSources(true);
        const sources = await userRepository.getReferralSources();
        setReferralSources(sources);
      } catch (error) {
        console.error('Failed to fetch referral sources:', error);
      } finally {
        setLoadingSources(false);
      }
    };

    fetchReferralSources();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      referralSourceId: undefined,
      referralCode: ''
    }
  });

  // Watch referral source to show/hide referral code field
  const referralSourceId = watch('referralSourceId');

  useEffect(() => {
    // Show referral code field if "Teman" is selected
    // Assuming "Teman" has ID 1, adjust as needed
    setShowReferralCode(referralSourceId === 1);
  }, [referralSourceId]);

  const onSubmit = (values: RegisterFormValues) => {
    handleRegister(
      values.name,
      values.email,
      values.password,
      values.referralSourceId,
      values.referralCode || undefined
    );
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Buat Akun Baru</h1>
        <p className="mt-2 text-sm text-gray-600">
          Daftar untuk mengakses semua fitur Prestige Academy
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Nama lengkap Anda"
            {...register('name')}
            error={errors.name?.message}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="nama@example.com"
            {...register('email')}
            error={errors.email?.message}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message}
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <EyeIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Konfirmasi Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <EyeIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="referralSourceId" className="block text-sm font-medium text-gray-700">
            Darimana Anda mengetahui kami?
          </label>
          <Select
            id="referralSourceId"
            {...register('referralSourceId')}
            disabled={isLoading || loadingSources}
          >
            <option value="">Pilih sumber referral</option>
            {referralSources.map((source) => (
              <option key={source.id} value={source.id}>
                {source.name}
              </option>
            ))}
          </Select>
        </div>

        {showReferralCode && (
          <div className="space-y-2">
            <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">
              Kode Referral
            </label>
            <Input
              id="referralCode"
              type="text"
              placeholder="Masukkan kode referral"
              {...register('referralCode')}
              disabled={isLoading}
            />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <LoadingSpinner className="w-5 h-5 mr-2" /> : null}
          Daftar
        </Button>

        <p className="text-center text-sm text-gray-600">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Masuk disini
          </Link>
        </p>
      </form>
    </div>
  );
};