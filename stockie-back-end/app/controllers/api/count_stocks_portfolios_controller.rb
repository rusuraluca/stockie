class Api::CountStocksPortfoliosController < ApplicationController
  def index
    @raport, @total_pages = CountStocksPortfoliosDto.generate_report(params[:page], 25)
    render json: { raport: @raport, total: @total_pages }
  end
end
