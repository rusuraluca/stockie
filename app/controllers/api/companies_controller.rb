class Api::CompaniesController < ApplicationController
  before_action :set_company, only: [:show, :edit, :update, :destroy]

  # GET api/companies
  def index
    @companies = Company.all
    render json: @companies
  end

  # GET api/companies/:id
  def show
    render json: @company
  end

  def new
    @company = Company.new
  end

  # POST api/companies
  def create
    @company = Company.create(company_params)

    if @company.save
      render json: @company, status: :created, location: @company
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  def edit
  end

  # UPDATE api/companies/:id
  def update
    if @company.update(company_params)
      render json: @company
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  # DELETE api/companies/:id
  def destroy
    @company.destroy
    render json: @company
  end


  private
  def set_company
    @company = Company.find(params[:id])
  end

  def company_params
    params.require(:company).permit(:name, :size, :country, :industry)
  end
end
