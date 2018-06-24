
var chatBox=$(".chat-messages"),userInput=$("#user_message"),counter=-1;

var messageList=[];
    
$(document).ready(function(){
    $(".chat_bot").show();
    $(".toggle_bot_button").click(function(){
        $(".chat_bot").toggleClass("open");  
    });

//$(".chat_bot .fa").click();
    
var messages=localStorage.getItem('messages')?[]:localStorage.getItem('messages');
//    messageList
    chatGenerator([]);

    chatBox.append(botMessageTemp("Above are the items available for purchase. <br/> What would you like to Buy?"));
//    chatBox.append(getLoginButton(loggedEmail));
});


function userMessageTemp(message){  
    addToMessageList('user',message);
return '<div class="chat-msg chat-right"><div class="message_box"><span class="message">'+message+'</span></div></div>'; 
}   

function botMessageTemp(message){ 
    addToMessageList('bot',message);
return '<div class="chat-msg"><div class="message_box"><span class="message">'+message+'</span></div></div>'; 
}   

function chatGenerator(arr){
    for(var i=0;i<arr.length;i++){
        if(arr[i].source=='user')
            chatBox.append('<div class="chat-msg chat-right"><div class="message_box"><span class="message">'+arr[i].message+'</span></div></div>');
        else if(arr[i].source=='bot')
            chatBox.append('<div class="chat-msg"><div class="message_box"><span class="message">'+arr[i].message+'</span></div></div>');
    }
}

 
function addToMessageList(role,message){
    var obj={source:role,
             message:message};
    messageList.push(obj);
//    localStorage.setItem('messages',JSON.stringify(messageList));
}

