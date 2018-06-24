app.controller("movies",function($scope,movieFactory){
    
    $scope.loadMovies=function(){
        var promise=movieFactory.loadMovies();
        promise.then(function(data){
            console.log(data.data.data);
            $scope.movies=mapIntoLanguage(data.data.data);
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
              hindi.push(obj);
            else 
                english.push(obj);
        })
    
        return {english:english,hindi:hindi};
    }

});



var session_token=localStorage.getItem("session_token");

app.factory("movieFactory",function($q,$http){
 var object={
     
     loadMovies:function(page){
         var pr=$q.defer();
         $http({
            url:origin+"/api/moviesList",
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

