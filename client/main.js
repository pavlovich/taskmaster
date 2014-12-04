angular.module('taskMaster', ['angular-meteor'])
    .controller('tasksController', ['$scope', function ($scope) {

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
    "submit .new-task": function (event) {
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
