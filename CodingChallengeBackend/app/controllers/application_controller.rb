class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound do
    render json: { record: 'Record not Found' }, status: :not_found
  end

  def render_json_validation_error(resource)
    render json: { errors: resource.errors.messages }, status: :bad_request
  end

  def json_response(object, status = :ok)
    render json: object, status: status, each_serializer: UrlSerializer
  end
end
