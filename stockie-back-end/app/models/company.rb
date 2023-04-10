class Company < ApplicationRecord
  has_one :stock
  validates :name, presence: true

  paginates_per 25
end
