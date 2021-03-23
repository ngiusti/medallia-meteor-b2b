if (Meteor.isClient) {
  Template.admin.events({
    'submit .login-form': function (event) {
      event.preventDefault();
      var email = event.target.email.value;
      var password = event.target.password.value;

      Meteor.loginWithPassword(email,password,function(err){
        if(!err) {
          Router.go('/benchmarks');
        } else {
          $(".login-error").text("Invalid Email or Password")
        }
      });
    }
  });

  Template.adminHeader.events({
    'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
      Router.go('admin');
    }
  });

  Template.benchmarks.helpers({
    'getBenchmarkValue': function(theme_name){
      var theme = Theme.findOne({name: theme_name});
      return theme.benchmark
    }
  });

  editBenchmark = function(element) {
    element.addClass('hidden');
    element.parents('.benchmark').find('input').attr('disabled', false).focus();
    element.parents('.buttons').find('.save-cancel-buttons').removeClass('hidden');
  }

  hideButtons = function(element) {
    element.parents('.benchmark').find('input').attr('disabled', true);
    element.parents('.buttons').find('.save-cancel-buttons').addClass('hidden');
    element.parents('.buttons').find('.edit-link').removeClass('hidden');
  }

  saveBenchmark = function(element) {
    var benchmark_value = element.parents('.benchmark').find('.value input').val();

    if (validateBenchmarkValue(element, benchmark_value)) {
      var theme_name = element.parents('.benchmark').data('theme');
      var theme = Theme.findOne({name: theme_name})
      Meteor.call('updateBenchmark', theme, benchmark_value);
      hideButtons(element);
    }
  }

  validateBenchmarkValue = function(element, value) {
    $('.value .error').addClass('hidden');

    if (! $.isNumeric(value) || value < 0) {
      element.parents('.benchmark').find('.value .error').removeClass('hidden').text('Value must be a positive number');
      return false;
    } else if (value > 100) {
      element.parents('.benchmark').find('.value .error').removeClass('hidden').text('Maximum allowed value is 100');
      return false;
    } else {
      return true;
    }
  }
}
