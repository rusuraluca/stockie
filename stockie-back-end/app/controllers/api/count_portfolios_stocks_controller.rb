class Api::CountPortfoliosStocksController < ApplicationController
  def index
    @raport, @total_pages = CountPortfoliosStocksDto.generate_report(params[:page], 25)
    render json: { raport: @raport, total: @total_pages }
  end
end