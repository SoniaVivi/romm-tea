class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable
  validates :name, presence: true
  validates :name, length: { in: 3..24 }
  has_many :posts, foreign_key: 'poster_id'
  has_many :votes, foreign_key: 'voter_id'

  def get_posts(order_by: { created_at: :asc }, tags: nil, title: nil)
    query = posts.all.order(order_by)
    if !title.nil?
      query =
        query.where('name LIKE ?', '%' + Post.sanitize_sql_like(title) + '%')
    end
    tags.nil? ? query : query.filter_by_tags(tags)
  end
end
