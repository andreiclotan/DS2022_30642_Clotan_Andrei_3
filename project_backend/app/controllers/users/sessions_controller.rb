# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :authenticate_user

  private

  def respond_with(resource, options={})
    render json: {
      status: { code: 200, message: "Te-ai logat bossule", data: current_user, meta: resource.auth_token }
    }, status: :ok
  end

  def respond_to_on_destroy
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1], Rails.application.credentials.fetch(:secret_key_base)).first
    current_user = User.find(jwt_payload['sub'])
    if current_user
      ActionCable.server.broadcast 'alerts_channel', 'Close'
      render json: {
        status: 200,
        message: "Te-ai delogat bossule"
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Ce faci ma?"
      }, status: :unauthorized
    end
  end
end