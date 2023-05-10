class Api::AdminSettingsController < ApplicationController
  def show
    setting = AdminSetting.first
    per_page = setting&.per_page || 25
    render json: { perPage: per_page }
  end

  def update
    setting = AdminSetting.first_or_create
    setting.update(per_page: params[:perPage])
    render json: { success: true }
  end
end
