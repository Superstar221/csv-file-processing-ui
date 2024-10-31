import React from 'react';

function DataTypeTable({ data }) {
  if (!data || !data.column_types) return null;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Data Type Analysis
        </h2>
        <div className="text-sm text-gray-600 mb-4">
          Total Rows: {data.total_rows}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Column Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inferred Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sample Values
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Original Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(data.column_types).map(([column, info]) => (
                <tr key={column} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {column}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${info.type === 'datetime' ? 'bg-purple-100 text-purple-800' : ''}
                      ${info.type === 'integer' || info.type === 'float' ? 'bg-blue-100 text-blue-800' : ''}
                      ${info.type === 'category' ? 'bg-green-100 text-green-800' : ''}
                      ${info.type === 'text' ? 'bg-gray-100 text-gray-800' : ''}`}>
                      {info.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {info.sample_values.join(', ')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {info.original_type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DataTypeTable;