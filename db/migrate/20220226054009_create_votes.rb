class CreateVotes < ActiveRecord::Migration[6.1]
  def change
    create_table :votes do |t|
      t.references :voter, foreign_key: { to_table: :users }
      t.references :post
      t.string :vote_type
      t.timestamps
    end
  end
end
