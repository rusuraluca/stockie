Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    resources :users, :companies, :stocks

    resources :companies do
      resources :stocks
    end

    resources :users do
      resources :portfolios do
        resources :stocks do
          resources :companies
        end
      end
    end
    resources :users do
      resources :stocks do
        resources :portfolios
      end
    end

    resources :average_price_portfolios, only: [:index]
    resources :count_stocks_portfolios, only: [:index]
  end
end
