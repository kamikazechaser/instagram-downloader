/**
 * Insta
 * 
 * Mohammed Sohail <sohail@forfuture.tech>
 * Released under AGPL-3.0
 * 
 */


// AngularJS module initialization
const app = angular.module("Insta", []);


// API constants
const endpoint = "https://electron.forfuture.tech/insta/api/download/";
const apiKey = "fDKZBv4WnRZyFUsYuXvT::BOJkDj4WY9Yv9jgUILlZ";


// Main controller
app.controller("getImageController", function ($scope, $http) {
    $scope.fetchImage = function () {
        const instaUrl = $scope.instaLink;
        $http.get(`${endpoint}${apiKey}/?url=${instaUrl}`)
            .then((ctx) => {
                const statusCode = ctx.data.status;

                if (statusCode === 200) {
                    $scope.message = `Image by ${ctx.data.instagram_account}`;
                    $scope.link = ctx.data.images[0].url;
                    $scope.success = true;
                    reset();
                } else {
                    $scope.message = ctx.data.message;
                    $scope.success = false;
                    reset();
                }

            })
            .catch((ctx) => {
                $scope.message = `An Error Occured: ${ctx.data}`;
                $scope.success = false;
                reset();
            })
    }

    function reset() {
        $scope.instaLink = "";
        $scope.getImage.$setPristine();
    }

    $scope.instagramPattern = (function() {
    var regexp = /^.+\instagram\.com\/.+$/;
    return {
        test: function(value) {
            if( $scope.requireTel === false ) {
                return true;
            }
            return regexp.test(value);
        }
    };
})();
});