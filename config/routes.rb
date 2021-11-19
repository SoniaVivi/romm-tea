Rails.application.routes.draw do
  root 'posts#index'
  devise_for :users, controllers: {
    sessions: 'users/sessions', registrations: 'users/registrations'
  }
  devise_scope :user do
    get 'signup', to: 'devise/registrations#new'
  end
  resources :posts, only: [:index, :create, :destroy, :edit]
end
