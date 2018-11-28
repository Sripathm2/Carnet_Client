import React from 'react';
import '../css/DashboardStyle.css';
import '../css/dashboard-grid.css';
import axios from "axios";
import '../css/notebook-container-grid.css';
import '../css/notebookstyles.css';

let token ='';

const Dashboard = () =>(
    load(),
    <div className="App">
        <div className="containerhead clearfix">
            <div className="containerlogo"></div>
            <input id="search_field" className="_input" type="text"  defaultValue="U: N:"/>
            <button onClick={searchnotebook} className="_button">Search</button>
        </div>
        <div className="containerside clearfix">
            <div className="containeruserimage"></div>
            <label className="textname" id = "name">Name of the User</label>
            <label className="textsubs" id = "subscriber">Subscribers: NaN</label>
            <label className="textemail" id = "email">Email Address of the User</label>
            <input id="create_field" className="input-create" type="text"  defaultValue="P: NP:"/>
            <button onClick={createnotebook} className="button-create">create</button>
            <div id ="notificationsContainer" className="containerNotify">
                <label className = "textname" id ="Notification">Notifications</label>

            </div>
        </div>
        <div className="containermain clearfix">
            <button className="_button _button-2">Notebook</button>
            <button className="_button _button-3">Notifications</button>
            <div id="notebookContainer" className="containernotebook"></div>
        </div>
    </div>
);

function createnotebook(){
    let notebookName = document.getElementById("create_field").value.replace(' ','');
    let publicName = notebookName.substring(2,notebookName.indexOf('NP:'));
    let privatename = notebookName.substring(notebookName.indexOf('NP:')+3);
    let finalName = '';
    if(publicName.length>1){
        finalName=publicName;
    } else {
        finalName = "(private)" + privatename;
    }
    axios({
        method:'post',
        url:'https://carnet-api.herokuapp.com/notebook/createNotebook?token=' + token + '&name='+finalName,
    })
        .then(function (response) {
            console.log(response.data);
            alert('done');
            window.location.replace("/dashboard");

        })
        .catch(function (error) {
            console.log(error + '1');
        });

}

function load(){
    if(document.cookie.indexOf("token") === -1){
        window.location.replace("/login");
    }
    let user;
    user = document.cookie.split(';');
    token = user[0].substring(6);

    let url='https://carnet-api.herokuapp.com/user/getData?token='+token;

    axios({
        method:'get',
        url:url,
    })
        .then(function (response) {
            console.log(response.data);
            document.getElementById("name").innerHTML = response.data.name;
            document.getElementById("subscriber").innerHTML = '0';
            document.getElementById("email").innerHTML = response.data.email;
            setNotification(response.data.notification);
            console.log(response.data.notification);
            let url='https://carnet-api.herokuapp.com/notebook/search_userName?token='+token + "&userName="+response.data.username;
            axios({
                method:'get',
                url:url,
            })
                .then(function (response) {
                    setNotebooks(response.data.data);
                })
                .catch(function (error) {
                    alert(error);
                });
        })
        .catch(function (error) {
            alert(error);
        });
}

function searchnotebook(){
    let find = document.getElementById("search_field").value.replace(' ','');
    let username = find.substring(2,find.indexOf('N:'));
    let name = find.substring(find.indexOf('N:')+2);
    if(username.length > 1){
        let url='https://carnet-api.herokuapp.com/notebook/search_userName?token='+token + "&userName="+username;
        axios({
            method:'get',
            url:url,
        })
            .then(function (response) {
                setNotebooks(response.data.data);
            })
            .catch(function (error) {
                alert("Username does not exist");
            });
    } else {
        let url='https://carnet-api.herokuapp.com/notebook/search_name?token='+token + "&name="+name;
        axios({
            method:'get',
            url:url,
        })
            .then(function (response) {
                setNotebooks(response.data.data);
            })
            .catch(function (error) {
                alert("Notebook does not exist");
            });
    }
}

