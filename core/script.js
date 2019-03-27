var jsonObj = [];

$(window).on("load", function() {

    var test = $.getJSON("./app.json", function(data) {
        var fieldTwo = Object.getOwnPropertyNames(data[1].topics);
        var str2 = '';

        str2 += '<legend class="title">' + data[1].title + '</legend>';
        var index = 0;

        _.each(data[1].topics, function(val, key) {
            str2 += '<label> ' + key + '</label> <input type="radio" name="option' + index + '" value="' + val + '" required> Yes <input type="radio" name="option' + index + '" value="0" required> No<br><br>';
            index++;
        });

        $('.field_two').append(str2);

        var str3 = '';

        str3 += '<legend class="title">' + data[2].title + '</legend>';

        for (var i = 0; i < data[2].topics.length; i++) {
            str3 += '<label> ' + _.keys(data[2].topics[i])[0] + ':</label>  <select id="solution_' + i + '" required> ';
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
        var isFilled = true;
        var isChecked = true;
        var isSelected = true;

        _.each($('.field_one').find("input"), function(item) {
            if ($(item).val() == "") {
                isFilled = false;
            }
        });

        if ($('.field_two').find('input[type="radio"]:checked').length != $('.field_two').find("input").length / 2) {
            isChecked = false;
        }

        $("select").each(function() {
            var element = $(this);
            if (element.val() == null) {
                isSelected = false;
            }
        });

        if (isFilled && isChecked && isSelected) {
            var estimatedHours = 0;
            var plotPlanSize = $('#Plot_Plan_Size option:selected').val();
            var plotPlanComplexity = $('#Plot_Plan_Complexity option:selected').val();
            var solutionConfigHours = 0;

            _.each($('.field_three').find('select'), function(item) {
                solutionConfigHours += Number($(item).val())
            });

            var deliverablesHours = 0;
            _.each($(".field_two").find("input:checked"), function(item) {
                deliverablesHours += Number($(item).val());
            });

            $('select').attr('disabled', 'disabled');
            $('input').attr('disabled', 'disabled');

            estimatedHours = Math.round(plotPlanComplexity * plotPlanSize * (deliverablesHours + solutionConfigHours));

            $('.showResult').text(estimatedHours);
        } else {
            return;
        }
    })
})
