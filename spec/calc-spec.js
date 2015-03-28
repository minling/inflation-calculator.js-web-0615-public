'use-strict';
describe('Inflation Calculator', function() {
  beforeEach(function(){
    setFixtures('<body><div class="container"><div class="row"><div class="col-md-4 col-md-offset-4"><h1>Inflation Calculator</h1><div class="form-group"><label for="startDate">Start Date</label><input type="text" class="form-control" id="startDate" placeholder="2012/1/1"></div><div class="form-group"><label for="endDate">End Date</label><input type="text" class="form-control" id="endDate" placeholder="2012/12/1"></div><div class="form-group"><label class="sr-only" for="startPrice">Start price</label><div class="input-group"><div class="input-group-addon">$</div><input type="text" class="form-control" id="startPrice" placeholder="100"></div></div><button class="btn btn-default" id="calc">Calculate</button><br><br><div class="form-group"><label class="sr-only" for="endPrice">End price</label><div class="input-group"><div class="input-group-addon">$</div><input type="text" class="form-control" id="endPrice"></div></div></div><!-- col-md-4 col-md-offset-4 --></div><!-- row --> </div><!-- container --></body>');
  });

  describe('fetchOptions()', function() {
    it('returns an object', function() {
      $('#startDate').val('2012/01/01');
      $('#endDate').val('2012/12/01');
      $('#startPrice').val(100);
      var options = fetchOptions();
      expect(options).toEqual(jasmine.any(Object));
    });
   it('returns object with three properties: start, end, and amount', function() {
      $('#startDate').val('2012/01/01');
      $('#endDate').val('2012/12/01');
      $('#startPrice').val(100);
      var result = fetchOptions();
      expect(result.start).not.toBeUndefined();
      expect(result.end).not.toBeUndefined();
      expect(result.amount).not.toBeUndefined();
    });
    it('return value has correct start, end, and amount values', function() {
      $('#startDate').val('2012/01/01');
      $('#endDate').val('2012/12/01');
      $('#startPrice').val(100);
      var result = fetchOptions();
      expect(result.start).toMatch('2012/01/01'); 
      expect(result.end).toMatch('2012/12/01');
      expect(result.amount).toMatch(100);
    });
    it('return value has correct start, end, and amount values', function() {
      $('#startDate').val('2010/01/01');
      $('#endDate').val('2012/12/01');
      $('#startPrice').val(355);
      var result = fetchOptions();
      expect(result.start).toMatch('2010/01/01'); 
      expect(result.end).toMatch('2012/12/01');
      expect(result.amount).toMatch(355);
    });
  });

  describe('addPriceToPage()', function() {
    it('returns the parameter without the dollar sign', function() {
      var result = addPriceToPage("$765.01");
      expect(result).toMatch("765.01")
      expect(result).not.toMatch("$765.01")
    });
    it("adds the parameter minus the '$' to ", function() {
      addPriceToPage("$765.01");
      expect($('#endPrice').val()).toEqual("765.01");
    });
  });

  describe('priceFor()', function() {
    it("accepts two parameters, the first being an options object", function() {
      spyOn($, 'ajax').and.callFake(function (req) {
        var d = $.Deferred();
        d.resolve("$101.00");
        return d.promise();
      });
      function examineData(data) {
        expect(data).toEqual("$101.00")
      }
      var options = { start: '2010/01/01', end: '2012/12/01', amount: '355' };
      priceFor(options, examineData);
    });
    it("accepts two parameters, the second being a callback function", function() {
      spyOn($, 'ajax').and.callFake(function (req) {
        var d = $.Deferred();
        d.resolve("$101.00");
        return d.promise();
      });
      function examineData(data) {
        expect(data).toEqual("$101.00")
      }
      var options = { start: '2010/01/01', end: '2012/12/01', amount: '355' };
      priceFor(options, examineData);
    });
    it("calls on the callback function on getJSON's 'done'", function() {
      spyOn($, 'ajax').and.callFake(function (req) {
        var d = $.Deferred();
        d.resolve("$101.00");
        return d.promise();
      });
      function examineData(data) {
        expect(data).toEqual("$101.00")
      }
      var options = { start: '2010/01/01', end: '2012/12/01', amount: '355' };
      priceFor(options, examineData);
    });
    it("formats the url properly with country, start, end, amount, and format", function() {
      spyOn($, 'ajax').and.callFake(function (req) {
        var d = $.Deferred();
        d.resolve("$101.00");
        return d.promise();
      });
      function examineData(data) {
        expect(data).toEqual("$101.00")
      }
      var options = { start: '2010/01/01', end: '2012/12/01', amount: '355' };
      priceFor(options, examineData);
      var ajaxCall = $.ajax.calls.argsFor(0)[0]
      expect(ajaxCall.url).toEqual("http://www.statbureau.org/calculate-inflation-price-jsonp?jsoncallback=?")
      expect(ajaxCall.data.country).toEqual("united-states")
      expect(ajaxCall.data.start).toEqual('2010/01/01')
      expect(ajaxCall.data.end).toEqual('2012/12/01')
      expect(ajaxCall.data.format).toEqual(true)
    });
  });

  describe('fetchEndPrice()', function() {
    it("gives return value fetchOptions() as the first param to priceFor()", function(done) {
      var result = {
        done: function(callback){
          callback()
        }
      }
      function fetchOptions() {
        return {
          start: '2010/01/01',
          end: '2012/12/01',
          amount: '355'
        };
      }
      function priceFor(param1, param2) {
        var options = fetchOptions();
        expect(param1).toEqual(options);
      }
      spyOn($, "getJSON").and.returnValue(result);
      function callback(val) { done(); }
      fetchEndPrice(callback);
    });
    it("passes the callback param to priceFor() as the second param", function(done) {
      $('#startDate').val('2012/01/01');
      $('#endDate').val('2012/12/01');
      $('#startPrice').val(100);
      var result = {
        done: function(callback){
          callback()
        }
      }
      spyOn($, "getJSON").and.returnValue(result);
      function callback(val) { done(); }
      fetchEndPrice(callback);
    });
  });
});
