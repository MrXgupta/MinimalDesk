import React, { useEffect, useState, useRef } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [hovering, setHovering] = useState(false);
    const popupRef = useRef();

    // Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('todoList');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) setTodos(parsed);
            } catch (e) {
                console.error('Invalid todo data', e);
            }
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (input.trim() === '') return;
        setTodos([...todos, { text: input.trim() }]);
        setInput('');
    };

    const deleteTodo = (index) => {
        const updated = todos.filter((_, i) => i !== index);
        setTodos(updated);
    };

    const handleClickOutside = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <>
            <div
                className="fixed bottom-6 right-6 z-50"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-transparent hover:bg-gray-700 text-white p-4 rounded-full shadow-xl transition duration-300 relative"
                >
                    <Plus size={24} />
                    {/* Hover Card */}
                    {hovering && todos.length > 0 && (
                        <div className="absolute bottom-14 right-0 w-60 bg-white text-black rounded shadow-lg p-3 text-sm z-50 max-h-60 overflow-auto">
                            <p className="font-bold mb-1 text-center text-blue-600">Your Todos</p>
                            <ul className="space-y-1">
                                {todos.map((todo, i) => (
                                    <li key={i} className="truncate">• {todo.text}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </button>
            </div>

            {/* Center Popup Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div
                        ref={popupRef}
                        className="bg-white text-black w-96 max-w-[90%] rounded-lg shadow-2xl p-6 relative"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-center">Your To-Do List</h2>

                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                                className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none"
                                placeholder="Add a new task"
                            />
                            <button
                                onClick={addTodo}
                                className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Add
                            </button>
                        </div>

                        <ul className="space-y-2 max-h-60 overflow-y-auto">
                            {todos.length === 0 ? (
                                <p className="text-gray-500 text-sm text-center">No tasks yet.</p>
                            ) : (
                                todos.map((todo, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
                                    >
                                        <span className="truncate">{todo.text}</span>
                                        <button
                                            onClick={() => deleteTodo(index)}
                                            className="text-red-500 hover:text-red-700"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default TodoList;
