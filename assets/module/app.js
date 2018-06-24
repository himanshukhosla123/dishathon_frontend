const app=angular.module("ott",['ngRoute']);
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

var origin="http://localhost:3005";