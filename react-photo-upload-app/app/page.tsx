export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-2xl bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Vite + React Photo Upload App
        </h1>
        <p className="text-gray-600 mb-6">
          This is a Vite project that needs to be run locally. The v0 preview
          does not support Vite applications.
        </p>

        <div className="bg-gray-900 text-gray-100 rounded-lg p-4 mb-6 font-mono text-sm">
          <p className="text-green-400 mb-2"># Download and run locally:</p>
          <p className="mb-1">
            <span className="text-gray-400">1.</span> Download the ZIP from the
            menu (top right)
          </p>
          <p className="mb-1">
            <span className="text-gray-400">2.</span> cd vite-photo-app
          </p>
          <p className="mb-1">
            <span className="text-gray-400">3.</span> npm install
          </p>
          <p className="mb-1">
            <span className="text-gray-400">4.</span> npm run dev
          </p>
          <p className="mt-3 text-yellow-400">
            # Make sure your backend runs on localhost:5000
          </p>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Project Structure
        </h2>
        <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
          <pre>{`vite-photo-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── components/
    │   ├── PhotoCard.jsx
    │   └── PhotoForm.jsx
    └── lib/
        ├── photoApi.js
        └── utils.js`}</pre>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>Features:</strong> Photo gallery dashboard, upload form with
            preview, edit/delete photos, auto-refresh after CRUD operations,
            connects to your Express + MongoDB + Cloudinary backend.
          </p>
        </div>
      </div>
    </div>
  )
}
