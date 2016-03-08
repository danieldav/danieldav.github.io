//galaApp.controller('SearchController', ['$scope', '$http', '$animateService', function($scope, $http, $animateService) {
galaApp.controller('SearchController',
['$scope', '$http', '$rootScope','audio', function($scope, $http, $rootScope, audio) {
  var main = document.querySelector('#main'),
    artwork = document.querySelector('#artwork'),
    searchInput = document.querySelector('#searchInput'),
    baseURL = 'https://api.soundcloud.com/tracks/',
    clientID = '?client_id=d652006c469530a4a7d6184b18e16c81';

  function setupStorage() {
    var storageItem;
    if(!localStorage.getItem('isTile')) {
      // no local storage yet - so set it up
      localStorage.setItem('isTile', 'false');
      $scope.isTile = false; //list view by default
    }
    else {
      if(localStorage.getItem('isTile') === 'true') {
        main.classList.add('tile');
        $scope.isTile = true;
      }
      else {
        $scope.isTile = false;
      }
      for(var i=0;i<5;i++) {
        storageItem = localStorage.getItem('recent' + i);
        if(storageItem) {
          $rootScope.recentItems[i] = storageItem;
        }
        else { break; }
      }
    }
  }
  function updateLocalStorage() {
    for(var i=0;i<$rootScope.recentItems.length;i++) {
      localStorage.setItem('recent' + i, $rootScope.recentItems[i]);
    }
  }
  function pushToHistory() {
    if($rootScope.recentItems.length == 5) {
      $rootScope.recentItems.pop();
    }
    $rootScope.recentItems.unshift(searchInput.value);
    updateLocalStorage();
  }
  function getIndex(elem){
    return Array.prototype.indexOf.call(elem.parentNode.children, elem);
  }
  function getCenterCoords(elem) {
    var clientRect = elem.getBoundingClientRect(),
        coords = {};
    coords.x = clientRect.left + clientRect.width / 2;
    coords.y = clientRect.top + clientRect.height / 2;
    return coords;
  }
  function getComputed(elem,prop) {
    return getComputedStyle(elem,null).getPropertyValue(prop);
  }
  function animateItem(item) {
    setTimeout(function() {
      var diffX = getCenterCoords(artwork).x - getCenterCoords(item).x;
      var diffY = getCenterCoords(artwork).y - getCenterCoords(item).y;
      item.style.left = parseInt(getComputed(item,'left'), 10) + diffX + 'px';
      item.style.top = parseInt(getComputed(item,'top'), 10) + diffY + 'px';
      item.style.opacity = 0;
    }, 0);
  }

  function removeClone(clone) {
    setTimeout(function() {
      clone.parentNode.removeChild(clone);
    }, 700);
  }
  function showArtwork() {
    setTimeout(function() {
      artwork.classList.add('fadein');
    }, 500);
  }
  function resetMedia() {
    $rootScope.isPlaying = false;
    $rootScope.artworkSrc = '';
    $rootScope.audioSrc = '';
    artwork.src = '';
  }
  setupStorage();
  $scope.trackIndex = 0;
  $scope.getData = function() {
    $http.get(baseURL + clientID).success(function (data) {
      $scope.tracks = data.filter(function (track) {
          return track.artwork_url && track.stream_url;
      });
      $scope.numTracks = $scope.tracks.length;
      resetMedia();
      pushToHistory();
    });
  };
  $scope.getData2 = function($event) {
    var recentSearch = $event.currentTarget;
    searchInput.value = recentSearch.textContent.trim();
    $scope.getData();
  };
  $scope.getNextData = function() {
    $scope.trackIndex = ($scope.trackIndex + 6) % $scope.numTracks;
    resetMedia();
  }

  $scope.setListView = function() {
    $scope.isTile = false;
    localStorage.setItem('isTile', 'false');
    main.classList.remove('tile');
  };
  $scope.setTileView = function() {
    $scope.isTile = true;
    localStorage.setItem('isTile', 'true');
    main.classList.add('tile');
  };
  $scope.cloneAndAnimate = function($event) {
    var item = $event.currentTarget,
        index = getIndex(item);
        itemClone = item.cloneNode(true);
        currentTrack = $scope.tracks[$scope.trackIndex + index];

    artwork.style.display = 'none'; // I only want fade-in transition
    artwork.classList.remove('fadein');
    $rootScope.artworkSrc = currentTrack.artwork_url;
    $rootScope.audioSrc = currentTrack.stream_url + clientID;

    itemClone.classList.add('clone');
    itemClone.style.left = item.getBoundingClientRect().left + 'px';
    itemClone.style.top = item.getBoundingClientRect().top + 'px';
    item.parentNode.appendChild(itemClone);
    animateItem(itemClone);
    artwork.style.display = 'block';
    showArtwork();
    removeClone(itemClone);
  };
}]);
