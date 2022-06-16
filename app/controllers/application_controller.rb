class ApplicationController < ActionController::Base
  def current_user_id
    current_user_id = user_signed_in? ? current_user.id : nil
  end
  def get_sort_order(sort_order_string)
    case sort_order_string
    when 'old'
      { created_at: :desc }
    when 'top'
      { rating: :desc }
    when 'high-low'
      { price: :desc }
    when 'low-high'
      { price: :asc }
    else
      { created_at: :asc }
    end
  end
end
