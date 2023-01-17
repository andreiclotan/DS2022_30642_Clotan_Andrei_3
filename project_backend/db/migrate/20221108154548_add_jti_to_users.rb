class AddJtiToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :jti, :string, null: false
    add_index :users, :jti, unique: true
    change_column :users, :role, :string
    change_column_default :users, :role, 'user'
  end
end
