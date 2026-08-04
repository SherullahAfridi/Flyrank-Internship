export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      <section className="text-center">

        <h1 className="text-5xl font-bold text-blue-600">
          Frontend AI Engineering
        </h1>

        <p className="mt-4 text-xl text-gray-600">
          Week 3 – Capstone Skeleton
        </p>

      </section>

      <section className="grid md:grid-cols-2 gap-6 mt-16">

        <div className="border rounded-xl p-6 shadow">
          <h2 className="text-2xl font-semibold mb-3">
            Project Information
          </h2>

          <p>
            This project is built using Next.js 16, React 19, and Tailwind CSS.
          </p>
        </div>

        <div className="border rounded-xl p-6 shadow">
          <h2 className="text-2xl font-semibold mb-3">
            Technologies
          </h2>

          <ul className="space-y-2">
            <li>✅ Next.js 16</li>
            <li>✅ React 19</li>
            <li>✅ Tailwind CSS</li>
            <li>✅ TypeScript</li>
            <li>✅ Vercel Deployment</li>
          </ul>
        </div>

      </section>

      <section className="mt-16 border rounded-xl p-8 shadow">

        <h2 className="text-3xl font-bold mb-4">
          Week 3 Progress
        </h2>

        <ul className="space-y-3 text-lg">
          <li>✅ Routing Completed</li>
          <li>✅ Root Layout</li>
          <li>✅ Navigation</li>
          <li>✅ Footer</li>
          <li>✅ Placeholder Pages</li>
          <li>✅ Health Check API</li>
          <li>✅ Live Deployment on Vercel</li>
        </ul>

      </section>

    </main>
  );
}