function setNotification(notifications){
    let notify = notifications.split("--:--")

    for(let j=0; j<notify.length; j++){
        let div = document.createElement('div');
        div.id = 'div'+j;
        div.className = 'containerNotify clearfix';

        let divInnerHead = document.createElement('div');
        divInnerHead.id = 'divInnerHead'+j;
        divInnerHead.className = 'containerNotify clearfix'

        let divInnerHeadName = document.createElement('p');
        divInnerHeadName.id = 'divInnerHeadName'+j;
        divInnerHeadName.className = 'textnamenotebook';
        divInnerHeadName.innerHTML = notify[j];

        divInnerHead.appendChild(divInnerHeadName);
        div.appendChild(divInnerHead);

        document.getElementById('notificationsContainer').appendChild(div);
    }
}

function setNotebooks(notebooks){
    document.getElementById('notebookContainer').innerHTML = '';
    for(let j=0;j<notebooks.length;j++){

        let div = document.createElement('div');
        div.id = 'div'+j;
        div.className = 'containermainnotebook clearfix';

        let divInnerHead = document.createElement('div');
        divInnerHead.id = 'divInnerHead'+j;
        divInnerHead.className = 'containernameownernotebook clearfix';

        let divInnerHeadName = document.createElement('p');
        divInnerHeadName.id = 'divInnerHeadName'+j;
        divInnerHeadName.className = 'textnamenotebook';
        divInnerHeadName.innerHTML = notebooks[j].name;
        divInnerHeadName.onclick = ()=>openNotebook(j);

        let divInnerHeadOwnName = document.createElement('p');
        divInnerHeadOwnName.id = 'divInnerHeadOwnName' + j;
        divInnerHeadOwnName.className = 'textownernotebook';
        divInnerHeadOwnName.innerHTML = notebooks[j].username + "--" + notebooks[j].uuid;

        divInnerHead.appendChild(divInnerHeadName);
        divInnerHead.appendChild(divInnerHeadOwnName);


        let divInnerBottom = document.createElement('div');
        divInnerBottom.id = 'divInnerBottom' + j;
        divInnerBottom.className = 'containerldcnotebook clearfix';

        let divInnerBottomlike = document.createElement('div');
        divInnerBottomlike.id = 'divInnerBottomlike' + j;
        divInnerBottomlike.className = 'containerlikelogonotebook';
        divInnerBottomlike.onclick = ()=>like(j, '1', '0', notebooks[j].comment);


        let divInnerBottomdislike = document.createElement('div');
        divInnerBottomdislike.id = 'divInnerBottomdislike' + j;
        divInnerBottomdislike.className = 'containerdislikelogonotebook';
        divInnerBottomdislike.onclick = ()=>like(j,'0', '1', '');

        let divInnerBottomLikenum = document.createElement('p');
        divInnerBottomLikenum.id = 'divInnerBottomLikenum' + j;
        divInnerBottomLikenum.className = 'textlikenumnotebook';
        divInnerBottomLikenum.innerHTML = notebooks[j].likes;

        let divInnerBottomDisLikenum = document.createElement('p');
        divInnerBottomDisLikenum.id = 'divInnerBottomDisLikenum' + j;
        divInnerBottomDisLikenum.className = 'textdislikenumnotebook';
        divInnerBottomDisLikenum.innerHTML  = notebooks[j].dislikes;

        let divInnerBottomsub = document.createElement('div');
        divInnerBottomsub.id = 'divInnerBottomsub' + j;
        divInnerBottomsub.className = 'containersubscribenotebook';
        divInnerBottomsub.onclick = ()=>sub(j);

        let divInnerBottomComment = document.createElement('div');
        divInnerBottomComment.id = 'divInnerBottomComment' + j;
        divInnerBottomComment.className = 'containercommentnotebook';
        divInnerBottomComment.onclick = ()=>commentCreate(j, '0', '0', notebooks[j].comment);

        let divInnerBottomCommentinput = document.createElement('input');
        divInnerBottomCommentinput.type = 'text';
        divInnerBottomCommentinput.id = 'divInnerBottomCommentinput'+j;

        let divInnerBottomCommentinputsubmit = document.createElement('button');
        divInnerBottomCommentinputsubmit.type = 'button';
        divInnerBottomCommentinputsubmit.innerHTML = 'comment submit';
        divInnerBottomCommentinputsubmit.id = 'divInnerBottomCommentinputsubmit'+j;
        divInnerBottomCommentinputsubmit.onclick = ()=>commentSubmit(j, 0, 0, '');


        divInnerBottom.appendChild(divInnerBottomlike);
        divInnerBottom.appendChild(divInnerBottomdislike);
        divInnerBottom.appendChild(divInnerBottomLikenum);
        divInnerBottom.appendChild(divInnerBottomDisLikenum);
        divInnerBottom.appendChild(divInnerBottomsub);
        divInnerBottom.appendChild(divInnerBottomComment);
        divInnerBottom.appendChild(divInnerBottomCommentinput);
        divInnerBottom.appendChild(divInnerBottomCommentinputsubmit);

        div.appendChild(divInnerHead);
        div.appendChild(divInnerBottom);

        document.getElementById('notebookContainer').appendChild(div);

    }
}

