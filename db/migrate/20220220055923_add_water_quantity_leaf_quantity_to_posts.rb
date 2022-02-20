class AddWaterQuantityLeafQuantityToPosts < ActiveRecord::Migration[6.1]
  def change
    change_table :posts do |t|
      t.string :water_quantity
      t.string :leaf_quantity
    end
  end
end
