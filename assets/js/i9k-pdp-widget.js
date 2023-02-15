/* eslint-env browser */
/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */


var i9k_pdp_widget = (function() {
  // ======================= //
  /* properties */
  // array<string> : array of strings, images to preload from JSON_images
  var _images;
  // obj : stores the language from the lang.js file
  var _language;
  // string : defaults to "EN"
  var _language_key = "EN";
  // any : stores the timer int, simple debounce of inputs
  var _debounce;
  // bool : for dev
  var _debug = false;
  // bool : is handset view showing?
  var _handset = false;
  // bool : is tablet view showing?
  var _tablet = false;
  // obj : config passes at init
  var _config;


  var _handset_width = 480;
  var _tablet_width = 768;
  


  var _img_0;
  var _img_1;
  var _img_2;
  var _imgs = [];

  var _btn_0;
  var _btn_1;
  var _btn_2;
  var _btns = [];

  var _pow_cores_title;
  var _eff_cores_title;

  var _last_state = 0;

  // ref some objects by id
  var _container = elem_for_id("i9h-pdp-widget");
  var _shade = elem_for_id("modal-shade");
  var _preloader_percent = elem_for_id("preloader-percent");

  var big_col_0 = elem_for_id('i9h-pdp-img-col-lg-0');
  var big_col_1 = elem_for_id('i9h-pdp-img-col-lg-1');
  var big_columns = [big_col_0, big_col_1];

  // ======================= //
  /* public : init */
  function init() {
    _config = config;
    if (config.language) {
      _language_key = config.language;
    }
    if (config.debug) {
      _debug = config.debug;
    }
    // imgs
    _img_0 = elem_for_id('i9h-pdp-img-0');
    _img_1 = elem_for_id('i9h-pdp-img-1');
    _img_2 = elem_for_id('i9h-pdp-img-2');
    _imgs.push(_img_0);
    _imgs.push(_img_1);
    _imgs.push(_img_2);
    _btns = elem_for_id('i9h-pdp-buttons');

    btn_click(0);
  }
  // public : click events for the big btns
  function btn_click(id) {
    var _pcores = elem_for_id('i9h-pdp-performance-cores');
    var _ecores = elem_for_id('i9h-pdp-efficiency-cores');
    if (id !== _last_state) {
      switch (_last_state) {
        case 0:
          switch (id) {
            case 2:
              // add_class(_ecores, 'highlight');
            case 1:
              add_class(_pcores, 'highlight');
              break;
          }
          break;
        case 1:
          switch (id) {
            case 0:
              add_class(_pcores, 'highlight');
              break;
            case 2:
              // add_class(_ecores, 'highlight');
              break;
          }
          break;
        case 2:
          switch (id) {
            case 0:
              add_class(_pcores, 'highlight');
            case 1:
              // add_class(_ecores, 'highlight');
              break;
          }
          break;
      }
      _last_state = id;
      setTimeout(function() {
        remove_class(_pcores, 'highlight');
        remove_class(_ecores, 'highlight');
      }, 750);
    }
    remove_class(_container, 'select_0');
    remove_class(_container, 'select_1');
    remove_class(_container, 'select_2');
    add_class(_container, 'select_' + id);
  }

  // ======================= //
  /* private : preload done, show the UI */
  function widget_start() {
    _tablet = elem_width(_container) <= _tablet_width ? true : false;
    _handset = elem_width(_container) <= _handset_width ? true : false;
    remove_shade();
    scale_ui();
  }
  // ======================= //



  /* public : debug kepress */
  function keypress(e) {
    if (!_debug)
      return;
    var elem = elem_for_id('template');
    switch (e.which) {
      case 96:
        // tilde
        var display = elem.style.display;
        elem.style.display = (display === 'none' ? 'block' : 'none');
        break;
      case 49:
        // 1
        elem.style.zIndex = 999;
        break;
      case 50:
        // 2
        elem.style.zIndex = 0;
        break;
    }
  }





  // ======================= //
  // util funx

  /* public : add class to element */
  function add_class(elem, cls) {
    if (elem && cls) {
      elem.classList.add(cls);
    }
  }
  /* public : remove class from element */
  function remove_class(elem, cls) {
    if (elem && cls) {
      elem.classList.remove(cls);
    }
  }
  /* public : finds elements of class */
  function elems_for_class(str) {
    return document.getElementsByClassName(str);
  }
  /* public : finds the element for and id */
  function elem_for_id(str) {
    return document.getElementById(str);
  }
  // ======================= //
  /* public : load lang */
  function preload_language(langs) {
    var hasLanguage = Object.prototype.hasOwnProperty.call(langs, _language_key);
    if (!hasLanguage) {
      // language not found, use default
      alert("Language not found");
      return;
    }
    var elem;
    _language = langs[_language_key];
    for (var l in _language) {
      // load text into containers
      elem = elem_for_id(l);
      if (elem) {
        elem.innerHTML = _language[l];
      }
    }
  }
  // ======================= //
  /* public : load imgs */
  function preload_images(imgs) {
    _images = imgs;
    var elem = elem_for_id("preload-container");
    var img;
    var loadCount = 0;
    var done = false;
    var str = "Loading...";
    _preloader_percent.innerHTML = str;
    for (var i in _images) {
      img = document.createElement("img");
      elem.appendChild(img);
      img.src = _images[i];
      img.onload = function() {
        loadCount++;
        str = parseInt((loadCount / imgs.length) * 100, 10) + "%";
        _preloader_percent.innerHTML = str;
        if (loadCount >= _images.length && !done) {
          done = true;
          setTimeout(function() {
            widget_start();
          }, 500);
        }
      };
    }
  }

  // ======================= //
  /* private : scale elements */
  function scale_ui() {

    var ratio = 130 / 1366;
    if (_tablet)
      ratio = 130 / 768;
    if (_handset)
      ratio = 130 / 480;


    //_btns.style.height = _container.getBoundingClientRect().width * ratio;


    var base_w = 1366;
    if (_tablet)
      base_w = 900;
    if (_handset)
      base_w = 900;


    ratio = _container.getBoundingClientRect().width / base_w;
    var t0 = elem_for_id('i9h-pdp-btn-0-text');
    var t1 = elem_for_id('i9h-pdp-btn-1-text');
    var t2 = elem_for_id('i9h-pdp-btn-2-text');

    t0.style.fontSize = 30 * ratio + 'px';
    t1.style.fontSize = 30 * ratio + 'px';
    t2.style.fontSize = 30 * ratio + 'px';

    t0.style.lineHeight = 30 * ratio + 'px';
    t1.style.lineHeight = 30 * ratio + 'px';
    t2.style.lineHeight = 30 * ratio + 'px';


  }


  // ======================= //
  /* public : resize handler */
  function resize() {
    _tablet = elem_width(_container) <= _tablet_width ? true : false;
    _handset = elem_width(_container) <= _handset_width ? true : false;
    if (_debounce) {
      clearTimeout(_debounce);
    }
    _debounce = setTimeout(function() {
      scale_ui();
    }, 10);
  }
  // ======================= //
  /* private : add class to element */
  function add_class(elem, cls) {
    if (elem && cls) {
      elem.classList.add(cls);
    }
  }
  // ======================= //
  /* private : remove class from element */
  function remove_class(elem, cls) {
    if (elem && cls) {
      elem.classList.remove(cls);
    }
  }
  // ======================= //
  /* private : fades out an element with animate.css */
  function fade_out(elem) {
    elem.classList.remove("fadeIn");
    elem.classList.add("animated", "fadeOut", "fast");
  }
  // ======================= //
  /* private : fades in an element with animate.css */
  function fade_in(elem) {
    elem.classList.remove("fadeOut");
    elem.classList.add("animated", "fadeIn", "fast");
  }
  // ======================= //
  /* private : remove preloader */
  function remove_shade() {
    fade_out(_shade);
    setTimeout(function() {
      add_class(_shade, "hide");
    }, 250);
  }
  // ======================= //
  /* private : returns width of element with padding */
  function elem_width(elem) {
    var styles;
    try {
      styles = window.getComputedStyle(elem);
      return elem.clientWidth + parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
    } catch (err) {
      console.warn(err);
    }
    return 0;
  }
  // ======================= //
  /* private : remove preloader */
  function remove_shade() {
    fade_out(_shade);
    setTimeout(function() {
      add_class(_shade, "hide");
    }, 250);
  }


  // ======================= //
  /* public : interface */
  return {
    btn_click: btn_click,
    init: init,
    add_class: add_class,
    remove_class: remove_class,
    elem_for_id: elem_for_id,
    elems_for_class: elems_for_class,
    preload_language: preload_language,
    preload_images: preload_images,
    resize: resize,
    keypress: keypress,

  };
})();