
Template.taskItem.events({
    "click .delete-button": function () {
        Meteor.call('deleteTask', this._id);
    }
});
