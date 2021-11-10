class AddPosterToPost < ActiveRecord::Migration[6.1]
  def change
    add_reference :posts, :poster, foreign_key: { to_table: :users }
  end
end
