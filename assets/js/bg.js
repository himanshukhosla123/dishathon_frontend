var interval=setInterval(getLocation,5000)

//$.notify.defaults({});

function checkNotification(position){
    $.ajax({
        url:origin+"user_home/save_location?latitude="+position.coords.latitude+"&longitude="+position.coords.longitude+"&session_token="+localStorage.getItem("session_token"),
        type:"POST",
        
    }).done(function(data){
        console.log(data);
    }).fail(function(error,x,xhr){
        console.log(xhr);
    });
}    

function getLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(checkNotification);
     } else {
        document.getElementById("map").innerHTML = "<h2>Geolocation is not supported by this browser.</h2>";
    }
}