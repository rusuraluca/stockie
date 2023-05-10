class Company < ApplicationRecord
  has_one :stock
  belongs_to :user

  validates :name, :size, :country, :industry, presence: true
end
