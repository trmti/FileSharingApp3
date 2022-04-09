class WaitingUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :waiting_users, id: false do |t|
      t.belongs_to :team
      t.belongs_to :user
    end
  end
end
