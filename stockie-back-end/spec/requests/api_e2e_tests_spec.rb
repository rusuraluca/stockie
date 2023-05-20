require 'rails_helper'
require 'capybara/rspec'


RSpec.describe "ApiE2eTests", type: :request do

  describe 'User registration', e2e: true do
    it 'registers a new user' do
      post 'https://am-o-vaca-face.mooo.com/api/register', params: {
          username: 'newuser',
          password: 'Password12.'
      }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to include('confirmation_code')

      confirmation_code = JSON.parse(response.body)['confirmation_code']
      get "https://am-o-vaca-face.mooo.com/api/register/confirm/#{confirmation_code}"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to include('message')
    end
  end

  describe 'Portfolios get all functionality', e2e: true do
    it 'Returns the first page of portfolios from the database' do
      get 'https://am-o-vaca-face.mooo.com/api/portfolios'
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(2)
    end
  end

  describe 'Stocks get all functionality', e2e: true do
    it 'Returns the first page of stocks from the database' do
      get 'https://am-o-vaca-face.mooo.com/api/stocks'
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(2)
    end
  end

  describe 'Users get all functionality', e2e: true do
    it 'Returns the first page of users from the database' do
      get 'https://am-o-vaca-face.mooo.com/api/users'
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).size).to eq(2)
    end
  end
end
