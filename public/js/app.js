//Module is setup here with ngRoute dependency injection
var app = angular.module("currentsee", ["ngRoute"]);

// Creates the route
app.config(function($routeProvider) {

// Link to  Form View


     $routeProvider.when("/form ", {
        templateUrl: "views/form.html",
        controller: 'formController'

    });

// Link to  Result View
     $routeProvider.when("/result", {
        templateUrl: "views/result.html",
        controller: 'resultController'
});

// Link to about view
     $routeProvider.when("/about",{
    	templateUrl: "views/about.html",
    	controller: "aboutController"
    });


//Main Page View


     $routeProvider.otherwise({
        templateUrl: "views/form.html",
        controller: 'formController'

    });
});


//this sets the search words entered by user as an object using a service from factory
app.controller('formController', function($scope, currentseeFactory, $location, $http){
   $scope.saveForm = function(words){
    currentseeFactory.setsearchWords(words);
    $location.path('/result');
    console.log(words);
   };

});
//this gets our search words from the form view, as it is passed by theservice
app.controller('resultController', function($scope, currentseeFactory, $http){
    var searchWords = currentseeFactory.getsearchWords();
    console.log(searchWords);
  //here we assign our search words to variables to be used in our data queries
    var name = searchWords.name
    var city = searchWords.city

// Using http get method to retrieve data from google place photo api
    $http({
          //To reach the photos we need to use the place search api to get the photo reference ID
            method: 'GET',
            url:'https://maps.googleapis.com/maps/api/place/textsearch/json',
            params: {
              //variable name and city inserted into query for search term
                'query': name + " " + city,
                //Client authorization key
                'key': 'AIzaSyCTKPL7rYEGDsf6NT_AFO8991Gb9QY3C-Y'
            }
            }).then(function successCallback(response){
               $scope.photos = [];
               //Once the photo reference ID is retrived, it's inserted into the second api to retrieve an image url for our results view
                console.log("success", response);
                // Our for loop limits the images to first 6 results and pushes to the photos array
                for(var i = 0; i <= 6; i++) {
                  $scope.photos.push($scope.photosrc = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=350&photoreference="+response.data.results[i].photos[0].photo_reference+"&key=AIzaSyCTKPL7rYEGDsf6NT_AFO8991Gb9QY3C-Y");
                }
                // console.log(testArray);
                // var photoRef = response.data.results[0].photos[0].photo_reference;
                //Responds with error
             }, function errorCallback(response){
                console.log("Error", response);

                 $scope.photos = []
       });
            //copy and paste above $http function. changed params and url
    $http({
            method: 'GET',
            url:'/tweets',
            params: {
                name: name ,
                city: city
            }
            }).then(function successCallback(response){
               $scope.tweets = [];

                console.log("twitter", response);
                //for loop below to run through twitter results from params
                //pushed object of items we wanted to pull from twitter info
                for(var i = 0; i < response.data.statuses.length; i++) {
                  $scope.tweets.push(
                    { created_at:response.data.statuses[i].created_at,
                      text: response.data.statuses[i].text,
                      screen_name: response.data.statuses[i].user.screen_name,
                      profile_image_url: response.data.statuses[i].user.profile_image_url
                    }
                  );
                }
                // console.log(testArray);
                // var photoRef = response.data.results[0].photos[0].photo_reference;
                console.log("my scope.tweets is", $scope.tweets);
                
                }, function errorCallback(response){
                console.log("Error", response);
                //put twitter results into tweets array

               $scope.tweets = [];
         });
});



