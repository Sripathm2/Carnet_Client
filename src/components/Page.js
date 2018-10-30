import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';


class page extends Component {
    state = {
        editorState: data(),
    };

    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });
        //console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    };

    render() {
        const { editorState } = this.state;
        return (
            <div className="App">
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
function data(){
    

    const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    return EditorState.createWithContent(contentState);
    //return EditorState.createEmpty();
}

export default page;