var session_token=localStorage.getItem("session_token")
app.factory("damfactory",function($q,$http){
 var object={
     
     getDamList:function(page){
         page=page||0;
         var pr=$q.defer();
         $http({
            url:origin+"user_home/dams?page"+page+"&session_token="+session_token,
        	method:"post"
//        	params:{method:"getuserlist"}
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     
     addDam:function(course){
    	 var pr=$q.defer();
         $http({
        	 method:"post",
        	 url:origin+"IMS-WEB__backend/course",
        	 params:{method:'add',
        		     dto_obj:course
        	 }              
         }
         ).then(function(data){
         
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     readDam:function(course){
    	 var pr=$q.defer();
    	 $http({
        	 method:"post",
        	 url:origin+"IMS-WEB__backend/course",
        	 params:{method:'read',
        		     dto_obj:course
        	         } 
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     updateDam:function(course){
    	 var pr=$q.defer();
         console.log(course);
    	 $http({
        	 method:"post",
        	 url:origin+"IMS-WEB__backend/course",
        	 params:{method:'update',
        		     dto_obj:course
        	         } 
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     deleteDam:function(course){
    	 var pr=$q.defer();
    	 $http({
        	 method:"post",
        	 url:origin+"IMS-WEB__backend/course",
        	 params:{method:'delete',
        		     dto_obj:course
        	         } 
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