class CreateTeamsUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :teams_users, id: false do |t|
      t.belongs_to :user
      t.belongs_to :team
    end
  end
end
