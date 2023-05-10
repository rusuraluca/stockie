class Api::ScriptsController < ApplicationController
  before_action :authenticate_user!

  before_action :require_admin, only: [:generate_data, :delete_data]

  def generate_data
    case params[:model]
    when 'users'
      count = User.all.count
      1000.times do
        user = User.create!(
          username: Faker::Internet.unique.username,
          password: 'Password12.',
          role: rand(1..3),
          user_id: @current_user.id
        )
        UserAccount.create!(
            name: Faker::Name.name,
            bio: Faker::Lorem.paragraph,
            birthday: Faker::Date.birthday(min_age: 18, max_age: 65),
            gender: ['male', 'female', 'other'].sample,
            address: Faker::Address.full_address,
            user_id: user.id
        )
      end
      count2 = User.all.count
      if count < count2
        render json: {message: "Everything was created"}, status: :ok
      else
        render json: {error: "Can not create"}, status: :unprocessable_entity
      end
    when 'companies'
      count = Company.all.count
      users = User.pluck(:id)
      10000.times do
        Company.create!(
            name: Faker::Company.unique.name,
            size: Faker::Number.within(range: 1..100000000000),
            country: Faker::Address.country,
            industry: Faker::IndustrySegments.industry,
            user_id: users.sample
        )
      end
      count2 = Company.all.count
      if count < count2
        render json: {message: "Everything was created"}, status: :ok
      else
        render json: {error: "Can not create"}, status: :unprocessable_entity
      end
    when 'stocks'
      count = Stock.all.count
      companies = Company.pluck(:id)
      users = User.pluck(:id)
      10000.times do
        Stock.create!(
            ticker: Faker::Alphanumeric.alpha(number: 5).upcase,
            min_price: Faker::Number.between(from: 10.0, to: 1000.0).round(2),
            current_price: Faker::Number.between(from: 1000.0, to: 100000.0).round(2),
            max_price: Faker::Number.between(from: 100000.0, to: 1000000000.0).round(2),
            company_id: companies.sample,
            user_id: users.sample
        )
      end
      count2 = Stock.all.count
      if count < count2
        render json: {message: "Everything was created"}, status: :ok
      else
        render json: {error: "Can not create"}, status: :unprocessable_entity
      end
    when 'portfolios'
      count = Portfolio.all.count
      stocks = Stock.all.to_a
      users = User.pluck(:id)
      10000.times do
        portfolio = Portfolio.create!(
            name: Faker::IndustrySegments.industry + ' Portfolio',
            industry: Faker::IndustrySegments.industry,
            public: Faker::Boolean.boolean,
            active: Faker::Boolean.boolean,
            user_id: users.sample,
        )
        portfolio.update(
            stocks: stocks.sample(rand(3))
        )
      end
      count2 = Portfolio.all.count
      if count < count2
        render json: {message: "Everything was created"}, status: :ok
      else
        render json: {error: "Can not create"}, status: :unprocessable_entity
      end
    end
  end

  def delete_data
    case params[:model]
    when 'users'
      User.delete_all
      count = User.all.count
      User.transaction do
        ActiveRecord::Base.connection.execute("
          DELETE FROM portfolio_stocks
          WHERE portfolio_id IN (SELECT id FROM portfolios WHERE user_id IN (SELECT id FROM users WHERE id != #{@current_user.id}));

          DELETE FROM portfolios
          WHERE user_id IN (SELECT id FROM users WHERE id != #{@current_user.id});

          DELETE FROM stocks
          WHERE user_id IN (SELECT id FROM users WHERE id != #{@current_user.id});

          DELETE FROM companies
          WHERE user_id IN (SELECT id FROM users WHERE id != #{@current_user.id});

          DELETE FROM user_accounts
          WHERE user_id IN (SELECT id FROM users WHERE id != #{@current_user.id});

          DELETE FROM users
          WHERE id != #{@current_user.id};
        ")
      end
      count2 = User.all.count
      if count > count2
        render json: {message: "Everything was deleted"}, status: :ok
      else
        render json: {error: "Can not create"}, status: :unprocessable_entity
      end
    when 'companies'
      Company.delete_all
    when 'stocks'
      Stock.delete_all
    when 'portfolios'
      Portfolio.delete_all
    end
  end
end
