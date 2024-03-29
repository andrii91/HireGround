$(document).ready(function () {
  $(window).scroll(function () {
    return $('nav').toggleClass("fixed", $(window).scrollTop() > 0);
  });

  $('.scroll').click(function (e) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;

    $('body,html').animate({
      scrollTop: top - 40
    }, 1500);

  });

  $('#nav-icon').click(function () {
    $(this).toggleClass('open');
    $(this).parents('nav').toggleClass('open');
    $('nav .menu').slideToggle(200);
  });

  /*  $('.about-photo li').hover(function(){
      var $from = $(this);
      var imgOriginal = $($from.find('img')).data('src');
      var imgColor = $($from.find('img')).attr('src');
   
      
      $($from.find('img')).data('src', imgColor);
      $($from.find('img')).attr('src', imgOriginal);
      
    })*/
  
  var owl = $('.how-carousel');


  owl.owlCarousel({
    center: false,
    nav: false,
    margin: 0,
    items: 1,   
    autoHeight: true,
    URLhashListener: true,
    autoplayHoverPause: true,
//    startPosition: 'URLHash'


  });
  
  owl.on('changed.owl.carousel', function(event) {
    $('.how-nav li').removeClass('active');
    $('.how-nav li#'+$('.owl-dot.active').data('li')).addClass('active');
})

  
  $('.how-nav li a').click(function(){
    $('.how-nav li').removeClass('active');
    
    $(this).parent().addClass('active');
  })
  $('.owl-dot').click(function(){
    $('.how-nav li').removeClass('active');
    $('.how-nav li#'+$(this).data('li')).addClass('active');
  })

  $('.owl-dot').each(function(index){
    $(this).attr('data-li','li_'+(index+1));
  })
  
  
  $('.faqs-item .title').click(function(){
    $(this).parent().find('.more').slideToggle(200);
    $(this).toggleClass('active');
    
  });
  
  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value;
    });
    return vars;
  }
  $('input[name="utm_source"]').val(getUrlVars()["utm_source"]);
  $('input[name="utm_campaign"]').val(getUrlVars()["utm_campaign"]);
  $('input[name="utm_medium"]').val(getUrlVars()["utm_medium"]);
  $('input[name="utm_term"]').val(getUrlVars()["utm_term"]);
  $('input[name="utm_content"]').val(getUrlVars()["utm_content"]);
  $('input[name="click_id"]').val(getUrlVars()["aff_sub"]);
  $('input[name="affiliate_id"]').val(getUrlVars()["aff_id"]);
  $('input[name="user_agent"]').val(navigator.userAgent);
  $('input[name="ref"]').val(document.referrer);

  $.get("https://ipinfo.io", function (response) {
    $('input[name="ip_address"]').val(response.ip);
    $('input[name="city"]').val(response.city);
  }, "jsonp");

  function readCookie(name) {
    var n = name + "=";
    var cookie = document.cookie.split(';');
    for (var i = 0; i < cookie.length; i++) {
      var c = cookie[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(n) == 0) {
        return c.substring(n.length, c.length);
      }
    }
    return null;
  }
  setTimeout(function () {
    $('.gclid_field').val(readCookie('gclid'));
    if ($('.gclid_field').val() == '') {
      $('.gclid_field').val(readCookie('_gid'));
    }
  }, 2000);

  /*db/registration.php*/

  /* form valid*/
  var alertImage = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg>';
  var error;
  $('.submit').click(function (e) {
    e.preventDefault();
    var ref = $(this).closest('form').find('[required]');
    $(ref).each(function () {
      if ($(this).val() == '') {
        var errorfield = $(this);
        if ($(this).attr("type") == 'email') {
          var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
          if (!pattern.test($(this).val())) {
            $("input[name=email]").val('');
            $(this).addClass('error').parent('label').append('<div class="allert"><p>Укажите коректный e-mail</p>' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
            return false;
          }
        } else if ($(this).attr("type") == 'tel') {
          var patterntel = /^()[- +()0-9]{9,18}/i;
          if (!patterntel.test($(this).val())) {
            $("input[name=phone]").val('');
            $(this).addClass('error').parent('label').append('<div class="allert"><p>Укажите номер телефона в формате +3809999999</p>' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
            return false;
          }
        } else {
          $(this).addClass('error').parent('label').append('<div class="allert"><p>Заполните это поле, указав имя</p>' + alertImage + '</div>');
          error = 1;
          $(":input.error:first").focus();
          return false;
        }
        error = 1;
        return false;
      } else {
        error = 0;
        $(this).addClass('error').parent('label').find('.allert').remove();
      }
    });
    if (error !== 1) {
      $(this).unbind('submit').submit();
    }
  });


  /*end form valid*/

  $('form').on('submit', function (e) {
    e.preventDefault();
    $('.submit').addClass('inactive');
    $('.submit').prop('disabled', true);
    var $form = $(this);
    var $data = $form.find('input');



/*    $.ajax({
      type: 'POST',
      url: 'db/registration.php',
      dataType: 'json',
      data: $form.serialize(),
      success: function (response) {}
    });*/
    
     
    
    dataLayer.push({'event': 'supplier_form_signup'});
    dataLayer.push({ 'userID' : '{{HG_userID_value}}', }); 
    
    
    var $data = '&t=transaction&tid=UA-133454370-2&cid={{random_gaID_value}}&dp={{static_value}}&uid={{HG_userID_value}}&ti={{Transaction_ID}}&tr={{Revenue}}&in={{purchased_package}}&ip={{purchased_item_price}}&iq={{number_of_months}}&ic={{subscription_identification}}&iv={{user_type}}';
    
    $.ajax({
      type: 'POST',
      url: 'https://www.google-analytics.com/collect',
//      url: 'https://www.google-analytics.com/collect?payload_data',
      dataType: 'json',
      data: $data,
      success: function (response) {}
    });
    
    

    setTimeout(function () {
     window.location.href = "success.html";
    }, 800); 

  });
  
  
    
//      var observer = lozad();
//  observer.observe();

});