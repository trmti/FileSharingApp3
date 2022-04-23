Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :user, only: %i[index show update]
      scope :user do
        get "get_image/:id", to: "user#get_image"
        get "get_join_teams/:id", to: "user#get_join_teams"
        post "create_team/:id", to: "user#create_team"
        post "update_image/:id", to: "user#update_image"
      end
      
      resources :teams, only: %i[index show update destroy]
      scope :teams do
        get "get_folders/:id", to: "teams#get_folders"
        get "get_teams_record/:limit/:offset", to: "teams#get_teams_record"
        get "search_teams/:text/:limit", to: "teams#search_teams"
        get "get_editor_ids/:id", to: "teams#get_editor_ids"
        get "get_leader_id/:id", to: "teams#get_leader_id"
        get "get_waiting_users/:id", to: "teams#get_waiting_users"
        get "get_waiting_user_ids/:id", to: "teams#get_waiting_user_ids"
        post "add_editor/:id", to: "teams#add_editor"
        post "remove_editor/:id", to: "teams#remove_editor"
        post "reject_editor/:id", to: "teams#reject_waiting_user"
        post "add_waiting_user/:id", to: "teams#add_waiting_user"
        post "create_folder/:id", to: "teams#create_folder"
        post "create_image/:id", to: "teams#create_image"
        post "update_image/:id", to: "team#update_image"
      end
      
      resources :folders, only: %i[show update destroy]
      scope :folders do
        get "get_files/:id", to: "folders#get_files"
        post "create_file_content/:id", to: "folders#create_file"
        post "create_image/:id", to: "folders#create_image"
        post "update_image/:id", to: "folders#update_image"
      end
      
      resources :file_contents, only: %i[show update destroy]
      scope :file_contents do
        get "get_file/:id", to: "file_contents#get_file"
        get "get_comments/:id", to: "file_contents#get_comments"
        post "create_image/:id", to: "file_contents#create_image"
        post "update_image/:id", to: "file_contents#update_image"
        post "create_comment/:id", to: "file_contents#create_comment"
      end
      
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
