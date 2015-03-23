myApp.controller("personController", function ($scope) {
    $scope.person = [];
    $scope.person.name = "lang";
    $scope.person.job = "IT";
    $scope.person.sayHi = function () {
        return "Hi ! I'm " + $scope.person.name + " , I'm a(an) " + $scope.person.job;
    };
});

myApp.controller("fighterController", function ($scope, $http) {
    var url = 'ashx/FighterHandler.ashx'; //数据请求地址
    $http.get(url).success(function (data) {
        $scope.fighters = data;
    });
});

//-----------------------
//var questionModel = {
//    newTitle: "新建试题",
//    previewTitle: "预览试题",
//    name: "",
//    fraction: "",
//    type: "1",
//    options: []
//};
myApp.controller("questionController", function ($scope, $http) {
    var url = "ashx/QuestionHandler.ashx";
    $http.get(url).success(function (data) {
        $scope.question = data;
    });
    //$scope.question = [];
    $scope.addOption = function () {
        var temp = { content: "" };
        $scope.question.options.push(temp);
    };
    $scope.delOption = function () {
        $scope.question.options.splice(index, 1);
    };
});