class Folder < ApplicationRecord
  has_many :file_contents, dependent: :destroy
  belongs_to :post, optional: true, dependent: :destroy
end
