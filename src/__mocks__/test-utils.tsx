import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AuthProvider } from '@/context/auth.context';
import { Toaster } from '@/components/ui/sonner';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  );
};

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { renderWithProviders as render };
export { default as userEvent } from '@testing-library/user-event';
