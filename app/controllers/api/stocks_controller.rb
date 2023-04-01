class Api::StocksController < ApplicationController
  before_action :set_stock, only: [:show, :edit, :update, :destroy]

  # GET api/stocks
  def index
    if params[:price]
      @stocks = Stock.where('current_price > ?', params[:price])
      render json: @stocks, include: [:company]
    elsif params[:user_id]
      @stocks = Portfolio.where(user_id: params[:user_id]).map(&:stocks)
      render json: @stocks
    else
      @stocks = Stock.all
      render json: @stocks, include: [:company]
    end
  end

  # GET api/stocks/:id
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
  def create
    if params[:user_id] and params[:portfolio_id]
      @portfolio =  Portfolio.find_by(user_id: params[:user_id], id: params[:portfolio_id])
      stocks_params[:stocks].each do |stock_data|
        @stock = Stock.find_by(stock_data)
        if @stock
          @portfolio.stocks << @stock
        else
          payload = {
              error: "No such stock",
              status: 400
          }
          render json: payload, status: :bad_request
          return
        end
      end
      render json: { portfolio: @portfolio, stocks: @portfolio.stocks }
    else
      @stock = Stock.create(stock_params)
      if @stock.save
        render json: @stock, status: :created, location: @stock
      else
        render json: error, status: :unprocessable_entity
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
    @stock = Stock.find(params[:id])
    @user = User.find_by(params[:user_id])
    @portfolio = Portfolio.joins(:stocks).where(stocks: { id: params[:id] }, user_id: params[:user_id])
  end

  def stock_params
    params.require(:stock).permit(:ticker, :current_price, :min_price, :max_price)
  end

  def stocks_params
    params.permit(stocks: [:id])
  end
end
