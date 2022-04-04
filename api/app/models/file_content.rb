class FileContent < ApplicationRecord
  has_many :comments, dependent: :destroy
  belongs_to :post, optional: true, dependent: :destroy
end
