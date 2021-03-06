class CreateFileContents < ActiveRecord::Migration[5.2]
  def change
    create_table :file_contents do |t|
      t.string :title
      t.text :description
      t.belongs_to :post
      t.belongs_to :folder

      t.timestamps
    end
  end
end
