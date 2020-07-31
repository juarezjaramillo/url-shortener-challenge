class UrlController < ApplicationController
  before_action :set_url, only: [:show]

  # GET /url
  def index
    @urls = Url.all
    json_response(@urls)
  end

  # GET /url/top
  def top
    @urls = Url.all.order(hits: :desc).take(url_params[:n])
    json_response(@urls)
  end

  # POST /url
  def create
    url = url_params[:url]
    @title = get_title(url)

    @url = Url.new(title: @title, url: url)
    unless @url.save
      render_json_validation_error @url
      return
    end

    json_response(@url, :created)
  end

  # GET /url/:id
  def show
    json_response(@url)
  end

  # PUT /url/:id
  # Not allowed

  # DELETE /url/:id
  # Not allowed

  private

  def url_params
    # only allow a set of parameters
    params.permit(:url, :n)
  end

  def set_url
    @url = Url.find(params[:id])
  end

  def get_title(url)
    # We get the title (if any)
    # we follow redirects in case no title is found (this is fine for this challenge)
    title = nil
    response = nil
    url = "http://#{url}" unless url.nil? || url.empty? ||  url[%r{\Ahttp://}] || url[%r{\Ahttps://}]

    begin
      response = Net::HTTP.get_response(URI(url))
      content = response.body.empty? ? '' : response.body
      matches = content.match(%r{<title>(.*?)</title>}im)
      unless matches.nil?
        title = matches.captures.length.positive? ? matches.captures[0] : nil
      end
      url = response['location'] # New url in case of redirection
    rescue StandardError
      title = '(Unknown)'
    end while response.is_a?(Net::HTTPRedirection)

    title.nil? ? '(Unknown)' : title
  end

end
