class Team < ApplicationRecord
  has_and_belongs_to_many :users, dependent: :destroy
  has_and_belongs_to_many :editors, class_name: "User", join_table: "team_editors", dependent: :destroy
  belongs_to :leader, class_name: "User"
  belongs_to :post, optional: true, dependent: :destroy
  has_many :folders, dependent: :destroy
end
