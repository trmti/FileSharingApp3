Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :user, only: %i[index]
      get "user/get_image/:id", to: "user#get_image"
      post "user/create_image/:id", to: "user#create_image"
      post "user/update_image/:id", to: "user#update_image"
      resources :posts, only: %i[index create destroy]

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end