function openNotebook(input){
    let notebookIddiv = document.getElementById('divInnerHeadOwnName'+input).innerHTML;
    let notebookID = notebookIddiv.substring(notebookIddiv.indexOf("--") + 2);

    axios({
        method:'get',
        url:'https://carnet-api.herokuapp.com/notebook/Notebook?token='+token + '&notebookId=' + notebookID,
    })
        .then(function (response) {
            let data = response.data.data.split("||****||");

            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "notebookID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "pageNum=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "token= " + token + "; path=/;";
            document.cookie = "notebookID= " + notebookID + "; path=/;";
            document.cookie = "pageNum= " + (1).toString() + "; path=/;";
            document.cookie = "data= " + data[0] + "; path=/;";
            window.location.replace("/page");
        })
        .catch(function (error) {
            console.log(error + '1');
        });
}

function sub(input){
    let notebookIddiv = document.getElementById('divInnerHeadOwnName'+input).innerHTML;
    let notebookID = notebookIddiv.substring(notebookIddiv.indexOf("--") + 2);
    axios({
        method:'post',
        url:'https://carnet-api.herokuapp.com/notebook/subscribe?token='+token,
        data:{
            notebookId:notebookID,
        }
    })
        .then(function (response) {
            console.log(response.data);
            alert('done');
        })
        .catch(function (error) {
            console.log(error + '1');
        });
}

function like(input, like, dislike, comments){
    let notebookIddiv = document.getElementById('divInnerHeadOwnName'+input).innerHTML;
    let notebookID = notebookIddiv.substring(notebookIddiv.indexOf("--") + 2);
    if(comments.length < 1){
        comments = ' ';
    }
    axios({
        method:'post',
        url:'https://carnet-api.herokuapp.com/notebook/update?token='+token,
        data:{
            notebookId:notebookID,
            like:like,
            dislike:dislike,
            comment:comments,
        }
    })
        .then(function (response) {
            console.log(response.data);
            document.getElementById('divInnerBottomLikenum'+input).innerHTML = like;
            document.getElementById('divInnerBottomDisLikenum'+input).innerHTML = dislike;
        })
        .catch(function (error) {
            console.log(error + '1');
        });

}

function commentCreate(input, like, dislike, comments){
    let table = document.createElement("TABLE");
    comments = comments.split('--');
    for(let j=0; j<comments.length; j++){
        alert(comments[j]);
        comments[j] = comments[j].replace(' ','');
        if(comments[j].substring(comments[j].indexOf(':')+1).length < 3){
            continue;
        }
        alert('here');
        let row = document.createElement("tr");
        let cell = document.createElement("th");
        cell.innerHTML = comments[j];
        row.appendChild(cell);
        table.appendChild(row);
    }
    document.getElementById('div'+input).appendChild(table);

}

function commentSubmit(input, like, dislike, comments){
    let notebookIddiv = document.getElementById('divInnerHeadOwnName'+input).innerHTML;
    let notebookID = notebookIddiv.substring(notebookIddiv.indexOf("--") + 2);


    comments = document.getElementById('divInnerBottomCommentinput'+input).value;

    alert('heer');

    if(comments.length < 1){
        return;
    }


    axios({
        method:'post',
        url:'https://carnet-api.herokuapp.com/notebook/update?token='+token,
        data:{
            notebookId:notebookID,
            like:'0',
            dislike:'0',
            comment:comments,
        }
    })
        .then(function (response) {
            console.log(response.data);
            document.getElementById('divInnerBottomLikenum'+input).innerHTML = like;
            document.getElementById('divInnerBottomDisLikenum'+input).innerHTML = dislike;
        })
        .catch(function (error) {
            console.log(error + '1');
        });

}

export default Dashboard;