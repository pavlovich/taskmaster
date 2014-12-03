
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
