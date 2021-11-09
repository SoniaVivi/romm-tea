class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.integer :temperature
      t.integer :rating
      t.decimal :price, precision: 5, scale: 2
      t.text :notes
      t.string :name
      t.string :link

      t.timestamps
    end
  end
end
