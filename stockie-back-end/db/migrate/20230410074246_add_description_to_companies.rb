class AddDescriptionToCompanies < ActiveRecord::Migration[7.0]
  def up
    add_column :companies, :description, :text
  end

  def down
    remove_column :companies, :description
  end
end