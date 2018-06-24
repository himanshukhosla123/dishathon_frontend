app.controller("upload",function($scope,uploadFactory){
 $scope.url="http://localhost:3005/a.mp4";
    
    $scope.detectNudity=function(name){
        $scope.url="https://s3-us-west-2.amazonaws.com/dishathon-demo/"+name;
        
        var promise=uploadFactory.detectNudity(name);
//            alert(name);
          promise.then(function(data){
            console.log(data.data.data);
            var obj=analyseObjects(data.data.data);
            obj.tags=["dishathon"];
            obj.generes=["action","AA"];
            obj.language="hindi";
            obj.racicsm=[{time:1000,case:"demo"}];
            $scope.detected=obj;
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.getDate=function(date){
        return new Date(date).toLocaleDateString();
    };
    
    $scope.showUploadDialog=true;


    $scope.detected={
        nudity:[{time:0,case:"cleavage"}],
        racicsm:[{time:0,case:"demo"}],
        tags:["dishathon"],
        generes:["action","AA"],
        language:"hindi",
        offensiveContent:[{time:0,case:"not found"}]
    };
    $scope.submitTags=function(){
        var val=$scope.tags;
        alert(val);
        $scope.tags="";
        return false;
    }
    
    $scope.toggleUploadDialog=function(){
        
    $scope.showUploadDialog=!$scope.showUploadDialog;

    }
    
    $scope.removeFromTags=function(){
        var index=$scope.detected.tags.indexOf();
        $scope.detected.tags.splice(index,1);
    }
    $scope.removeFromGen=function(val){
        var index=$scope.detected.tags.generes(val);
        $scope.detected.generes.splice(index,1);
    }
    $scope.updateVideo=function(){
        var files=$("#file-input")[0].files;
        console.log(files);  
        $scope.videoName=files[0].name;
    }
    $scope.videoName="";
    
    $scope.submitGeneres=function(val){
        var val2=$scope.gen;
        alert(val2);
        $scope.gen="";
        return false;
    }

    $scope.uploadVideo=function(){
        var files=$("#file-input")[0].files;
        console.log(files);  
        $scope.videoName=files[0].name;
        $scope.upload(files[0]).then(function(a)
        {
            console.log(a);  
            $scope.showUploadDialog=false;
            $(".upload-right").addClass("none");
            $(".upload-box").removeClass("none");
        }).catch(function(a){
            $scope.detectNudity(JSON.parse(a).name);
            console.log(a);
            
        });
        return false;
    }
    
    $scope.upload=function(file){
		return new Promise(function(resolve, reject) {
			let handleProgress = function(percentComplete) {
				// console.log('Handling progress');
			    console.log(percentComplete.toString(), "% uploaded.");
			}
			
			let handleSuccess = function() {
				// console.log('Handling success');
				resolve(file + ' was successfully Uploaded');
			};
			
			let handleError = function(message) {
				console.log('Handling error');
				reject('Error while uploading file: ', message);
			}
			
			let uploadProgress = function(evt) {
			    if (evt.lengthComputable) {
			        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                    if(percentComplete==100)
                    { 
            $(".upload-right").addClass("none");
            $(".upload-box").removeClass("none");
                        console.log("disable")
                    }
                
			        handleProgress(percentComplete);
			    }
			}
			
			let uploadComplete = function(evt) {
                 console.log(evt);
			    if (evt.target.responseText === "") {
			        handleSuccess();
			    } else {
			        reject(evt.target.responseText);
			    }
			}
			
			let uploadFailed = function(evt) {
				console.log('Upload Failed');
			    reject("There was an error attempting to upload the file." + evt);
			}
			
			let uploadCanceled = function(evt) {
				console.log('Upload Canceled');
			    reject("The upload has been canceled by the user or the browser dropped the connection.");
			}
	
		    let fd = new FormData();
	        fd.append("avatar", file);
		
			// for (var pair of fd.entries())
			//     console.log(pair[0]+ ': ' + pair[1]); 
		    
		    var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress", uploadProgress, false);
			xhr.addEventListener("load", uploadComplete, false);
			xhr.addEventListener("error", uploadFailed, false);
			xhr.addEventListener("abort", uploadCanceled, false);
		    xhr.open('POST',origin+"/api/faceDetect", true); //MUST BE LAST LINE BEFORE YOU SEND
		    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
		    xhr.send(fd);
             swal({
              type: 'info',
              title: 'Uploading Video',
              text:"Please wait while the video is being uploaded",
              timer: 1500
            })
		})
    };
    
    function analyseObjects(items){
        let weapons=[],nudity=[];
            for(var i in items.frames){
            var o=items.frames[i];
            if(o.weapon>0.800)
                weapons.push({time:o.info.position,case:"weapon"});

            if(o.alcohol>0.800)
                weapons.push({time:o.info.position,case:"alcohol"});

            if(o.drugs>0.800)
                weapons.push({time:o.info.position,case:"drugs"});

            if(o.nudity.raw>0.800)
                nudity.push({time:o.info.position,case:"raw nude"});

            if(o.nudity.partial>0.800)
                nudity.push({time:o.info.position,case:"partial nude"});
            }
        return {
            offensiveContent:weapons,
            nudity:nudity
        };
    }
    
});



var session_token=localStorage.getItem("session_token");
app.factory("uploadFactory",function($q,$http){
 var object={
     
     loadSettings:function(){
         var pr=$q.defer();
         $http({
            url:origin+"/api/",
        	method:"POST"
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     detectNudity:function(name){
         var pr=$q.defer();
         $http({
            url:origin+"/api/demoimagedetect/"+name,
        	method:"GET"
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
 };
     
    console.log("server call");
    return object;
});

