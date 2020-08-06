import React, { Component } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import InputFields from '../InputFields/InputFields';
import NoteCard from '../../components/NoteCard/NoteCard';
import Modal from 'react-modal';
import Message from '../../components/Message/Message';
import './MainPage.css';

Modal.setAppElement('#root');

class MainPage extends Component {
    constructor() {
        super();

        this.state = {
            showModal: false, 
            Obj: {
                title: "",
                body: ""
            }, 
            editNoteObj: {
                id: "",
                title: "",
                body: ""
            }, 
            notes: [],
            searchValue: '',
        }
    }

    //GET NOTES FROM DB
    componentDidMount() {
        axios.get('/')
            .then(response => {
                // console.log(response.data);
                const fetchedNotes = response.data.notes;

                this.setState({
                    notes: fetchedNotes
                })

            })
            .catch(error => console.log(error));
    }

    onInputChange = (e) => {
        const { name, value } = e.target;
        const newObj = { ...this.state.Obj };
        newObj[name] = value;
        this.setState({
            Obj: newObj
        });
    }

    onAddHandler = (e) => {
        // console.log(e.target);
        e.preventDefault();
        console.log(this.state.Obj);

        const { title, body } = this.state.Obj;

        const notesData = {
            title,
            body
        }

        axios.post('/add-note', notesData)
            .then(response => {
                console.log(response.data.message);
                const newNotes = [...this.state.notes];
                newNotes.push(response.data.note);

                const emptyObj = {
                    title: '',
                    body: ''
                };

                this.setState({
                    Obj: emptyObj,
                    notes: newNotes
                });
            })
            .catch(error => {
                console.log(error);
            })

    }

    deleteNoteHandler = (id) => {
        axios.delete(`/delete-note/${id}`)
            .then(response => {
                console.log(response);
                const notes = [...this.state.notes];

                const filteredNotes = notes.filter(note => note._id !== id);

                this.setState({
                    notes: filteredNotes
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    editNoteHandler = (e, id) => {
        // console.log(id);

        const notes = [...this.state.notes];

        const filterNote = notes.filter(note => note._id === id);

        const filteredNote = filterNote[0];

        const newObj = { ...this.state.editNoteObj };
        newObj.id = filteredNote._id;
        newObj.title = filteredNote.title;
        newObj.body = filteredNote.body;

        this.setState({
            showModal: true,
            editNoteObj: newObj
        });
    }

    searchHandler = (e) => {
        let searchValue = e.target.value.toLowerCase();
        this.setState({
            searchValue: searchValue
        });
    }

    closeModalHandler = () => {
        this.setState({
            showModal: false
        })
    }

    onClearSearchValue = () => {
        this.setState({
            searchValue : ''
        })
    }

    modalInputChange = (e) => {
        console.log(e.target.value);
        let newEditableNoteObj = {...this.state.editNoteObj};
        newEditableNoteObj[e.target.name] = e.target.value;
        this.setState({
            editNoteObj: newEditableNoteObj
        });
    }

    onNoteUpdateHandler = () => {
        const { id } = this.state.editNoteObj
        const AllNotes = [...this.state.notes];
        //loop through notes array and update only that NoteObject matched by _id
        AllNotes.forEach( note => {
            if(note._id === id){
                note.title = this.state.editNoteObj.title;
                note.body = this.state.editNoteObj.body;
            }
        });

        this.setState({
            notes: AllNotes
        });

        const updatedNote = {
            title: this.state.editNoteObj.title,
            body: this.state.editNoteObj.body
        }

        axios.put(`/update-note/${id}`, updatedNote)
        .then( response => {
           console.log(response.data.message);
        })
        .catch( error=> {
            console.log(error)
        })

        this.closeModalHandler();
    }

    render() {
        let notes;
        if (this.state.searchValue.length > 0) {
            notes = this.state.notes.filter(note => {
              return  note.title.toLowerCase().includes(this.state.searchValue)
            }).map(note => {
                return (
                    <NoteCard
                        key={note._id}
                        title={note.title}
                        body={note.body}
                        deleteNote={() => this.deleteNoteHandler(note._id)}
                        editNote={(e) => this.editNoteHandler(e, note._id)} />
                )
            });
        }
        else{
            notes = this.state.notes.map((note) => {
                return (
                    <NoteCard
                        key={note._id}
                        title={note.title}
                        body={note.body}
                        deleteNote={() => this.deleteNoteHandler(note._id)}
                        editNote={(e) => this.editNoteHandler(e, note._id)} />
                )
            })
        }
        
        const overlayStyle = {
           overlay:{
            background: '#2F363F'
           }
        }

        return (
            <>
                <Header 
                onSearchHandler={this.searchHandler}
                searchValue = {this.state.searchValue}
                clearSearchHandler={this.onClearSearchValue}/>

                <main className="main-container">
                    <div className="Input-container">
                        <InputFields
                            onInputChange={this.onInputChange}
                            onAddHandler={this.onAddHandler}
                            titleValue={this.state.Obj.title}
                            textValue={this.state.Obj.body}
                            showInputs={this.state.edit} />
                    </div>
                    <Modal
                        isOpen={this.state.showModal}
                        shouldCloseOnOverlayClick={false}
                        style={overlayStyle}>
                        <h2 className="modal-form-heading">Edit your note</h2>
                        <form className="modal-form">
                            <input
                                className="modal-input"
                                type="text"
                                name="title" value={this.state.editNoteObj.title}
                                onChange={this.modalInputChange} />
                            <textarea
                                rows=""
                                cols=""
                                className="modal-input"
                                name="body"
                                value={this.state.editNoteObj.body}
                                onChange={this.modalInputChange} />
                        </form>
                        <br />
                        <button className="modal-close-button" onClick={this.closeModalHandler}>close</button>
                        <button className="modal-update-button" onClick={this.onNoteUpdateHandler}>update</button>
                    </Modal>
                    <div className="notes-container">
                       {this.state.notes.length > 0 ? notes : <Message />}
                    </div>
                </main>
            </>
        )
    }
}


export default MainPage;
