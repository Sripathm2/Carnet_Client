import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import axios from "axios";

let token = '';
let notebookID = '';
let pageNum = '';
let data = [];

class page extends Component {
    state = {
        editorState: loadData(),
    };

    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const {editorState} = this.state;
        return (
            <div className="App">
                <button onClick={()=>pageChange(1, draftToHtml(convertToRaw(editorState.getCurrentContent())))}>Next Page</button>
                <button onClick={()=>pageChange(-1, draftToHtml(convertToRaw(editorState.getCurrentContent())))}>Prev Page</button>
                <button onClick={() => setData(draftToHtml(convertToRaw(editorState.getCurrentContent())))}>Done
                </button>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}

function pageChange(num, data){
    setData(data);
    let newData = '';
    axios({
        method:'get',
        url:'https://carnet-api.herokuapp.com/notebook/Notebook?token='+token + '&notebookId=' + notebookID,
    })
        .then(function (response) {
            newData = response.data.data;
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "token= " + token + "; path=/;";
            document.cookie = "notebookID= " + notebookID + "; path=/;";
            document.cookie = "pageNum= " + (num+pageNum).toString() + "; path=/;";
            document.cookie = "data= " + newData + "; path=/;";
            window.location.replace("/page");
        })
        .catch(function (error) {
            console.log(error + '1');
        });
}

function loadData(){

    if(document.cookie.indexOf("notebookID") === -1){
        let user;
        user = document.cookie.split(';');
        token = user[0].substring(6);
        notebookID = 'ba8ee050-fc73-4c2a-9ca8-eec203c4c5d0';
        pageNum = 1;
        data = ['<p>Hey this <strong>editor</strong> rocks 😀kadchbsakjchbsduyg</p>'];
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "token= " + token + "; path=/;";
        document.cookie = "notebookID= " + notebookID + "; path=/;";
        document.cookie = "pageNum= " + pageNum.toString() + "; path=/;";
        document.cookie = "data= " + data + "; path=/;";
           // window.location.replace("/dashboard");
    }
    else {
        let user;
        user = document.cookie.split(';');
        token = user[0].substring(6);
        notebookID = user[1].substring(12);
        console.log(user[2].substring(9));
        pageNum = parseInt(user[2].substring(9));
        data = user[3].substring(5).split('||****||');
        if (!data[pageNum - 1]) {
            data[pageNum - 1] = '<p>Hey new page</p>';
        }
    }

    let contentBlock = htmlToDraft(data[pageNum - 1]);
    let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    return EditorState.createWithContent(contentState);
}

function setData(data1){
    console.log(data);

    data[pageNum-1] = data1;

    let finalData = '';

    for(let i=0;i<data.length;i++){
        finalData += data[i] + '||****||';
    }

    axios({
        method:'post',
        url:'https://carnet-api.herokuapp.com/notebook/updateNotebook?token='+token,
        data:{
            notebookId:notebookID,
            data:finalData,
        }
    })
        .then(function (response) {

        })
        .catch(function (error) {
            console.log(error + '1');
        });
}

export default page;