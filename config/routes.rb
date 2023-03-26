Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    resources :users, :companies
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
    resources :stocks do
      resources :portfolios do
      end
    end
    resources :average_price_portfolios, only: [:index]
    resources :count_stocks_portfolios, only: [:index]
  end
end
