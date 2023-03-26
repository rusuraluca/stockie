require "test_helper"

class Api::AveragePricePortfoliosControllerTest < ActionDispatch::IntegrationTest
  def test_generate_report
    # Call the DTO function
    portfolio_reports = AveragePricePortfoliosDto.generate_report

    # Ensure the portfolio reports are sorted in descending order of average_stocks_price
    assert_equal portfolio_reports[0].average_price, 4049.5
  end

end
