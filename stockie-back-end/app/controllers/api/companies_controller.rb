class Api::CompaniesController < ApplicationController
  before_action :set_company, only: [:show, :edit, :update, :destroy]

  def index
    if params[:stock_id]
      @stock = Stock.find(params[:stock_id])
      render json: @stock.company
    else
      @companies = Company.where('').order(:id).page params[:page]
      render json: { companies: @companies, totalCompanies: @companies.total_pages },  include: [:stock]
    end
  end

  def show
    render json: @company
  end

  def autocomplete
    if params[:query]
      query = params[:query]
      @companies = Company.where("name ILIKE ?", "%#{query}%").left_joins(:stock).where(stocks: {company_id: nil}).order(:name).limit(20)
      render json: @companies
    end
  end

  def new
    @company = Company.new
  end

  def create
    @company = Company.create(company_params)

    if @company.save
      render json: @company
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @company.update(company_params)
      render json: @company
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @company.destroy
    render json: @company
  end


  private
  def set_company
    @company = Company.find(params[:id])
  end

  def company_params
    params.require(:company).permit(:name, :size, :country, :industry, :description)
  end
end
