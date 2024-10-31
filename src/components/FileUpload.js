import React, { useRef, useState } from 'react';
import { CloudArrowUpIcon, DocumentIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { api } from '../services/api';

function FileUpload({ setResults, loading, setLoading }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    if (file.size > process.env.REACT_APP_MAX_FILE_SIZE) {
      setError('File size exceeds the maximum limit of 5MB');
      return;
    }

    const allowedTypes = process.env.REACT_APP_ALLOWED_FILE_TYPES.split(',');
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      setError('Invalid file type. Please upload a CSV or Excel file.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSelectedFile(file);
      
      // Upload the file
      const uploadResponse = await api.uploadFile(file);
      
      // Process the uploaded file using the correct id field
      const processResponse = await api.processFile(uploadResponse.id);
      
      setResults(processResponse);
    } catch (error) {
      console.error('Upload error:', error);
      setError(error.response?.data?.message || 'An error occurred while processing the file');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {selectedFile ? (
              <>
                <DocumentIcon className="w-12 h-12 text-indigo-500 mb-3" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">{selectedFile.name}</span>
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(selectedFile.size)}
                </p>
                {!loading && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleReset();
                    }}
                    className="mt-2 text-xs text-red-500 hover:text-red-700"
                  >
                    Remove file
                  </button>
                )}
              </>
            ) : (
              <>
                <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mb-3" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500">CSV or Excel files</p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      )}
      {error && (
        <div className="mt-4 text-sm text-red-600 flex items-center justify-center">
          <XCircleIcon className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
    </div>
  );
}

export default FileUpload;