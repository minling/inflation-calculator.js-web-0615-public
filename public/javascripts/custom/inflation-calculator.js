function addPriceToPage(price) {
  var adjustedPrice = price.substr(1);
  $('#endPrice').val(adjustedPrice);
  return adjustedPrice;
}

function fetchEndPrice(addPriceCallback) {
  var options = fetchOptions();
  priceFor(options, addPriceCallback);
}

function fetchOptions() {
  return {
    start: $('#startDate').val(),
    end: $('#endDate').val(),
    amount: $('#startPrice').val()
  };
}

function priceFor(options, callback){
  var apiUrl = 'http://www.statbureau.org/calculate-inflation-price-jsonp?jsoncallback=?';
  $.getJSON(apiUrl, {
    country: 'united-states',
    start: options.start,
    end: options.end,
    amount: options.amount,
    format: true
  }).done(callback);
}
