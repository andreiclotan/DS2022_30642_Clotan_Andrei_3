# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  skip_before_action :authenticate_user

  private

  def respond_with(resource, options={})
    if resource.persisted?
      render json: {
        status: { code: 200, message: "Te-ai logat bossule", data: resource }
      }
    else
      render json: {
        status: { message: 'Email already used', errors: resource.errors.full_messages, code: 400 },
      }
    end
  end
end