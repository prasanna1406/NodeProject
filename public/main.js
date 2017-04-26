$(document).ready(function() {
    $('.quote-btn').click(function() {
        $.ajax({
            type: 'post',
            url: '/quote/new',
            dataType: 'json',
            success: function(res) {
                response = JSON.parse(res);
                console.log('-----res: ' + response.quote);
                console.log('-----res: ' + response.author);
                $('.quote').html((response.quote));
                $('.author').html((response.author));
            }
        });
    });
});

var sourcesList = [];

$(document).ready(function() {
    // $.ajax({
    //     type: 'get',
    //     url: '/news/getsources',
    //     dataType: 'json',
    //     success: function(res) {
    //         response = JSON.parse(res);

    //         for (var i = 0; i < response.sources.length; i++) {
    //             $('#sources').append($('<option>', {
    //                 value: response.sources[i].id,
    //                 text: response.sources[i].name
    //             }));
    //         }
    //     }
    // });

    // $('#sources').change(function() {
    //     if ($('#sources').val() != "") {
    //         $('.show-news').html("");
    //         $('.show-news').addClass('loader');
    //         $.ajax({
    //             type: 'post',
    //             data: {
    //                 'source': $('#sources').val()
    //             },
    //             url: '/news/getnewsbysouces',
    //             dataType: 'json',
    //             success: function(res) {
    //                 response = JSON.parse(res);
    //                 console.log(response);
    //                 var container = '';
    //                 for (var i = 0; i < response.articles.length; i++) {
    //                     container += "<div class='col-md-6'>" +
    //                         "<h3 class='title'>" + response.articles[i].title + "</h3>" +
    //                         "<img class='img-size' src='" + response.articles[i].urlToImage + "'></img>" +
    //                         "<p class=''>" + response.articles[i].description + "</p>" +
    //                         "<p class='col-md-3'><a target='_blank' href='" + response.articles[i].url + "'>More info</a></p>" +
    //                         "</div>";
    //                 }
    //                 $('.show-news').removeClass('loader');
    //                 $('.show-news').html(container);

    //             }
    //         });
    //     }
    // });

    $('#sourceshandle').change(function() {
        if ($('#sourceshandle').val() != "") {
            $('.show-news').html("");
            $('.show-news').addClass('loader');
            $.ajax({
                type: 'post',
                data: {
                    'source': $('#sourceshandle').val()
                },
                url: '/news/getnewsbysouces',
                dataType: 'json',
                success: function(res) {
                    response = JSON.parse(res);
                    console.log(response);
                    var container = '';
                    for (var i = 0; i < response.articles.length; i++) {
                        container += "<div class='col-md-6'>" +
                            "<h3 class='title'>" + response.articles[i].title + "</h3>" +
                            "<img class='img-size' src='" + response.articles[i].urlToImage + "'></img>" +
                            "<p class=''>" + response.articles[i].description + "</p>" +
                            "<p class='col-md-3'><a target='_blank' href='" + response.articles[i].url + "'>More info</a></p>" +
                            "</div>";
                    }
                    $('.show-news').removeClass('loader');
                    $('.show-news').html(container);

                }
            });
        }
    });

    // jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    // jQuery('.quantity').each(function() {
    //     var spinner = jQuery(this),
    //         input = spinner.find('input[type="number"]'),
    //         btnUp = spinner.find('.quantity-up'),
    //         btnDown = spinner.find('.quantity-down'),
    //         min = input.attr('min'),
    //         max = input.attr('max');

    //     btnUp.click(function() {
    //         var oldValue = parseFloat(input.val());
    //         if (oldValue >= max) {
    //             var newVal = oldValue;
    //         } else {
    //             var newVal = oldValue + 1;
    //         }
    //         spinner.find("input").val(newVal);
    //         spinner.find("input").trigger("change");
    //     });

    //     btnDown.click(function() {
    //         var oldValue = parseFloat(input.val());
    //         if (oldValue <= min) {
    //             var newVal = oldValue;
    //         } else {
    //             var newVal = oldValue - 1;
    //         }
    //         spinner.find("input").val(newVal);
    //         spinner.find("input").trigger("change");
    //     });

    // });

    $("input[name='options']").change(function() {
        $('input[type="checkbox"]:checked').prop('checked', false);
        if (this.id == 'by-time-slot') {
            $("#by-frequency-d").css("display", "none");
            $("#by-time-slot-d").css("display", "block");
        } else {
            $("#frequency").val(1);
            $("#period").val("Day(s)");
            $("#by-frequency-d").css("display", "block");
            $("#by-time-slot-d").css("display", "none");
        }
    });


    // var selected = [];
    // $(".save-btn").click(function() {

    //     var selectedOption = $('input[name=options]:checked').val();
    //     if (selectedOption === 'byTime') {
    //         $("input:checkbox[name=timeSlot]:checked").each(function() {
    //             selected.push($(this).val());
    //         });
    //     } else {
    //         var frequency = $("#frequency").val();
    //         var period = $("#period").val();
    //         selected.push(frequency);
    //         selected.push(period);
    //     }
    //     alert(selected);
    //     $.ajax({
    //         type: 'post',
    //         url: '/assignment/showSelectedScedule',
    //         data: {
    //             selected: JSON.stringify(selected)
    //         },
    //         success: function(res) {
    //             response = JSON.parse(res);
    //         }
    //     });

    // });

    $("#byTimeBtn").click(function() {
        var size = $("input:checkbox[name=timeSlot]:checked").length;
        if (size > 0) {
            $("#slotError").text("");
            return true;
        } else {
            // $("#slotError").text("Please select atleast one slot");
            // return false;
        }
    });
    $("#byFrequencyBtn").click(function() {

    })


    jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function() {
        var spinner = jQuery(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find('.quantity-up'),
            btnDown = spinner.find('.quantity-down'),
            min = input.attr('min'),
            max = input.attr('max');

        btnUp.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue >= max) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

        btnDown.click(function() {
            var oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                var newVal = oldValue;
            } else {
                var newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });

    });

});