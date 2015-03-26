'use-strict';
describe('Calculator', function() {
  
  beforeEach(function(){
    setFixtures('<body><divclass="container"><divclass="row"><divclass="col-md-4col-md-offset-4"><h1>InflationCalculator</h1><divclass="form-group"><labelfor="startDate">StartDate</label><inputtype="text"class="form-control"id="startDate"placeholder="2012/1/1"></div><divclass="form-group"><labelfor="endDate">EndDate</label><inputtype="text"class="form-control"id="endDate"placeholder="2012/12/1"></div><divclass="form-group"><labelclass="sr-only"for="startPrice">Startprice</label><divclass="input-group"><divclass="input-group-addon">$</div><inputtype="text"class="form-control"id="startPrice"placeholder="100"></div></div><buttonclass="btnbtn-default"id="calc">Calculate</button><br><br><divclass="form-group"><labelclass="sr-only"for="endPrice">Endprice</label><divclass="input-group"><divclass="input-group-addon">$</div><inputtype="text"class="form-control"id="endPrice"></div></div></div></div></div></body>');
  });

  describe('finds new price', function() {
    describe('Jan 2012 - Dec 2012', function() {
      it('adds $1.74 to input of $100', function() {
        $('#startDate').val('2012/1/1');
        $('#endDate').val('2012/12/1');
        $('#startPrice').val(100);
        $('#calc').click();
        expect($('#endPrice').val()).toBe('101.74');
      });
      it('adds $1.36 to input of $78', function() {
        $('#startDate').val('2012/1/1');
        $('#endDate').val('2012/12/1');
        $('#startPrice').val(78);
        $('#calc').click();
        expect($('#endPrice').val()).toBe('79.36');
      });
      it('adds $40.83 to input of $2345.46', function() {
        $('#startDate').val('2012/1/1');
        $('#endDate').val('2012/12/1');
        $('#startPrice').val(2345.46);
        $('#calc').click();
        expect($('#endPrice').val()).toBe('2,386.29');
      });
    });
  });
});