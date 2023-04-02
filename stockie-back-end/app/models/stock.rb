class Stock < ApplicationRecord
  belongs_to :company
  has_many :portfolio_stocks
  has_many :portfolios, through: :portfolio_stocks

  validates :max_price, comparison: { greater_than: :min_price && :current_price }
  validates :min_price, comparison: { less_than: :max_price && :current_price }
end
