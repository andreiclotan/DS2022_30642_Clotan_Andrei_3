class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  attr_accessor :auth_token

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
  has_many :device, dependent: :destroy

  def jwt_payload
    super
  end

  def on_jwt_dispatch(token, payload)
    self.auth_token = token
    save!
  end
end
