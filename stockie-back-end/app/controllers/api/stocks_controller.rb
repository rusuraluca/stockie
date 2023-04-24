class Api::StocksController < ApplicationController
  before_action :set_stock, only: [:show, :edit, :update, :destroy]

  def index
    if params[:price].present? && params[:price].to_f >= 0
      stocks = Stock.where('current_price > ?', params[:price].to_f)
      @stocks = stocks.order(:current_price).page(params[:page]).per(25)
      render json: { stocks: @stocks, total: @stocks.total_pages }

    elsif params[:user_id] and params[:portfolio_id]
      @user = User.find_by(id: params[:user_id])
      @portfolio = @user.portfolios.where(id: params[:portfolio_id])
      @stocks = @portfolio.map(&:stocks)
      render json: { user: @user, portfolio: @portfolio, stocks: @stocks}

    elsif params[:portfolio_id]
      @portfolio = Portfolio.where(id: params[:portfolio_id])
      @stocks = @portfolio.map(&:stocks)
      render json: { portfolio: @portfolio, stocks: @stocks}

    elsif params[:company_id]
      @stock = Stock.find_by(company_id: params[:company_id])
      render json: @stock

    else
      @stocks = Stock.order(:id).page params[:page]
      render  json: { stocks: @stocks, totalStocks: @stocks.total_pages },  include: [:company]
    end
  end

  def show
    if params[:user_id]
      render json: { user: @user, stock: @stock, portfolio: @portfolio }
    else
      render json: @stock, include: [:company]
    end
  end

  def autocomplete
    if params[:query]
      query = params[:query]
      @stocks = Stock.where("ticker ILIKE ?", "%#{query}%").order(:ticker).limit(20)
      render json: @stocks
    end
  end

  def new
    @stock = Stock.new
  end

  def create
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
      @stock = Stock.create(stock_params)
      if @stock.save
        render json: @stock
      else
        render json: @stock.errors, status: :unprocessable_entity
      end
    end
  end

  def edit
  end

  def update
    if @stock.update(stock_params)
      render json: @stock
    else
      render json: @stock.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @stock.destroy
    render json: @stock
  end

  private
  def set_stock
    @stock = Stock.find_by(id: params[:id])
    @user = User.find_by(id: params[:user_id])
    @portfolio = Portfolio.joins(:stocks).where(stocks: { id: params[:id] }, user_id: params[:user_id])
  end

  def stock_params
    params.require(:stock).permit(:ticker, :current_price, :min_price, :max_price, :company_id)
  end

  def stocks_params
    params.permit(stocks: [:id])
  end
end
