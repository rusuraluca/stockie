class PortfolioStock < ApplicationRecord
  belongs_to :portfolio
  belongs_to :stock

  paginates_per 25
end
