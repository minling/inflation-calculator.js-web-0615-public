'use-strict';
describe('Inflation Calculator', function() {
  
  beforeEach(function(){
    setFixtures('<body><div class="container"><div class="row"><div class="col-md-4 col-md-offset-4"><h1>Inflation Calculator</h1><div class="form-group"><label for="startDate">Start Date</label><input type="text" class="form-control" id="startDate" placeholder="2012/1/1"></div><div class="form-group"><label for="endDate">End Date</label><input type="text" class="form-control" id="endDate" placeholder="2012/12/1"></div><div class="form-group"><label class="sr-only" for="startPrice">Start price</label><div class="input-group"><div class="input-group-addon">$</div><input type="text" class="form-control" id="startPrice" placeholder="100"></div></div><button class="btn btn-default" id="calc">Calculate</button><br><br><div class="form-group"><label class="sr-only" for="endPrice">End price</label><div class="input-group"><div class="input-group-addon">$</div><input type="text" class="form-control" id="endPrice"></div></div></div><!-- col-md-4 col-md-offset-4 --></div><!-- row --> </div><!-- container --></body>');
  });

  describe('displays adjusted price', function() {
    describe('Jan 2012 - Dec 2012', function() {
      it('adds $1.74 to input of $100', function() {
        // fill in form
        $('#startDate').val('2012/01/01');
        $('#endDate').val('2012/12/01');
        $('#startPrice').val(100);
        // spy on getJSON
        spyOn($, "getJSON");
        function callback(val) { return val; }
        fetchEndPrice(callback); // this results in TypeError: Cannot read property 'done' of undefined     
        expect($.getJSON.mostRecentCall.args[0]).toEqual("$101.74");
      });

      it("should execute the callback function on done", function () {
        // fill in form
        $('#startDate').val('2012/01/01');
        $('#endDate').val('2012/12/01');
        $('#startPrice').val(100);
        spyOn($, "getJSON").andCallFake(function(options) {
          options.done();
        });
        var callback = jasmine.createSpy();
        fetchEndPrice(callback);
        expect(callback).toHaveBeenCalled();
      });

      it("should make a real getJSON request", function () {
        var callback = jasmine.createSpy();
        fetchEndPrice(callback);
        waitsFor(function() {
          return callback.callCount > 0;
        });
        runs(function() {
          expect(callback).
          toHaveBeenCalled();
        });
      });

      // it('adds $1.36 to input of $78', function(done) {
      //   $('#startDate').val('2012/01/01');
      //   $('#endDate').val('2012/12/01');
      //   $('#startPrice').val(78);
      //   $('#calc').click();
      //   expect($('#endPrice').val()).toEqual("79.36");
      //   done();
      // });

      // it('adds $40.83 to input of $2345.46', function(done) {
      //   $('#startDate').val('2012/01/01');
      //   $('#endDate').val('2012/12/01');
      //   $('#startPrice').val(2345.46);
      //   $('#calc').click();
      //   expect($('#endPrice').val()).toEqual("2,386.29");
      //   done();
      // });
    });
  });
});