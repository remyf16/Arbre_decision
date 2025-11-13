
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TreeResults = () => {
  const { treeId } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`/api/results/tree/${treeId}`);
        setResults(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load results.');
        setLoading(false);
      }
    };
    fetchResults();
  }, [treeId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 p-10 overflow-auto">
        <h1 className="text-3xl font-bold mb-8">Results for Decision Tree</h1>
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark">
          <table className="w-full text-left">
            <thead className="border-b border-border-light dark:border-border-dark">
              <tr>
                <th className="px-4 py-3 text-xs font-medium uppercase">User</th>
                <th className="px-4 py-3 text-xs font-medium uppercase">Result Node</th>
                <th className="px-4 py-3 text-xs font-medium uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result._id} className="border-b border-border-light dark:border-border-dark">
                  <td className="px-4 py-4">{result.user.name} ({result.user.email})</td>
                  <td className="px-4 py-4">{result.resultNode}</td>
                  <td className="px-4 py-4">{new Date(result.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default TreeResults;
