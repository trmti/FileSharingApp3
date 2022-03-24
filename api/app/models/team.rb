class Team < ApplicationRecord
  has_and_belongs_to_many :users
  has_and_belongs_to_many :editors, class_name: "User", join_table: "team_editors"
  belongs_to :leader, class_name: "User"
  belongs_to :post, optional: true
  has_many :folders
end
