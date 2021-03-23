if (Theme.find().count() === 0) {
  var now = new Date();

  var seeThemeId = Theme.insert({
    name: "see",
    aggregate_scores: [],
    benchmark: 0,
    created_at: now
  });

  var wireThemeId = Theme.insert({
    name: "wire",
    aggregate_scores: [],
    benchmark: 0,
    created_at: now
  });

  var driveThemeId = Theme.insert({
    name: "drive",
    aggregate_scores: [],
    benchmark: 0,
    created_at: now
  });

  var innovateThemeId = Theme.insert({
    name: "innovate",
    aggregate_scores: [],
    benchmark: 0,
    created_at: now
  });
}

if (Accounts.users.find().count() === 0) {
  Accounts.createUser({
    email: 'admin@medallia-ocem.com', password: "medallia-ocem123#"
  });
}
