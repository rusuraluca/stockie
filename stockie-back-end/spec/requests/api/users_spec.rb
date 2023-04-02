require 'swagger_helper'

RSpec.describe 'api/users', type: :request do

  path '/api/users' do
    get 'Retrieves all users' do
      tags 'Users'
      produces 'application/json'

      response '200', 'users retrieved' do
        schema type: :array,
               items: {
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
               }
        run_test!
      end
    end

    post 'Creates a user' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
          type: :object,
          properties: {
              first_name: { type: :string },
              last_name: { type: :string },
              email: { type: :string },
              password: { type: :string },
              address: { type: :string },
              birthday: { type: :string, format: :date }
          },
          required: [ 'first_name', 'last_name', 'email', 'password' ]
      }

      response '201', 'user created' do
        schema type: :object,
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

  path '/api/users/{id}' do
    parameter name: :id, in: :path, type: :integer

    get 'Retrieves a user' do
      tags 'Users'
      produces 'application/json'

      response '200', 'user retrieved' do
        schema type: :object,
               properties: {
                   id: { type: :integer },
                   first_name: { type: :string },
                   last_name: { type: :string },
                   email: { type: :string },
                   address: { type: :string },
                   birthday: { type: :string, format: :date },
                   created_at: { type: :string, format: :date_time },
                   updated_at: { type: :string, format: :date_time },
                   portfolios: {
                       type: :array,
                       items: {
                           type: :object,
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
                   }
               }
        run_test!
      end

      response '404', 'user not found' do
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

    put 'Updates a user' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
          type: :object,
          properties: {
              first_name: { type: :string },
              last_name: { type: :string },
              email: { type: :string },
              password: { type: :string },
              address: { type: :string },
              birthday: { type: :string, format: :date }
          }
      }

      response '200', 'user updated' do
        schema type: :object,
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

      response '404', 'user not found' do
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

    delete 'Deletes a user' do
      tags 'Users'
      produces 'application/json'

      response '200', 'user deleted' do
        run_test!
      end

      response '404', 'user not found' do
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
