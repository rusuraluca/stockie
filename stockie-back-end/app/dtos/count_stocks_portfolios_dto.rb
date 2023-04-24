class CountStocksPortfoliosDto
  attr_accessor :portfolio_id, :portfolio_name, :stock_count

  def initialize(portfolio_id, portfolio_name, stock_count)
    @portfolio_id = portfolio_id
    @portfolio_name = portfolio_name
    @stock_count = stock_count
  end

  def self.generate_report(page, per_page = 25)
    portfolios = Portfolio.select(:id, :name)
                     .select("(SELECT COUNT(*) FROM portfolio_stocks WHERE portfolio_stocks.portfolio_id = portfolios.id) AS stock_count")
                     .order("stock_count DESC")
                     .page(page)
                     .per(per_page)

    raport_portfolios = []
    portfolios.each do |portfolio|
      raport_portfolios << CountStocksPortfoliosDto.new(portfolio.id, portfolio.name, portfolio.stock_count)
    end

    return raport_portfolios, portfolios.total_pages
  end

end
