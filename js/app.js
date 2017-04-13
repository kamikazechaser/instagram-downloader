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
const endpoint = "https://electron.forfuture.tech/insta/api/v2/download/";

// Main controller
app.controller("getImageController", function ($scope, $http) {
    $scope.fetchImage = function () {
        const instaUrl = $scope.instaLink;
        $http.get(`${endpoint}?url=${instaUrl}`)
            .then((ctx) => {
                const statusCode = ctx.data.status;

                if (statusCode === 200) {
                    $scope.message = `${ctx.data.type} : ${ctx.data.description}`;
                    $scope.link = ctx.data.link;
                    $scope.type = ctx.data.type;
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
            return regexp.test(value);
        }
    };
})();
});