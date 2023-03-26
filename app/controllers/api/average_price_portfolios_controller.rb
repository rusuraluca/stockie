class Api::AveragePricePortfoliosController < ApplicationController
  def index
    render json: AveragePricePortfoliosDto.generate_report
  end
end