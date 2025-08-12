"use client";

import { useState } from "react";
import { Paperclip, ChevronDown, ChevronRight, Trash2 } from "lucide-react";

export default function AdditionalDocuments() {
  const [isEditing, setIsEditing] = useState(false);
  const [files, setFiles] = useState([
    {
      name: "Business_Analytics_Curriculum_InternsElite.pdf",
      status: "Completed",
    },
    { name: "hackathon_RKGIT.pdf", status: "Completed" },
  ]);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      status: "Completed",
    }));
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const handleFileRemove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* NDA Notice */}
      <div className="bg-indigo-50 text-sm text-indigo-900 px-4 py-3 rounded-t-lg">
        <p className="font-medium">
          By attaching your files, you are accepting the NDA
        </p>
        <p className="text-xs text-indigo-800">
          Thus establishing a confidentiality agreement with buyers interested
          in knowing more information. You will always have at your disposal
          copies of the NDAs signed by both parties.{" "}
          <a href="#" className="text-blue-600 underline ml-1">
            See NDA
          </a>
        </p>
      </div>

      {/* Additional Documentation Section */}
      <div className="px-4 py-5">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-medium text-gray-900">
              Additional documentation
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Add financial and accounting documentation. Only buyers with
              accepted interest and who have previously signed the nondisclosure
              agreement (NDA) will have access to your download.
            </p>
          </div>

          {/* Right arrow (optional for navigation) */}
          {isEditing ? (
            <button onClick={toggleEditing}>
              <ChevronDown className="text-gray-500" size={25} />
            </button>
          ) : (
            <button onClick={toggleEditing}>
              <ChevronRight className="text-gray-500" size={25} />
            </button>
          )}
        </div>

        {/* Attached Files */}
        {!isEditing ? (
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-800">
              <Paperclip className="w-4 h-4 mr-1" />
              Business_Analyt...
            </span>

            <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-800">
              <Paperclip className="w-4 h-4 mr-1" />
              hackathon_RKGIT...
            </span>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Upload Box */}
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4-4-4-4m6 8l4-4-4-4"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">
                    Drag your documents here
                  </span>{" "}
                  or{" "}
                  <span className="text-blue-600 underline">upload a file</span>
                </p>
                <p className="text-xs text-gray-400">
                  Pdf, Excel, CSV (max 400MB)
                </p>
              </div>
              <input
                id="fileUpload"
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Uploaded Files List */}
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 px-4 py-2 border rounded-md"
              >
                <div className="flex items-center gap-2">
                  <Paperclip className="text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {file.name}
                    </p>
                    <p className="text-xs text-green-600">✓ {file.status}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleFileRemove(idx)}
                  className="ml-auto p-1 rounded-full text-blue-600 hover:bg-blue-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
