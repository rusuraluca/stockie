class Portfolio < ApplicationRecord
  belongs_to :user
  has_many :portfolio_stocks
  has_many :stocks, through: :portfolio_stocks

  accepts_nested_attributes_for :stocks

  paginates_per 25
end
