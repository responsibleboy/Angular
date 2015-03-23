var myApp = angular.module("myApp", []);
var apiKey = 'MDAwMTAwMDIxMDEyMTYyMTc4MzA4YmJlMg010',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

myApp.directive('nprLink', function () {
    return {
        restrict: 'EA',
        require: ['^ngModel'],
        replace: true,
        scope: {
            ngModel: '=',
            player: '='
        },
        templateUrl: '../NPR/views/nprListItem.html',
        link: function (scope, ele, attr) {
            scope.duration = scope.ngModel.audio[0].duration.$text;
        }
    }
});

//建立单例audio service
myApp.factory('audio', function ($document) {
    var audio = $document[0].createElement('audio');
    return audio;
});

//创建player service
myApp.factory('player', function (audio, $rootScope) {
    var player = {
        playing: false,
        current: null,
        ready: false,

        play: function (program) {
            if (player.playing) {
                player.stop();
            }
            var url = program.audio[0].format.mp4.$text;
            player.current = program;
            audio.src = url;
            audio.play();
            player.playing = true;
        },

        stop: function () {
            if (player.playing) {
                audio.pause();
                player.ready = player.playing = false;
                player.current = null;
            }
        },

        //获取当前播放节目的详细信息
        currentTime: function () {
            return audio.currentTime;
        },
        currentDuration: function () {
            return parseInt(audio.duration);
        }
    };

    //捕获audio元素的ended事件，我们注入$rootScope服务并创建audio元素的事件监听器
    audio.addEventListener('ended', function () {
        $rootScope.$apply(player.stop());
    });

    //更新播放进度
    audio.addEventListener('timeupdate', function (evt) {
        $rootScope.$apply(function () {
            player.progress = player.currentTime();
            player.progress_percent = player.progress / player.currentDuration();
        });
    });

    //表示视图中的audio是否准备就绪
    audio.addEventListener('canplay', function (evt) {
        $rootScope.$apply(function () {
            player.ready = true;
        });
    });

    return player;
});

//获取NPR的最新节目
myApp.factory('nprService', function ($http) {
    var doRequest = function (apikey) {
        return $http({
            method: 'jsonp',
            url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
        });
    };
    return {
        programs: function (apikey) {
            return doRequest(apikey);
        }
    };
})

myApp.controller('PlayerController', function ($scope, nprService, player) {
    $scope.player = player;

    nprService.programs(apiKey)
    .success(function (data, status) {
        // Now we have a list of the stories (data.list.story)
        // in the data object that the NPR API 
        // returns in JSON that looks like:
        // data: { "list": {
        //   "title": ...
        //   "story": [
        //     { "id": ...
        //       "title": ...
        $scope.programs = data.list.story;

    }).error(function (data, status) {
        // some error occurred
    });

});

myApp.controller('FrameController', function ($scope) {

});

//显示当前播放节目的相关内容
myApp.controller('RelatedController', function ($scope, player) {
    $scope.player = player;
    $scope.$watch('player.current', function (program) {
        if (program) {
            $scope.related = [];
            angular.forEach(program.relatedLink, function (link) {
                $scope.related.push({
                    link: link.link[0].$text,
                    caption: link.caption.$text
                });
            });
        }
    });
});

/*
myApp.controller('PlayerController', ['$scope', function ($scope) {
    
    $scope.playing = false;
    $scope.audio = document.createElement('audio');
    $scope.audio.src = '/media/BoonieBears.mp3';
    $scope.play = function () {
        $scope.audio.play();
        $scope.playing = true;
    };
    $scope.stop = function () {
        $scope.audio.pause();
        $scope.playing = false;
    };
    $scope.audio.addEventListener('ended', function () {
        $scope.$apply(function () {
            $scope.stop();
        });
    });
    
}]);

myApp.controller('RelatedController', ['$scope', function ($scope) {

}]);

*/