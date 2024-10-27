import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPaste, updateToPaste } from '../features/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);
    
    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteId, allPastes]);
    
    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleTextAreaChange = (e) => {
        setValue(e.target.value);
    };

    const createPaste = () => {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updateToPaste(paste));
        } else {
            dispatch(addToPaste(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-slate-500 p-8">
            <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{pasteId ? "Edit Paste" : "Create New Paste"}</h1>
                <input
                    className="p-3 border border-gray-300 rounded-lg w-full mb-4 focus:outline-none focus:border-blue-500 transition duration-200"
                    type="text"
                    placeholder="Enter Title Here"
                    value={title}
                    onChange={handleChange}
                />

                <textarea
                    value={value}
                    placeholder="Enter Content Here ..."
                    onChange={handleTextAreaChange}
                    rows={10}
                    className="p-3 border border-gray-300 rounded-lg w-full h-60 resize-none focus:outline-none focus:border-blue-500 transition duration-200"
                />

                <button
                    onClick={createPaste}
                    className="mt-4 w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                >
                    {pasteId ? "Update Paste" : "Create Paste"}
                </button>
            </div>
        </div>
    );
};

export default Home;
