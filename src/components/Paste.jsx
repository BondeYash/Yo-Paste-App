import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPaste, updateToPaste } from '../features/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pastes = useSelector(state => state.paste.pastes);
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    paste => paste.title && paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPaste(pasteId));
    toast.success("Paste Deleted");
  };

  const handleShare = async (paste) => {
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
        url: `${window.location.origin}/pastes/${paste._id}`,
      }).then (()=> {
        toast.success("Content Shared");
      }).catch(() => {
        toast.error("Rejected Sharing");
      });
    } else {
      toast.error("Web Sharing API is not supported");
    }
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <div className="flex justify-center mb-8">
        <input
          className="p-3 rounded-lg w-full max-w-md border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-200"
          type="search"
          placeholder="Search here ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div key={paste._id} className="bg-white border rounded-lg shadow-lg p-6 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-200 w-[600px]">
              <h3 className="text-lg font-semibold text-gray-700">{paste.title}</h3>
              <p className="text-gray-600 text-sm overflow-hidden max-h-24">{paste.content}</p>
              
              <div className="flex justify-evenly gap-3 mt-4">
                <Link to={`/?pasteId=${paste._id}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">Edit</button>
                </Link>
                <Link to={`/pastes/${paste._id}`}>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200">View</button>
                </Link>
                <button 
                  onClick={() => handleDelete(paste._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
                <button 
                  onClick={() => handleShare(paste)} 
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-200"
                >
                  Share
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Paste Copied");
                  }} 
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                >
                  Copy
                </button>
              </div>
              
              <div className="text-gray-400 text-xs mt-3 text-right">
                {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center w-full">
            No pastes found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
