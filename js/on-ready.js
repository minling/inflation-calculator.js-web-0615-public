"use strict";

$(document).ready(function() {
  addDatePicker();

  $('#calc').on('click', function() {
    (fetchEndPrice(addPriceToPage));
  });
});