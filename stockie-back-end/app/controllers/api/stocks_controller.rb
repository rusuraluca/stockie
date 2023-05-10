class Api::StocksController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  before_action :require_regular, only: [:create, :update, :destroy]
  before_action :require_moderator, only: [:create, :update, :destroy]
  before_action :require_admin, only: [:create, :update, :destroy]

  before_action :set_stock, only: [:show, :update, :destroy]

  def index
    if params[:user_id]
      @stocks = Stock.where(user_id: params[:user_id])
      render json: @stocks

    elsif params[:price].present? && params[:price].to_f >= 0
      stocks = Stock.where('current_price > ?', params[:price].to_f)
      @stocks = stocks.order(:current_price).page(params[:page]).per(AdminSetting.per_page)
      render json: { stocks: @stocks, totalStocks: @stocks.total_pages }, status: :ok

    elsif params[:user_id] and params[:portfolio_id]
      @user = User.find_by(id: params[:user_id])
      @portfolio = @user.portfolios.where(id: params[:portfolio_id])
      @stocks = @portfolio.map(&:stocks)
      render json: { user: @user, portfolio: @portfolio, stocks: @stocks}, status: :ok

    elsif params[:portfolio_id]
      @portfolio = Portfolio.where(id: params[:portfolio_id])
      @stocks = @portfolio.map(&:stocks)
      render json: { portfolio: @portfolio, stocks: @stocks}, status: :ok

    elsif params[:company_id]
      @stock = Stock.find_by(company_id: params[:company_id])
      render json: @stock, include: [:user], status: :ok

    else
      @stocks = Stock.order(:id).page(params[:page]).per(AdminSetting.per_page)
      render  json: { stocks: @stocks, totalStocks: @stocks.total_pages }, include: [:company, :user], status: :ok
    end
  end

  def show
    render json: @stock, include: [:user, :company], status: :ok
  end

  def autocomplete
    if params[:query]
      query = params[:query]
      @stocks = Stock.where("ticker ILIKE ?", "%#{query}%").order(:ticker).limit(20)
      render json: @stocks
    end
  end

  def create
=begin
    if params[:portfolio_id] and stocks_params[:stocks]
      @portfolio =  Portfolio.find_by(id: params[:portfolio_id])
      msg = []
      stocks_params[:stocks].each do |stock_data|
        @stock = Stock.find_by(stock_data)
        if @stock
          if !(@portfolio.stocks.include? @stock)
            @portfolio.stocks << @stock
          else
            msg << {description: "Portfolio already has this stock", stock_id: stock_data, status: 400}
          end
        else
          msg << {description: "No such stock", stock_id: stock_data, status: 400}
        end
      end
      if msg.any?
        render json: msg, status: :bad_request
        return
      else
        render json: { portfolio: @portfolio, stocks: @portfolio.stocks }
        return
      end
    elsif params[:user_id] and params[:portfolio_id] and params[:id]
      @user = User.find_by(id: params[:user_id])
      @portfolio =  Portfolio.find_by(user_id: params[:user_id], id: params[:portfolio_id])
      @stock = Stock.find_by(id: params[:id])
      if @user and @portfolio
        if !(@portfolio.stocks.include? @stock)
          @portfolio.stocks << @stock
          render json: { user: @user, portfolio: @portfolio, stocks: @portfolio.stocks }
        else
          render json: @stock.error, status: :unprocessable_entity
        end
      else
        render json: @stock.error, status: :unprocessable_entity
      end
    else
=end
    @stock = Stock.create(stock_params)
    if @stock.save
      render json: @stock, status: :ok
    else
      render json: { error: "Can not create" }, status: :unprocessable_entity
    end
  end

  def update
    if @current_user.role == "regular"
      if @current_user == @stock.user && @stock.update(stock_params)
        render json: @stock, status: :ok
      else
        render json: { errors: ['Can not update'] }, status: :unprocessable_entity
      end
    else
      if @stock.update(stock_params)
        render json: @stock, status: :ok
      else
        render json: { errors: ['Can not update'] }, status: :unprocessable_entity
      end
    end
  end

  def destroy
    if @current_user.role == "regular"
      if @current_user == @stock.user
        @stock.destroy
        render json: @stock, status: :ok
      else
        render json: { errors: ['Can not delete'] }, status: :unprocessable_entity
      end
    else
      if @stock.destroy
        render json: @stock, status: :ok
      else
        render json: { errors: ['Can not delete'] }, status: :unprocessable_entity
      end
    end
  end

  private
  def set_stock
    @stock = Stock.find_by(id: params[:id])
  end

  def stock_params
    params.require(:stock).permit(:ticker, :current_price, :min_price, :max_price, :company_id, :user_id)
  end
end
