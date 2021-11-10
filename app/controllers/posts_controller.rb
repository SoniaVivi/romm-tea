class PostsController < ApplicationController
  def index
    @posts =
      Post.all.order(created_at: :asc).limit(25).map { |post| post.get_data }
  end
  def new; end
  def create; end
end
