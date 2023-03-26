class Portfolio < ApplicationRecord
  belongs_to :user
  has_many :portfolio_stocks, :class_name => 'PortfolioStock',  foreign_key: 'portfolio_id'
  has_many :stocks, :class_name => 'Stock', through: :portfolio_stocks
end
