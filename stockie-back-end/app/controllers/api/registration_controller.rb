class Api::RegistrationController < ApplicationController
  def create
    user = User.create!(
        username: params[:username],
        password: params[:password]
    )

    confirmation_code = SecureRandom.hex(16)

    user.update(
        confirmation_code: confirmation_code,
        confirmation_code_expires_at: Time.current + 10.minutes
    )

    # TODO: Send confirmation code to user's email or phone number

    render json: { confirmation_code: confirmation_code }, status: :ok
  end

  def confirm
    user = User.find_by(confirmation_code: params[:confirmation_code])

    if user && user.confirmation_code_expires_at > Time.current
      user.update(confirmed_at: Time.current)
      render json: { message: "Account confirmed successfully" }, status: :ok
    else
      render json: { error: "Invalid confirmation code" }, status: :unprocessable_entity
    end
  end
end
