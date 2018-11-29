import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import axios from "axios";
import '../css/Page.css';
import ReactFileReader from 'react-file-reader';
import { Base64 } from 'js-base64';

let token = '';
let notebookID = '';
let pageNum = '';
let data = [];
let pdf = '';
let pdftext = '';

class page extends Component {
    state = {
        editorState: loadData(),
    };

    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });
    };

    deleteFiles = () => {
        document.getElementById("datapdf").src='';
    }

    writeFiles = () => {
        pdf=document.getElementById("datapdf").src;
        pdf = pdf.substring(pdf.indexOf(';')+8);
        let decodedData = Base64.atob(pdf);
        decodedData = decodedData.replace(pdftext,' ');
        pdftext = document.getElementById("pdftextdata").value;
        let finaldecodeData = decodedData.substring(0,decodedData.indexOf(') Tj')) + pdftext + decodedData.substring(decodedData.indexOf(' ) Tj'));
        let finalencodedData = 'data:application/pdf;base64,' + Base64.btoa(finaldecodeData);
        pdf = finalencodedData;
        document.getElementById("datapdf").src=pdf;
    }

    handleFiles = files => {
        document.getElementById("datapdf").src=files.base64;
    }

    componentDidMount() {
        if(pdf.length>14){
            document.getElementById("datapdf").src=pdf;
        }
        if(pdftext.length>1){
            document.getElementById("pdftextdata").value=pdftext;
        }
        if(pdf.length>14 && pdftext.length>1){
            pdf = pdf.substring(pdf.indexOf(';')+8);
            let decodedData = Base64.atob(pdf);
            let finaldecodeData = decodedData.substring(0,decodedData.indexOf(') Tj')) + pdftext + decodedData.substring(decodedData.indexOf(' ) Tj'));
            let finalencodedData = 'data:application/pdf;base64,' + Base64.btoa(finaldecodeData);
            pdf = finalencodedData;
            document.getElementById("datapdf").src=pdf;
        }
    }

    render() {
        const {editorState} = this.state;
        return (
            <div className="App">
                <div className="left-side">
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
                <div className="right-side">
                    <ReactFileReader base64={true} handleFiles={this.handleFiles}>
                        <button className='btn'>Upload</button>
                    </ReactFileReader>
                    <iframe id="datapdf" height="400%" width="100%"/>
                    <textarea id="pdftextdata" rows="4" cols="50">Text to write on pdf</textarea>
                    <button onClick={this.deleteFiles}> Delete pdf </button>
                    <button onClick={this.writeFiles}> Write on pdf </button>
                </div>
            </div>
        );
    }
}

function pageChange(num, data1){
    data1 = data1.replace("nbps;"," ");

    if(num+pageNum-1 < 0){
        alert('first page');
        return;
    }

    axios({
        method:'get',
        url:'https://carnet-api.herokuapp.com/notebook/Notebook?token='+token + '&notebookId=' + notebookID,
    })
        .then(function (response) {
            let data = response.data.data.split("||****||");
            if(data[num+pageNum-1] === 'undefined'){
                data.push(' ');
            }
            data[pageNum-1] = data1;

            let finalData = '';

            for(let i=0;i<data.length;i++){
                finalData += data[i] + '||****||';
            }

            if(document.getElementById("datapdf").src !== undefined){
                pdf = document.getElementById("datapdf").src;
                pdf = pdf.substring(pdf.indexOf(';')+8);
                let decodedData = Base64.atob(pdf);
                decodedData = decodedData.replace(pdftext,' ');
                pdftext = document.getElementById("pdftextdata").value;
                let finalencodedData = 'data:application/pdf;base64,' + Base64.btoa(decodedData);
                pdf = finalencodedData;
                pdf = pdf.substring(pdf.indexOf(';')+1);
            }
            else{
                pdf = ' ';
            }

            axios({
                method:'post',
                url:'https://carnet-api.herokuapp.com/notebook/updateNotebook?token='+token,
                data:{
                    notebookId:notebookID,
                    data:finalData,
                    pdf:pdf,
                    pdftext:pdftext,
                }
            })
                .then(function (response) {
                    if(data[num+pageNum-1] === 'undefined'){
                        data.push('<p>new page</p>');
                    }
                    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "notebookID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "pageNum=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "pdf=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "pdftext=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "token= " + token + "; path=/;";
                    document.cookie = "notebookID= " + notebookID + "; path=/;";
                    document.cookie = "pageNum= " + (num+pageNum).toString() + "; path=/;";
                    document.cookie = "data= " + data[num+pageNum-1] + "; path=/;";
                    document.cookie = "pdf= " + pdf + "; path=/;";
                    document.cookie = "pdftext= " + pdftext + "; path=/;";
                    window.location.replace("/page");
                })
                .catch(function (error) {
                    console.log(error + '1');
                });
        })
        .catch(function (error) {
            console.log(error + '1');
        });

}

function loadData(){

    if(document.cookie.indexOf("notebookID") === -1){
        window.location.replace("/dashboard");
    }
    else {
        let user;
        user = document.cookie.split(';');
        token = user[0].substring(6);
        notebookID = user[1].substring(12);
        pageNum = parseInt(user[2].substring(9));
        data = user[3].substring(6);
        pdf = 'data:application/pdf;' + user[4].substring(5);
        pdftext = user[5].substring(9);
    }

    let contentBlock = htmlToDraft(data);
    let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    return EditorState.createWithContent(contentState);
}

function setData(data1){
    data1 = data1.replace("nbps;"," ");

    axios({
        method:'get',
        url:'https://carnet-api.herokuapp.com/notebook/Notebook?token='+token + '&notebookId=' + notebookID,
    })
        .then(function (response) {
            let data = response.data.data.split("||****||");
            if(data[pageNum-1] === 'undefined'){
                data.push(' ');
            }
            data[pageNum-1] = data1;

            let finalData = '';

            for(let i=0;i<data.length;i++){
                finalData += data[i] + '||****||';
            }

            if(document.getElementById("datapdf").src !== undefined){
                pdf = document.getElementById("datapdf").src;
                pdf = pdf.substring(pdf.indexOf(';')+8);
                let decodedData = Base64.atob(pdf);
                decodedData = decodedData.replace(pdftext,' ');
                pdftext = document.getElementById("pdftextdata").value;
                let finalencodedData = 'data:application/pdf;base64,' + Base64.btoa(decodedData);
                pdf = finalencodedData;
            }
            else{
                pdf = ' ';
            }
            axios({
                method:'post',
                url:'https://carnet-api.herokuapp.com/notebook/updateNotebook?token='+token,
                data:{
                    notebookId:notebookID,
                    data:finalData,
                    pdf:pdf,
                    pdftext:pdftext,
                }
            })
                .then(function (response) {
                    document.cookie = "notebookID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "pageNum=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "pdf=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "pdftext=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    window.location.replace("/dashboard");
                })
                .catch(function (error) {
                    console.log(error + '1');
                });
        })
        .catch(function (error) {
            console.log(error + '1');
        });
}

export default page;