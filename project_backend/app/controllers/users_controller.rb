class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]
  before_action :authenticate_user
  before_action :check_admin
  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)
    @user.password = 'password1'
    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def not_admins
    @users = User.where(role: 'user')
    render json: @users
  end

  def home_page
    # ActionCable.server.broadcast 'alerts_channel', 'Close'
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.fetch(:user, {}).permit(:name, :email, :role)
    end

    def check_admin
      return current_user || current_user.role == 'admin'
    end
end
