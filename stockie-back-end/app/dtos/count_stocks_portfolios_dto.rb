class CountStocksPortfoliosDto
  attr_accessor :portfolio_id, :stock_count

  def initialize(portfolio_id, stock_count)
    @portfolio_id = portfolio_id
    @stock_count = stock_count
  end

  def self.generate_report
    portfolio_reports = []

    portfolios = Portfolio.all.includes(:stocks)

    portfolios.each do |portfolio|
      count_stocks_portfolio = portfolio.stocks.count || 0
      portfolio_report = CountStocksPortfoliosDto.new(portfolio.id, count_stocks_portfolio)
      portfolio_reports << portfolio_report
    end

    portfolio_reports.select! { |report| report.is_a?(CountStocksPortfoliosDto) }
    sorted_portfolio_reports = portfolio_reports.sort_by { |report| [-report.stock_count, report.portfolio_id] }
    return sorted_portfolio_reports
  end

end