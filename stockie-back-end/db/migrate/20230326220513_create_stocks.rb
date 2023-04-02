class CreateStocks < ActiveRecord::Migration[7.0]
  def change
    create_table :stocks do |t|
      t.string :ticker, null: false
      t.float :current_price, null: false
      t.float :min_price, null: false
      t.float :max_price, null: false

      t.references :company, null: false, foreign_key: true, unique: true

      t.timestamps
    end
  end
end
