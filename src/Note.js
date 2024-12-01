import React, { useState } from "react";

const Note = ({ note, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(
        note.type === "text" ? note.text : note.list
    );

    const handleSave = () => {
        onEdit(note.id, editedContent, note.type);
        setIsEditing(false);
    };

    return (
        <div className="note">
            <div className="note-header">
                <h3>{note.title}</h3>
                <button onClick={() => onDelete(note.id)}>Delete</button>
            </div>
            {isEditing ? (
                <>
                    {note.type === "text" ? (
                        <textarea
                            rows="4"
                            columns="50"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                    ) : (
                        <ul>
                            {editedContent.map((item, index) => (
                                <li key={index}>
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                            const updatedList = [...editedContent];
                                            updatedList[index] = e.target.value;
                                            setEditedContent(updatedList);
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    {note.type === "text" ? (
                        <p>{note.text}</p>
                    ) : (
                        <ul>
                            {note.list.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    )}
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
        </div>
    );
};

export default Note;
