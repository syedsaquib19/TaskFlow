import SEO from "../components/SEO";
import FeatureGrid from "../components/FeatureGrid";

export default function Features() {
  return (
    <main className="py-10">
      <SEO title="Features • TaskFlow" description="Everything you need to manage work." />
      <div className="container space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold">Features</h2>
          <p className="opacity-80">Tasks, workflows, analytics, reminders, and more.</p>
        </div>
        <FeatureGrid />
        <div className="card p-6">
          <h3 className="font-semibold text-xl mb-2">Upcoming</h3>
          <ul className="list-disc pl-6 opacity-90">
            <li>Real-time collaboration</li>
            <li>Calendar sync</li>
            <li>AI task suggestions</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
