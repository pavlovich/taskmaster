
Template.taskItem.events({
    "click .delete-button": function () {
        Meteor.call('deleteTask', this._id);
    },
    "click .toggle-private": function () {
        Meteor.call("setPrivate", this._id, !this.private);
    }
});

Template.taskItem.helpers({
    isOwner: function () {
        return this.owner == null || this.owner === Meteor.userId();
    }
});
