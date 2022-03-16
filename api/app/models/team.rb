class Team < ApplicationRecord
  has_and_belongs_to_many :users
  has_and_belongs_to_many :editor, class_name: "User"
  belongs_to :leader, class_name: "User"
end
