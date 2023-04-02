require "test_helper"

class Api::AveragePricePortfoliosControllerTest < ActionDispatch::IntegrationTest
  test 'generate_report should return average prices for all portfolios' do
    user = User.create!(first_name: 'John', last_name: 'Doe', email: 'johndoe@example.com', password: 'password')
    portfolio1 = Portfolio.create!(name: 'Portfolio 1', industry: 'Tech', user: user)
    portfolio2 = Portfolio.create!(name: 'Portfolio 2', industry: 'Finance', user: user)
    company1 = Company.create!(name: 'Company 1', size: 100, country: 'USA', industry: 'Tech')
    company2 = Company.create!(name: 'Company 2', size: 200, country: 'UK', industry: 'Finance')
    stock1 = Stock.create!(ticker: 'AAPL', current_price: 100, min_price: 80, max_price: 120, company: company1)
    stock2 = Stock.create!(ticker: 'GOOG', current_price: 200, min_price: 180, max_price: 220, company: company1)
    stock3 = Stock.create!(ticker: 'JPM', current_price: 50, min_price: 40, max_price: 60, company: company2)
    PortfolioStock.create!(portfolio: portfolio1, stock: stock1, price: 100, currency: 'USD')
    PortfolioStock.create!(portfolio: portfolio1, stock: stock2, price: 200, currency: 'USD')
    PortfolioStock.create!(portfolio: portfolio2, stock: stock3, price: 50, currency: 'USD')

    result = AveragePricePortfoliosDto.generate_report
    assert_instance_of Array, result
    assert_instance_of AveragePricePortfoliosDto, result.first
    assert_equal 150, result.find { |r| r.portfolio_id == portfolio1.id }.average_price
    assert_equal 50, result.find { |r| r.portfolio_id == portfolio2.id }.average_price
  end
end
