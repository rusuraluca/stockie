class Api::CompaniesController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]

  before_action :require_admin, only: [:create, :update, :destroy]
  before_action :require_moderator, only: [:create, :update, :destroy]
  before_action :require_regular, only: [:create, :update, :destroy]

  before_action :set_company, only: [:show, :update, :destroy]

  def index
    if params[:user_id]
      @companies = Company.where(user_id: params[:user_id]).order(:id).page(params[:page]).per(AdminSetting.per_page)
      render json: { companies: @companies, totalCompanies: @companies.total_pages }, include: [:user], status: :ok
    elsif params[:stock_id]
      @stock = Stock.find(params[:stock_id])
      render json: @stock.company, status: :ok
    else
      @companies = Company.where('').order(:id).page(params[:page]).per(AdminSetting.per_page)
      render json: { companies: @companies, totalCompanies: @companies.total_pages }, include: [:stock, :user], status: :ok
    end
  end

  def show
    render json: @company, include: [:stock, :user], status: :ok
  end

  def autocomplete
    if params[:query]
      query = params[:query]
      @companies = Company.where("name ILIKE ?", "%#{query}%").left_joins(:stock).where(stocks: {company_id: nil}).order(:name).limit(20)
      render json: @companies
    end
  end

  def create
    @company = Company.create(company_params)
    if @company.save
      render json: @company, status: :ok
    else
      render json: { errors: ['Can not create'] }, status: :unprocessable_entity
    end
  end

  def update
    if @current_user.role == "regular"
      if @current_user == @company.user && @company.update(company_params)
        render json: @company, status: :ok
      else
        render json: { errors: ['Can not update'] }, status: :unprocessable_entity
      end
    else
      if @company.update(company_params)
        render json: @company, status: :ok
      else
        render json: { errors: ['Can not update'] }, status: :unprocessable_entity
      end
    end
  end

  def destroy
    if @current_user.role == "regular"
      if @current_user == @company.user && @company.destroy
        render json: @company, status: :ok
      else
        render json: { errors: ['Can not delete'] }, status: :unprocessable_entity
      end
    else
      if @company.destroy
        render json: @company, status: :ok
      else
        render json: { errors: ['Can not delete'] }, status: :unprocessable_entity
      end
    end
  end

  private
  def set_company
    @company = Company.find(params[:id])
  end

  def company_params
    params.require(:company).permit(:name, :size, :country, :industry, :user_id)
  end
end
