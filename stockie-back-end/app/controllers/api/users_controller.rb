class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @users = User.order(:id).page params[:page]
    render json: { users: @users, totalUsers: @users.total_pages },  include: [:portfolios]
  end

  def show
    render json: @user
  end

  def new
    @user = User.new
  end

  def autocomplete
    if params[:query]
      query = params[:query]
      @users = User.where("first_name ILIKE ?", "%#{query}%").order(:first_name).limit(20)
      render json: @users
    end
  end

  def create
    @user = User.create(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    render json: @user
  end

  private
  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :address, :birthday)
  end
end
