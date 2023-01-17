Rails.application.routes.draw do
  get 'rooms/index'
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  resources :users
  resources :devices_controllers
  resources :devices
  get '/user', to: 'users#index'
  post '/user', to: 'users#create'
  patch '/user/:id', to: 'users#update'
  delete '/user/:id', to: 'users#delete'
  post '/devices/assign', to: 'devices#assign'
  get '/admin/devices', to: 'devices#admin_index'
  get 'user/home', to: 'users#home_page'
  get '/devices/:id/readings', to: 'devices#readings'
  post '/messages', to: 'messages#create'
  post '/messages/seen', to: 'messages#seen'
  get '/messages/:user_id', to: 'messages#index'
  post '/messages/typing', to: 'messages#typing'
  get '/user/not_admins', to: 'users#not_admins'
  mount ActionCable.server => '/cable'


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
