namespace :users do
  desc "Associate 10,000 random users to the models"
  task associate_random_users: :environment do
    users = User.where("created_at >= ?", "2023-04-25")

=begin
    Portfolio.all.each do |portfolio|
      portfolio.update(user_id: users.sample.id)
    end
=end

    Stock.all.each do |stock|
      stock.update(user_id: users.sample.id)
    end

  end
end