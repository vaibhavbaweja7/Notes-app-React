import { useState } from "react";
import "./App.css";
import Note from "./Note";

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: "", text: "", type: "text", list: [] });
    const [listItem, setListItem] = useState("");

    const addNote = () => {
        if (newNote.title && (newNote.text || newNote.list.length)) {
            const newId = Date.now().toString();
            setNotes([...notes, { ...newNote, id: newId }]);
            setNewNote({ title: "", text: "", type: "text", list: [] });
            setListItem(""); // Clear the list item input
        }
    };

    const deleteNote = (id) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
    };

    const editNote = (id, newContent, type) => {
        const updatedNotes = notes.map((note) =>
            note.id === id
                ? type === "text"
                    ? { ...note, text: newContent }
                    : { ...note, list: newContent }
                : note
        );
        setNotes(updatedNotes);
    };

    const addListItem = () => {
        if (listItem.trim()) {
            setNewNote((prevNote) => ({
                ...prevNote,
                list: [...prevNote.list, listItem],
            }));
            setListItem("");
        }
    };

    return (
        <div className="App">
            <h1>Notes App</h1>
            <div className="note-form">
                <input
                    type="text"
                    placeholder="Title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
                <select
                    value={newNote.type}
                    onChange={(e) => setNewNote({ ...newNote, type: e.target.value })}
                >
                    <option value="text">Text Note</option>
                    <option value="list">List Note</option>
                </select>
                {newNote.type === "text" ? (
                    <textarea
                        rows="4"
                        cols="50"
                        placeholder="Text"
                        value={newNote.text}
                        onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
                    />
                ) : (
                    <div className="list-form">
                        <input
                            type="text"
                            placeholder="Add list item"
                            value={listItem}
                            onChange={(e) => setListItem(e.target.value)}
                        />
                        <button onClick={addListItem}>Add Item</button>
                        <ul>
                            {newNote.list.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <button onClick={addNote}>Add Note</button>
            </div>
            <div className="note-list">
                {notes.map((note) => (
                    <Note key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
                ))}
            </div>
        </div>
    );
}

export default App;

