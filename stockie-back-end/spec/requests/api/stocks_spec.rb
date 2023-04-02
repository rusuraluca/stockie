require 'swagger_helper'

RSpec.describe 'api/stocks', type: :request do

  path '/api/stocks' do

    get 'Retrieve all stocks' do
      tags 'Stocks'
      produces 'application/json'

      response(200, 'successful') do
        schema type: :array,
               items: {
                   properties: {
                       id: { type: :integer },
                       ticker: { type: :string },
                       current_price: { type: :float},
                       min_price: { type: :float},
                       max_price: { type: :float},
                       company_id: { type: :integer },
                       created_at: { type: :string, format: :date_time },
                       updated_at: { type: :string, format: :date_time }
                   }
               }
        run_test!
      end
    end

    post('Create a stock') do
      tags 'Stocks'
      consumes 'application/json'
      parameter name: :portfolio, in: :body, schema: {
          type: :object,
          properties: {
              ticker: { type: :string },
              current_price: { type: :float},
              min_price: { type: :float},
              max_price: { type: :float},
              company_id: { type: :integer },
          },
          required: [ 'ticker', 'current_price', 'min_price', 'max_price', 'company_id' ]
      }

      response '201', 'portfolio created' do
        schema type: :object,
               properties: {
                   id: { type: :integer },
                   ticker: { type: :string },
                   current_price: { type: :float},
                   min_price: { type: :float},
                   max_price: { type: :float},
                   company_id: { type: :integer },
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

  path '/api/stocks/{id}' do

    parameter name: :id, in: :path, type: :integer

    get('Retrieve a stock by id') do
      tags 'Stocks'
      produces 'application/json'

      response '200', 'portfolio retrieved' do
        schema type: :object,
               properties: {
                       id: { type: :integer },
                       ticker: { type: :string },
                       current_price: { type: :float},
                       min_price: { type: :float},
                       max_price: { type: :float},
                       company_id: { type: :integer },
                       created_at: { type: :string, format: :date_time },
                       updated_at: { type: :string, format: :date_time }
               }
        run_test!
      end

      response '404', 'stock not found' do
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

    put('Update a stock by id') do
      tags 'Stocks'
      consumes 'application/json'
      parameter name: :portfolio, in: :body, schema: {
          type: :object,
          properties: {
              ticker: { type: :string },
              current_price: { type: :float},
              min_price: { type: :float},
              max_price: { type: :float},
              company_id: { type: :integer }
          }
      }

      response '200', 'stock updated' do
        schema type: :object,
               properties: {
                   id: { type: :integer },
                   ticker: { type: :string },
                   current_price: { type: :float},
                   min_price: { type: :float},
                   max_price: { type: :float},
                   company_id: { type: :integer },
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

      response '404', 'stock not found' do
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

    delete('Delete a stock by id') do
      tags 'Stocks'
      produces 'application/json'

      response '200', 'stock deleted' do
        run_test!
      end

      response '404', 'stock not found' do
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


  path '/api/companies/{company_id}/stocks' do
    parameter name: :company_id, in: :path, type: :integer, required: true, description: 'Company ID'

    get('Retrieve the stock of a company') do
      tags 'Stocks'
      produces 'application/json'

      response '200', 'stock retrieved' do
        schema type: :object,
               properties: {
                       id: { type: :integer },
                       ticker: { type: :string },
                       current_price: { type: :float},
                       min_price: { type: :float},
                       max_price: { type: :float},
                       company_id: { type: :integer },
                       created_at: { type: :string, format: :date_time },
                       updated_at: { type: :string, format: :date_time },
               }
        run_test!
      end
    end

    post('Create the stock of a company') do
      tags 'Stocks'
      produces 'application/json'
      consumes 'application/json'

      response '201', 'stock created' do
        schema type: :object,
               properties: {
                   id: { type: :integer },
                   name: { type: :string },
                   user_id: { type: :integer },
                   industry: { type: :string },
                   public: { type: :boolean },
                   active: { type: :boolean },
                   created_at: { type: :string, format: :date_time },
                   updated_at: { type: :string, format: :date_time }
               }
        run_test!
      end
    end
  end

  path '/api/companies/{company_id}/stocks/{id}' do
    # You'll want to customize the parameter types...
    parameter name: 'company_id', in: :path, type: :string, description: 'company_id'
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get('show stock') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:company_id) { '123' }
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

    put('update stock') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:company_id) { '123' }
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

    delete('delete stock') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:company_id) { '123' }
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

  path '/api/users/{user_id}/stocks' do
    # You'll want to customize the parameter types...
    parameter name: 'user_id', in: :path, type: :string, description: 'user_id'

    get('list stocks') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:user_id) { '123' }

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

    post('create stock') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:user_id) { '123' }

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

  path '/api/users/{user_id}/stocks/{id}' do
    # You'll want to customize the parameter types...
    parameter name: 'user_id', in: :path, type: :string, description: 'user_id'
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get('show stock') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:user_id) { '123' }
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

    put('update stock') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:user_id) { '123' }
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

    delete('delete stock') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:user_id) { '123' }
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

  path '/api/portfolios/{portfolio_id}/stocks' do
    # You'll want to customize the parameter types...
    parameter name: 'portfolio_id', in: :path, type: :string, description: 'portfolio_id'

    get('list stocks') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:portfolio_id) { '123' }

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

    post('create stock') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:portfolio_id) { '123' }

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

  path '/api/portfolios/{portfolio_id}/stocks/{id}' do
    # You'll want to customize the parameter types...
    parameter name: 'portfolio_id', in: :path, type: :string, description: 'portfolio_id'
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get('show stock') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:portfolio_id) { '123' }
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


    put('update stock') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:portfolio_id) { '123' }
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

    delete('delete stock') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:portfolio_id) { '123' }
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

  path '/api/users/{user_id}/portfolios/{portfolio_id}/stocks' do
    # You'll want to customize the parameter types...
    parameter name: 'user_id', in: :path, type: :string, description: 'user_id'
    parameter name: 'portfolio_id', in: :path, type: :string, description: 'portfolio_id'

    get('list stocks') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:user_id) { '123' }
        let(:portfolio_id) { '123' }

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

    post('create stock') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:user_id) { '123' }
        let(:portfolio_id) { '123' }

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

  path '/api/users/{user_id}/portfolios/{portfolio_id}/stocks/{id}' do
    # You'll want to customize the parameter types...
    parameter name: 'user_id', in: :path, type: :string, description: 'user_id'
    parameter name: 'portfolio_id', in: :path, type: :string, description: 'portfolio_id'
    parameter name: 'id', in: :path, type: :string, description: 'id'

    get('show stock') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:user_id) { '123' }
        let(:portfolio_id) { '123' }
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


    put('update stock') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:user_id) { '123' }
        let(:portfolio_id) { '123' }
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

    delete('delete stock') do
      tags 'Stocks'
      response(200, 'successful') do
        let(:user_id) { '123' }
        let(:portfolio_id) { '123' }
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
