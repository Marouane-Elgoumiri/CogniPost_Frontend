import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@/__mocks__/test-utils';
import userEvent from '@testing-library/user-event';
import { Pagination } from '@/components/shared/pagination';

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  },
}));

describe('Pagination', () => {
  it('renders nothing when totalPages <= 1', () => {
    const { container } = render(<Pagination page={0} totalPages={1} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders page numbers for small page counts', () => {
    render(<Pagination page={2} totalPages={5} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows ellipsis for large page counts', () => {
    render(<Pagination page={5} totalPages={20} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('…')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('highlights current page', () => {
    render(<Pagination page={2} totalPages={5} />);

    const currentPage = screen.getByRole('link', { current: 'page' });
    expect(currentPage).toHaveTextContent('3'); // page 2 = 3rd page (0-indexed)
  });

  it('disables first and previous buttons on first page', () => {
    render(<Pagination page={0} totalPages={5} />);

    const firstButton = screen.getByRole('link', { name: /first/i });
    const prevButton = screen.getByRole('link', { name: /previous/i });

    expect(firstButton).toHaveAttribute('aria-disabled', 'true');
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('disables last and next buttons on last page', () => {
    render(<Pagination page={4} totalPages={5} />);

    const nextButton = screen.getByRole('link', { name: /next/i });
    const lastButton = screen.getByRole('link', { name: /last/i });

    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
    expect(lastButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('uses custom basePath', () => {
    render(<Pagination page={0} totalPages={5} basePath="/tags/test" />);

    const pageLink = screen.getByText('2');
    expect(pageLink.closest('a')).toHaveAttribute('href', '/tags/test?page=1');
  });

  it('renders correct number of page links', () => {
    render(<Pagination page={0} totalPages={3} />);

    // Should have first, prev, 3 page numbers, next, last
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(7); // first, prev, 1, 2, 3, next, last
  });

  it('calculates correct href for page numbers', () => {
    render(<Pagination page={0} totalPages={5} basePath="/articles" />);

    const page3 = screen.getByText('3');
    expect(page3.closest('a')).toHaveAttribute('href', '/articles?page=2');
  });
});
