class CreateDeviceReadings < ActiveRecord::Migration[7.0]
  def change
    create_table :device_readings do |t|
      t.string :date, null: true, default: ''
      t.integer :value, null: true, default: 0
      t.integer :device_id, null: false

      t.timestamps
    end
  end
end
