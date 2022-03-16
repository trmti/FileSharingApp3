class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.string :name
      t.text :description
      t.belongs_to :post
      t.string :publish_range
      t.references :leader, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
