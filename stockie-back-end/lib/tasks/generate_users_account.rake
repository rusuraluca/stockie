require 'faker'

namespace :users do
  desc "Associate users to their users account"
  task generate_users_account: :environment do
    count = User.count - 371
    ids = UserAccount.select(:user_id)
    users = User.select(:id).where.not(id: ids)

    count.times do
      UserAccount.create(
          name: Faker::Name.name,
          bio: Faker::Lorem.paragraph,
          birthday: Faker::Date.between(from: 80.years.ago, to: Date.today),
          gender: Faker::Gender.binary_type,
          address: Faker::Address.full_address,
          user_id: users.sample
      )
    end
  end
end