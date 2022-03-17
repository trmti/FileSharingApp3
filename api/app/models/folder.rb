class Folder < ApplicationRecord
  has_many :file_contents
  belongs_to :post, optional: true
end
