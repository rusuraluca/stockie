Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  namespace :api do
    resources :users, :companies, :stocks, :portfolios do
      get '/page/:page', action: :index, on: :collection
    end

    resources :companies do
      resources :stocks
    end

    resources :users do
      resources :portfolios
    end

    resources :portfolios do
      resources :stocks
    end

    resources :users do
      resources :portfolios do
        resources :stocks do
        end
      end
    end

    resources :average_price_portfolios do
      get '/page/:page', action: :index, on: :collection
    end
    resources :count_stocks_portfolios do
      get '/page/:page', action: :index, on: :collection
    end
  end
end
