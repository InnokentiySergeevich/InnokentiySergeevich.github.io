$('.slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1
  });
  var $products_list = $('#products_list');
  var $cart = $('#cart');
  var products = [
      {
          name: 'Гантели',
          price: 3000
      },
      {
          name: 'Кроссовки',
          price: 2000
      },
      {
          name: 'Лыжи',
          price: 1000
      }
  ];
  var cart = JSON.parse(localStorage.cart || '{}');

  var save_cart = function() {
      localStorage.cart = JSON.stringify(cart);
  };
  
  var build_counter = function() {
      var counter = 0;
      for (var index in cart) {
          counter += +cart[index];
      }
      $('#counter').text(counter);
  };

  var amount_counter = function() {
      var count = 0;
      var amount = 0;
      for (var index in cart) {
          var count = +cart[index];
          var product = products[index];
          var price = products[index].price
          amount += count * price;
          
      }
      $('#amount_counter').text('Сумма: ' + amount);
  };

  var build_cart = function(){
      var cart_html = Object.keys(cart).map(function(prod_index){
          var product = products[prod_index];
          var count = cart[prod_index];
         
          var price = product.price;
          
          return '<li>' + product.name + ' x ' + count +
          '<button data-index="'+ prod_index +'" type="button" class="js_remove">x</button>' +
          '</li>';

      }).join('');
      $cart.html(cart_html);
      build_counter();
      amount_counter();
  };

  build_cart();

  var products_html_arr = products.map(function(product, index, current_array){
      return '<li>' + 
      product.name + ' ₽ ' + product.price + 
      '<button type="button" class="js_add">В корзину</button>' +
      '</li>';
  })

  $products_list.html(products_html_arr.join('') );

  $products_list.on('click', '.js_add', function(){
      var $li = $(this).parent();
      var index = $li.index();
      if (void 0 === cart[index]) {
          cart[index] = 1;
      } else {
          cart[index]++;
      }
      save_cart();
      build_cart();
  })

  $cart.on('click', '.js_remove', function(){
      var index = $(this).data('index');
      delete cart[index];
      build_cart();
      save_cart();
  });       

  $(function () {
	$('.popup-modal').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#username',
		modal: true
	});
	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});
});

$(function () {
	$('.search').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#username',
		modal: true
	});
	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});
});

$.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function(location) {
      $('#country').html(location.country_name);
      $('#state').html(location.state);
      $('#city').html(location.city);
      $('#latitude').html(location.latitude);
      $('#longitude').html(location.longitude);
      $('#ip').html(location.IPv4);
    }
  });
