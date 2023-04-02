class Api::CountStocksPortfoliosController < ApplicationController
  def index
    render json: CountStocksPortfoliosDto.generate_report
  end
end
