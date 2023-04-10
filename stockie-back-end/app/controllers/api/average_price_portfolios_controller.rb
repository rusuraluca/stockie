class Api::AveragePricePortfoliosController < ApplicationController
  def index
    @raport = AveragePricePortfoliosDto.generate_report params[:page]
    render json: @raport
  end
end