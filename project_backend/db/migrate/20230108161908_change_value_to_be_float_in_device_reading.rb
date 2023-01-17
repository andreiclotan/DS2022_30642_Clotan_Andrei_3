class ChangeValueToBeFloatInDeviceReading < ActiveRecord::Migration[7.0]
  def change
    change_column :device_readings, :value, :float
  end
end
