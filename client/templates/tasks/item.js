
Template.taskItem.events({
    "click .delete-button": function () {
        Meteor.call('deleteTask', this._id);
    },
    "click .toggle-private": function () {
        Meteor.call("setPrivate", this._id, !this.private);
    },
    "click .toggle-checked": function () {
        Meteor.call("setChecked", this._id, !this.checked);
    }
});

Template.taskItem.helpers({
    isOwner: function () {
        return this.owner === Meteor.userId();
    },
    canDelete: function () {
        return !this.private || this.owner === Meteor.userId();
    }
});
