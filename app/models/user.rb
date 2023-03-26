class User < ApplicationRecord
  has_many :portfolios, :class_name => 'Portfolio', foreign_key: 'user_id'
  validates :first_name, :last_name, :email, :password, presence: true
  validates :email, uniqueness: true
end
