import React from 'react';
import "./FilePreview.css"

const FilePreview = ({ files, handleFileDelete }) => {
  return (
    <div className="mb-4">
      {files.length > 0 && (
        <div className="images_container">
          {files.map((file, index) => (
            <div key={index} className="image">
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
          ))}
        </div>
      )}
    </div>
  );
};

export default FilePreview;
