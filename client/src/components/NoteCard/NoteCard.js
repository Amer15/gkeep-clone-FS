import React from 'react';
import './NoteCard.css';

const NoteCard = (props) => {
    return (
        <div className="note-card">
            <h4>{props.title}</h4>
            <div className="note-content">
                <span className="text-wrap">{props.body}</span>
            </div>
            <div className="buttons-wrapper">
                <button className="delete-btn" title="delete"
                    onClick={props.deleteNote}>
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
                <button className="edit-btn" title="edit"
                    onClick={props.editNote}>
                    <ion-icon name="create-outline"></ion-icon>
                </button>
            </div>
        </div>
    );
}

export default NoteCard;


