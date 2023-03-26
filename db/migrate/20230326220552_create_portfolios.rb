class CreatePortfolios < ActiveRecord::Migration[7.0]
  def change
    create_table :portfolios do |t|
      t.string :name, null: false
      t.string :industry
      t.boolean :public, default: true
      t.boolean :active, default: true

      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
