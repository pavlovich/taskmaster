UI.registerHelper('tasks', function(){
    return Tasks.find();
});

Template.body.events({
    "submit .new-task": function (event) {
        var text = event.target.text.value;
        var newTask = {
            name: text,
            email: Meteor.userEmail()
        };
        Tasks.insert(newTask);

        event.target.text.value = "";

        return false;
    }
});

Meteor.startup(function () {
    Meteor.userEmail = function () {
        var currentEmail = null;
        try {
            currentEmail = Meteor.user().emails[0].address;
        } catch (e) {
            currentEmail = null;
        }
        return currentEmail;
    }
});
