class Api::UsersController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  before_action :require_regular, only: [:create, :update, :destroy]
  before_action :require_moderator, only: [:create, :update, :destroy]
  before_action :require_admin, only: [:create, :update, :destroy]

  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @users = User.order(:id).page(params[:page]).per(AdminSetting.per_page)
    render json: { users: @users, totalUsers: @users.total_pages },  include: [:user_account, :portfolios, :stocks, :companies], status: :ok
  end

  def show
    render json: @user, include: [:user_account, :portfolios, :stocks, :companies], status: :ok
  end

  def autocomplete
    if params[:query]
      query = params[:query]
      @users = User.where("username ILIKE ?", "%#{query}%").order(:username).limit(20)
      render json: @users
    end
  end

  def create
    @user = User.create(user_params)
    if @user.save
      render json: @user, status: :ok
    else
      render json: { errors: ['Can not create'] }, status: :unprocessable_entity
    end
  end

  def update
    if @current_user.role == "regular"
      if @current_user.id == @user.user_id && @user.update(user_params)
        render json: @user, status: :ok
      else
        render json: { errors: ['Can not update'] }, status: :unprocessable_entity
      end
    elsif @current_user.role == "admin"
      if @user.update(role_user_params)
        render json: @user, status: :ok
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      if @user.update(user_params)
        render json: @user, status: :ok
      else
        render json: { errors: ['Can not update'] }, status: :unprocessable_entity
      end
    end
  end

  def destroy
    if @current_user.role == "regular"
      if @current_user.id == @user.user_id
        @user.stocks = []
        @user.companies = []
        @user.portfolios = []
        UserAccount.find_by(user_id: params[:id]).destroy
        @user.destroy
        render json: @user, status: :ok
      else
        render json: { errors: ['Can not delete'] }, status: :unprocessable_entity
      end
    else
      @user.portfolios = []
      @user.stocks = []
      @user.companies = []
      if @user.destroy
        render json: @user, status: :ok
      else
        render json: { errors: ['Can not delete'] }, status: :unprocessable_entity
      end
    end
  end

  private
  def set_user
    @user = User.find_by(id: params[:id])
    @user_account = UserAccount.find_by(user_id: params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :password, :user_id)
  end

  def role_user_params
    params.require(:user).permit(:role, :user_id)
  end
end
