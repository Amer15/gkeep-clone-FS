import React, { Component } from 'react';
import './InputFields.css';

class InputFields extends Component {
    constructor(){
        super();

        this.state={
            showAllInputs: false
        }
    }
   
    onExpandInputHandler = (e) => {  
        e.preventDefault();
        // console.log(e.target);
         let showInfo = this.state.showAllInputs;
         if(showInfo === false){
              this.setState({
                  showAllInputs: true
              });
          }
    }

    onCloseInputHandler = (e) => {
        e.preventDefault();
        let hideInfo = this.state.showAllInputs;
        if(hideInfo === true){
            this.setState({
                showAllInputs: false
            });
        }
    }

    onAddNoteHandler = e => {
        this.props.onAddHandler(e);
    }


    render() {
        let expandInput;
        if (this.state.showAllInputs === true) {
            expandInput = <>
                <textarea rows="" cols=""
                 placeholder="Take a note..." 
                 name="body"
                 value={this.props.textValue}
                 onChange={(e) => this.props.onInputChange(e)}/>
                <button className="close-btn"
                    onClick={(e) => this.onCloseInputHandler(e)}>close</button>
                <button 
                className="btn" title="Add note"
                onClick={(e) => this.onAddNoteHandler(e)}>
                    <ion-icon name="add-outline"></ion-icon>
                </button>
            </>
        }
        else {
            expandInput = null;
        }

        let inputPlaceHolderText = this.state.showAllInputs ? "Title" : "Take a note..."
        
        return (
            <div className="input-container">
                <form onClick={(e) => this.onExpandInputHandler(e)}>
                    <input type="text"
                    name="title"
                    value={this.props.titleValue} 
                    autoComplete="off"
                    placeholder={inputPlaceHolderText} 
                    onChange={(e) => this.props.onInputChange(e)}
                    />
                    {expandInput}
                </form>
            </div>
        )
    }
}

export default InputFields;