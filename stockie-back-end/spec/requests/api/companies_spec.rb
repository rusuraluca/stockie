require 'swagger_helper'
require 'rails_helper'

RSpec.describe 'api/companies', type: :request do

  path '/api/companies' do
    get('Retrieve all companies') do
      tags 'Companies'
      produces 'application/json'

      response '200', 'companies retrieved' do
        schema type: :array,
               items: {
                   properties: {
                       id: { type: :integer },
                       name: { type: :string },
                       size: { type: :integer },
                       country: { type: :string },
                       industry: { type: :string },
                       created_at: { type: :string, format: :date_time },
                       updated_at: { type: :string, format: :date_time }
                   }
               }
        run_test!
      end
    end

    post('Create a company') do
      tags 'Companies'
      consumes 'application/json'
      parameter name: :company, in: :body, schema: {
          type: :object,
          properties: {
              name: { type: :string },
              size: { type: :integer },
              country: { type: :string },
              industry: { type: :string }
          },
          required: ['name']
      }

      response '201', 'company created' do
        schema type: :object,
               properties: {
                   id: { type: :integer },
                   name: { type: :string },
                   size: { type: :integer },
                   country: { type: :string },
                   industry: { type: :string },
                   created_at: { type: :string, format: :date_time },
                   updated_at: { type: :string, format: :date_time }
               }
        run_test!
      end

      response '422', 'invalid request' do
        schema type: :object,
               properties: {
                   error: {
                       type: :object,
                       properties: {
                           message: { type: :string }
                       }
                   }
               }
        run_test!
      end
    end
  end

  path '/api/companies/{id}' do
    parameter name: :id, in: :path, type: :integer

    get('Retrieve a company by id') do
      tags 'Companies'
      produces 'application/json'

      response '200', 'company retrieved' do
        schema type: :object,
               properties: {
                   id: { type: :integer },
                   name: { type: :string },
                   size: { type: :integer },
                   country: { type: :string },
                   industry: { type: :string },
                   created_at: { type: :string, format: :date_time },
                   updated_at: { type: :string, format: :date_time }
               }
        run_test!
      end

      response '404', 'company not found' do
        schema type: :object,
               properties: {
                   error: {
                       type: :object,
                       properties: {
                           message: { type: :string }
                       }
                   }
               }
        run_test!
      end
    end

    put('Update a company by id') do
      tags 'Companies'
      consumes 'application/json'
      parameter name: :company, in: :body, schema: {
          type: :object,
          properties: {
              name: { type: :string },
              size: { type: :integer },
              country: { type: :string },
              industry: { type: :string }
          },
          required: ['name']
      }

      response '200', 'company updated' do
        schema type: :object,
               properties: {
                   id: { type: :integer },
                   name: { type: :string },
                   size: { type: :integer },
                   country: { type: :string },
                   industry: { type: :string },
                   created_at: { type: :string, format: :date_time },
                   updated_at: { type: :string, format: :date_time }
               }
        run_test!
      end

      response '422', 'invalid request' do
        schema type: :object,
               properties: {
                   error: {
                       type: :object,
                       properties: {
                           message: { type: :string }
                       }
                   }
               }
        run_test!
      end

      response '404', 'company not found' do
        schema type: :object,
               properties: {
                   error: {
                       type: :object,
                       properties: {
                           message: { type: :string }
                       }
                   }
               }
        run_test!
      end
    end

    delete('Delete a company by id') do
      tags 'Companies'
      produces 'application/json'

      response '200', 'company deleted' do
        run_test!
      end

      response '404', 'company not found' do
        schema type: :object,
               properties: {
                   error: {
                       type: :object,
                       properties: {
                           message: { type: :string }
                       }
                   }
               }
        run_test!
      end
    end
  end
end
