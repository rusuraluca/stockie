Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'


  namespace :api do

    get '/companies/autocomplete', to: 'companies#autocomplete'
    get '/users/autocomplete', to: 'users#autocomplete'
    get '/stocks/autocomplete', to: 'stocks#autocomplete'


    resources :users, :companies, :stocks, :portfolios, :count_portfolios_stocks, :count_stocks_portfolios do
      get '/page/:page', action: :index, on: :collection
    end

    resources :companies do
      resources :stocks
    end

    resources :stocks do
      resources :companies
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
  end
end
