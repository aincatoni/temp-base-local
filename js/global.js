// RESPONSIVE VARS
var mobileMax = 767;

////////////////////////////////////////////////
// Smooth Scrolling //
////////////////////////////////////////////////

var defaultDuration = 777; // ms
var edgeOffset = 0; // px
zenscroll.setup(defaultDuration, edgeOffset);

///////////////////////
// RETAILER MODULE  //
/////////////////////

var retailerModule = document.getElementById("retail-module");

function setColumnHeight() {
    if (!retailerModule) return;
    //get choose pc columns and convert to array
    let els = Array.prototype.slice.call(
        retailerModule.getElementsByClassName("use-case")
    );
    //reset column height
    els.forEach((el) => {
        el.style.height = "auto";
    });
    //get calculated heights and sort, setting var to last in resulting array
    let tallest = els.map((el) => el.offsetHeight).sort((a, b) => a - b)[
        els.length - 1
    ];
    //set all to tallest px height
    els.forEach((el) => {
        el.style.height = tallest + "px";
    });
}

//////////////////////////////////////////////
// LEGAL MODULE  //
//////////////////////////////////////////////

let legalModule = document.querySelector("section.legal");
let legalContent = document.getElementById("legal-content");
let legalToggleButtons = document.getElementsByClassName("legal-toggle");

for (let i = 0; i < legalToggleButtons.length; i++) {
    legalToggleButtons[i].addEventListener("click", (event) => {
        event.preventDefault();
        toggleLegalContent();
    });
}

function toggleLegalContent() {
    if (legalModule.classList.contains("hide-legal-content")) {
        expandLegalContent();
    } else {
        hideLegalContent();
    }
}

function expandLegalContent() {
    if (legalModule && legalContent) {
        legalModule.classList.remove("hide-legal-content");
        legalContent.style.height = legalContent.scrollHeight + "px";
        window.setTimeout(() => {
            zenscroll.toY(document.body.scrollHeight);
        }, 200);
    }
}
function hideLegalContent() {
    if (legalModule && legalContent) {
        legalModule.classList.add("hide-legal-content");
        legalContent.style.height = 0;
    }
}

//////////////////////////////////////////////
// PRELOADER  //
////////////////////////////////////////////

var preloadModule = document.getElementById("preload-module");

function hidePreloader() {
    if (!preloadModule) return;

    preloadModule.classList.add("fadeOut");
    setTimeout(function () {
        preloadModule.style.display = "none";
    }, 800);
}

//////////////////////////////////////////////
// WINDOW RESIZE EVENTS FROM ALL MODULES  //
////////////////////////////////////////////

$(window).resize(function () {
    if (this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function () {
        $(this).trigger("resizeEnd");
    }, 500);
});

$(window).bind("resizeEnd", function () {
    //do something, window hasn't changed size in 500ms
    //put resize functions here
    setColumnHeight();
    hideLegalContent();
});

//////////////////////////////////////////////
// WINDOW ON LOAD EVENTS FROM ALL MODULES  //
////////////////////////////////////////////

$(document).ready(function () {
    //RETAIL MODULE
    $(".slider-retail").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: false,
        speed: 500,
        responsive: [
            {
                breakpoint: mobileMax,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    draggable: true,
                    dots: true,
                    arrows: true,
                    autoplay: false,
                    nextArrow:
                        '<img class="btn-next" src="./images/arrow_next.png"/>',
                    prevArrow:
                        '<img class="btn-prev" src="./images/arrow_prev.png"/>',
                },
            },
        ],
    });
    setColumnHeight();
    hideLegalContent();
    setTimeout(function () {
        hidePreloader();
    }, 500);
});
