import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PenSquare, FileText, Settings } from 'lucide-react';

export function QuickActions() {
  return (
    <div className="bg-card border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/new">
            <PenSquare className="h-4 w-4 mr-2" />
            New Article
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/my-articles">
            <FileText className="h-4 w-4 mr-2" />
            My Articles
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </Button>
      </div>
    </div>
  );
}
