class Api::CountPortfoliosStocksController < ApplicationController
  def index
    @raport, @total_pages = CountPortfoliosStocksDto.generate_report(params[:page], AdminSetting.per_page)
    render json: { raport: @raport, total: @total_pages }
  end
end