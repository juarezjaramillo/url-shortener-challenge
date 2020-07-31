Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :url, only: [:index, :show, :create] do
    collection do
      get 'top', to: 'url#top', defaults: {n: 100}
    end
  end
  get '/v/:code', to: 'redirect#show', as: 'redir'
end
