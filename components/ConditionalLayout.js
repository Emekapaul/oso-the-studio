'use client';

import { usePathname } from 'next/navigation';
import MainLayout from './MainLayout';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Don't apply MainLayout to admin pages
  const isAdminPage = pathname?.startsWith('/admin');
  
  if (isAdminPage) {
    return <>{children}</>;
  }
  
  return <MainLayout>{children}</MainLayout>;
}