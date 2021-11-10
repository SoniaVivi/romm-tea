class CreateTags < ActiveRecord::Migration[6.1]
  def change
    create_table :tags do |t|
      t.string :name

      t.timestamps
    end

    create_table :post_tags do |t|
      t.references :post
      t.references :tag

      t.timestamps
    end
  end
end
