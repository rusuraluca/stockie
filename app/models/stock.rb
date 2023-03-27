class Stock < ApplicationRecord
  belongs_to :company
  has_many :portfolio_stocks
  has_many :portfolios, through: :portfolio_stocks
end
