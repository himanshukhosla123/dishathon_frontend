app.controller("sports",function($scope,sportFactory){
    
    $scope.loadSports=function(){
        var promise=sportFactory.loadShows();
        promise.then(function(data){
            console.log(data.data.data);
            $scope.sports=data.data.data;
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.getDate=function(date){
        return new Date(date).toLocaleDateString();
    }

});


var session_token=localStorage.getItem("session_token");

app.factory("sportFactory",function($q,$http){
 var object={
     
     loadShows:function(page){
        var pr=$q.defer();
         $http({
            url:origin+"/api/sportsList",
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

