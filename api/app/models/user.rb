# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  has_and_belongs_to_many :teams
  has_and_belongs_to_many :editable_teams, class_name: 'Team', join_table: 'team_editors'
  belongs_to :post, optional: true
end
