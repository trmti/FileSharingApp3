class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :image, null: false

      t.timestamps
    end
    add_index :posts, :image, unique: true
  end
end
