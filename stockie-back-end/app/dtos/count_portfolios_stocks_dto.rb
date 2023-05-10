class CountPortfoliosStocksDto
  attr_accessor :stock_id, :stock_ticker, :portfolio_count

  def initialize(stock_id, stock_ticker, portfolio_count)
    @stock_id = stock_id
    @stock_ticker = stock_ticker
    @portfolio_count = portfolio_count
  end

  def self.generate_report(page, per_page = 25)
    stocks = Stock.select(:id, :ticker)
                     .select("(SELECT COUNT(*) FROM portfolio_stocks WHERE portfolio_stocks.stock_id = stocks.id) AS portfolio_count")
                     .order("portfolio_count DESC")
                     .page(page)
                     .per(per_page)

    raport_stocks = []
    stocks.each do |stock|
      raport_stocks << CountPortfoliosStocksDto.new(stock.id, stock.ticker, stock.portfolio_count)
    end

    return raport_stocks, stocks.total_pages
  end

end