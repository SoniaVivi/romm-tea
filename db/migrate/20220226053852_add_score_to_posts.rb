class AddScoreToPosts < ActiveRecord::Migration[6.1]
  def change
    change_table :posts do |t|
      t.integer :score, default: 0
    end
  end
end
