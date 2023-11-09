class ApplicationController < ActionController::Base
    include ActionController::Cookies
    wrap_parameters format: []
    protect_from_forgery unless: -> { request.format.json? }
    before_action :authorize
  
    def authorize
      return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session.include? :user_id
    end

end
