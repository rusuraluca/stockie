class CreateCompanies < ActiveRecord::Migration[7.0]
  def change
    create_table :companies do |t|
      t.text :name
      t.bigint :size
      t.text :country
      t.text :industry
      t.timestamps
    end
  end
end
