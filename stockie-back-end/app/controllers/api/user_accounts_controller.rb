class Api::UserAccountsController < ApplicationController
  before_action :authenticate_user!, only: [:show, :create, :update, :destroy]

  before_action :require_regular, only: [:create, :update, :destroy]
  before_action :require_moderator, only: [:create, :update, :destroy]
  before_action :require_admin, only: [:create, :update, :destroy]

  before_action :set_user_account, only: [:show, :edit, :update, :destroy]

  def index
    @user_accounts = UserAccount.order(:user_id).page(params[:page]).per(AdminSetting.per_page)
    render json: { userAccounts: @users_account, totalUserAccounts: @users_account.total_pages }, status: :ok
  end

  def show
    render json: @user_account, status: :ok
  end

  def create
    @user_account = UserAccount.create(user_account_params)
    if @user_account.save
      render json: @user_account, status: :ok
    else
      render json: { errors: ['Can not create'] }, status: :unprocessable_entity
    end
  end

  def update
    if @current_user.role == "regular"
      if @user_account.update(user_account_params)
        render json: @user_account, status: :ok
      else
        render json: { errors: ['Can not update'] }, status: :unprocessable_entity
      end
    else
      if @user_account.update(user_account_params)
        render json: @user_account, status: :ok
      else
        render json: { errors: ['Can not update'] }, status: :unprocessable_entity
      end
    end
  end

  def destroy
    if @current_user.role == "regular"
      if @user_account.destroy
        render json: @user_account, status: :ok
      else
        render json: { errors: ['Can not delete'] }, status: :unprocessable_entity
      end
    else
      if @user_account.destroy
        render json: @user_account, status: :ok
      else
        render json: { errors: ['Can not delete'] }, status: :unprocessable_entity
      end
    end
  end

  private
  def set_user_account
    if UserAccount.find_by(user_id: params[:id])
      @user_account = UserAccount.find_by(user_id: params[:id])
    else
      @user_account = UserAccount.create(user_id: params[:id])
    end
  end

  def user_account_params
    params.require(:user_account).permit(:name, :bio, :birthday, :gender, :address, :user_id)
  end
end
