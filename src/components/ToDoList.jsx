import React, { useEffect, useState, useRef } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [hovering, setHovering] = useState(false);
    const popupRef = useRef();

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

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (input.trim() === '') return;
        setTodos([...todos, { text: input.trim() }]);
        setInput('');
    };

    const deleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
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
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className="relative"
            >
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md shadow-md transition duration-300"
                >
                    <Plus size={24} />
                </button>

                {/* Hover Preview */}
                {hovering && todos.length > 0 && (
                    <div className="absolute bottom-14 right-0 w-64 bg-white/90 text-black rounded-lg shadow-lg p-4 text-sm z-50 max-h-60 overflow-auto backdrop-blur-md border border-gray-300 animate-fadeIn">
                        <p className="font-bold text-center text-blue-700 mb-2">Your Todos</p>
                        <ul className="space-y-1 list-disc pl-5">
                            {todos.map((todo, i) => (
                                <li key={i} className="truncate">{todo.text}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center animate-fadeIn">
                    <div
                        ref={popupRef}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 text-white w-full max-w-md p-6 rounded-2xl shadow-2xl mx-4 relative"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-3 text-white hover:text-red-400 text-xl font-bold"
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-semibold text-center mb-6">📝 Your To-Do List</h2>

                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                                placeholder="Add a new task..."
                                className="flex-grow px-4 py-2 rounded-lg text-black placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={addTodo}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium shadow-lg"
                            >
                                Add
                            </button>
                        </div>

                        <ul className="space-y-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent">
                            {todos.length === 0 ? (
                                <p className="text-center text-sm text-gray-300 italic">
                                    ✨ Start by adding your first task!
                                </p>
                            ) : (
                                todos.map((todo, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center bg-white/20 backdrop-blur rounded-lg px-4 py-2 shadow-sm text-wrap"
                                    >
                                        <span className="whitespace-pre-wrap break-words w-full pr-2">{todo.text}</span>

                                        <button
                                            onClick={() => deleteTodo(index)}
                                            className="text-red-300 hover:text-red-500 transition"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default TodoList;
