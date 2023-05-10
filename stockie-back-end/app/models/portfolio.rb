class Portfolio < ApplicationRecord
  belongs_to :user
  has_many :portfolio_stocks
  has_many :stocks, through: :portfolio_stocks

  validates :name, :industry, :user, presence: true

  accepts_nested_attributes_for :stocks
end
