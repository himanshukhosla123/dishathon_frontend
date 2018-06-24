app.controller("video",function($scope,$routeParams,videoFactory){
    
    $scope.getVideoDetails=function(){
//        alert($routeParams.videoId)
        var promise=videoFactory.getVideoDetails($routeParams.videoId);
        promise.then(function(data){
            console.log(data.data.data);
            $scope.video=data.data.data[0];
            $scope.getBotChats($routeParams.videoId);
        },function(er){
            $scope.error=er;
        });
    }
    
    $scope.getDate=function(date){
        return new Date(date).toLocaleDateString();
    }
    
var chatBox=$(".chat-messages"),userInput=$("#user_message"),counter=-1;
    $scope.getBotChats=function(){
        var promise=videoFactory.getBotChats($routeParams.videoId);
        promise.then(function(data){
            console.log(data.data.data);
            $scope.productObj=data.data.data[0];
//            $(".chat_bot").toggleClass("open"); 
        },function(er){
            $scope.error=er;
        });
    }
    $scope.buyProduct=function(id){
        var a=$scope.productObj.items[id];
        chatBox.append(userMessageTemp("Thank you for buying "+a.name));
    }
    
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


});

var session_token=localStorage.getItem("session_token");

app.factory("videoFactory",function($q,$http){
 var object={
     
     getVideoDetails:function(id){
         var pr=$q.defer();
         $http({
            url:origin+"/api/videoDetails/"+id,
        	method:"GET"
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     getBotChats:function(id){
         var pr=$q.defer();
         $http({
            url:origin+"/api/videoProducts/"+id,
        	method:"GET"
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     }
 };
     
    console.log("server call");
    return object;
});

