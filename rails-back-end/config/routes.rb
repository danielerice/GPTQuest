Rails.application.routes.draw do
  resources :items, :only => [:create, :destroy]
  resources :adventures
  resources :characters, :only => [:create, :destroy, :update]

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'session#create'
  delete '/logout', to: 'session#destroy'
  get '/creds', to: 'credentials#show'
end
