namespace :users do
  desc "Remove old users"
  task remove_previous_users: :environment do
    users = User.where("created_at >= ?", "2023-04-29")

    Portfolio.all.each do |portfolio|
      portfolio.update(user_id: users.sample.id)
    end

    Company.all.each do |company|
      company.update(user_id: users.sample.id)
    end

    Stock.all.each do |stock|
      stock.update(user_id: users.sample.id)
    end

    User.where("created_at < ?", "2023-04-29").delete_all
  end
end