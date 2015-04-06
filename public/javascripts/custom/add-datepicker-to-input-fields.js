"use strict";

$(document).ready(function() {
  addDatePicker();

  $('#calc').click(function() {
    fetchEndPrice(addPriceToPage);
  });

});