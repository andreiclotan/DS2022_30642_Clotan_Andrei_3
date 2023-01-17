class Room < ApplicationRecord
  has_many :message, dependent: :destroy

end
