import { FileText, Tag, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Write',
    description: 'Create articles with full Markdown support. Focus on your content, not formatting.',
  },
  {
    icon: Tag,
    title: 'Organize',
    description: 'Categorize your articles with tags. Help readers discover content they love.',
  },
  {
    icon: MessageSquare,
    title: 'Engage',
    description: 'Build a community with comments and discussions. Connect with your readers.',
  },
];

export function FeatureGrid() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why CogniPost?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-background border rounded-lg p-6 hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
