class User < ApplicationRecord
  has_secure_password

  has_many :portfolios
  has_many :users
  has_one :user_account
  has_many :stocks
  has_many :companies

  validates :username, presence: true, uniqueness: true, on: :create
  validates :password, presence: true, length: { minimum: 8 }, format: { with: /\A(?=.*[a-zA-Z])(?=.*[0-9]).{8,}\z/, message: "must be at least 8 characters long and include one letter and one number" }, on: :create

  enum role: [:anonymus, :regular, :moderator, :admin]
end
