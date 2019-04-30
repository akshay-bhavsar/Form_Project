$(window).on("load", function() {

    var test = $.getJSON("./app.json", function(data) {
        var fieldTwo = Object.getOwnPropertyNames(data[1].topics);
        var str2 = '';

        str2 += '<legend class="title">' + data[1].title + '</legend>';
        var index = 0;

        _.each(data[1].topics, function(val, key) {
            str2 += '<label> <b>' + key + '</b> </label> <input type="radio" name="option' + index + '" value="' + val + '" required> Yes <input type="radio" name="option' + index + '" value="0" required> No<br><br>';
            index++;
        });

        $('.field_two').append(str2);

        var str3 = '';

        str3 += '<legend class="title">' + data[2].title + '</legend>';

        for (var i = 0; i < data[2].topics.length; i++) {
            str3 += '<label> <b>' + _.keys(data[2].topics[i])[0] + ':</b></label> <br/>  <select  required  id="solution_' + i + '" multiple="multiple"> ';
            str3 += '<option disabled selected value> -- select an option -- </option>';

            _.each(data[2].topics[i], function(item) {
                _.each(Object.getOwnPropertyNames(item), function(val) {
                    str3 += '<option value="' + item[val] + '">' + val + '</option>'
                });
            });

            str3 += '</select> <br><br>';
        }

        $('.field_three').append(str3);

    });

    $('.submitBtn').on("click", function() {
        var isInputBoxFilled = true;
        var isRadioBtnseleced = true;
        var isDropDownSelected = true;

        _.each($('.field_one').find("input"), function(item) {
            if ($(item).val() == "" && $(item).attr('required')) {
                isInputBoxFilled = false;
            }
        });

        if ($('.field_two').find('input[type="radio"]:checked').length != $('.field_two').find("input").length / 2) {
            isRadioBtnseleced = false;
        }

        $("select").each(function() {
            var element = $(this);
            if (element.val() == null || element.val().length == 0) {
                isDropDownSelected = false;
            }
        });

        if (isInputBoxFilled && isRadioBtnseleced && isDropDownSelected) {
            var estimatedHours = 0;
            var plotPlanSize = $('#Plot_Plan_Size option:selected').val();
            var plotPlanComplexity = $('#Plot_Plan_Complexity option:selected').val();
            var solutionConfigHours = 0;

            _.each($('.field_three').find('select'), function(item) {
                $.each($(item).val(), function() {
                    solutionConfigHours += Number(this);
                })
            });

            var deliverablesHours = 0;
            _.each($(".field_two").find("input:checked"), function(item) {
                deliverablesHours += Number($(item).val());
            });

            $('select').attr('disabled', 'disabled');
            $('input').attr('disabled', 'disabled');
            $('input[type="reset"]').removeAttr('disabled');
            estimatedHours = Math.round(plotPlanComplexity * plotPlanSize * (deliverablesHours + solutionConfigHours));

            $('.showResult').text(estimatedHours);

        } else {
            return;
        }
    })

    $('.resetBtn').on("click", function() {
        $('.showResult').html('');
        $('select').removeAttr('disabled');
        $('input').removeAttr('disabled');
    })
})
