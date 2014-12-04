UI.registerHelper('tasks', function(){
    return Tasks.find({}, {sort: {createdAt: 1}});
});

Template.body.events({
    "submit .new-task": function (event) {
        Meteor.call('addTask', event.target.text.value)
        event.target.text.value = "";
        return false;
    }
});

Meteor.subscribe("tasks");
