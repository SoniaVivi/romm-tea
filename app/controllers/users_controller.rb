class UsersController < ApplicationController
  before_action :require_login, only: [:show]

  def show
    if current_user_id != User.find_by(name: show_params[:name]).id
      redirect_to posts_url
    end
    respond_to do |format|
      format.html
      format.json do
        show_json
        render json: @posts
      end
    end
  end

  private

  def require_login
    redirect_to posts_url unless user_signed_in?
  end
  def show_json
    permitted_params = show_params
    @posts =
      User
        .find(current_user_id)
        .get_posts(
          order_by: get_sort_order(permitted_params[:sort_order]),
          tags: permitted_params[:tags],
          title: permitted_params[:title],
        )
        .limit(50)
        .map { |post| post.get_data(current_user_id) }
        .to_json
  end
  def show_params
    params.permit(:sort_order, :title, :name, tags: [])
  end
end
