class Api::StocksController < ApplicationController
  before_action :set_stock, only: [:show, :edit, :update, :destroy]

  def index
    if params[:price]
      @stocks = Stock.where('current_price > ?', params[:price])
    else
      @stocks = Stock.all
    end
    render json: @stocks, include: [:company]
  end

  def show
    render json: @stock, include: [:company]
  end

  def new
    @stock = Stock.new
  end

  def create
    @stock = Stock.create(stock_params)

    if @stock.save
      render json: @stock, status: :created, location: @stock
    else
      render json: @stock.errors, status: :unprocessable_entity
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
    @stock = Stock.find(params[:id])
  end

  def stock_params
    params.require(:stock).permit(:ticker, :current_price, :min_price, :max_price)
  end
end
