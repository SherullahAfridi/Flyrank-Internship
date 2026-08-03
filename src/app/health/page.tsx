export default async function HealthPage() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos/1",
    {
      cache: "no-store",
    }
  );

  const data = await response.json();

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">Health Check</h1>

      <pre className="mt-4 bg-gray-100 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}