function addDatePicker() {
  var ids = [
    {"id":"startDate","start":"2000/01/01", "end":"2012/12/30"},
    {"id":"endDate","start":"2000/01/02", "end":"2012/12/31"}
  ];
  $.each(ids, function(i, data) {
    $("#" + data.id).datepicker({
      format: "yyyy/mm/dd",
      endDate: data.end,
      startDate: data.start,
    });
  });
}

function addPriceToPage(price) {
  $('#endPrice').val(price);
}

function fetchEndPrice(addPriceCallback) {
  var options = {
    start: $('#startDate').val(),
    end: $('#endDate').val(),
    amount: $('#startPrice').val()
  }
  
  priceFor(options, addPriceCallback);
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
