class ApplicationController < ActionController::API
  before_action :authenticate_user

  SECRET_KEY = Rails.application.credentials.fetch(:secret_key_base)

  def authenticate_user
    header = request.headers['Authorization']
    token = header.split(' ').last if header

    begin
      decoded = jwt_decode(token)
      @current_user = User.find(decoded[:sub])
    rescue ActiveRecord::RecordNotFound => exception
      render json: {errors: exception.message}, status: :unauthorized
    rescue JWT::DecodeError => exception
      render json: {errors: exception.message}, status: :unauthorized
    end
  end

  def jwt_decode(token)
    decoded = JWT.decode(token, SECRET_KEY).first
    HashWithIndifferentAccess.new(decoded)
  end
end