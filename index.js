function prev() {
    $('.carousel').carousel('prev')
}

function next() {
    $('.carousel').carousel('next')
}

var changeLanguage = function (s) {
    localStorage.setItem("language", s);
    var ens = $('.en');
    var vns = $('.vn');
    if ('EN' === s) {
        console.log('ens');
        for (var i = 0; i < ens.length; i++) {
            var e = ens[i];
            e.classList.remove('hide');
        };
        for (var i = 0; i < vns.length; i++) {
            var e = vns[i];
            e.classList.add('hide');
        };
    } else {
        console.log('vns');
        for (var i = 0; i < ens.length; i++) {
            var e = ens[i];
            e.classList.add('hide');
        };
        for (var i = 0; i < vns.length; i++) {
            var e = vns[i];
            e.classList.remove('hide');
        };
    }
}

function readMoreOrLess() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var themText = document.getElementById("them");
    var btnText = document.getElementById("myBtn");
    var btnVnText = document.getElementById("myBtnVn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        btnVnText.innerHTML = "Xem thêm";
        moreText.style.display = "none";
        themText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        btnVnText.innerHTML = "Ẩn bớt";
        moreText.style.display = "inline";
        themText.style.display = "inline";
    }
}

$(document).ready(function () {
    $("#body").removeClass("d-none")
    initMobile();
    setTimeout(function () {
        $("#top").removeClass("top")
    }, 100);
    setTimeout(function () {
        $(".move").removeClass("move");
    }, 700);
    setTimeout(function () {
        $("#bot").addClass("bot");
    }, 100);
    setTimeout(function () {
        $(".hotline-phone-ring-wrap").show();
    }, 2000);
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


    var language = localStorage.getItem("language");
    var ens = $('.en');
    var vns = $('.vn');
    if ('EN' === language) {
        for (var i = 0; i < ens.length; i++) {
            var e = ens[i];
            e.classList.remove('hide');
        };
    } else {
        for (var i = 0; i < vns.length; i++) {
            var e = vns[i];
            e.classList.remove('hide');
        };
    }
});

function goToBasalt() {
    window.location = "/thebasalt.html";
}
function goToFalls() {
    window.location = "/thefalls.html";
}
function goToHaushaus() {
    window.location = "/haushaus.html";
}
function goToHausneo() {
    window.location = "/hausneo.html";
}
function goToLandmark() {
    window.location = "/landmark.html";
}
function goToTheArt() {
    window.location = "/theart.html";
}
function goToNhaTrang() {
    window.location = "/nhatrang.html";
}

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
if (mybutton) {
    mybutton.addEventListener("click", backToTop);
}

function backToTop() {
    window.scroll({ top: 0, behavior: "smooth" })
}

function submit() {
    var firstname = $("#firstname")[0].value
    var lastname = $("#lastname")[0].value
    var message = $("#message")[0].value
    var body = ` ${message}
 Sign: ${firstname} ${lastname} `
    console.log(body)
    var subject = $("#subject")[0].value
    Email.send({
        SecureToken: "77d12216-72b5-41ce-9cdb-a54dff241589",
        To: 'akitephile.studio@gmail.com', //akitephile.studio@gmail.com
        From: "duc0hoang@gmail.com",
        Subject: subject,
        Body: body
    }).then(
        message => alert("Email was send success!")
    );
}

document.onkeydown = function (e) {
    var key = e.key;
    if (key === "ArrowUp" || key === "ArrowLeft") {
        prev();
    }
    if (key === "ArrowDown" || key === "ArrowRight") {
        next();
    }
    if (key === "Escape") {
        var path = window.location.pathname;
        if (path === '/') {
            return;
        }
        if (path.includes('-')) {
            history.back();
            return;
        }
        if (path.includes('project') || path.includes('contact') || path.includes('team')) {
            window.location.href = '/'
            return;
        }
        window.location.href = '/project.html'
    }
};

function initMobile() {
    setTimeout(function () {
        $('#mobile-fun').fadeIn('slow');
    }, 150)
    setTimeout(function () {
        $('#mobile-fun').hide();
        $('#mobile-sad').fadeIn('slow');
    }, 2000)
    setTimeout(function () {
        var language = localStorage.getItem("language");
        if ('EN' === language) {
            $('#mobile-content-en').removeClass("d-none");
        } else {
            $('#mobile-content-vn').removeClass("d-none");
        }
    }, 4000)
    setTimeout(function () {
        $('#mobile-sad').hide();
        $('#mobile-content-en, #mobile-content-vn, .mobile-content').addClass("d-none");
        $('.mobile-content').removeClass('d-flex');
        $('.mobile-content-carousel').fadeIn('slow');
        $('.mobile-top').attr('id', 'mobile-top');
    }, 8000)
}