class Tag < ApplicationRecord
  validates :name, presence: true
  validates :name, length: { in: 3..24 }

  has_many :post_tags
  has_many :posts, through: :post_tags
end
