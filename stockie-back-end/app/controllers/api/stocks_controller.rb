class Api::StocksController < ApplicationController
  before_action :set_stock, only: [:show, :edit, :update, :destroy]

  # GET api/stocks
  # GET api/stocks/:price
  # GET api/users/:user_id/stocks
  # GET api/users/:user_id/portfolios/:portfolio_id/stocks
  def index
    if params[:price]
      @stocks = Stock.where('current_price > ?', params[:price])
      render json: @stocks, include: [:company]
    elsif params[:user_id] and params[:portfolio_id]
      @user = User.find_by(id: params[:user_id])
      @portfolio = @user.portfolios.where(id: params[:portfolio_id])
      @stocks = @portfolio.map(&:stocks)
      render json: { user: @user, portfolio: @portfolio, stocks: @stocks}
    elsif params[:portfolio_id]
      @portfolio = Portfolio.where(id: params[:portfolio_id])
      @stocks = @portfolio.map(&:stocks)
      render json: { portfolio: @portfolio, stocks: @stocks}
    else
      @stocks = Stock.all
      render json: @stocks, include: [:company]
    end
  end

  # GET api/stocks/:id
  # GET api/users/:user_id/portfolios/:portfolio_id/stocks/:id
  def show
    if params[:user_id]
      render json: { user: @user, stock: @stock, portfolio: @portfolio }
    else
      render json: @stock, include: [:company]
    end
  end

  def new
    @stock = Stock.new
  end

  # POST api/stocks
  # POST api/users/:user_id/portfolios/:portfolio_id/stocks
  # POST api/portfolios/:portfolio_id/stocks
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
        render json: @stock.error, status: :unprocessable_entity
      end
    end
  end

  def edit
  end

  # UPDATE api/stocks/:id
  def update
    if @stock.update(stock_params)
      render json: @stock
    else
      render json: @stock.errors, status: :unprocessable_entity
    end
  end

  # DELETE api/stocks/:id
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
    params.require(:stock).permit(:ticker, :current_price, :min_price, :max_price)
  end

  def stocks_params
    params.permit(stocks: [:id])
  end
end
