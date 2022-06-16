Rails.application.routes.draw do
  root 'posts#index'
  devise_for :users, controllers: {
    sessions: 'users/sessions', registrations: 'users/registrations'
  }
  devise_scope :user do
    get 'signup', to: 'devise/registrations#new'
  end
  get '/user/:name', to: 'users#show', as: 'user'
  get '/tags', to: 'tags#index', as: 'tag'
  resources :posts, only: [:index, :create, :destroy, :edit]
  delete '/votes', to: 'votes#destroy'
  resources :votes, only: [:create, :destroy]
end
