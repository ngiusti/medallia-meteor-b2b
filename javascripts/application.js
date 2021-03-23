MAX_QUESTIONS = 17;

get_themes = function(){
  see_theme = Theme.findOne({name: "see"});
  drive_theme = Theme.findOne({name: "drive"});
  wire_theme = Theme.findOne({name: "wire"});
  innovate_theme = Theme.findOne({name: "innovate"});
}

if (Meteor.isClient) {
  isIE = function() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  }

  isMobile = function(){
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  }

  const getResource = async() => {
    try {
      var res;
      await $.ajax({
        url: 'https://kalyber-proxy.herokuapp.com/https://141-HJW-872.mktorest.com/identity/oauth/token?grant_type=client_credentials&client_id=322a9958-4e90-4641-9a93-77a23a133eaa&client_secret=S7mF7SDyfbiEiaxNXnmV8KXkuokTZ3gW',
        type: "GET",
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': '*/*',
          'Access-Control-Allow-Origin' : 'https://localhost:3000',
          'X-Requested-With': 'XMLHttpRequest',
        },
        success: function (data) {
            res = data.access_token
        },
        error: function (err) {
            console.log(err);
        }
      });
      return res;
    } catch (err) {
        console.log(err);
    }
  }


  const send_data_to_marketo = async() => {

    try {
      const auth = await getResource()
      $.ajax({
        url: 'https://kalyber-proxy.herokuapp.com/https://141-HJW-872.mktorest.com/rest/v1/leads.json',
        type: 'POST',
        crossDomain: true,
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth,
          'Access-Control-Allow-Origin' : 'https://medallia-master.meteorapp.com/',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': '*/*'
        },
        data: marketo_options_hash(),
        error: function (request, status, error) {
          $(".lead-submit button").removeClass("hidden");
          $(".calculating-result").addClass("hidden");
          $(".internet-connection-error").removeClass("hidden");
        },
        timeout: 20000,
      }).done(function(data) {
        $(".lead-form").addClass("hidden");
        $(".lead-form-info").addClass("hidden");
        $(".calculating-result").addClass("hidden");
        $(".result-pages").removeClass("hidden");
        update_iframe_height();
        scroll_to_top();
      })
    } catch (error) {
      console.log(error);
    }

  }

  update_iframe_height = function() {
    var height = document.getElementsByTagName('html')[0].scrollHeight;
    window.parent.postMessage(['setIframeHeight', parseInt(height) + 30], '*');
  }

  Template.lead_form.events({
    'submit #lead_form' : function (event, template) {
      try {
      event.preventDefault();

      var solved_questions_count = $('#questions .question input:radio:checked').length;
      var data = bind_get_data(template);

      if(solved_questions_count < MAX_QUESTIONS){
        $(".errors").text("Please solve all the questions to continue").removeClass("hidden");
      }else if(!is_lead_form_filled(data)){
        $(".errors").text("Please fill all the fields in form").removeClass("hidden");
      }else if(!navigator.onLine){
        $(".lead-submit button").removeClass("hidden");
        $(".calculating-result").addClass("hidden");
        $(".internet-connection-error").removeClass("hidden");
      }else{
        $(".lead-submit button").addClass("hidden");
        $(".submit-form-info").css("margin-top", 0);
        $(".calculating-result").removeClass("hidden");
        $(".internet-connection-error").addClass("hidden");
        if(!isMobile()) {scroll_to_top();}
        get_themes();
        setTimeout(function() { calculate_result(); }, 1000);
      }
      } catch (error) {
        Honeybadger.notify(error);
      }
    },
    'change #company_size' : function() {
      if($("#company_size").val() == "1-1,999")
        $(".contact-us").addClass("hidden");
      else
        $(".contact-us").removeClass("hidden");
    }
  });

  Template.questions.events({
    'change .question input:radio': function(event){
      try {
      $(".next").attr("disabled", false);
      $(event.target).parents(".question").find(".css-label").removeClass("selected-answer");
      $(event.target).parent().find(".css-label").addClass("selected-answer");
      } catch (error) {
        Honeybadger.notify(error);
      }
    },

    'keyup .question #comment_body': function(event){
      var characters_count = $("#comment_body").val().length
      $(".characters-count").text(characters_count)
    }
  });

  iePlaceholder = function(elem){
    if(is_explorer && ie_version <= 9){
      if(elem.val().length > 0)
        $(elem).parent().find('.ie-placeholder').addClass('hidden');
      else
        $(elem).parent().find('.ie-placeholder').removeClass('hidden');
    }
  }

  bind_get_data = function(template) {
    return {
      first_name:   template.find("#first_name").value,
      last_name:    template.find("#last_name").value,
      email:        template.find("#email").value,
      company:      template.find("#company").value,
      job_title:    template.find("#job_title").value,
      country:      template.find("#country").value,
      company_size: template.find("#company_size").value,
      industry:     template.find("#industry").value
    }
  }

  is_lead_form_filled = function(data) {
    return data.first_name.length > 0 && data.last_name.length > 0 && data.email.length > 0 && data.company.length > 0 && data.job_title.length > 0 && data.country.length > 0
  }

  calculate_result = function() {
    see_theme_score = drive_theme_score = wire_theme_score = innovate_theme_score = 0;
    comment_body = $("#comment_body").val().length > 0 ? $("#comment_body").val() : "No Response"

    $("#questions").find("input[type='radio']:checked").each(function(index){
      var option = $(this).val();
      var question_id = index + 1;

      if(question_id < 17) {
        $("#question_"+question_id+"_result").find(".question-score").text(answer_result_mapping(option));

        var theme = $("#question_"+question_id).data("theme");
        var answer_points = answer_points_mapping(option);

        if(theme == "see"){
          see_theme_score += answer_points;
        }else if(theme == "drive"){
          drive_theme_score += answer_points;
        }else if(theme == "wire"){
          wire_theme_score += answer_points;
        }else if(theme == "innovate"){
          innovate_theme_score += answer_points;
        }
      } else if (question_id == 17) {
        $(".result-comment-body").html(comment_body.replace(/\n/g, "<br />"));
        if(comment_body.length == 0) { $(".comment-section").addClass("hidden") }
      }
    });

    send_data_to_marketo();

    $(".combo-icons .icon").addClass("hidden");
    $(".overall-score").text(see_theme_score + drive_theme_score + wire_theme_score + innovate_theme_score)

    $(".see-theme-score").text(see_theme_score);
    $(".wire-theme-score").text(wire_theme_score);
    $(".drive-theme-score").text(drive_theme_score);
    $(".innovate-theme-score").text(innovate_theme_score);
  }

  answer_result_mapping = function(answer){
    switch(answer) {
      case "option1":
        return "ABSENT"
      case "option2":
        return "DEVELOPING"
      case "option3":
        return "DEPLOYED"
      case "option4":
        return "LEADING-EDGE"
      case "option5":
        return "I DON'T KNOW"
    }
  }

  answer_points_mapping = function(answer){
    switch(answer) {
      case "option1":
        return 0
      case "option2":
        return 10
      case "option3":
        return 20
      case "option4":
        return 25
      case "option5":
        return 0
    }
  }

  bind_validate_lead_form = function() {
    $("#lead_form").validate({
      rules: {
        first_name: { required: true },
        last_name: { required: true },
        email: { required: true, email: true },
        company: { required: true },
        job_title: { required: true },
        country: { required: true },
      },
      messages: {
        first_name: { required: "First name is required" },
        last_name: { required: "Last name is required" },
        email: { required: "Email ID is required" },
        company: { required: "Company is required" },
        job_title: { required: "Job title is required" },
        country: { required: "Country is required" },
      }
    });
  }

  update_progress_bar= function(question_number){
    progress_bar_width = question_number * (100 / MAX_QUESTIONS);
    $(".progress-bar").css("width", progress_bar_width + "%");
  }

  scroll_to_top = function(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  marketo_options_hash = function(){
    var question_1_answer = $("#question_1").find("input[type='radio']:checked").val();
    var question_2_answer = $("#question_2").find("input[type='radio']:checked").val();
    var question_3_answer = $("#question_3").find("input[type='radio']:checked").val();
    var question_4_answer = $("#question_4").find("input[type='radio']:checked").val();
    var question_5_answer = $("#question_5").find("input[type='radio']:checked").val();
    var question_6_answer = $("#question_6").find("input[type='radio']:checked").val();
    var question_7_answer = $("#question_7").find("input[type='radio']:checked").val();
    var question_8_answer = $("#question_8").find("input[type='radio']:checked").val();
    var question_9_answer = $("#question_9").find("input[type='radio']:checked").val();
    var question_10_answer = $("#question_10").find("input[type='radio']:checked").val();
    var question_11_answer = $("#question_11").find("input[type='radio']:checked").val();
    var question_12_answer = $("#question_12").find("input[type='radio']:checked").val();
    var question_13_answer = $("#question_13").find("input[type='radio']:checked").val();
    var question_14_answer = $("#question_14").find("input[type='radio']:checked").val();
    var question_15_answer = $("#question_15").find("input[type='radio']:checked").val();
    var question_16_answer = $("#question_16").find("input[type='radio']:checked").val();



    var data = JSON.stringify({ 
      "lookupField":"email",
      "input":[ 
            { 
                "email": $("#email").val(),
                "firstName": $("#first_name").val(),
                'LastName': $("#last_name").val(),
                'Company': $("#company").val(),
                'Title': $("#job_title").val(),
                'Country': $("#country").val(),
                'Number_of_Employees_Picklist__c': $("#company_size").val(),
                'Industry': $("#industry").val(),

                'OCEM_Overall_Score__c': see_theme_score + wire_theme_score + drive_theme_score + innovate_theme_score,
                'OCEM_See_Score__c': see_theme_score,
                'OCEM_Wire_Score__c': wire_theme_score,
                'OCEM_Accountability_Score__c': drive_theme_score,
                'OCEM_Innovate_Score__c': innovate_theme_score,

                // 'OCEM_Quantified_Score__c': answer_points_mapping(question_1_answer),
                'OCEM_ExecutiveLed_Score__c': answer_points_mapping(question_2_answer),
                'OCEM_Prioritized_Score__c': answer_points_mapping(question_3_answer),
                'OCEM_Leveraged_Score__c': answer_points_mapping(question_4_answer),
                'OCEM_Aligned_Score__c': answer_points_mapping(question_5_answer),
                'OCEM_Embedded_Score__c': answer_points_mapping(question_6_answer),
                'OCEM_Pervasive_Score__c': answer_points_mapping(question_7_answer),
                'OCEM_Relevant_Score__c': answer_points_mapping(question_8_answer),
                'OCEM_Responsive_Score__c': answer_points_mapping(question_9_answer),
                'OCEM_SolutionOriented_Score__c': answer_points_mapping(question_10_answer),
                'OCEM_Proactive_Score__c': answer_points_mapping(question_11_answer),
                'OCEM_Comprehensive_Score__c': answer_points_mapping(question_12_answer),
                'OCEM_RealTime_Score__c': answer_points_mapping(question_13_answer),
                'OCEM_Integrated_Score__c': answer_points_mapping(question_14_answer),
                'OCEM_Representative_Score__c': answer_points_mapping(question_15_answer),
                'OCEM_CustomerFriendly_Score__c': answer_points_mapping(question_16_answer),          

                'OCEM_Quantified_Rating__c': answer_result_mapping(question_1_answer),
                'OCEM_Executive_Led_Rating__c': answer_result_mapping(question_2_answer),
                'OCEM_Prioritized_Rating__c': answer_result_mapping(question_3_answer),
                'OCEM_Leveraged_Rating__c': answer_result_mapping(question_4_answer),
                'OCEM_Aligned_Rating__c': answer_result_mapping(question_5_answer),
                'OCEM_Embedded_Rating__c': answer_result_mapping(question_6_answer),
                'OCEM_Pervasive_Rating__c': answer_result_mapping(question_7_answer),
                'OCEM_Relevant_Rating__c': answer_result_mapping(question_8_answer),
                'OCEM_Responsive_Rating__c': answer_result_mapping(question_9_answer),
                'OCEM_Solution_Oriented_Rating__c': answer_result_mapping(question_10_answer),
                'OCEM_Proactive_Rating__c': answer_result_mapping(question_11_answer),
                'OCEM_Comprehensive_Rating__c': answer_result_mapping(question_12_answer),
                'OCEM_Real_Time_Rating__c': answer_result_mapping(question_13_answer),
                'OCEM_Integrated_Rating__c': answer_result_mapping(question_14_answer),
                'OCEM_Representative_Rating__c': answer_result_mapping(question_15_answer),
                'OCEM_Customer_Friendly_Rating__c': answer_result_mapping(question_16_answer),

                'OCEM_See_Benchmark__c': parseFloat(see_theme.benchmark),
                'OCEM_Wire_Benchmark__c': parseFloat(wire_theme.benchmark),
                'OCEM_Accountability_Benchmark__c': parseFloat(drive_theme.benchmark),
                'OCEM_Innovate_Benchmark__c': parseFloat(innovate_theme.benchmark),

                'OCEM_Assessment_Comments__c': comment_body,
                'OCEM_Assessment_Version__c': 'ocem-assessment-b2b.medallia.com',
                'OCEM_Assessment_Taken__c': 1,

                'UTM_Medium_Most_Recent__c': $('#UTM_Medium_Most_Recent__c').val(),
                'UTM_Source_Most_Recent__c': $('#UTM_Source_Most_Recent__c').val(),
                'UTM_Campaign_Most_Recent__c': $('#UTM_Campaign_Most_Recent__c').val(),
                'UTM_Content_Most_Recent__c': $('#UTM_Content_Most_Recent__c').val(),
                'UTM_Term_Most_Recent__c': $('#UTM_Term_Most_Recent__c').val(),
            }
        ]
    });
    return data;
  }

  bind_setup_honey_badger = function(){
    Honeybadger.configure({
      api_key: '006223b4',

      host: 'api.honeybadger.io',
      ssl: true,
      project_root: 'https://www.contenttools-ocem-assessment-medallia.com/',
      environment: 'production',

      // Should unhandled (window.onerror) notifications be sent?
      onerror: true,

      // Disable notifications?
      disabled: false,

      // Timeout (in milliseconds) when making requests.
      timeout: 30000
    });
  }

  Meteor.startup(function() {
    document.title = "Medallia";
    $('head').append('<link href="/med_favicon.png" rel="shortcut icon" type="image/x-icon" />');
    scroll_to_top();

    bind_get_started = function() {
      ie_version = isIE();
      if (is_explorer && ie_version <= 9) {
        $('.ie-placeholder').removeClass('hidden');
      }

      bind_setup_honey_badger();
      try {
      $(".home-content").addClass("hidden");
      $(".question").addClass("hidden");
      $("#question_1").removeClass("hidden").addClass("active");
      $(".question-number").text("1");
      $(".navigation-buttons").removeClass("hidden");
      $(".circle-plain").addClass("hidden");
      $(".progress").removeClass("hidden").fadeIn();
      update_progress_bar(1);
      update_iframe_height();

      } catch (error) {
        Honeybadger.notify(error);
      }
    };

    update_next_btn_text = function() {
      question_number = $(".question.active").data("number")

      if(question_number == MAX_QUESTIONS - 1)
        $(".next").text("Finish")
      else
        $(".next").text("Next")
    }

    bind_show_next_question = function() {
      try {
      if($(".question.active").length == 0){
        return bind_get_started();
      }else if($(".active input:radio:checked").length == 0){
        return false;
      }

      scroll_to_top();

      question_number = $(".question.active").data("number");
      next_question_number = question_number + 1;

      if(question_number == MAX_QUESTIONS && $("input:radio:checked").length == MAX_QUESTIONS){
        return bind_show_lead_form();
      }

      update_next_btn_text();

      if(question_number < 1){
        return alert("Question number is not valid");
      }else if(question_number > MAX_QUESTIONS - 1){
        return alert("There are no next questions");
      }

      $(".question-number").text(next_question_number);
      $(".question").addClass("hidden").removeClass("active");
      $("#question_" + next_question_number).removeClass("hidden").addClass("active");
      update_progress_bar(next_question_number);
      } catch (error) {
        Honeybadger.notify(error);
      }
    };

    bind_show_previous_question = function() {
      try {
      if($(".question.active").length == 0){
        return bind_get_started();
      }

      question_number = $(".question.active").data("number");
      prev_question_number = question_number - 1;

      if(question_number < 1){
        return alert("There are no previous questions");
      }else if(question_number == 1){
        $(".question").addClass("hidden");
        $(".navigation-buttons").addClass("hidden");
        $(".home-content").removeClass("hidden");
        $(".progress").addClass("hidden");
      }else if(question_number > MAX_QUESTIONS){
        return alert("Questions should not be more than " + MAX_QUESTIONS);
      }

      update_next_btn_text();

      $(".question-number").text(prev_question_number);
      $(".question").addClass("hidden").removeClass("active");
      $("#question_" + prev_question_number).removeClass("hidden").addClass("active");
      update_progress_bar(prev_question_number);
      } catch (error) {
        Honeybadger.notify(error);
      }
    };

    bind_show_lead_form = function() {
      try {
      bind_validate_lead_form();
      $(".lead-form-info").removeClass("hidden");
      $(".progress").addClass("hidden");
      $(".lead-form").removeClass("hidden");
      $(".combo-icons").removeClass("hidden");
      $(".question").addClass("hidden");
      $(".navigation-buttons").addClass("hidden");
      $(".lead-form-icon").removeClass("hidden");
      } catch (error) {
        Honeybadger.notify(error);
      }
    }
  });
}
