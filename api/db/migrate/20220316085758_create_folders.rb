class CreateFolders < ActiveRecord::Migration[5.2]
  def change
    create_table :folders do |t|
      t.string :title, null: false
      t.text :description
      t.belongs_to :post
      t.belongs_to :team

      t.timestamps
    end
  end
end
