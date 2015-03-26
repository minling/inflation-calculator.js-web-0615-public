---
language: JavaScript, js
tags: selectors, jquery, ajax, json, api
type: lab
resources: 4
---

# jQuery Inflation Calculator

![inflated dollar](https://s3-us-west-2.amazonaws.com/web-dev-readme-photos/js/inflation.jpg)

## Background

In economics, [inflation](http://en.wikipedia.org/wiki/Inflation) can be defined as a general increase in prices and fall in the purchasing value of money.

## Objective

You'll be using JavaScript to make an inflation calculator. It will use jQuery to fetch the user's input in the three input fields (start date, end date, start price), and using those values, query an API using jQuery's `getJSON` method. You will then add this value to the input with an id of `endPrice`.

Right click on the link below and select "Save link as..." to see a video of how your calculator should behave.

[inflation calc vid](https://s3-us-west-2.amazonaws.com/web-dev-readme-photos/js/inflation-calc.mp4)

## jQuery's `getJSON` funtion

jQuery's [getJSON](http://api.jquery.com/jquery.getjson/) funtion is just a shorthand for it's [ajax](http://api.jquery.com/jquery.ajax/) function.

Let's take a look at using `getJSON` to fetch today's weather predictions from [Open Weather Map](http://openweathermap.org/current). 

```javascript
var url = "http://api.openweathermap.org/data/2.5/weather?";

$.getJSON(apiUrl, {
  q: 'New York',
  units: 'imperial'
}).done(function (data) {
  console.log()
});

```

## Inflation API

In this lab, you'll be hitting [Stat Bureau's Inflation API](https://www.statbureau.org/en/inflation-api). Take a look at its [docs](https://www.statbureau.org/en/inflation-api). 

```javascript
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
```

`https://www.statbureau.org/calculate-inflation-price-jsonp?&country=united-states&start=2012%2F1%2F1&end=2012%2F12%2F1&amount=100`

# Testing

```
> ironboard  # runs only in the terminal
> ironboard -b # runs also in the browser
```

## Resources

* [jQuery API - Selectors](http://api.jquery.com/category/selectors/)
* [jQuery API - Events - Click](http://api.jquery.com/click/)
* [jQuery API - Text](http://api.jquery.com/text/)

