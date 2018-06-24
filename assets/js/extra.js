

function searchBox(){
    $("#search_music").toggle();
    
}

function enableChildMode(){
    $("#child-mode").toggleClass("active");
    if(!$("#child-mode").hasClass("active"))
    {
        $('#search-btn').show();
        $(".resent-grid").show();$("#search_music").show();
    
            
    }
    else{
        $("#search-btn").hide();
        $(".recommended-grid-info h6").each(function(index) {
            var generes = $(this).html().split(",");
//            console.log(generes);
            if (generes.indexOf("romance") >= 0||
                generes.indexOf("thriller") >= 0||
                generes.indexOf("fiction") >= 0||
                generes.indexOf("crime") >= 0||
                generes.indexOf("science-fiction") >=0||
                generes.indexOf("sports") >= 0||
                generes.indexOf("sport") >= 0||
                generes.indexOf("cricket") >= 0) {
                $(this).parents(".resent-grid").hide();
            }
         });
        $("#search_music").hide();
    
    }
}

function feelingFilter(){

    navigator.getUserMedia = ( navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia ||
                             navigator.msGetUserMedia);

      var video;
      var webcamStream;

      function startWebcam() {
        if (navigator.getUserMedia) {
           navigator.getUserMedia (
               {
                 video: true,
                 audio: false
              },
               function(localMediaStream){
                  video = document.getElementById('video');
                 video.src = window.URL.createObjectURL(localMediaStream);
                 webcamStream = localMediaStream;
                   init();
              },
             function(err) {
                 console.log("The following error occured: " + err);
              }
           );
        } else {
           console.log("getUserMedia not supported");
        }  
      }

      function stopWebcam() {
          webcamStream.stop();
      }

      //---------------------
      // TAKE A SNAPSHOT CODE
      //---------------------
      var canvas, ctx;

      function init() {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext('2d');
        snapshot();    
      }

      function snapshot() {
        ctx.drawImage(video, 0,0, canvas.width, canvas.height);
          var dataUrl = canvas.toDataURL("image/jpeg", 0.85);
//			$("#uploading").show()
          upload(dataUrl).then((a)=>{}).catch((a)=>{
              alert(a.name);
              stopWebcam();
          });
      }
    
    startWebcam();
    snapshot();
}


    function upload(file){
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
	
		    let fd = new FormData();
	        fd.append("avatar", file);
		
			// for (var pair of fd.entries())
			//     console.log(pair[0]+ ': ' + pair[1]); 
		    
		    var xhr = new XMLHttpRequest();
//			xhr.upload.addEventListener("progress", uploadProgress, false);\
		    xhr.open('POST',origin+"/api/faceDetect", true); //MUST BE LAST LINE BEFORE YOU SEND
		    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
		    xhr.send(fd);
             swal({
              type: 'info',
              title: 'Uploading Image',
              text:"Please wait while the image is being uploaded",
              timer: 1000
            })
		})
    };