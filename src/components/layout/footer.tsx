import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} CogniPost. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/articles" className="hover:text-foreground transition-colors">
            Articles
          </Link>
          <Link href="/tags" className="hover:text-foreground transition-colors">
            Tags
          </Link>
        </nav>
      </div>
    </footer>
  );
}
