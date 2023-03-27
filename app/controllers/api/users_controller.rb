class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET api/users
  def index
    @users = User.all
    render json: @users
  end

  # GET api/users/:id
  def show
    @user.portfolios = Portfolio.where(user_id: params[:id])
    render json: @user, include: [:portfolios]
  end

  def new
    @user = User.new
  end

  # POST api/users
  def create
    @user = User.create(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def edit
  end

  # UPDATE api/users/:id
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE api/users/:id
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
