class CreateTeamEditors < ActiveRecord::Migration[5.2]
  def change
    create_table :team_editors do |t|
      t.belongs_to :editor, foreign_key: { to_table: :users }
      t.belongs_to :edit_team, foreign_key: { to_table: :teams }
    end
  end
end
