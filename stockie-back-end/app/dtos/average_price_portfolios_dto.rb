class AveragePricePortfoliosDto
  attr_accessor :portfolio_id, :average_price

  def initialize(portfolio_id, average_price)
    @portfolio_id = portfolio_id
    @average_price = average_price
  end

  def self.generate_report
    portfolio_reports = []

    portfolios = Portfolio.all.includes(:stocks)

    portfolios.each do |portfolio|
      average_stocks_price = portfolio.stocks.average(:current_price) || 0.0
      portfolio_report = AveragePricePortfoliosDto.new(portfolio.id, average_stocks_price)
      portfolio_reports << portfolio_report
    end

    portfolio_reports.select! { |report| report.is_a?(AveragePricePortfoliosDto) }
    #sorted_portfolio_reports = portfolio_reports.sort_by { |pr| pr.average_price }

    sorted_portfolio_reports = portfolio_reports.sort_by { |report| [-report.average_price, report.portfolio_id] }

    return sorted_portfolio_reports
  end

end