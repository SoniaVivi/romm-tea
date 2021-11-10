class Post < ApplicationRecord
  validates_inclusion_of :rating, in: 0..5
  validates :temperature, presence: true
  validates :price, presence: true
  validates :notes, length: { in: 0..512 }
  validates :name, length: { in: 0..128 }

  belongs_to :poster, class_name: 'User'
  has_many :post_tags
  has_many :tags, through: :post_tags

  def get_data
    {
      id: id,
      posted: created_at.strftime('%FT%H:%M:%S'),
      rating: rating,
      price: price,
      notes: notes,
      poster: User.find(poster_id).name,
      link: link,
      temperature: temperature,
      name: name,
      time: '90 30 90',
      tags: tags.map { |tag| tag.name },
    }
  end
end
