function addDatePicker() {
  var ids = [
    {"id":"startDate","start":"2000/01/01", "end":"2012/12/30"},
    {"id":"endDate","start":"2000/01/02", "end":"2012/12/31"}
  ];
  $.each(ids, function(i, data) {
    $("#" + data.id).datepicker({
      format: "yyyy/mm/dd",
      endDate: data.end,
      startDate: data.start
    });
  });
}
