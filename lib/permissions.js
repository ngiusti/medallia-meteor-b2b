ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}

Accounts.config({
  forbidClientAccountCreation : true
});
