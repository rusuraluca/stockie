class KeepEmailAndPasswordFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :first_name
    remove_column :users, :last_name
    remove_column :users, :address
    remove_column :users, :birthday
    remove_column :users, :email
    remove_column :users, :password
    add_column :users, :username, :string, unique: true
    add_column :users, :password_digest, :string
  end
end
