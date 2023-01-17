class AddIsSeenToMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :is_seen, :boolean, default: false
  end
end
