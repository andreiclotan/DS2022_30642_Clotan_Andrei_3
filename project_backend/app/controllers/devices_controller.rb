class DevicesController < ApplicationController
  before_action :set_device, only: %i[ show update destroy ]
  before_action :authenticate_user
  before_action :check_admin, only: %i[assign]


  # GET /devices
  def index
    @devices = User.find(current_user.id).device
    render json: @devices
  end


  def admin_index
    @devices = Device.all

    render json: @devices
  end
  # GET /devices/1
  def show
    render json: @device
  end

  def readings
    @readings = DeviceReading.where(device_id: params[:id])
    render json: @readings
  end

  # POST /devices
  def create
    @device = Device.new(device_params)
    if @device.save
      render json: @device, status: :created, location: @device
    else
      render json: @device.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /devices/1
  def update
    return unless @device.user_id == current_user.id || current_user.role == 'admin'

    if @device.update(device_params)
      render json: @device
    else
      render json: @device.errors, status: :unprocessable_entity
    end
  end

  # DELETE /devices/1
  def destroy
    return unless @device.user_id == current_user.id

    @device.destroy
  end

  def assign
    @device = Device.find(assign_params[:device_id])
    @device.user_id = params[:user_id]
    if @device.save
      render json: @device, status: :created, location: @device
    else
      render json: @device.errors, status: :unprocessable_entity
    end
  end
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_device
      @device = Device.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def device_params
      params.fetch(:device, {}).permit(:user_id, :location, :maximum_consumption, :description)
    end

    def assign_params
      params.permit(:user_id, :device_id)
    end

    def check_admin
      return current_user || current_user.role == 'admin'
    end
end
