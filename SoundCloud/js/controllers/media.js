
galaApp.controller('MediaController', ['$scope', '$rootScope', 'audio', function($scope, $rootScope, audio) {
  $rootScope.isPlaying = false;
  $scope.playTrack = function() {
    $rootScope.isPlaying = true;
    audio.play($rootScope.audioSrc);
  };
}]);
