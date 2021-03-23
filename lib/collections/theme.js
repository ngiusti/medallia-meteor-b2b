Theme = new Mongo.Collection("themes");

Theme.deny({
  insert: function(theme) { return ownsDocument(theme); },
  update: function(theme) { return ownsDocument(theme); },
  remove: function(theme) { return ownsDocument(theme); },
});

Meteor.methods({
  updateBenchmark: function(theme, value) {
    if (value <= 100 && Meteor.userId()) {
      var affected = Theme.update({
        _id: theme._id
      }, {
        $set: {benchmark: value}
      });
    }else
      throw new Meteor.Error('invalid', "You weren't able to update benchmark");
  }
});
