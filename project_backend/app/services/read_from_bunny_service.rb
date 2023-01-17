class ReadFromBunnyService
  def self.call(json_information_message)
    device_id = json_information_message["device_id"]
    time = json_information_message["timestamp"]
    value = json_information_message["measured_value"].to_f
    json = {
      device_id: device_id,
      date: time,
      value: value
    }
    DeviceReading.create(json)
    device = Device.find(device_id)
    if value > device.maximum_consumption
      ActionCable.server.broadcast 'alerts_channel', 'Overflow'
    end
    sleep 10.0
  end
end
