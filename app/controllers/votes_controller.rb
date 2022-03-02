class VotesController < ApplicationController
  def create
    return not_logged_in_message if !user_signed_in?
    vote_params = { **create_params, voter_id: current_user.id }
    vote = Vote.new(vote_params)

    previous =
      Vote.where(
        'voter_id = ? AND post_id = ?',
        current_user.id,
        vote_params['post_id'],
      )
    previous[0].destroy if previous.length != 0

    if vote.save
      render json: {
               success: true,
               score: Post.find(vote_params['post_id']).score,
             }
    else
      render json: { success: false }
    end
  end
  def destroy
    return not_logged_in_message if !user_signed_in?
    request_params = delete_params
    if Vote.where(
         'voter_id = ? AND post_id= ?',
         current_user.id,
         request_params['post_id'],
       ).length != 0
      Vote.find_by(
        'voter_id = ? AND post_id = ? AND vote_type = ?',
        current_user.id,
        request_params['post_id'],
        request_params['vote_type'],
      ).destroy
      render json: {
               success: true,
               score: Post.find(request_params['post_id']).score,
             }
    else
      render json: { success: false }
    end
  end

  private

  def create_params
    params.permit(:post_id, :vote_type)
  end
  def delete_params
    params.permit(:post_id, :vote_type)
  end
  def not_logged_in_message
    render json: { success: false, message: 'Not signed in' }
  end
end
