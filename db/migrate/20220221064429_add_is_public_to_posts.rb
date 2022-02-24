class AddIsPublicToPosts < ActiveRecord::Migration[6.1]
  def change
    change_table :posts do |t|
      t.boolean :is_public
    end
  end
end
