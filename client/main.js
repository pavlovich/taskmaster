UI.registerHelper('tasks', function(){
    return Tasks.find();
});

Template.body.events({
    "submit .new-task": function (event) {
        var text = event.target.text.value;
        var newTask = {
            name: text
        };
        Tasks.insert(newTask);

        event.target.text.value = "";

        return false;
    }
});
