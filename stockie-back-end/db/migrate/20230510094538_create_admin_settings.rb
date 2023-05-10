class CreateAdminSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :admin_settings do |t|
      t.integer :per_page

      t.timestamps
    end
  end
end
