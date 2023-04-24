class User < ApplicationRecord
  has_many :portfolios
  validates :first_name, :last_name, :email, :password, presence: true
  paginates_per 25
end
