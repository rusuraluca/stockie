class Api::PortfoliosController < ApplicationController
  before_action :set_portfolio, only: [:show, :create, :edit, :update, :destroy]

  # GET api/users/:user_id/portfolios
  def index
    @portfolios = Portfolio.where(user_id: params[:user_id])
    render json: @portfolios
  end

  # GET api/users/:user_id/portfolios/:id
  def show
    render json: { user: @portfolio.user, portfolio: @portfolio, stocks: @portfolio.stocks }
  end

  # POST api/users/:user_id/portfolios
  def create
   if params[:user_id]
      @user = User.find_by(params[:user_id])
      portfolios_params[:portfolios].each do |portfolio_data|
        @portfolio = Portfolio.find_by(portfolio_data)
        if @portfolio
          @user.portfolios << @portfolio
        else
          payload = {
              error: "No such portfolio",
              status: 400
          }
          render json: payload, status: :bad_request
          return
        end
      end
      render json: @user.portfolios
   end
  end

  def edit
  end

  # UPDATE api/users/:user_id/portfolios/:id
  def update
    if @portfolio.update(portfolio_params)
      render json: @portfolio
    else
      render json: @portfolio.errors, status: :unprocessable_entity
    end
  end

  # DELETE api/users/:user_id/portfolios/:id
  def destroy
    @portfolio.destroy
    render json: @user
  end

  private
  def set_portfolio
    @portfolio = Portfolio.find_by(user_id: params[:user_id], id: params[:id])
    @user = User.find_by(params[:user_id])
  end

  def portfolio_params
    params.permit(portfolio: [:name, :industry, :public, :active])
  end

  def portfolios_params
    params.permit(portfolios: [:id])
  end
end
