class Api::CountStocksPortfoliosController < ApplicationController
  def index
    @raport = CountStocksPortfoliosDto.generate_report params[:page]
    render json: @raport
  end
end
