class ApplicationController < ActionController::API
  private

  def authenticate_user!
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    begin
      payload = JWT.decode(header, Rails.application.secrets.secret_key_base)[0]
      @current_user_id = payload['user_id']
      @current_user = User.find_by(id: @current_user_id)
    rescue JWT::DecodeError
      render json: { errors: ['Invalid token'] }, status: :unauthorized
    end
  end

  def require_role(role)
    @current_user = User.find_by(id: @current_user_id)
    unless @current_user && @current_user.role != role
      render json: { errors: ['Invalid user role'] }, status: :unauthorized
    end
  end

  def require_regular
    require_role(:regular)
  end

  def require_moderator
    require_role(:moderator)
  end

  def require_admin
    require_role(:admin)
  end
end
