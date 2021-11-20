require 'json'

class PostsController < ApplicationController
  def index
    @posts =
      Post.all.order(created_at: :asc).limit(50).map { |post| post.get_data }
  end
  def new; end
  def create
    return render json: { success: false } if !user_signed_in?
    post_params = create_params
    post = Post.new(JSON.parse(post_params[:formData]))
    post.poster_id = current_user.id
    if post.save
      JSON
        .parse(post_params[:tags])
        .each do |tag_name|
          PostTag.create(
            post_id: post.id,
            tag_id: Tag.find_or_create_by(name: tag_name).id,
          )
        end
      render json: { success: true, post: post.get_data }
    else
      render json: { success: false }
    end
  end

  private

  def create_params
    params.permit(:formData, :tags)
  end
end
