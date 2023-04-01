require 'swagger_helper'

RSpec.describe 'api/companies', type: :request do

  path '/api/companies' do

    get('list companies') do
      response(200, 'successful') do

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    post('create company') do
      response(200, 'successful') do

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end

  path '/api/companies/{id}' do
    # You'll want to customize the parameter types...
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get('show company') do
      response(200, 'successful') do
        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    patch('update company') do
      response(200, 'successful') do
        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    put('update company') do
      response(200, 'successful') do
        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    delete('delete company') do
      response(200, 'successful') do
        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end

  path '/api/users/{user_id}/portfolios/{portfolio_id}/stocks/{stock_id}/companies' do
    # You'll want to customize the parameter types...
    parameter name: 'user_id', in: :path, type: :string, description: 'user_id'
    parameter name: 'portfolio_id', in: :path, type: :string, description: 'portfolio_id'
    parameter name: 'stock_id', in: :path, type: :string, description: 'stock_id'

    get('list companies') do
      response(200, 'successful') do
        let(:user_id) { '123' }
        let(:portfolio_id) { '123' }
        let(:stock_id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    post('create company') do
      response(200, 'successful') do
        let(:user_id) { '123' }
        let(:portfolio_id) { '123' }
        let(:stock_id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end

  path '/api/users/{user_id}/portfolios/{portfolio_id}/stocks/{stock_id}/companies/{id}' do
    # You'll want to customize the parameter types...
    parameter name: 'user_id', in: :path, type: :string, description: 'user_id'
    parameter name: 'portfolio_id', in: :path, type: :string, description: 'portfolio_id'
    parameter name: 'stock_id', in: :path, type: :string, description: 'stock_id'
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get('show company') do
      response(200, 'successful') do
        let(:user_id) { '123' }
        let(:portfolio_id) { '123' }
        let(:stock_id) { '123' }
        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    patch('update company') do
      response(200, 'successful') do
        let(:user_id) { '123' }
        let(:portfolio_id) { '123' }
        let(:stock_id) { '123' }
        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    put('update company') do
      response(200, 'successful') do
        let(:user_id) { '123' }
        let(:portfolio_id) { '123' }
        let(:stock_id) { '123' }
        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end

    delete('delete company') do
      response(200, 'successful') do
        let(:user_id) { '123' }
        let(:portfolio_id) { '123' }
        let(:stock_id) { '123' }
        let(:id) { '123' }

        after do |example|
          example.metadata[:response][:content] = {
            'application/json' => {
              example: JSON.parse(response.body, symbolize_names: true)
            }
          }
        end
        run_test!
      end
    end
  end
end
