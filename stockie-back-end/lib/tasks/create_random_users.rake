namespace :users do
  desc "Create 10,000 random users with same password"
  task create_random_users: :environment do
    password = "Password12"

    10000.times do
      User.create!(
          username: Faker::Internet.unique.username,
          password: password
      )
    end
  end
end