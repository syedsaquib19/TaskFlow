import SEO from "../components/SEO";

export default function About() {
  return (
    <main className="container py-10">
      <SEO title="About • TaskFlow" description="Why TaskFlow exists and how it helps you work better." />
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p className="opacity-80">TaskFlow exists to make planning and execution effortless. We combine clarity, speed, and delightful design so teams and students can focus on what matters.</p>
        </div>
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-2">Why TaskFlow?</h2>
          <ul className="list-disc pl-5 space-y-1 opacity-90">
            <li>Cleaner interface than traditional task apps</li>
            <li>Built-in analytics and progress visualization</li>
            <li>Ready for scale with a MERN backend</li>
          </ul>
        </div>
      </div>
      <div className="card p-6 mt-6">
        <h3 className="font-semibold mb-1">Credit</h3>
        <p>Built for <b>SIRT</b> • Team: Add your names here.</p>
      </div>
    </main>
  );
}
