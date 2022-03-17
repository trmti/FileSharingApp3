class CreateFileContents < ActiveRecord::Migration[5.2]
  def change
    create_table :file_contents do |t|
      t.string :title, null: false
      t.text :description
      t.belongs_to :post
    end
  end
end
