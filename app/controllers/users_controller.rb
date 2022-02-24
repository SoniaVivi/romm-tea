class UsersController < ApplicationController
  before_action :require_login, only: [:show]

  def show
    @posts =
      if current_user.id == User.find_by(name: params[:name]).id
        current_user.posts.limit(50).map { |post| post.get_data }
      else
        current_user
          .posts
          .where(is_public: true, is_public: nil)
          .limit(50)
          .map { |post| post.get_data }
      end
  end

  private

  def require_login
    redirect_to posts_url unless user_signed_in?
  end
end
