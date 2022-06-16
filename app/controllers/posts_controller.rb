require 'json'

class PostsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json do
        index_json
        render json: @posts
      end
    end
  end
  def create
    return render json: { success: false } if !user_signed_in?
    post_params = create_and_edit_params
    post =
      Post.new(
        {
          **JSON.parse(post_params[:formData]),
          is_public: is_public?(post_params[:is_public]),
        },
      )
    post.poster_id = current_user.id
    if post.save
      tags = from_json_save_tags(post, post_params[:tags])
      render json: { success: true, post: { **post.get_data, tags: tags } }
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
         {
           **JSON
             .parse(post_params[:formData])
             .keep_if { |key| Post.has_attribute? key },
           is_public: is_public?(post_params[:is_public]),
         },
       )
      tags = from_json_save_tags(post, post_params[:tags])
      render json: { success: true, post: { **post.get_data, tags: tags } }
    else
      render json: { success: false }
    end
  end

  private

  def index_json
    permitted_params = index_params
    @posts =
      Post
        .get_posts(
          order_by: get_sort_order(permitted_params[:sort_order]),
          tags: permitted_params[:tags],
          title: permitted_params[:title],
        )
        .limit(50)
        .map { |post| post.get_data(current_user_id) }
        .to_json
  end
  def index_params
    params.permit(:sort_order, :title, tags: [])
  end
  def create_and_edit_params
    params.permit(:formData, :tags, :id, :is_public)
  end
  def from_json_save_tags(post, tags)
    submitted_tags = JSON.parse(tags).map { |tag| tag.strip }
    new_tags = (submitted_tags - post.tags.to_a.map { |tag| tag.name })
    total_tags = filter_tags(post, submitted_tags)
    new_tags.each do |tag_name|
      next if !Tag.new(name: tag_name).valid?
      PostTag.find_or_create_by(
        post_id: post.id,
        tag_id: Tag.find_or_create_by(name: tag_name.strip).id,
      )
      total_tags << tag_name.strip
    end
    total_tags.uniq
  end
  def filter_tags(post, keep_tags)
    filtered_array = []
    post.tags.each do |tag|
      if !keep_tags.any? tag.name
        PostTag.where(post_id: post.id, tag_id: tag.id).destroy_all
      else
        filtered_array << tag.name
      end
    end
    filtered_array
  end
  def is_public?(json_string)
    !!JSON.parse(json_string)
  end
end
