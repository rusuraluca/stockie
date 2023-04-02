require 'swagger_helper'

RSpec.describe 'api/count_stocks_portfolios', type: :request do

  path '/api/count_stocks_portfolios' do

    get('list count_stocks_portfolios') do
      tags 'DTOs'
      produces 'application/json'

      response '200', 'users retrieved' do
        schema type: :array,
               items: {
                   properties: {
                       portfolio_id: { type: :integer },
                       stock_count: { type: :integer },
                   }
               }
        run_test!
      end
    end
  end
end
