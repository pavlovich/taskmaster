
Tasks = new Mongo.Collection("tasks");

if(Meteor.isServer){
    if(Tasks.find().count() === 0){
        var toAdd = [
            {name: 'This is Task 1'},
            {name: 'This is Task 2'},
            {name: 'This is Task 3'}
        ];

        toAdd.forEach(function(item){
           Tasks.insert(item);
        });
    }
}

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
        Tasks.insert({
            name: text,
            email: Meteor.userEmail(),
            owner: Meteor.userId(),
            createdAt: new Date()
        });
    },
    deleteTask: function (id) {
        var task = Tasks.findOne(id);
        if (task.owner && task.owner !== Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Tasks.remove(id);
    },
    setPrivate: function (id, setToPrivate) {
        var task = Tasks.findOne(id);
        if (task.owner && task.owner !== Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Tasks.update(id, {$set: {private: setToPrivate}});
    }
});
