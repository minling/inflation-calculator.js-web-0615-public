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
  var apiUrl = 'http://www.statbureau.org/calculate-inflation-price-jsonp?jsoncallback=?';
  $.getJSON(apiUrl, {
    country: 'united-states',
    start: $('#startDate').val(),
    end: $('#endDate').val(),
    amount: $('#startPrice').val(),
    format: true
  }).done(function (data) {
    var price = data.substr(1);
    addPriceCallback(price);
  });
}