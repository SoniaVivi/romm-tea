class Vote < ApplicationRecord
  validates :vote_type, inclusion: { in: %w[up down] }
  validates :voter,
            uniqueness: {
              scope: :post_id,
              message: 'Can only vote on a post once',
            }
  belongs_to :voter, class_name: 'User'
  belongs_to :post
  after_create :on_create
  before_destroy :on_destroy

  private

  def on_create
    score_change = vote_type == 'up' ? 1 : -1
    post.update(score: post.score + score_change)
  end
  def on_destroy
    score_change = vote_type == 'up' ? -1 : 1
    post.update(score: post.score + score_change)
  end
end
