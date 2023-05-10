class AdminSetting < ApplicationRecord
  def self.per_page
    setting = AdminSetting.first
    setting&.per_page || 25
  end
end
