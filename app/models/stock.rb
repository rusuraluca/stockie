class Stock < ApplicationRecord
  belongs_to :company
  has_many :portfolio_stocks, :class_name => 'PortfolioStock', foreign_key: 'stock_id'
  has_many :portfolios, :class_name => 'Portfolio', through: :portfolio_stocks

  validates :max_price, comparison: { greater_than: :min_price }
  validates :min_price, comparison: { less_than: :max_price }
end
