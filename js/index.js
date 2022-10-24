$(document).ready(function () {
  $('div[id^="video_link_"]').click(function () {
    var link = $(this).attr("data-video");
    var frame =
      '<iframe id="videoframe" width="100%" height"100%" src="' +
      link +
      '?rel=0&amp;autoplay=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media"></iframe>';
    var blackmodal = document.getElementById("id_modal_video");

    $("#id_modal_video_content").html(frame);
    $("#id_modal_video").show();
    blackmodal.style.opacity = "1";
    $("#id_modal_video_content").show();
  });

  $("#id_modal_video").click(function () {
    $("#id_modal_video").hide();
    // $('#id_modal_video_content').hide();

    $("#id_modal_video_content").html("");
  });

  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();

    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top - 50,
      },
      800,
      "linear"
    );
  });

  //mantiene fixed taabs
  var altura = $(".submenu").offset().top;
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > altura) {
      $(".submenu").addClass("tabs-fixed");
    } else {
      $(".submenu").removeClass("tabs-fixed");
    }
  });

  var sourceSwap = function () {
    var $this = $(this);
    var newSource = $this.data("alt-src");
    $this.data("alt-src", $this.attr("src")).fadeIn(3000);
    $this.attr("src", newSource).fadeIn(3000);
  };

  $(function () {
    $("img.producto-img").hover(sourceSwap, sourceSwap);
  });

  //fix landing legacy
  pcFactory.checkHash = false;
  $('ul[class="tabs_cool"]').find("a").unbind("click");

  $(".selected_item,.img-menu-icon").click(function (e) {
    toggleMenu();
  });

  $(".tabs_cool li").click(function (e) {
    $('div[class="tab_content"]').hide();
    var li = $(this);

    $(".tabs_cool li").removeClass("btnActive");
    li.addClass("btnActive");

    $(".selected_item").text(li.find("a").html());

    toggleMenu();

    //show linked content
    $(
      'div[data-id="' + li.find("a").attr("href").replace("#", "") + '"]'
    ).show();

    //$('html,body').scrollTop(0);

    //e.preventDefault();
    //return false;
  });

  //mantiene fixed menu
  var altura = $(".menu_landing").offset().top;
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > altura) {
      $(".menu_landing").addClass("menu-fixed");
    } else {
      $(".menu_landing").removeClass("menu-fixed");
    }
  });

  toggleMenu();
  // $(window).resize(function () {
  // 	if ($(window).width() > 991) {
  // 		$(".tabs_cool").show();
  // 		$(".selected_item").hide();
  // 	} else {
  // 		$(".selected_item").show();
  // 	}
  // });
});

function toggleMenu() {
  // if ($(window).width() <= 991) {
  // 	$(".tabs_cool").slideToggle()
  // 	//$('.img-menu-icon').toggleClass("rotate")
  // }
}

$(document).ready(function () {
  $(".submenu").slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  });

  /*  if ($("#data_source_producto_1").children("div").html().length == 0) {
    $("#producto_1").hide();
  } */

  // Esta función recorre todas las secciones de productos

  const arraySegundoHijo = [];
  const arraySections = [];

  function guardarSections() {
    const productos = document.querySelector("#productos");
    const titulosSeparadores = productos.querySelectorAll("section");
    const productosSeparadores = productos.querySelectorAll(
      "div.cajaproductos > div:nth-child(1)"
    );
    for (let i = 0; i < productosSeparadores.length; i++) {
      arraySegundoHijo.push(productosSeparadores[i]);
      arraySections.push(titulosSeparadores[i]);
    }
  }

  guardarSections();

  const ocultarSection = () => {
    for (let j = 0; j < arraySegundoHijo.length; j++) {
      if (arraySegundoHijo[j].hasChildNodes() === false) {
        arraySections[j].style.display = "none";
      }
    }
  };

  ocultarSection();
});

const sec = document.querySelectorAll("section");
const li = document.querySelector(".nav");

function activeMenu() {
  let len = sec.length;
  while (--len && window.scrollY + 97 < sec[len].offsetTop) {}
  li.forEach((ltx) => ltx.classList.remove("active"));
  li[len].classList.add("active");
}

activeMenu();

window.addEventListener("scroll", activeMenu);
