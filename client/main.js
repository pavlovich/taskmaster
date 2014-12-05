angular.module('taskMaster', ['angular-meteor'])
    .controller('tasksController', ['$scope', '$collection', function ($scope, $collection) {

        $collection(Tasks).bind($scope, 'tasks', true, true);

        $scope.model = {newTodoText: ""};

        $scope.filteredTasks = function () {
            if ($scope.hideCompleted) {
                return _.reject($scope.tasks, function (task) {
                    return task.checked
                })
            } else {
                return $scope.tasks
            }
        };

        $scope.addTask = function () {
            Meteor.call("addTask", $scope.model.newTodoText);
            $scope.model.newTodoText = ""
        };

        $scope.deleteTask = function (task) {
            Meteor.call("deleteTask", task._id)
        };

        $scope.toggleChecked = function (task) {
            Meteor.call("setChecked", task._id, task.checked);
            return false;
        };

        $scope.togglePrivate = function (task) {
            Meteor.call("setPrivate", task._id, !task.private)
        };

        $scope.privateStatus = function (task) {
            return task.private ? "Private" : "Public"
        };

        $scope.isOwner = function (task) {
            return task.owner === Meteor.userId()
        };

        $scope.loggedIn = function () {
            return Meteor.userId()
        };

        $scope.incompleteCount = function () {
            return _.filter($scope.tasks, function (task) {
                return !(task.checked)
            }).length
        };

    }]);

Meteor.subscribe("tasks");

Meteor.startup(function () {
    angular.bootstrap(document, ['taskMaster']);
});
