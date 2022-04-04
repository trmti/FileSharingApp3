Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :user, only: %i[index show]
      get "user/get_image/:id", to: "user#get_image"
      get "user/get_join_teams/:id", to: "user#get_join_teams"
      post "user/create_team/:id", to: "user#create_team"
      
      resources :teams, only: %i[index show update destroy]
      get "teams/get_folders/:id", to: "teams#get_folders"
      get "teams/get_teams_record/:limit/:offset", to: "teams#get_teams_record"
      get "teams/search_teams/:text/:limit", to: "teams#search_teams"
      get "teams/get_editor_ids/:id", to: "teams#get_editor_ids"
      get "teams/get_leader_id/:id", to: "teams#get_leader_id"
      post "teams/create_folder/:id", to: "teams#create_folder"
      post "teams/create_image/:id", to: "teams#create_image"
      post "team/update_image/:id", to: "team#update_image"
      
      resources :folders, only: %i[show update destroy]
      get "folders/get_files/:id", to: "folders#get_files"
      post "folders/create_file_content/:id", to: "folders#create_file"
      post "folders/create_image/:id", to: "folders#create_image"
      post "folders/update_image/:id", to: "folders#update_image"
      
      resources :file_contents, only: %i[update destroy]
      get "file_contents/get_file/:id", to: "file_contents#get_file"
      post "file_contents/create_image/:id", to: "file_contents#create_image"
      post "file_contents/update_image/:id", to: "file_contents#update_image"
      
      resources :posts, only: %i[index show create destroy]

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end