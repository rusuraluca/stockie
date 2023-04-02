require 'swagger_helper'

RSpec.describe 'api/portfolios', type: :request do

  path '/api/portfolios' do

    get 'Retrieve all portfolios' do
      tags 'Portfolios'
      produces 'application/json'

      response '200', 'portfolios retrieved' do
        schema type: :array,
               items: {
                   properties: {
                       id: { type: :integer },
                       name: { type: :string },
                       industry: { type: :string },
                       public: { type: :boolean },
                       active: { type: :boolean },
                       user_id: { type: :integer },
                       created_at: { type: :string, format: :date_time },
                       updated_at: { type: :string, format: :date_time }
                   }
               }
        run_test!
      end
    end

    post('Create a portfolio') do
      tags 'Portfolios'
      consumes 'application/json'
      parameter name: :portfolio, in: :body, schema: {
          type: :object,
          properties: {
              name: { type: :string },
              user_id: { type: :integer },
              industry: { type: :string },
              public: { type: :boolean },
              active: { type: :boolean }
          },
          required: [ 'name', 'user_id' ]
      }

      response '201', 'portfolio created' do
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

  path '/api/portfolios/{id}' do
    parameter name: :id, in: :path, type: :integer

    get 'Retrieve a portfolio by id' do
      tags 'Portfolios'
      produces 'application/json'

      response '200', 'portfolio retrieved' do
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

      response '404', 'portfolio not found' do
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

    put 'Update a portfolio by id' do
      tags 'Portfolios'
      consumes 'application/json'
      parameter name: :portfolio, in: :body, schema: {
          type: :object,
          properties: {
              name: { type: :string },
              user_id: { type: :integer },
              industry: { type: :string },
              public: { type: :boolean },
              active: { type: :boolean }
          }
      }

      response '200', 'portfolio updated' do
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

      response '404', 'portfolio not found' do
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

    delete 'Delete a portfolio by id' do
      tags 'Portfolios'
      produces 'application/json'

      response '200', 'portfolio deleted' do
        run_test!
      end

      response '404', 'portfolio not found' do
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

  path '/api/users/{user_id}/portfolios' do
    parameter name: :user_id, in: :path, type: :integer, required: true, description: 'User ID'

    get 'Retrieve all portfolios of a user' do
      tags 'Portfolios'
      produces 'application/json'

      response '200', 'portfolios retrieved' do
        schema type: :array,
               items: {
                   properties: {
                       id: { type: :integer },
                       name: { type: :string },
                       user_id: { type: :integer },
                       industry: { type: :string },
                       public: { type: :boolean },
                       active: { type: :boolean },
                       created_at: { type: :string, format: :date_time },
                       updated_at: { type: :string, format: :date_time },
                       stocks: { type: :array }
                   }
               }
        run_test!
      end
    end

    post 'Create a new portfolio for a user' do
      tags 'Portfolios'
      produces 'application/json'
      consumes 'application/json'
      parameter name: :portfolio, in: :body, schema: {
          type: :object,
          properties: {
              name: { type: :string },
              industry: { type: :string },
              public: { type: :boolean },
              active: { type: :boolean }
          },
          required: [ 'name' ]
      }

      response '201', 'portfolio created' do
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

      response '400', 'invalid request' do
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

  path '/api/users/{user_id}/portfolios/{id}' do
    parameter name: :user_id, in: :path, type: :integer, required: true, description: 'User ID'
    parameter name: :id, in: :path, type: :integer

    get 'Retrieves a portfolio of a user' do
      tags 'Portfolios'
      produces 'application/json'

      response '200', 'portfolio retrieved' do
        schema type: :object,
               properties: {
                   user: {
                       type: :object,
                       properties: {
                           id: { type: :integer },
                           first_name: { type: :string },
                           last_name: { type: :string },
                           email: { type: :string },
                           address: { type: :string },
                           birthday: { type: :string, format: :date },
                           created_at: { type: :string, format: :date_time },
                           updated_at: { type: :string, format: :date_time }
                       }
                   },
                   portfolio: {
                       type: :object,
                       properties: {
                           id: { type: :integer },
                           name: { type: :string },
                           user_id: { type: :integer },
                           industry: { type: :string },
                           public: { type: :boolean },
                           active: { type: :boolean },
                           created_at: { type: :string, format: :date_time },
                           updated_at: { type: :string, format: :date_time },
                           stocks: { type: :array }
                       }
                   },
                   stocks: { type: :array }
               }

        run_test!
      end

      response '404', 'portfolio not found' do
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

      response '500', 'portfolio not found' do
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

    put 'Update a portfolio of a user' do
      tags 'Portfolios'
      produces 'application/json'
      consumes 'application/json'
      parameter name: :user_id, in: :path, type: :integer
      parameter name: :id, in: :path, type: :integer
      parameter name: :portfolio, in: :body, schema: {
          type: :object,
          properties: {
              name: { type: :string },
              user_id: { type: :integer },
              industry: { type: :string },
              public: { type: :boolean },
              active: { type: :boolean }
          },
          required: [ 'name', 'user_id']
      }

      response '200', 'portfolio updated' do
        schema type: :object,
               properties: {
                   id: { type: :integer },
                   name: { type: :string },
                   user_id: { type: :integer },
                   industry: { type: :string },
                   public: { type: :boolean },
                   active: { type: :boolean },
                   created_at: { type: :string, format: :date_time },
                   updated_at: { type: :string, format: :date_time },
                   stocks: { type: :array }
               }
        run_test!
      end

      response '400', 'invalid request' do
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

      response '404', 'portfolio not found' do
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

    delete 'Delete a portfolio of a user' do
      tags 'Portfolios'
      produces 'application/json'
      parameter name: :user_id, in: :path, type: :integer, description: 'User ID'
      parameter name: :id, in: :path, type: :integer, description: 'Portfolio ID'

      response '200', 'portfolio deleted' do
        run_test!
      end

      response '500', 'portfolio not found' do
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
