class Api::PortfoliosController < ApplicationController
  before_action :set_portfolio, only: [:show, :edit, :update, :destroy]

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
    if portfolios_params[:portfolios]
      @user = User.find_by(id: params[:user_id])

      msg = []
      portfolios_params[:portfolios].each do |portfolio_data|
        @portfolio = Portfolio.find_by(portfolio_data)
        if @portfolio
          if !(@user.portfolios.include? @portfolio)
            @portfolio.user = @user
            @user.portfolios << @portfolio
          else
            msg << {description: "User already has this portfolio", portfolio_id: portfolio_data, status: 400}
          end
        else
          msg << {description: "No such portfolio", portfolio_id: portfolio_data, status: 400}
        end
      end
      if msg.any?
        render json: msg, status: :bad_request
        return
      else
        render json: { user: @user, portfolio: @user.portfolios }
        return
      end
    else
      @portfolio = Portfolio.create(portfolio_params)
      if @portfolio.save
        render json: { user: @portfolio.user, portfolio: @portfolio }, status: :created, location: @portfolio
      else
        render json: @portfolio.errors, status: :unprocessable_entity
      end
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
    @user = User.find_by(id: params[:user_id])
    @portfolio = Portfolio.find_by(user_id: params[:user_id], id: params[:id])
  end

  def portfolio_params
    params.require(:portfolio).permit(:name, :industry, :public, :active)
  end

  def portfolios_params
    params.permit(portfolios: [:id])
  end
end
