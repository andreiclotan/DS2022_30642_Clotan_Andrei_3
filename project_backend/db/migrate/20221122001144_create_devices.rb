class CreateDevices < ActiveRecord::Migration[7.0]
  def change
    create_table :devices do |t|
      t.string :location, null: true, default: ""
      t.string :description, null: true, default: ""
      t.integer :maximum_consumption, null: true, default: ""
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
