if (Meteor.isClient) {

  is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
  is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
  is_safari = navigator.userAgent.indexOf("Safari") > -1;
  if ((is_chrome)&&(is_safari)) {is_safari=false;}

  function isIE () {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  }

  dowloan_pdf = function(){
    if (is_explorer || is_safari){
      if (is_explorer && isIE() <= 9) {
        alert('Please update your browser as it does not support pdf download.')
      }else{
        generate_using_jspdf()
      }
    }else{
      generate_using_pdfmake()
    }
  }

  generate_using_jspdf = function(){
    (function (api, $) {
      'use strict';
      api.writeText = function (x, y, text, options) {
        options = options || {};
        var defaults = {
          align: 'left',
          width: this.internal.pageSize.width
        }
        var settings = $.extend({}, defaults, options);
        // Get current font size
        var fontSize = this.internal.getFontSize();
        // Get the actual text's width
        /* You multiply the unit width of your string by your font size and divide
         * by the internal scale factor. The division is necessary
         * for the case where you use units other than 'pt' in the constructor
         * of jsPDF.
        */
        var txtWidth = this.getStringUnitWidth(text) * fontSize / this.internal.scaleFactor;
        if (settings.align === 'center')
          x += (settings.width - txtWidth) / 2;
        else if (settings.align === 'right')
          x += (settings.width - txtWidth);

        //default is 'left' alignment
        this.text(text, x, y);
      }
    })(jsPDF.API, jQuery);

    var comprehensive_rating = answer_result_mapping($("#question_12").find("input[type='radio']:checked").val())
    var real_time_rating = answer_result_mapping($("#question_13").find("input[type='radio']:checked").val())
    var representative_rating = answer_result_mapping($("#question_15").find("input[type='radio']:checked").val())
    var customer_friendly_rating = answer_result_mapping($("#question_16").find("input[type='radio']:checked").val())
    var pervasive_rating = answer_result_mapping($("#question_7").find("input[type='radio']:checked").val())
    var relevant_rating = answer_result_mapping($("#question_8").find("input[type='radio']:checked").val())
    var integrated_rating = answer_result_mapping($("#question_14").find("input[type='radio']:checked").val())
    var quantified_rating = answer_result_mapping($("#question_1").find("input[type='radio']:checked").val())
    var executive_led_rating = answer_result_mapping($("#question_2").find("input[type='radio']:checked").val())
    var aligned_rating = answer_result_mapping($("#question_5").find("input[type='radio']:checked").val())
    var embedded_rating = answer_result_mapping($("#question_6").find("input[type='radio']:checked").val())
    var responsive_rating = answer_result_mapping($("#question_9").find("input[type='radio']:checked").val())
    var prioritized_rating = answer_result_mapping($("#question_3").find("input[type='radio']:checked").val())
    var solution_oriented_rating = answer_result_mapping($("#question_10").find("input[type='radio']:checked").val())
    var leveraged_rating = answer_result_mapping($("#question_4").find("input[type='radio']:checked").val())
    var proactive_rating = answer_result_mapping($("#question_11").find("input[type='radio']:checked").val())
    var total_score = see_theme_score + wire_theme_score + drive_theme_score + innovate_theme_score
    // You'll need to make your image into a Data URL
    // Use http://dataurl.net/#dataurlmaker

    var doc = new jsPDF();

    doc.setFont("helvetica");

    doc.addImage(medallia_institute_image, 'PNG', 85, 10, 45, 0);

    doc.setFontSize(20);
    doc.setTextColor('#333333');
    doc.writeText(0, 35, 'Your Operational B2B CEM Maturity Report', { align: 'center' });

    doc.setTextColor('#4098ea');
    doc.writeText(0, 50, 'Your Score: ' + total_score + '/400', { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor('#737272');
    doc.text(20, 60, doc.splitTextToSize("This report summarizes how you perceive your company's current customer experience practices. Each of the first 16 questions you answered maps to one of four business capabilities. These capabilities are proven to improve company performance and drive profitable growth over time.\n\nThere are three components to this report: an overview of the capabilities we are assessing, your aggregate results by capability, and your answers to each question compared to the best practice. Use these results to identify where your business can capitalize on its current strengths as well as where it will need to improve in order to compete and win in the future.", 170));

    doc.addImage(medallia_ocem_circle, 'PNG', 20, 115, 88, 88);

    doc.setTextColor('#4098ea');
    doc.writeText(115, 116, 'See yourself as customers do.', { align: 'left' });

    doc.setTextColor('#737272');
    doc.text(115, 124, doc.splitTextToSize("Companies capture a comprehensive view of the customer's feedback in real time to develop an empathic understanding of customers' needs.", 75));

    doc.setTextColor('#4098ea');
    doc.writeText(115, 145, 'Wire customers into every decision.', { align: 'left' });

    doc.setTextColor('#737272');
    doc.text(115, 153, doc.splitTextToSize('Customer feedback is distributed immediately to the teams that can directly act on it.', 75));

    doc.setTextColor('#4098ea');
    doc.writeText(115, 170, 'Drive accountability at all levels.', { align: 'left' });

    doc.setTextColor('#737272');
    doc.text(115, 178, doc.splitTextToSize('Employees at all levels and across functions are empowered and held accountable for improving the customer experience.', 75));

    doc.setTextColor('#4098ea');
    doc.writeText(115, 200, 'Innovate continuously at scale.', { align: 'left' });

    doc.setTextColor('#737272');
    doc.text(115, 208, doc.splitTextToSize('Companies use customer-driven learning and experimentation to accelerate improvements throughout the company and stay ahead of customer expectations.', 75));

    doc.addPage();

    doc.text(20, 20, doc.splitTextToSize("Start a dialogue about your company’s customer experience practices by encouraging your colleagues to take the assessment at https://ocem-assessment-b2b.medallia.com.\n\n" + "This report will also be sent to the email address you provided at the end of your assessment.", 170));

    doc.setFontSize(22);
    doc.setTextColor('#333333');
    doc.writeText(0, 60, 'Capability Scores', { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor('#737272');
    doc.text(20, 70, doc.splitTextToSize("This section shows your score across each of the four capabilities relative to a maximum score of 100. Learn more about how leading companies have developed these capabilities in the next section of this report.", 170));

    doc.setFontSize(17);
    doc.setTextColor('#333333');
    doc.writeText(0, 90, 'Your Operational CEM Score:', { align: 'center' });
    doc.writeText(0, 97, ''+total_score, { align: 'center' });
    doc.setFontSize(13);
    doc.text(111, 97, '/400');

    doc.setDrawColor(255, 255, 255);
    doc.setFillColor(230, 230, 230);
    doc.rect(40, 118, 130, 52, 'FD');

    doc.setFillColor(17, 179, 232);
    doc.rect(40, 105, 130, 13, 'FD');

    doc.line(135, 105, 135, 170);

    doc.line(40, 105, 170, 105);
    doc.line(40, 118, 170, 118);
    doc.line(40, 131, 170, 131);
    doc.line(40, 144, 170, 144);
    doc.line(40, 157, 170, 157);
    doc.line(40, 170, 170, 170);

    doc.setFontSize(11);
    doc.setTextColor('#ffffff');
    doc.text(80, 113, doc.splitTextToSize("Capability", 100));
    doc.text(140, 113, doc.splitTextToSize("Your Score", 100));
    doc.setTextColor('#333333');
    doc.text(56, 126, doc.splitTextToSize("See yourself as customers do", 100));
    doc.text(56, 139, doc.splitTextToSize("Wire customers into every decision", 100));
    doc.text(56, 152, doc.splitTextToSize("Drive accountability at all levels", 100));
    doc.text(56, 165, doc.splitTextToSize("Innovate continuously at scale", 100));

    doc.text(143, 126, doc.splitTextToSize(see_theme_score+'/100', 15));
    doc.text(143, 139, doc.splitTextToSize(wire_theme_score+'/100', 15));
    doc.text(143, 152, doc.splitTextToSize(drive_theme_score+'/100', 15));
    doc.text(143, 165, doc.splitTextToSize(innovate_theme_score+'/100', 15));

    doc.addImage(see_theme_image, 'PNG', 43, 120, 9, 9);
    doc.addImage(wire_theme_image, 'PNG', 43, 133, 9, 9);
    doc.addImage(drive_theme_image, 'PNG', 43, 146, 9, 9);
    doc.addImage(innovate_theme_image, 'PNG', 43, 159, 9, 9);

    doc.setFontSize(22);
    doc.setTextColor('#333333');
    doc.writeText(0, 186, 'Your Responses and', { align: 'center' });
    doc.writeText(0, 196, 'Practices of Leading Companies', { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor('#737272');
    doc.text(20, 206, doc.splitTextToSize("See how you rated your company on the practices that support each capability", 170));
    doc.text(20, 214, doc.splitTextToSize("Your responses fall into one of five categories:", 170));

    doc.setTextColor('#4098ea');
    doc.setFontSize(14)
    doc.text(20, 220, doc.splitTextToSize("• ", 170));
    doc.setFontSize(11)
    doc.setTextColor('#737272');
    doc.text(23, 220, doc.splitTextToSize("Absent: practices are completely absent", 170));

    doc.setTextColor('#4098ea');
    doc.setFontSize(14)
    doc.text(20, 226, doc.splitTextToSize("• ", 170));
    doc.setFontSize(11)
    doc.setTextColor('#737272');
    doc.text(23, 226, doc.splitTextToSize("Developing: the company has some initial practices in place", 170));

    doc.setTextColor('#4098ea');
    doc.setFontSize(14)
    doc.text(20, 232, doc.splitTextToSize("• ", 170));
    doc.setFontSize(11)
    doc.setTextColor('#737272');
    doc.text(23, 232, doc.splitTextToSize("Deployed: practices are fully enabled", 170));

    doc.setTextColor('#4098ea');
    doc.setFontSize(14)
    doc.text(20, 238, doc.splitTextToSize("• ", 170));
    doc.setFontSize(11)
    doc.setTextColor('#737272');
    doc.text(23, 238, doc.splitTextToSize("Leading-edge: the company is pushing the boundaries in this area", 170));

    doc.setTextColor('#4098ea');
    doc.setFontSize(14)
    doc.text(20, 244, doc.splitTextToSize("• ", 170));
    doc.setFontSize(11)
    doc.setTextColor('#737272');
    doc.text(23, 244, doc.splitTextToSize("Don't know: practices unknown by respondent", 170));

    doc.text(20, 254, doc.splitTextToSize("The descriptions provided illustrate leading-edge practices in each area and can be used to help identify ways to improve", 170));

    doc.addPage()

    doc.line(15, 15, 195, 15);
    doc.line(15, 255, 195, 255);
    doc.line(15, 15, 15, 255);
    doc.line(195, 15, 195, 255);

    doc.setFillColor(240, 240, 240);
    doc.rect(15, 15, 180, 240, 'FD');

    doc.addImage(see_theme_image, 'PNG', 98, 18, 12, 12);

    doc.setFontSize(16);
    doc.setTextColor('#333333');
    doc.writeText(0, 40, 'See yourself as customers do', { align: 'center' });

    doc.setTextColor('#4098ea');
    doc.setFontSize(11)
    doc.text(20, 50, doc.splitTextToSize("Supporting Practices", 125));
    doc.text(160, 50, doc.splitTextToSize("Your Rating", 40));

    doc.setTextColor('#333333');
    doc.text(20, 58, doc.splitTextToSize("Comprehensive: Provide one complete view of the customer experience", 125));
    doc.text(160, 58, doc.splitTextToSize(comprehensive_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 66, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 73, doc.splitTextToSize("The company has a complete view of customer experiences over time. It captures integrated feedback about the overall relationship across all product and service lines and after all key interactions. Feedback is collected from all parties involved at each stage of the customer journey, including business partners and end-users. For example, feedback from multiple stakeholders in a purchasing decision (e.g., procurement, executives) is captured across different points in time and different channels.", 125));

    doc.setTextColor('#333333');
    doc.text(20, 113, doc.splitTextToSize("Real-time: Capture information continuously", 125));
    doc.text(160, 113, doc.splitTextToSize(real_time_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 120, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 128, doc.splitTextToSize("The company receives a continuous, automated flow of feedback to keep a pulse on customer experiences, including real-time feedback initiated by the customer. Solicited feedback is captured immediately following key interactions. Periodic measures such as relationship surveys include a sample of responses on at least a monthly cadence.", 125));

    doc.setTextColor('#333333');
    doc.text(20, 155, doc.splitTextToSize("Representative: Ensure feedback reflects the customer base", 125));
    doc.text(160, 155, doc.splitTextToSize(representative_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 163, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 170, doc.splitTextToSize("Customer experience data is tracked and analyzed by customer segment as well as relevant product or service line. The company has a clear understanding of customer segments, products, and service offerings that are over or under-represented in the data. Representativeness of the data may be improved by targeting under-represented segments when collecting feedback. ‘Silent accounts,’ where no individual provides feedback, are flagged for further investigation.", 125));

    doc.setTextColor('#333333');
    doc.text(20, 205, doc.splitTextToSize("Customer-friendly: Make it easy for customers to give feedback", 125));
    doc.text(160, 205, doc.splitTextToSize(customer_friendly_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 212, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 219, doc.splitTextToSize("All customer stakeholders find it engaging to share feedback with the company. Solicited feedback is complemented with unsolicited feedback, making it easy for customers to give feedback on their terms. Employees systematically capture feedback from customer conversations alongside other formal feedback collection. The company regularly tests innovative feedback collection techniques that are not yet broadly used in the industry. Feedback design is optimized to achieve high response rates.", 125));

    doc.addPage()

    doc.line(15, 15, 195, 15);
    doc.line(15, 260, 195, 260);
    doc.line(15, 15, 15, 260);
    doc.line(195, 15, 195, 260);

    doc.setFillColor(240, 240, 240);
    doc.rect(15, 15, 180, 245, 'FD');

    doc.addImage(wire_theme_image, 'PNG', 98, 18, 12, 12);

    doc.setFontSize(16);
    doc.setTextColor('#333333');
    doc.writeText(0, 40, 'Wire Customers into Every Decision', { align: 'center' });

    doc.setTextColor('#4098ea');
    doc.setFontSize(11)
    doc.text(20, 50, doc.splitTextToSize("Supporting Practices", 125));
    doc.text(160, 50, doc.splitTextToSize("Your Rating", 40));

    doc.setTextColor('#333333');
    doc.text(20, 58, doc.splitTextToSize("Pervasive: Provide customer feedback to every employee ", 125));
    doc.text(160, 58, doc.splitTextToSize(pervasive_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 66, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 73, doc.splitTextToSize("Customer feedback is automatically provided to all stakeholders who impact the customer experience, including non-customer-facing roles. All internal stakeholders from executives to the front line have direct access to customer feedback in formats consistent with how they work today (e.g., mobile app, CRM, call center systems). Direct access is also available for key delivery partners (e.g., distribution partners, franchisees, outsourced vendors).", 125));

    doc.setTextColor('#333333');
    doc.text(20, 108, doc.splitTextToSize("Relevant: Tailor information to the needs of each role", 125));
    doc.text(160, 108, doc.splitTextToSize(relevant_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 116, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 123, doc.splitTextToSize("Feedback is automatically tied to specific individuals and business units that impacted the customer experience, including non-customer-facing roles. Reporting is tailored to support the decision making needs of each role, including alerts that drive teams to take action and escalate issues. For example, the billing department can receive alerts and view reports with feedback from all customers who experienced a billing issue. Similarly, account managers can view account-level feedback from across the customer journey. Dynamic reports provide teams with the flexibility to explore emerging questions.", 125));

    doc.setTextColor('#333333');
    doc.text(20, 169, doc.splitTextToSize("Integrated: Link feedback to customer, operational, and financial data", 125));
    doc.text(160, 169, doc.splitTextToSize(integrated_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 177, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 184, doc.splitTextToSize("Customer responses are automatically linked to customer profile data (including both individual and company information), as well as relevant operational and financial data. These elements can be accessed and analyzed alongside data from non-respondents to understand trends and differences between segments. CRM integrations ensure free flow of information between CRM and customer feedback systems for improved decision making.", 125));

    doc.setTextColor('#333333');
    doc.text(20, 219, doc.splitTextToSize("Quantified: Understand the financial impact of customer experience", 125));
    doc.text(160, 219, doc.splitTextToSize(quantified_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 227, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 234, doc.splitTextToSize("The financial impact of customer experience is understood at all levels of the organization, driving both strategic and operational decisions. Links between customer experience and financial metrics are well understood, enabling informed estimates of the ROI of customer experience improvements (e.g., benefit from reduced churn, impact of increasing share of wallet).", 125));

    doc.addPage()

    doc.line(15, 15, 195, 15);
    doc.line(15, 255, 195, 255);
    doc.line(15, 15, 15, 255);
    doc.line(195, 15, 195, 255);

    doc.setFillColor(240, 240, 240);
    doc.rect(15, 15, 180, 240, 'FD');

    doc.addImage(drive_theme_image, 'PNG', 98, 18, 12, 12);

    doc.setFontSize(16);
    doc.setTextColor('#333333');
    doc.writeText(0, 40, 'Drive Accountability at all Levels', { align: 'center' });

    doc.setTextColor('#4098ea');
    doc.setFontSize(11)
    doc.text(20, 50, doc.splitTextToSize("Supporting Practices", 125));
    doc.text(160, 50, doc.splitTextToSize("Your Rating", 40));

    doc.setTextColor('#333333');
    doc.text(20, 58, doc.splitTextToSize("Executive-Led: Lead with a customer-centric strategy", 125));
    doc.text(160, 58, doc.splitTextToSize(executive_led_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 66, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 73, doc.splitTextToSize("A dedicated customer experience strategy, executive, and team are in place with the authority to drive customer experience initiatives across functions and business units. All executives model customer-centric leadership and collaborate closely with the dedicated customer experience team. Executives invest in and fully understand the business impact of the customer experience.", 125));

    doc.setTextColor('#333333');
    doc.text(20, 104, doc.splitTextToSize("Aligned: Define clear customer experience responsibilities, goals, and success metrics", 125));
    doc.text(160, 104, doc.splitTextToSize(aligned_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 117, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 124, doc.splitTextToSize("Responsibilities and goals are defined for all departments and levels. Goals logically cascade from executives to individual employees and lead to the development and adoption of specific action plans. Everyone knows their impact on customer experience and their role in improving it, including non-customer-facing functions.", 125));

    doc.setTextColor('#333333');
    doc.text(20, 149, doc.splitTextToSize("Embedded: Reinforce the right customer-centric behaviors", 125));
    doc.text(160, 149, doc.splitTextToSize(embedded_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 157, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 164, doc.splitTextToSize("Customer-centric behaviors are deeply embedded through training, coaching, and recognition programs for all roles. Customer feedback is integrated into the regular cadence of meetings, and all employees receive regular coaching from their manager to drive continuous improvement. Customer experience is recognized as a cultural priority, affecting everything from hiring decisions to career advancement.", 125));

    doc.setTextColor('#333333');
    doc.text(20, 195, doc.splitTextToSize("Responsive: Close the loop with customers on a systematic basis", 125));
    doc.text(160, 195, doc.splitTextToSize(responsive_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 203, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 210, doc.splitTextToSize("Systems and workflows are in place to respond to all actionable feedback in a timely manner. Systems automatically route feedback to the appropriate internal owner for follow-up, and allow for reassignment or collaboration across functions or business units based on the nature of the feedback. Peer-to-peer follow-up conversations (e.g., executive to executive) are encouraged, especially for dissatisfied customers. Aggregated account feedback is shared with the customer and embedded into an account action plan. Learning is systematically captured and used to analyze root causes, enabling team-level and cross-functional improvements.", 125));

    doc.addPage()

    doc.line(15, 15, 195, 15);
    doc.line(15, 236, 195, 236);
    doc.line(15, 15, 15, 236);
    doc.line(195, 15, 195, 236);

    doc.setFillColor(240, 240, 240);
    doc.rect(15, 15, 180, 221, 'FD');

    doc.addImage(innovate_theme_image, 'PNG', 98, 18, 12, 12);

    doc.setFontSize(16);
    doc.setTextColor('#333333');
    doc.writeText(0, 40, 'Innovate Continuously at Scale', { align: 'center' });

    doc.setTextColor('#4098ea');
    doc.setFontSize(11)
    doc.text(20, 50, doc.splitTextToSize("Supporting Practices", 125));
    doc.text(160, 50, doc.splitTextToSize("Your Rating", 40));

    doc.setTextColor('#333333');
    doc.text(20, 58, doc.splitTextToSize("Prioritized: Surface high-impact opportunities for improvement", 125));
    doc.text(160, 58, doc.splitTextToSize(prioritized_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 66, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 73, doc.splitTextToSize("The company uses advanced analytics and cost/benefit estimates to prioritize opportunities for improvement. Methods such as regression analysis or text analytics are used to determine the relative impact of underlying drivers (e.g., ease of renewal) on overall customer experience metrics. Potential solutions are evaluated considering their financial benefits as well as the costs to implement and maintain.", 125));

    doc.setTextColor('#333333');
    doc.text(20, 104, doc.splitTextToSize("Solution-Oriented: Address the root cause of problems, not just symptoms", 125));
    doc.text(160, 104, doc.splitTextToSize(solution_oriented_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 117, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 124, doc.splitTextToSize("Departments and cross-functional teams systematically identify and address root causes of dissatisfaction across accounts and within specific accounts. Improvement initiatives are used as an opportunity to fix problems and to create new and differentiated experiences (e.g., customer experience teams collaborate with Lean Six Sigma and innovation specialists to create customer solutions).", 125));

    doc.setTextColor('#333333');
    doc.text(20, 154, doc.splitTextToSize("Leveraged: Leverage scale to uncover effective practices", 125));
    doc.text(160, 154, doc.splitTextToSize(leveraged_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 162, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 169, doc.splitTextToSize("The organization has a systematic process for observing and learning from top-performing teams or business units. There is a dedicated team that works to document learnings and embed them within training, process guidelines, and standards. Additionally, peer-to-peer learning and knowledge sharing happens frequently and speeds the pace of learning and practice improvement by leveraging the scale of the business.", 125));

    doc.setTextColor('#333333');
    doc.text(20, 203, doc.splitTextToSize("Proactive: Test and validate product and service innovations", 125));
    doc.text(160, 203, doc.splitTextToSize(proactive_rating, 40));

    doc.setTextColor('#737272');
    doc.text(20, 211, doc.splitTextToSize("Leading-edge description:", 125));

    doc.text(20, 218, doc.splitTextToSize("The company uses customer feedback to evaluate process, product, and service innovations leveraging test/control methods. Multiple innovations are developed and tested proactively across teams to stay ahead of customer expectations and competitors.", 125));

    if(comment_body.length > 0){
      doc.addPage()

      doc.line(15, 15, 195, 15);
      doc.line(15, 233, 195, 233);
      doc.line(15, 15, 15, 233);
      doc.line(195, 15, 195, 233);

      doc.setFillColor(240, 240, 240);
      doc.rect(15, 15, 180, 218, 'FD');

      doc.setFontSize(16);
      doc.text(58, 30, doc.splitTextToSize("Your View of Customer Experience Success:"));
      doc.setFontSize(11);
      doc.text(25, 50, doc.splitTextToSize(comment_body, 160));
    }

    doc.output('save', 'OCEM_result.pdf');
  }

  generate_using_pdfmake = function(){
    var comprehensive_rating = answer_result_mapping($("#question_12").find("input[type='radio']:checked").val())
    var real_time_rating = answer_result_mapping($("#question_13").find("input[type='radio']:checked").val())
    var representative_rating = answer_result_mapping($("#question_15").find("input[type='radio']:checked").val())
    var customer_friendly_rating = answer_result_mapping($("#question_16").find("input[type='radio']:checked").val())
    var pervasive_rating = answer_result_mapping($("#question_7").find("input[type='radio']:checked").val())
    var relevant_rating = answer_result_mapping($("#question_8").find("input[type='radio']:checked").val())
    var integrated_rating = answer_result_mapping($("#question_14").find("input[type='radio']:checked").val())
    var quantified_rating = answer_result_mapping($("#question_1").find("input[type='radio']:checked").val())
    var executive_led_rating = answer_result_mapping($("#question_2").find("input[type='radio']:checked").val())
    var aligned_rating = answer_result_mapping($("#question_5").find("input[type='radio']:checked").val())
    var embedded_rating = answer_result_mapping($("#question_6").find("input[type='radio']:checked").val())
    var responsive_rating = answer_result_mapping($("#question_9").find("input[type='radio']:checked").val())
    var prioritized_rating = answer_result_mapping($("#question_3").find("input[type='radio']:checked").val())
    var solution_oriented_rating = answer_result_mapping($("#question_10").find("input[type='radio']:checked").val())
    var leveraged_rating = answer_result_mapping($("#question_4").find("input[type='radio']:checked").val())
    var proactive_rating = answer_result_mapping($("#question_11").find("input[type='radio']:checked").val())
    var total_score = see_theme_score + wire_theme_score + drive_theme_score + innovate_theme_score

    pdfMake.fonts = {
      Roboto: {
        normal: 'Helvetica-Normal.ttf',
        bold: 'Helvetica-Normal.ttf',
      }
    };

    table_layout = {
      hLineWidth: function(i, node) { return (i === 0 || i === node.table.body.length) ? 1 : 0; },
      vLineWidth: function(i, node) { return (i === 0 || i === node.table.widths.length) ? 1 : 0; },
      hLineColor: function(i, node) { return "#737272" },
      vLineColor: function(i, node) { return "#737272" },
      paddingLeft: function(i, node) { return 20; },
      paddingRight: function(i, node) { return 20; },
      paddingTop: function(i, node) { return 5; },
      paddingBottom: function(i, node) { return 5; },
    }

    if (comment_body.length > 0)
      comment_section = {
        style: 'tableExample',
        table: {
          widths: [ '*' ],
          body: [
            [ { text: "Your View of Customer Experience Success:", alignment: 'center', style: 'h2', margin: [0, 15, 0, 0] } ],
            [ { text: comment_body, color: "#737272", fontSize: 11, lineHeight: 1.3 } ],
          ]
        },
        fillColor: '#F0F0F0',
        layout: table_layout,
      }
    else
      comment_section = []

    var docDefinition = {
      pageSize: 'A4',
      pageMargins: [ 60, 35, 60, 20 ],
      content: [
        { image: medallia_institute_image, width: 130, margin: [0, 0, 0, 30], alignment: 'center' },
        { text: "Your Operational B2B CEM Maturity Report", style: 'h1', margin: [0, 0, 0, 20] },
        { text: [{ text: "Your Score: " + total_score, style: 'h1', color: '#4098ea' }, { text: "/400", style: 'sub', fontSize: 13, color: '#4098ea' }]},
        { text: "This report summarizes how you perceive your company's current customer experience practices. Each of the first 16 questions you answered maps to one of four business capabilities. These capabilities are proven to improve company performance and drive profitable growth over time.", style: 'p', alignment: 'left', margin: [0, 10, 0, 0], lineHeight: 1.6 },
        { text: "There are three components to this report: an overview of the capabilities we are assessing, your aggregate results by capability, and your answers to each question compared to the best practice. Use these results to identify where your business can capitalize on its current strengths as well as where it will need to improve in order to compete and win in the future.", style: 'p', alignment: 'left', lineHeight: 1.6 },
        {
          alignment: 'justify',
          columns: [
            { image: medallia_ocem_circle, width: 250, margin: [0, 40, 0, 0] },
            {
              table: {
                body: [
                  [{ text: 'See yourself as customers do.', style: 'tableHeader' }],
                  [{ text: "Companies capture a comprehensive view of the customer's feedback in real time to develop an empathic understanding of customers’ needs.", style: 'p', alignment: 'left' }],
                  [{ text: 'Wire customers into every decision.', style: 'tableHeader' }],
                  [{ text: 'Customer feedback is distributed immediately to the teams that can directly act on it.', style: 'p', alignment: 'left' }],
                  [{ text: 'Drive accountability at all levels.', style: 'tableHeader' }],
                  [{ text: 'Employees at all levels and across functions are empowered and held accountable for improving the customer experience.', style: 'p', alignment: 'left' }],
                  [{ text: 'Innovate continuously at scale.', style: 'tableHeader' }],
                  [{ text: 'Companies use customer-driven learning and experimentation to accelerate improvements throughout the company and stay ahead of customer expectations.', style: 'p', alignment: 'left' }],
                ]
              },
              margin: [15, 40, 0, 0],
              layout: 'noBorders',
              pageBreak: 'after'
            },
          ]
        },
        { text: "Start a dialogue about your company’s customer experience practices by encouraging your colleagues to take the assessment at https://ocem-assessment-b2b.medallia.com.", style: 'p', margin: [0, 15, 0, 0], alignment: 'left' },
        { text: "This report will also be sent to the email address you provided at the end of your assessment.", style: 'p', margin: [0, 15, 0, 0], alignment: 'paddingLeft' },

        { text: "Capability Scores", style: 'h1', margin: [0, 20, 0, 15], fontSize: 24 },
        { text: "This section shows your score across each of the four capabilities relative to a maximum score of 100. Learn more about how leading companies have developed these capabilities in the next section of this report.", style: 'p', alignment: 'left', margin: [0, 0, 0, 10] },
        { text: "Your Operational CEM Score:  ", style: 'h2', alignment: 'center' },
        { text: [{ text: " " + total_score, style: 'h2', alignment: 'center' }, { text: "/400", style: 'sub', fontSize: 12 }] },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [ 270, 70 ],
            body: [
              [{ text: 'Capability', style: 'scoreTableHeader' }, { text: 'Your Score', style: 'scoreTableHeader' }],
              [
                {
                  table: {
                    body: [[{ image: see_theme_image, width: 25 }, { text: "See yourself as customers do", style: 'cell', fontSize: 10, bold: false }]]
                  }, layout: 'noBorders'
                },
                { table: { body: [[{ text: see_theme_score.toString()+'/100', style: 'cell', margin: [8, 5, 0, 5] }]] }, layout: 'noBorders' },
              ],
              [
                {
                  table: {
                    body: [[{ image: wire_theme_image, width: 25 }, { text: "Wire customers into every decision", style: 'cell', fontSize: 10, bold: false }]]
                  }, layout: 'noBorders'
                },
                { table: { body: [[{ text: wire_theme_score.toString()+'/100', style: 'cell', margin: [8, 5, 0, 5] }]] }, layout: 'noBorders' },
              ],
              [
                {
                  table: {
                    body: [[{ image: drive_theme_image, width: 25 }, { text: "Drive accountability at all levels", style: 'cell', fontSize: 10, bold: false }]]
                  }, layout: 'noBorders'
                },
                { table: { body: [[{ text: drive_theme_score.toString()+'/100', style: 'cell', margin: [8, 5, 0, 5] }]] }, layout: 'noBorders' },
              ],
              [
                {
                  table: {
                    body: [[{ image: innovate_theme_image, width: 25 }, { text: "Innovate continuously at scale", style: 'cell', fontSize: 10, bold: false }]]
                  }, layout: 'noBorders'
                },
                { table: { body: [[{ text: innovate_theme_score.toString()+'/100', style: 'cell', margin: [8, 5, 0, 5] }]] }, layout: 'noBorders' },
              ],
            ]
          },
          margin: [55, 20, 0, 25],
          fillColor: "#e6e6e6",
          layout: 'noBorders',
          layout: {
            hLineColor: function(i, node) { return 'white' },
            vLineColor: function(i, node) { return 'white' },
          }
        },

        { text: "Your Responses and \nPractices of Leading Companies", style: 'h1', margin: [0, 0, 0, 10], fontSize: 24 },
        { text: "See how you rated your company on the practices that support each capability.", style: 'p', alignment: 'left' },
        { text: "Your responses fall into one of five categories:", style: 'p' },
        { text: [
            { text: "• ", color: "#4098ea", fontSize: 17 },
            { text: "Absent: ", bold: true, color: "#737272", fontSize: 11, lineHeight: 1.3 },
            { text: "practices are completely absent", color: "#737272", fontSize: 11, lineHeight: 1.3 },
          ]
        },
        { text: [
            { text: "• ", color: "#4098ea", fontSize: 17 },
            { text: "Developing: ", bold: true, color: "#737272", fontSize: 11, lineHeight: 1.3 },
            { text: "the company has some initial practices in place", color: "#737272", fontSize: 11, lineHeight: 1.3 },
          ]
        },
        { text: [
            { text: "• ", color: "#4098ea", fontSize: 17 },
            { text: "Deployed: ", bold: true, color: "#737272", fontSize: 11, lineHeight: 1.3 },
            { text: "practices are fully enabled", color: "#737272", fontSize: 11, lineHeight: 1.3 },
          ]
        },
        { text: [
            { text: "• ", color: "#4098ea", fontSize: 17 },
            { text: "Leading-edge: ", bold: true, color: "#737272", fontSize: 11, lineHeight: 1.3 },
            { text: "the company is pushing the boundaries in this area", color: "#737272", fontSize: 11, lineHeight: 1.3 },
          ]
        },
        { text: [
            { text: "• ", color: "#4098ea", fontSize: 17 },
            { text: "Don't know: ", bold: true, color: "#737272", fontSize: 11, lineHeight: 1.3 },
            { text: "practices unknown by respondent", color: "#737272", fontSize: 11, lineHeight: 1.3 },
          ], margin: [0, 0, 0, 15]
        },
        { text: "The descriptions provided illustrate leading-edge practices in each area and can be used to help identify ways to improve.", style: 'p', margin: [0, 0, 0, 10], fontSize: 11, pageBreak: 'after' },

        {
          style: 'tableExample',
          table: {
            body: [
              [{ image: see_theme_image, width: 35, alignment: 'center' }],
              [{ text: "See yourself as customers do", margin: [0, 5, 0, 0], style: 'h2' }],
              [
                {
                  style: 'tableExample',
                  table: {
                    headerRows: 1,
                    widths: [ '*', 95 ],
                    body: [
                      [ { text: 'Supporting Practices', style: 'themeTableHeader' }, { text: 'Your Rating', style: 'themeTableHeader' }],
                      [ { text: 'Comprehensive: Provide one complete view of the customer experience', style: 'question_result' }, { text: comprehensive_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'The company has a complete view of customer experiences over time. It captures integrated feedback about the overall relationship across all product and service lines and after all key interactions. Feedback is collected from all parties involved at each stage of the customer journey, including business partners and end-users. For example, feedback from multiple stakeholders in a purchasing decision (e.g., procurement, executives) is captured across different points in time and different channels.', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],

                      [ { text: 'Real-time: Capture information continuously', style: 'question_result' }, { text: real_time_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'The company receives a continuous, automated flow of feedback to keep a pulse on customer experiences, including real-time feedback initiated by the customer. Solicited feedback is captured immediately following key interactions. Periodic measures such as relationship surveys include a sample of responses on at least a monthly cadence.', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],

                      [ { text: 'Representative: Ensure feedback reflects the customer base', style: 'question_result' }, { text: representative_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'Customer experience data is tracked and analyzed by customer segment as well as relevant product or service line. The company has a clear understanding of customer segments, products, and service offerings that are over or under-represented in the data. Representativeness of the data may be improved by targeting under-represented segments when collecting feedback. ‘Silent accounts,’ where no individual provides feedback, are flagged for further investigation.', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],

                      [ { text: 'Customer-friendly: Make it easy for customers to give feedback', style: 'question_result' }, { text: customer_friendly_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'All customer stakeholders find it engaging to share feedback with the company. Solicited feedback is complemented with unsolicited feedback, making it easy for customers to give feedback on their terms. Employees systematically capture feedback from customer conversations alongside other formal feedback collection. The company regularly tests innovative feedback collection techniques that are not yet broadly used in the industry. Feedback design is optimized to achieve high response rates.', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                    ]
                  },
                  margin: [0, 5, 0, 0],
                  layout: 'noBorders',
                },
              ],
            ]
          },
          pageBreak: "after",
          fillColor: '#F0F0F0',
          layout: table_layout
        },

        {
          style: 'tableExample',
          table: {
            body: [
              [{ image: wire_theme_image, width: 35, alignment: 'center' }],
              [{ text: "Wire Customers into Every Decision", margin: [0, 5, 0, 0], style: 'h2' }],
              [
                {
                  style: 'tableExample',
                  table: {
                    headerRows: 1,
                    widths: [ '*', 95 ],
                    body: [
                      [ { text: 'Supporting Practices', style: 'themeTableHeader' }, { text: 'Your Rating', style: 'themeTableHeader' }],
                      [ { text: 'Pervasive: Provide customer feedback to every employee', style: 'question_result' }, { text: pervasive_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'Customer feedback is automatically provided to all stakeholders who impact the customer experience, including non-customer-facing roles. All internal stakeholders from executives to the front line have direct access to customer feedback in formats consistent with how they work today (e.g., mobile app, CRM, call center systems). Direct access is also available for key delivery partners (e.g., distribution partners, franchisees, outsourced vendors).', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],

                      [ { text: 'Relevant: Tailor information to the needs of each role', style: 'question_result' }, { text: relevant_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'Feedback is automatically tied to specific individuals and business units that impacted the customer experience, including non-customer-facing roles. Reporting is tailored to support the decision making needs of each role, including alerts that drive teams to take action and escalate issues. For example, the billing department can receive alerts and view reports with feedback from all customers who experienced a billing issue. Similarly, account managers can view account-level feedback from across the customer journey. Dynamic reports provide teams with the flexibility to explore emerging questions.', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],

                      [ { text: 'Integrated: Link feedback to customer, operational, and financial data', style: 'question_result' }, { text: integrated_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'Customer responses are automatically linked to customer profile data (including both individual and company information), as well as relevant operational and financial data. These elements can be accessed and analyzed alongside data from non-respondents to understand trends and differences between segments. CRM integrations ensure free flow of information between CRM and customer feedback systems for improved decision making.', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],

                      [ { text: 'Quantified: Understand the financial impact of customer experience', style: 'question_result' }, { text: quantified_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'The financial impact of customer experience is understood at all levels of the organization, driving both strategic and operational decisions. Links between customer experience and financial metrics are well understood, enabling informed estimates of the ROI of customer experience improvements (e.g., benefit from reduced churn, impact of increasing share of wallet).', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                    ]
                  },
                  margin: [0, 10, 0, 0],
                  layout: 'noBorders',
                },
              ],
            ]
          },
          pageBreak: "after",
          fillColor: '#F0F0F0',
          layout: table_layout
        },

        {
          style: 'tableExample',
          table: {
            body: [
              [{ image: drive_theme_image, width: 35, alignment: 'center' }],
              [{ text: "Drive Accountability at all Levels", margin: [0, 10, 0, 0], style: 'h2' }],
              [
                {
                  style: 'tableExample',
                  table: {
                    headerRows: 1,
                    widths: [ '*', 95 ],
                    body: [
                      [ { text: 'Supporting Practices', style: 'themeTableHeader' }, { text: 'Your Rating', style: 'themeTableHeader' }],
                      [ { text: 'Executive-Led: Lead with a customer-centric strategy', style: 'question_result' }, { text: executive_led_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'A dedicated customer experience strategy, executive, and team are in place with the authority to drive customer experience initiatives across functions and business units. All executives model customer-centric leadership and collaborate closely with the dedicated customer experience team. Executives invest in and fully understand the business impact of the customer experience.', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],

                      [ { text: 'Aligned: Define clear customer experience responsibilities, goals, and success metrics', style: 'question_result' }, { text: aligned_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'Responsibilities and goals are defined for all departments and levels. Goals logically cascade from executives to individual employees and lead to the development and adoption of specific action plans. Everyone knows their impact on customer experience and their role in improving it, including non-customer-facing functions.', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],

                      [ { text: 'Embedded: Reinforce the right customer-centric behaviors', style: 'question_result' }, { text: embedded_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'Customer-centric behaviors are deeply embedded through training, coaching, and recognition programs for all roles. Customer feedback is integrated into the regular cadence of meetings, and all employees receive regular coaching from their manager to drive continuous improvement. Customer experience is recognized as a cultural priority, affecting everything from hiring decisions to career advancement.', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],

                      [ { text: 'Responsive: Close the loop with customers on a systematic basis', style: 'question_result' }, { text: responsive_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'Systems and workflows are in place to respond to all actionable feedback in a timely manner. Systems automatically route feedback to the appropriate internal owner for follow-up, and allow for reassignment or collaboration across functions or business units based on the nature of the feedback. Peer-to-peer follow-up conversations (e.g., executive to executive) are encouraged, especially for dissatisfied customers. Aggregated account feedback is shared with the customer and embedded into an account action plan. Learning is systematically captured and used to analyze root causes, enabling team-level and cross-functional improvements.', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                    ]
                  },
                  margin: [0, 20, 0, 0],
                  layout: 'noBorders',
                },
              ],
            ]
          },
          pageBreak: "after",
          fillColor: '#F0F0F0',
          layout: table_layout
        },

        {
          style: 'tableExample',
          table: {
            body: [
              [{ image: innovate_theme_image, width: 35, alignment: 'center' }],
              [{ text: "Innovate Continuously at Scale", margin: [0, 15, 0, 0], style: 'h2' }],
              [
                {
                  style: 'tableExample',
                  table: {
                    headerRows: 1,
                    widths: [ '*', 95 ],
                    body: [
                      [ { text: 'Supporting Practices', style: 'themeTableHeader' }, { text: 'Your Rating', style: 'themeTableHeader' }],
                      [ { text: 'Prioritized: Surface high-impact opportunities for improvement', style: 'question_result' }, { text: prioritized_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'The company uses advanced analytics and cost/benefit estimates to prioritize opportunities for improvement. Methods such as regression analysis or text analytics are used to determine the relative impact of underlying drivers (e.g., ease of renewal) on overall customer experience metrics. Potential solutions are evaluated considering their financial benefits as well as the costs to implement and maintain.', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],

                      [ { text: 'Solution-Oriented: Address the root cause of problems, not just symptoms', style: 'question_result' }, { text: solution_oriented_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'Departments and cross-functional teams systematically identify and address root causes of dissatisfaction across accounts and within specific accounts. Improvement initiatives are used as an opportunity to fix problems and to create new and differentiated experiences \n(e.g., customer experience teams collaborate with Lean Six Sigma and innovation specialists to create customer solutions).', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],

                      [ { text: 'Leveraged: Leverage scale to uncover effective practices', style: 'question_result' }, { text: leveraged_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'The organization has a systematic process for observing and learning from top-performing teams or business units. There is a dedicated team that works to document learnings and embed them within training, process guidelines, and standards. Additionally, peer-to-peer learning and knowledge sharing happens frequently and speeds the pace of learning and practice improvement by leveraging the scale of the business.', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],

                      [ { text: 'Proactive: Test and validate product and service innovations', style: 'question_result' }, { text: proactive_rating, style: 'question_result' } ],
                      [ { text: 'Leading-edge description:', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                      [ { text: 'The company uses customer feedback to evaluate process, product, and service innovations leveraging test/control methods. Multiple innovations are developed and tested proactively across teams to stay ahead of customer expectations and competitors.', color: "#737272", fontSize: 11, lineHeight: 1.3 }, "" ],
                    ]
                  },
                  margin: [0, 20, 0, 0],
                  layout: 'noBorders',
                },
              ],
            ]
          },
          pageBreak: comment_body.length > 0 ? "after" : "",
          fillColor: '#F0F0F0',
          layout: table_layout
        },

        comment_section,
      ],
      styles: {
        font: 'Roboto',
        h1: { fontSize: 20, bold: true, color: "#333333", alignment: 'center' },
        h2: { fontSize: 17, bold: true, color: "#333333", alignment: 'center' },
        p: { color: "#737272", margin: [0, 5, 0, 5], fontSize: 11, lineHeight: 1.3 },
        tableHeader:{ color: "#4098ea", bold: true, alignment: 'left' },
        scoreTableHeader:{ color: "white", margin: [0, 5, 0, 5], bold: true, fillColor: '#4098ea', alignment: 'center' },
        cell: { margin: [0, 5, 0, 5], bold: true },
        theme: { margin: [0, 5, 0, 5] },
        themeTableHeader: { color: "#4098ea", bold: true },
        question_result: { color: "#333333", bold: true, margin: [0, 5, 0, 5] },
        question_title: { bold: true, margin: [0, 10, 0, 0] },
        overall_score: { bold: true, margin: [55, 10, 0, 0] },
        sub: { margin: [-6, 9, 0, 5], bold: true, fontSize: 10 },
      }
    };

    if (is_safari)
      pdfMake.createPdf(docDefinition).open("OCEM_result.pdf");
    else
      pdfMake.createPdf(docDefinition).download("OCEM_result.pdf");
  }
}
