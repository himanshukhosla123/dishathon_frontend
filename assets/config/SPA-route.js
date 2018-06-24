app.config(function($routeProvider,$locationProvider){
	$locationProvider.hashPrefix('');
    $routeProvider.when("/",{
        templateUrl:"landingpage.html",
//        controller:"homeCtrl"
    }).when("/home",{
        templateUrl:"landingpage.html",
//        controller:"homeCtrl"
    }).when("/shows",{
        templateUrl:"tvshows.html",
//        controller:"damctrl"
    }).when("/movies",{
        templateUrl:"movies.html",
//        controller:"loginCtrl"
    }).when("/sports",{
        templateUrl:"sports.html",
//        controller:"loginCtrl"
    }).when("/watch/:videoId",{
        templateUrl:"watchVideo.html",
    }).when("/upload",{
        templateUrl:'upload.html'
    }).when("/videoCart",{
        templateUrl:"videoCart.html"
    }).otherwise({template:"Error Page , No Match Found"
        ,redirectTo:"/home"});
});