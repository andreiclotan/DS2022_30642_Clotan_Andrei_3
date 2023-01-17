class MessagesController < ApplicationController
  before_action :set_user, only: %i[ show update destroy]
  before_action :authenticate_user
  before_action :check_admin
  # GET /users
  def index
    room = Room.find_by(name: params[:user_id])
    @messages = Message.where(room_id:room.id)
    render json: @messages
  end

  # GET /users/1
  def create
    room = Room.find_by(name: params[:user_id])
    new_room = Room.create(name: params[:user_id]) unless room
    room ||= new_room
    puts params[:message]
    puts params[:sender_id]
    puts room.name
    puts params[:user_id]
    Message.create(room_id: room.id, message: params[:message], sender_id: params[:sender_id])
    @messages = Message.where(room_id:params[:user_id])
    ActionCable.server.broadcast 'message_channel', 'Message received'
    render json: @messages
  end

  def seen
    room = Room.find_by(name: params[:user_id])
    Message.where(room_id: room.id).update(is_seen: true)
    json = {
      user_id: params[:user_id],
      message: 'Seen',
      seen_by: params[:seen_by]
    }
    ActionCable.server.broadcast 'message_channel', JSON.dump(json)
  end

  def typing
    json = {
      message: 'Typing',
      typing: params[:typing]
    }

    json1 = {
      message: 'Stopped',
      typing: params[:typing]
    }
    if params[:text] != ''
      ActionCable.server.broadcast 'message_channel', JSON.dump(json)
    else
      ActionCable.server.broadcast 'message_channel', JSON.dump(json1)
    end
  end


  def home_page
    ActionCable.server.broadcast 'alerts_channel', 'Close'
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
