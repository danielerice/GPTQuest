Rails.application.routes.draw do
  resources :characters
  
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'session#create'
  delete '/logout', to: 'session#destroy'
end
