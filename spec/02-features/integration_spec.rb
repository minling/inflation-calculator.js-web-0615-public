describe "Integration Test", type: :request  do

  before(:each) do
    visit "/"
  end

  it "displays the calculator" do
    strings = [
      "Inflation Calculator", 
      "Start Date",
      "End Date",
      "Calculate"
    ]
    strings.each {|string| expect(page).to have_content(string) }
  end

  it "adds $1.74 to $100 from Jan 1, 2012 to Dec. 31, 2012" do
    fill_in("Start Date", :with => "2012/01/01")
    fill_in("End Date", :with => "2012/12/31")
    fill_in("startPrice", :with => "100")
    click_button("Calculate")
    start_time = Time.now
    end_time = Time.now
    until end_time - start_time > 10
      break unless find_field("endPrice").value.empty?
      end_time = Time.now
    end
    expect(find_field("endPrice").value).to eq("101.74")
  end

  it "adds $11.87 to $200 from Mar 1, 2010 to Dec. 31, 2012" do
    fill_in("Start Date", :with => "2010/03/01")
    fill_in("End Date", :with => "2012/12/31")
    fill_in("startPrice", :with => "200")
    click_button("Calculate")
    start_time = Time.now
    end_time = Time.now
    until end_time - start_time > 10
      break unless find_field("endPrice").value.empty?
      end_time = Time.now
    end
    expect(find_field('endPrice').value).to eq("211.87")
  end

end