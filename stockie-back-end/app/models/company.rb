class Company < ApplicationRecord
  has_one :stock
  validates :name, :country, presence: true
end
