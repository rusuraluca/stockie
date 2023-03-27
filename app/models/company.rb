class Company < ApplicationRecord
  has_one :stock
  validates :name, presence: true
end
