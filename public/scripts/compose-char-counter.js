$(document).ready(function() {
    $(".new-tweet textarea").keydown(function (event) {
        setTimeout( () => {
            const length = this.value.length;
            const counter = $(this).parent().children(".counter");
            counter.text(140 - length);
            if(length > 140){
                counter.addClass("over");
            }
            else if (length <= 140){
             counter.removeClass("over");
            }
        });
    });
});

