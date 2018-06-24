app.controller("shows",function($scope,showFactory){
    
    $scope.loadShows=function(){
        var promise=showFactory.loadShows();
        promise.then(function(data){
            console.log(data.data.data);
            $scope.shows=mapIntoLanguage(data.data.data);
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.getDate=function(date){
        return new Date(date).toLocaleDateString();
    }
    
    function mapIntoLanguage(list){
        var english=[],hindi=[];
        
        list.forEach(function(obj){
            if(obj.language=="hindi"||obj.language=="Hindi")
              english.push(obj);
            else 
                hindi.push(obj);
        })
        return {english:english,hindi:hindi};
    }
});


var session_token=localStorage.getItem("session_token");

app.factory("showFactory",function($q,$http){
 var object={
     
     loadShows:function(page){
        var pr=$q.defer();
         $http({
            url:origin+"/api/showsList",
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

