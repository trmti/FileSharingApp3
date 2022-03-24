class FileContent < ApplicationRecord
  has_many :comments
  belongs_to :post, optional: true
end
