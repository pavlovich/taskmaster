
Template.taskItem.events({
    "click .delete-button": function () {
        Tasks.remove(this._id);
    }
});
