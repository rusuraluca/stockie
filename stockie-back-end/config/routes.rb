Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  namespace :api do
    get "/admin_settings", to: "admin_settings#show"
    put "/admin_settings/:perPage", to: "admin_settings#update"

    get 'generate_data/:model', to: 'scripts#generate_data'
    get 'delete_data/:model', to: 'scripts#delete_data'

    post 'register', to: 'registration#create'
    get 'register/confirm/:confirmation_code', to: 'registration#confirm'
    post 'login', to: 'sessions#create'
    delete 'logout', to: 'sessions#destroy'

    get '/companies/autocomplete', to: 'companies#autocomplete'
    get '/users/autocomplete', to: 'users#autocomplete'
    get '/stocks/autocomplete', to: 'stocks#autocomplete'

    post 'users/:user_id/companies/:id', to: 'companies#update_personal'
    delete 'users/:user_id/companies/:id', to: 'companies#destroy_personal'

    resources :users, :companies, :stocks, :portfolios, :count_portfolios_stocks, :count_stocks_portfolios do
      get '/page/:page', action: :index, on: :collection
    end

    resources :user_accounts do
    end

    resources :users do
    end

    put 'users/:user_id', to: 'users#update'

    resources :companies do
      resources :stocks
    end

    resources :stocks do
      resources :companies
    end

    resources :users do
      resources :portfolios
      resources :stocks
      resources :companies
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
