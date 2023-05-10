class Api::PortfoliosController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  before_action :require_regular, only: [:create, :update, :destroy]
  before_action :require_moderator, only: [:create, :update, :destroy]
  before_action :require_admin, only: [:create, :update, :destroy]

  before_action :set_portfolio, only: [:show, :update, :destroy]

  def index
    if params[:user_id]
      @portfolios = Portfolio.where(user_id: params[:user_id])
      render json: { portfolios: @portfolios, totalPortfolios: @portfolios.total_pages },  include: [:user, :stocks]
    else
      @portfolios = Portfolio.order(:id).page(params[:page]).per(AdminSetting.per_page)
      render json: { portfolios: @portfolios, totalPortfolios: @portfolios.total_pages },  include: [:user, :stocks]
    end
  end

  def show
    if params[:user_id]
      if @user
        if @portfolio
          render json: { user: @portfolio.user, portfolio: @portfolio, stocks: @portfolio.stocks }, status: :ok
        else
          render json: { error: "Portfolio doesn't exist" }, status: :unprocessable_entity
        end
      else
        render json: { error: "User doesn't exist" }, status: :unprocessable_entity
      end
    else
      render json: @portfolio, include: [:user, :stocks], status: :ok
    end
  end

  def create
    @portfolio = Portfolio.create(portfolio_params)
    if @portfolio.save
      params[:stocks].each do |stock_id|
        stock = Stock.find(stock_id)
        @portfolio.stocks << stock
      end
      render json: @portfolio, include: [:user, :stocks], status: :ok
    else
      render json: { error: "Can not create" }, status: :unprocessable_entity
    end
  end

  def update
    if @current_user.role == "regular"
      if @current_user == @portfolio.user
        if @portfolio.update(portfolio_params)
          stocks = []
          params[:stocks].each do |stock_id|
            stock = Stock.find(stock_id)
            stocks << stock
          end
          @portfolio.stocks = stocks
          render json: @portfolio, status: :ok
        else
          render json: { errors: ['Can not update'] } , status: :unprocessable_entity
        end
      else
        render json: { errors: ['Can not update'] }, status: :unprocessable_entity
      end
    else
      if @portfolio.update(portfolio_params)
        stocks = []
        params[:stocks].each do |stock_id|
          stock = Stock.find(stock_id)
          stocks << stock
        end
        @portfolio.stocks = stocks
        render json: @portfolio, status: :ok
      else
        render json: { errors: ['Can not update'] } , status: :unprocessable_entity
      end
    end
  end

  def destroy
    if @current_user.role == "regular"
      if @current_user_id == @portfolio.user.id
        @portfolio.stocks = []
        @portfolio.destroy
        render json: @portfolio, status: :ok
      else
        render json: { errors: ['Can not delete'] }, status: :unprocessable_entity
      end
    else
      @portfolio.stocks = []
      if @portfolio.destroy
        render json: @portfolio, status: :ok
      else
        render json: { errors: ['Can not delete'] }, status: :unprocessable_entity
      end
    end
  end

  private
  def set_portfolio
    @portfolio = Portfolio.find_by(id: params[:id])
  end

  def portfolio_params
    params.permit(:name, :industry, :public, :active, :user_id)
  end


  def portfolios_params
    params.permit(portfolios: [:id])
  end
end
