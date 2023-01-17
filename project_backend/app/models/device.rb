class Device < ApplicationRecord
  belongs_to :user
  has_one :device_reading

end
