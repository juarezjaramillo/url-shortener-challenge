class UrlSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :url, :shortened_url, :code, :title, :hits, :created_at

  def shortened_url
    redir_url(object.code).to_s
  end
end