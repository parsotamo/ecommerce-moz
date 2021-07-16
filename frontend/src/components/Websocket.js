import React from "react";


class WebsocketService extends React.Component{
    // let currentUser = '{{ request.user.username }}';
    // let userContacts = document.querySelector('.user-contacts');
    // let userClient;
    // var agentLink = document.querySelector('.status-link');

    callbacks = {};
    static instance = null;

    static getInstance(){
        if(!WebsocketService.instance){
            WebsocketService.instance = new WebsocketService();
        }
        return WebsocketService.instance;
    }

    constructor(props){
        super(props);
        this.socketRef = null;
    }

    connect(){
        console.log("I am connected...");
        const path = "ws://127.0.0.1:8000/ws/";
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = (e)=>{
            console.log("WebSocket connection opened");
            // updateUserList();
		    e.preventDefault();
        }
        this.sockectNewMessage(JSON.stringify({
            command: "fetch_messages"
        }))
        this.socketRef.onmessage = (e)=>{
            console.log("messages")
            this.sockectNewMessage(e.data);
        }
        this.socketRef.onerror = (e)=>{
            console.log(e.message);
        }
        this.socketRef.onclose = ()=>{
            console.log('Connection closed and reconnected');
            this.connect();
        }
    }

     sockectNewMessage = (data)=>{
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if (Object.keys(command).length === 0){
            return;
        }
        if (command === "messages"){
            this.callbacks[command](parsedData.messages);
        }
        if (command === "new_message"){
            this.callbacks[command](parsedData.message);
        }
    }

    fetchMessages = (username)=>{
        this.sendMessage({ command: "fetch_messages", username })
        }

    newChatMessage = (message)=>{
        this.sendMessage({ command: "new_message", from: message.from, message: message.content })
    }

    addCallBacks = (messagesCallBack, newMessageCallBack)=>{
        this.callbacks["messages"] = messagesCallBack;
        this.callbacks["new_message"] = newMessageCallBack; 
    }

    sendMessage = (data)=>{
        try{
            this.socketRef.send(JSON.stringify({ ...data }))
        }catch(error){
            console.log(error);
        }
    }

    state (){
        return this.socketRef.readyState;
    }

    waitForScoketConnection = (callback)=>{
        const socket = this.socketRef;
        const recursion = this.waitForScoketConnection;
        setTimeout(()=>{
            if(socket.readyState >= 1){
                console.log("Connection is secure")
                if(callback !== null){
                    callback()
                }
                return;
            }else{
                console.log("waiting for connection...");
                recursion(callback);
            }
        }, 100)
    }

        // const inputDOM = document.querySelector('#chat-message-input');
        // const chatMessageInput = useRef("");
        // console.log(chatMessageInput.current);
        // const submitDOM = document.getElementById('chat-message-submit');
        // chatMessageInput.focus();
        // inputDOM.addEventListener('keyup', (e)=>{
        //     if(e.keyCode === 13 || e.which === 13){
        //         submitDOM.click();
        //     }
        //   });
        
        // submitDOM.addEventListener('click', (e)=>{
        //     chatSocket.send(JSON.stringify({
        //         'message': inputDOM.value,
        //         'command': 'new_message',
        //         'from': currentUser,
        //         'userClient': userClient
        // }));
        //     inputDOM.value = '';
        // });
    
        // $(function(){
        //     $('.alert').fadeOut(3000);
        // });
}

const WebSocketInstance = WebsocketService.getInstance();

export default WebSocketInstance;