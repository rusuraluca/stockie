class CreateUserAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :user_accounts do |t|
      t.string :name
      t.string :bio
      t.date :birthday
      t.string :gender
      t.text :address
      t.timestamps
    end
  end
end
