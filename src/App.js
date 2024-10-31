import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import DataTypeTable from './components/DataTypeTable';
import Navbar from './components/Navbar';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <FileUpload 
            setResults={setResults} 
            loading={loading} 
            setLoading={setLoading} 
          />
          {results && <DataTypeTable data={results} />}
        </div>
      </main>
    </div>
  );
}

export default App;