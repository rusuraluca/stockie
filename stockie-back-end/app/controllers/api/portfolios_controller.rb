class Api::PortfoliosController < ApplicationController
  before_action :set_portfolio, only: [:show, :edit, :update, :destroy]

  # GET api/portfolios
  # GET api/users/:user_id/portfolios
  def index
    if params[:user_id]
      @portfolios = Portfolio.where(user_id: params[:user_id])
    else
      @portfolios = Portfolio.all
    end
    render json: @portfolios
  end

  # GET api/portfolios/:id
  # GET api/users/:user_id/portfolios/:id
  def show
    if params[:user_id]
      if @user
        if @portfolio
          render json: { user: @portfolio.user, portfolio: @portfolio, stocks: @portfolio.stocks }
        else
          msg = { error: "Portfolio doesn't exist" }
          render json: msg, status: :unprocessable_entity
        end
      else
        msg = { error: "User doesn't exist" }
        render json: msg, status: :unprocessable_entity
      end
    else
      @portfolio = Portfolio.find_by(id: params[:id])
      if @portfolio
        render json: { portfolio: @portfolio }
      else
        msg = { error: "Portfolio doesn't exist" }
        render json: msg, status: :unprocessable_entity
      end
    end
  end

  # POST api/users/:user_id/portfolios
  def create
    if params[:name]
      @portfolio = Portfolio.create(portfolio_params)
      if @portfolio.save
        render json: {user: @portfolio.user, portfolio: @portfolio}
      else
        render json: @portfolio.errors, status: :unprocessable_entity
      end
    else
      @user = User.find_by(id: params[:user_id])
      if @user
        portfolios_params[:portfolios].each do |portfolio_data|
          @portfolio = Portfolio.find_by(portfolio_data)
          if @portfolio
            if !(@user.portfolios.include? @portfolio)
              @portfolio.user = @user
              @user.portfolios << @portfolio
            else
              msg = {description: "User already has this portfolio", portfolio_id: portfolio_data, status: 400}
              render json: msg, status: :bad_request
              return
            end
          else
            msg = {description: "No such portfolio", portfolio_id: portfolio_data, status: 404}
            render json: msg, status: :bad_request
            return
          end
        end
        render json: {user: @user, portfolio: @user.portfolios}
      else
        msg = {description: "No such user", user: @user, status: 404}
        render json: msg, status: :bad_request
      end
    end
  end

  def edit
  end

  # UPDATE api/portfolios/:id
  # UPDATE api/users/:user_id/portfolios/:id
  def update
    unless @user
      @portfolio = Portfolio.find_by(id: params[:id])
    end
    if @portfolio.update(portfolio_params)
      render json: @portfolio
    else
      render json: @portfolio.errors, status: :unprocessable_entity
    end
  end

  # DELETE api/portfolios/:id
  # DELETE api/users/:user_id/portfolios/:id
  def destroy
    unless @user
      @portfolio = Portfolio.find_by(id: params[:id])
    end
    if @portfolio
      @portfolio.destroy
      render json: @portfolio
    else
      msg = { error: "Portfolio doesn't exist" }
      render json: msg, status: :unprocessable_entity
    end
  end

  private
  def set_portfolio
    @user = User.find_by(id: params[:user_id])
    @portfolio = Portfolio.find_by(user_id: params[:user_id], id: params[:id])
  end

  def portfolio_params
    params.permit(:name, :industry, :public, :active, :user_id)
  end

  def portfolios_params
    params.permit(portfolios: [:id])
  end
end
