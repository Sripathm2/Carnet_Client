import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {convertFromRaw, convertToRaw, EditorState} from 'draft-js';    
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import "../../node_modules/draft-js-image-plugin/lib/plugin.css"
import axios from "axios";


let token = '';
let notebookID = '';
let pageNum = '';
let data = [];

class page extends Component {
    uploadCallback(file) {

        return new Promise(
          (resolve, reject) => {
            var reader=new FileReader();
    
            reader.onloadend = function() {
              Meteor.call('fileStorage.uploadFile',reader.result,file.name,file.type,(err,response)=>{
                  console.log(response)
                 if(err){
                   reject(err)
                 }
    
                 resolve({ data: { link: response.data.url } });
              })
            }
    
            reader.readAsDataURL(file);
          }
        );
      }

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
        const config={
      image: { uploadCallback: this.uploadCallback }
    }

    return (
      <div className="container-fluid">
        <Editor toolbar={ config } />
      </div>
    )
        return (
            <div className="App">
                <button onClick={()=>pageChange(1, draftToHtml(convertToRaw(editorState.getCurrentContent())))}>NextPage</button>
                <button onClick={()=>pageChange(-1, draftToHtml(convertToRaw(editorState.getCurrentContent())))}>PrevPage</button>
                <button onClick={() => setData(draftToHtml(convertToRaw(editorState.getCurrentContent())))}>Done
                </button>
                <div>
                    <label for="file">PDF to Image</label>
                    <input type="file" name="foo" placeholder = "PdfToImage" accept="application/pdf"/>

                </div>
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

            axios({
                method:'post',
                url:'https://carnet-api.herokuapp.com/notebook/updateNotebook?token='+token,
                data:{
                    notebookId:notebookID,
                    data:finalData,
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
                    document.cookie = "token= " + token + "; path=/;";
                    document.cookie = "notebookID= " + notebookID + "; path=/;";
                    document.cookie = "pageNum= " + (num+pageNum).toString() + "; path=/;";
                    document.cookie = "data= " + data[num+pageNum-1] + "; path=/;";
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
        console.log(user[2].substring(9));
        pageNum = parseInt(user[2].substring(9));
        data = user[3].substring(6);
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

            axios({
                method:'post',
                url:'https://carnet-api.herokuapp.com/notebook/updateNotebook?token='+token,
                data:{
                    notebookId:notebookID,
                    data:finalData,
                }
            })
                .then(function (response) {
                    document.cookie = "notebookID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "pageNum=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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