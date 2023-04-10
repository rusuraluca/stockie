class CreateStocks < ActiveRecord::Migration[7.0]
  def change
    create_table :stocks do |t|
      t.text :ticker
      t.float :current_price
      t.float :min_price
      t.float :max_price
      t.references :company, null: false, foreign_key: true, unique: true
      t.timestamps
    end
  end
end
