// code your functions here

function fetchOptions(){

  return {
    'start': $('#startDate').val(),
    'end': $('#endDate').val(),
    'amount': $('#startPrice').val()
  }
};

function addPriceToPage(amount){
  
  var newAmount = amount.replace("$","")
  $('#endPrice').val(newAmount)

  return newAmount   

// $('#endPrice').val(amount); 
};

var options = {
  start: $('#startDate').val(),
  end: $('#endDate').val(),
  amount: $('#startPrice').val(),
}

function priceFor(options, addPriceCallBack){
  var url = 'http://www.statbureau.org/calculate-inflation-price-jsonp?jsoncallback=?'

  $.getJSON(url,{
    country: 'united-states',
    format: true,
    start: options.start,
    end: options.end,
    amount: options.amount
  })
  .done(function (data) {
    $('#endPrice').val(data);
  });
}


function fetchEndPrice(addPriceCallBack){
  //make ajax request to get info back
  var options = fetchOptions();
  var url = 'http://www.statbureau.org/calculate-inflation-price-jsonp?jsoncallback=?'
  $.getJSON(url,{
    country: 'united-states',
    format: true,
    start: options.start,
    end: options.end,
    amount: options.amount
  })
  .done(addPriceCallBack);
  // priceFor(options, callback);

}
