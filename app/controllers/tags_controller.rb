require 'json'

class TagsController < ApplicationController
  def index
    @tags =
      if index_params[:use_current_user]
        Tag
          .joins(:post_tags)
          .where(
            'post_tags.post_id IN (?)',
            User.find(current_user_id).posts.ids,
          )
          .group(:id)
      else
        Tag.all
      end.limit(50).map { |tag| tag.get_data }
    respond_to { |format| format.json { render json: @tags.to_json } }
  end

  private

  def index_params
    params.permit(:use_current_user)
  end
end
