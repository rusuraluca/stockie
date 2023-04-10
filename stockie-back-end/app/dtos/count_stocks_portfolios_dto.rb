class CountStocksPortfoliosDto
  attr_accessor :portfolio_name, :stock_count

  def initialize(portfolio_name, stock_count)
    @portfolio_name = portfolio_name
    @stock_count = stock_count
  end

  def self.generate_report(page)
    portfolio_reports = []

    portfolios = Portfolio.order(:name).page page

    portfolios.each do |portfolio|
      count_stocks_portfolio = portfolio.stocks.count || 0
      portfolio_report = CountStocksPortfoliosDto.new(portfolio.name, count_stocks_portfolio)
      portfolio_reports << portfolio_report
    end

    portfolio_reports.select! { |report| report.is_a?(CountStocksPortfoliosDto) }
    sorted_portfolio_reports = portfolio_reports.sort_by { |report| [-report.stock_count, report.portfolio_name] }
    return sorted_portfolio_reports
  end

end