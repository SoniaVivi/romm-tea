require 'json'

class PostsController < ApplicationController
  def index
    @posts =
      Post.all.order(created_at: :asc).limit(50).map { |post| post.get_data }
  end
  def create
    return render json: { success: false } if !user_signed_in?
    post_params = create_and_edit_params
    post = Post.new(JSON.parse(post_params[:formData]))
    post.poster_id = current_user.id
    if post.save
      from_json_save_tags(post_params[:tags], post.id)
      render json: { success: true, post: post.get_data }
    else
      render json: { success: false }
    end
  end
  def edit
    return render json: { success: false } if !user_signed_in?
    post_params = create_and_edit_params
    post = Post.find(params[:id])
    return render json: { success: false } if current_user.id != post.poster_id
    if post.update(
         JSON
           .parse(post_params[:formData])
           .keep_if { |key| Post.has_attribute? key },
       )
      from_json_save_tags(post_params[:tags], post.id)
      render json: { success: true, post: post.get_data }
    else
      render json: { success: false }
    end
  end

  private

  def create_and_edit_params
    params.permit(:formData, :tags, :id)
  end
  def from_json_save_tags(tags, post_id)
    JSON
      .parse(tags)
      .each do |tag_name|
        PostTag.create(
          post_id: post_id,
          tag_id: Tag.find_or_create_by(name: tag_name).id,
        )
      end
  end
end
