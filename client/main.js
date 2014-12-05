angular.module('taskMaster', ['angular-meteor'])
    .controller('tasksController', ['$scope', '$collection', function ($scope, $collection) {

        $collection(Tasks).bind($scope, 'tasks');

        $scope.model = {newTodoText: ""};

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

    }]);

UI.registerHelper('tasks', function(){
    if (Session.get("hideCompleted")) {
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
    } else {
        return Tasks.find({}, {sort: {createdAt: -1}});
    }
});

Template.body.events({
    "submit .new-taska": function (event) {
        Meteor.call('addTask', event.target.text.value)
        event.target.text.value = "";
        return false;
    },
    "change .hide-completed input": function (event) {
        Session.set("hideCompleted", event.target.checked);
    }
});

Meteor.subscribe("tasks");

Meteor.startup(function () {
    angular.bootstrap(document, ['taskMaster']);
});
