class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.string :name, null: false
      t.text :description
      t.string :publish_range, null: false
      t.belongs_to :post
      t.references :leader, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
