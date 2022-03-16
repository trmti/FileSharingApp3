class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :text
      t.belongs_to :user
      t.belongs_to :file_content
    end
  end
end
