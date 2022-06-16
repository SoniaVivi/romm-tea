class Post < ApplicationRecord
  validates_inclusion_of :rating, in: 0..5
  validates :temperature, presence: true
  validates :price, presence: true
  validates :time, length: { in: 0..20 }
  validates :notes, length: { in: 0..512 }
  validates :name, length: { in: 1..128 }
  validates :temp_unit, presence: true
  validates :temp_unit, inclusion: { in: %w[celsius fahrenheit] }
  validates :water_quantity, length: { in: 0..12 }
  validates :leaf_quantity, length: { in: 0..32 }
  validates :is_public, inclusion: { in: [false, true] }

  belongs_to :poster, class_name: 'User'
  has_many :post_tags
  has_many :tags, through: :post_tags

  has_many :votes, foreign_key: 'post_id'

  scope :filter_by_tags,
        ->(tags) {
          joins(:post_tags)
            .where('post_tags.tag_id': tags)
            .having('COUNT(*) >= ?', tags.length)
            .group(:id)
        }

  def get_data(user_id = nil)
    {
      id: id,
      posted: created_at.strftime('%FT%H:%M:%S'),
      rating: rating,
      price: price,
      notes: notes,
      poster: poster.name,
      link: link,
      temperature: temperature,
      tempUnit: temp_unit,
      name: name,
      time: time,
      tags: tags.map { |tag| tag.name },
      waterQuantity: water_quantity,
      leafQuantity: leaf_quantity,
      isPublic: is_public,
      score: score,
      voteType: user_id.nil? ? 0 : get_vote(user_id),
    }
  end
  def self.get_posts(order_by: { created_at: :asc }, tags: nil, title: nil)
    statement = where(is_public: true).or(where(is_public: nil)).order(order_by)
    if !title.nil?
      statement =
        statement.where('name LIKE ?', '%' + sanitize_sql_like(title) + '%')
    end
    tags.nil? ? statement : statement.filter_by_tags(tags)
  end

  private

  def get_vote(user_id)
    result = votes.where(voter_id: user_id)
    return 0 if result.nil? or result.empty?
    case result[0].vote_type
    when 'down'
      -1
    when 'up'
      1
    end
  end
end
