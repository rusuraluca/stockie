class AveragePricePortfoliosDto
  attr_accessor :portfolio_name, :average_price

  def initialize(portfolio_name, average_price)
    @portfolio_name = portfolio_name
    @average_price = average_price
  end

  def self.generate_report(page)
    portfolio_reports = []

    portfolios = Portfolio.order(:name).page page

    portfolios.each do |portfolio|
      average_stocks_price = portfolio.stocks.average(:current_price) || 0.0
      portfolio_report = AveragePricePortfoliosDto.new(portfolio.name, average_stocks_price)
      portfolio_reports << portfolio_report
    end

    portfolio_reports.select! { |report| report.is_a?(AveragePricePortfoliosDto) }
    sorted_portfolio_reports = portfolio_reports.sort_by { |report| [-report.average_price, report.portfolio_name] }
    return sorted_portfolio_reports
  end

end