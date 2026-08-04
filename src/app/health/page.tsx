export default async function HealthPage() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos/1",
    {
      cache: "no-store",
    }
  );

  const data = await response.json();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Health Check
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 border">

        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-700">
            API Status
          </h2>

          <p className="text-green-600 font-bold text-xl">
            🟢 Connected
          </p>
        </div>

        <hr className="my-4" />

        <div className="space-y-3">

          <p>
            <strong>User ID:</strong> {data.userId}
          </p>

          <p>
            <strong>Todo ID:</strong> {data.id}
          </p>

          <p>
            <strong>Title:</strong> {data.title}
          </p>

          <p>
            <strong>Completed:</strong>{" "}
            {data.completed ? "✅ Yes" : "❌ No"}
          </p>

        </div>

      </div>
    </main>
  );
}