class ApplicationController < ActionController::Base
  def current_user_id
    current_user_id = user_signed_in? ? current_user.id : nil
  end
end
