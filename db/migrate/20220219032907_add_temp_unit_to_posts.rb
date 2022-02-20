class AddTempUnitToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :temp_unit, :string
  end
end
