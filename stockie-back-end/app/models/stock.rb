class Stock < ApplicationRecord
  belongs_to :company
  belongs_to :user
  has_many :portfolio_stocks
  has_many :portfolios, through: :portfolio_stocks


  validates :ticker, :current_price, :min_price, :max_price, :company_id, presence: true
  validates :max_price, comparison: { greater_than: :min_price && :current_price }
  validates :min_price, comparison: { less_than: :max_price && :current_price }
end
