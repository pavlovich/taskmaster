
Tasks = new Mongo.Collection("tasks");

Meteor.startup(function () {
    Meteor.userEmail = function () {
        var currentEmail = null;
        try {
            currentEmail = Meteor.user().emails[0].address;
        } catch (e) {
            currentEmail = null;
        }
        return currentEmail;
    };
});

Meteor.methods({
    addTask: function (text) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Tasks.insert({
            name: text,
            email: Meteor.userEmail(),
            owner: Meteor.userId(),
            createdAt: new Date()
        });
    },
    deleteTask: function (id) {
        var task = Tasks.findOne(id);
        if (task.private && task.owner !== Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Tasks.remove(id);
    },
    setPrivate: function (id, setToPrivate) {
        var task = Tasks.findOne(id);
        if (task.owner !== Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Tasks.update(id, {$set: {private: setToPrivate}});
    },
    setChecked: function (id, setChecked) {
        var task = Tasks.findOne(id);
        if (task.private && task.owner !== Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Tasks.update(id, {$set: {checked: setChecked}});
    }
});
