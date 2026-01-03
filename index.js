function prev() {
    $('.carousel').carousel('prev')
}
// https://supabase.com/dashboard/project/jyhahedrkgcxgheyijkm
// database akitephile
// Anna@2023

var SUPABASE_URL = 'https://jyhahedrkgcxgheyijkm.supabase.co';
var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5aGFoZWRya2djeGdoZXlpamttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNzMxNTMsImV4cCI6MjA3MjY0OTE1M30.qXbG4UKf08GCnHnBN2VfkNzEYlsLhUwgddhihEFSrgQ';
var TABLE = "product";


async function fetchProducts() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}?select=*`, {
        headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`
        }
    });
    const data = await res.json();
    console.log(data);
}

async function createProduct(name, price) {
    await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
        method: "POST",
        headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal"
        },
        body: JSON.stringify({ name, price })
    });
    fetchProducts();
}

function next() {
    $('.carousel').carousel('next')
}

var changeLanguage = function (s) {
    localStorage.setItem("language", s);
    var ens = $('.en');
    var vns = $('.vn');
    if ('EN' === s) {
        for (var i = 0; i < ens.length; i++) {
            var e = ens[i];
            e.classList.remove('hide');
        };
        for (var i = 0; i < vns.length; i++) {
            var e = vns[i];
            e.classList.add('hide');
        };
        $('#language-en').hide();
        $('#language-vn').show();
    } else {
        $('#language-en').show();
        $('#language-vn').hide();
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
    var cham = document.getElementById("cham");
    var moreText = document.getElementById("more");
    var themText = document.getElementById("them");
    var btnText = document.getElementById("myBtn");
    var btnVnText = document.getElementById("myBtnVn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        cham.style.display = "inline";
        btnText.innerHTML = "Read more";
        btnVnText.innerHTML = "Xem thêm";
        moreText.style.display = "none";
        themText.style.display = "none";
    } else {
        dots.style.display = "none";
        cham.style.display = "none";
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
        $('#language-vn').show();
    } else {
        $('#language-en').show();
        for (var i = 0; i < vns.length; i++) {
            var e = vns[i];
            e.classList.remove('hide');
        };
    }
});

function goToBambusstadt() {
    window.location = "./bambusstadt.html";
}

function goToSignora() {
    window.location = "./signora.html";
}

function goToTheShowDuplex() {
    window.location = "./theshowduplex.html";
}
function goToSaree() {
    window.location = "./saree.html";
}
function goToBasalt() {
    window.location = "./thebasalt.html";
}
function goToFalls() {
    window.location = "./thefalls.html";
}
function goToHaushaus() {
    window.location = "./haushaus.html";
}
function goToHausneo() {
    window.location = "./hausneo.html";
}
function goToLandmark() {
    window.location = "./landmark.html";
}
function goToTheArt() {
    window.location = "./theart.html";
}
function goToNhaTrang() {
    window.location = "./nhatrang.html";
}

function goToAttic() {
    window.location = "./attic.html";
}

function goToTheLowB() {
    window.location = "./thelowb.html";
}

function goToLesCartes() {
    window.location = "./lescartes.html";
}

function goToHoneyOffice() {
    window.location = "./honey.html";
}

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (!mybutton) {
        return;
    }
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
        $('#mobile-sad').show();
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
        $('.mobile-top').show();
    }, 6000)
}

function onChangeMobileMenu() {
    $('#mobile-menu').toggleClass("open");
}

window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

if (location.href.endsWith('project.html')) {
    $("#mobile-carousel").on('slide.bs.carousel', function () {
        $('.mobile-content-carousel.d-lg-none.project-carousel').addClass('move')
    });
    $("#mobile-carousel").on('slid.bs.carousel', function () {
        $('.mobile-content-carousel.d-lg-none.project-carousel').removeClass('move')
    });
}