Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {name: 'application'});
Router.route('admin', {name: 'admin', layoutTemplate: 'adminLayout'});
Router.route('benchmarks', {name: 'benchmarks', layoutTemplate: 'adminLayout'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      Router.go('admin');
    }
  } else {
    this.next();
  }
}

var alreadyLogin = function() {
  if (Meteor.user()) {
    Router.go('benchmarks');
  } else {
    this.next();
  }
}

Router.onBeforeAction(alreadyLogin, {only: 'admin'});
Router.onBeforeAction(requireLogin, {only: 'benchmarks'});
