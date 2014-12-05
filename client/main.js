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
//Meteor.startup(function(){
//Template.taskItem.rendered = function() {
//    var fview = FView.from(this);
//    var Transform = famous.core.Transform; // see shortcut help below
//
//    // "Fly in" animation (see examples/animations for more)
//    fview.modifier.setTransform(
//        Transform.translate(-500,-500)
//    );
//    fview.modifier.setTransform(
//        Transform.translate(0,0),
//        { duration : 1000, curve: 'easeOut' }
//    );
//}
//});

FView.ready(function(require) {
    FView.registerView('GridLayout', famous.views.GridLayout);
});