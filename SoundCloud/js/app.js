var galaApp = angular.module('galaApp', [])
.factory('audio',function ($document) {
  var audioElement = document.querySelector('#audio');
  return {
    audioElement: audioElement,
    play: function(filename) {
        audioElement.src = filename;
        audioElement.play();
    },
  }
})
.run(function($rootScope) {
    $rootScope.showArtwork = false;
    $rootScope.fadeinArtwork = false;
    $rootScope.isPlaying = false;
    $rootScope.artworkSrc = '';
    $rootScope.audioSrc = '';
    $rootScope.recentItems = [];
    // $rootScope.$on('handleEmit', function(event, args) {
    //     $rootScope.$broadcast('handleBroadcast', args);
    // });
});

// function HistoryController($scope) {
//     $scope.handleClick = function(term) {
//         $scope.$emit('handleEmit', { recentSearch: term});
//     };
// }
//
// function SearchController($scope) {
//     $scope.$on('handleBroadcast', function(event, args) {
//         $scope.recentSearch = args.recentSearch;
//     });
// }
//
// SearchController.$inject = ['$scope'];
// HistoryController.$inject = ['$scope'];
