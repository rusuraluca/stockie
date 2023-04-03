Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    resources :users
    resources :users, :companies, :stocks, :portfolios

    resources :companies do
      resources :stocks
    end

    resources :users do
      resources :portfolios
    end

    resources :users do
      resources :stocks
    end

    resources :portfolios do
      resources :stocks
    end

    resources :users do
      resources :portfolios do
        resources :stocks
      end
    end

    resources :average_price_portfolios, only: [:index]
    resources :count_stocks_portfolios, only: [:index]
  end
end
