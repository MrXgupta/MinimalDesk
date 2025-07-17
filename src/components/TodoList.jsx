import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Circle, Trash2, Pencil, Save } from 'lucide-react';

const STORAGE_KEY = 'motivation_todos';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');
    const editInputRef = useRef(null);

    // Load tasks from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setTasks(JSON.parse(saved));
    }, []);

    // Save tasks to localStorage on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    // Focus on edit input when editing a task
    useEffect(() => {
        if (editingIndex !== null && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [editingIndex]);

    const addTask = () => {
        if (input.trim()) {
            setTasks([...tasks, { text: input, done: false }]);
            setInput('');
        }
    };

    const toggleTask = (index) => {
        setTasks(tasks =>
            tasks.map((task, i) =>
                i === index ? { ...task, done: !task.done } : task
            )
        );
    };

    const deleteTask = (index) => {
        setTasks(tasks => tasks.filter((_, i) => i !== index));
        if (editingIndex === index) {
            setEditingIndex(null);
            setEditingText('');
        }
    };

    const startEditTask = (index) => {
        setEditingIndex(index);
        setEditingText(tasks[index].text);
    };

    const saveEditTask = (index) => {
        if (editingText.trim()) {
            setTasks(tasks =>
                tasks.map((task, i) =>
                    i === index ? { ...task, text: editingText } : task
                )
            );
            setEditingIndex(null);
            setEditingText('');
        }
    };

    const cancelEditTask = () => {
        setEditingIndex(null);
        setEditingText('');
    };

    const handleEditKeyDown = (e, index) => {
        if (e.key === 'Enter') saveEditTask(index);
        if (e.key === 'Escape') cancelEditTask();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') addTask();
    };

    return (
        <div className="absolute bottom-6 right-6 w-80 bg-black/30 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-2xl glass-effect z-20">
            <h3 className="text-2xl font-bold mb-4 text-white/90 drop-shadow">📝 To-Do List</h3>
            <div className="flex gap-2 mb-4">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a new task..."
                    className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-300"
                />
                <button
                    onClick={addTask}
                    className="px-4 py-2 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition"
                >
                    Add
                </button>
            </div>
            <ul className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {tasks.length === 0 && (
                    <li className="text-gray-400 text-center italic">No tasks yet!</li>
                )}
                {tasks.map((task, i) => (
                    <li
                        key={i}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition group ${
                            task.done
                                ? 'bg-green-500/10 text-green-300 line-through'
                                : 'bg-white/5 text-white'
                        }`}
                    >
                        <button
                            onClick={() => toggleTask(i)}
                            className="focus:outline-none"
                            aria-label={task.done ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                            {task.done ? (
                                <CheckCircle className="text-green-400 w-5 h-5" />
                            ) : (
                                <Circle className="text-gray-400 w-5 h-5" />
                            )}
                        </button>
                        {editingIndex === i ? (
                            <input
                                ref={editInputRef}
                                value={editingText}
                                onChange={e => setEditingText(e.target.value)}
                                onKeyDown={e => handleEditKeyDown(e, i)}
                                onBlur={() => saveEditTask(i)}
                                className="flex-1 px-2 py-1 rounded bg-white/20 text-white outline-none"
                            />
                        ) : (
                            <span
                                className="flex-1 text-base cursor-pointer"
                                onDoubleClick={() => startEditTask(i)}
                                title="Double click to edit"
                            >
                                {task.text}
                            </span>
                        )}
                        {editingIndex === i ? (
                            <button
                                onClick={() => saveEditTask(i)}
                                className="opacity-80 hover:opacity-100 transition"
                                aria-label="Save edit"
                            >
                                <Save className="w-4 h-4 text-blue-400" />
                            </button>
                        ) : (
                            <button
                                onClick={() => startEditTask(i)}
                                className="opacity-60 hover:opacity-100 transition"
                                aria-label="Edit task"
                            >
                                <Pencil className="w-4 h-4 text-yellow-400" />
                            </button>
                        )}
                        <button
                            onClick={() => deleteTask(i)}
                            className="opacity-60 hover:opacity-100 transition"
                            aria-label="Delete task"
                        >
                            <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;