"use strict";

$(document).ready(function() {
  addDatePicker();

  $('#calc').click(function() {
    console.log("click");
    fetchEndPrice(addPriceToPage);
  });

  console.log("ready");
});