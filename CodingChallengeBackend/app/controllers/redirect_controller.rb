class RedirectController < ApplicationController
  include ActionView::Layouts
  include ActionController::Rendering

  def show
    @url = Url.find_by_code(params[:code])
    if @url.nil?
      render 'errors/404', status: 404
      return
    end
    @url.update_attribute(:hits, @url.hits + 1)
    redirect_to @url.url
  end
end
