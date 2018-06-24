app.controller("home",function($scope,homeFactory){
    
    $scope.getRecentList=function(){
        var promise=homeFactory.getRecentShowsList();
        promise.then(function(data){
            console.log(data.data.data);
            $scope.recentList=data.data.data;
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.getOtherCatList=function(){
        var promise=homeFactory.getOtherCatShowsList();
        promise.then(function(data){
            console.log(data.data.data);
            $scope.otherCatShowsObj=data.data.data;
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.getDate=function(date){
        return new Date(date).toLocaleDateString();
    }

});



var session_token=localStorage.getItem("session_token");

app.factory("homeFactory",function($q,$http){
 var object={
     
     getRecentShowsList:function(page){
         page=page||0;
         var pr=$q.defer();
         $http({
            url:origin+"/api/recentList",
        	method:"GET"
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     getOtherCatShowsList:function(page){
         page=page||0;
         var pr=$q.defer();
         $http({
            url:origin+"/api/otherCatList",
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

