function prev() {
    $('.carousel').carousel('prev')
}

function next() {
    $('.carousel').carousel('next')
}

var changeLanguage = function (s) {
    localStorage.setItem("language", s);
}

$(document).ready(function () {
    $("#body").removeClass("d-none")
    setTimeout(function () {
        $("#top").removeClass("top")
    }, 100);
    setTimeout(function () {
        $(".move").removeClass("move");
    }, 700);
    setTimeout(function () {
        $("#bot").addClass("bot");
    }, 100);

    var searchParams = new URLSearchParams(window.location.search)
    var param = searchParams.get('active')
    if (!param) {
        param = '0'
    }
    var selector = '.a-' + param
    var elements = $(selector);
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i];
        e.classList.add("active");
    };
});