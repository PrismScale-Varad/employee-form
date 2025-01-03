import React from 'react';

const FilePreview = ({ files, handleFileDelete }) => {
  return (
    <div className="mb-4">
      {files.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center gap-2">
                <img
                  className="w-16 h-16 object-cover rounded-md"
                  src={URL.createObjectURL(file)}
                  alt={`file-preview-${index}`}
                />
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleFileDelete(index)}
                >
                  <span className="material-icons">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilePreview;
