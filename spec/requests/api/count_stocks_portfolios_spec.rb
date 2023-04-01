require 'swagger_helper'

RSpec.describe 'api/count_stocks_portfolios', type: :request do

  path '/api/count_stocks_portfolios' do

    get('list count_stocks_portfolios') do
      tags 'DTOs'
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
end
