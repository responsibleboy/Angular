
myApp.controller('PlayerController', ['$scope', function ($scope) {
    $scope.playing = false;
    $scope.audio = document.createElement('audio');
    $scope.audio.src = '#';
}]);

myApp.controller('RelatedController', ['$scope', function ($scope) {

}]);