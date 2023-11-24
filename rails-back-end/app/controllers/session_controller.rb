class SessionController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_response

    skip_before_action :authorize
    skip_before_action :verify_authenticity_token

    #POST /login
    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {errors: ["Wrong username or password"]}, status: :unauthorized
        end
    end

    #DELETE /logout
    def destroy
        session.delete :user_id
        head :no_content
    end

    private
    def unprocessable_entity_response invalid
        render json: {errors: invalid.message}, status: :unprocessable_entity
    end

    def record_not_found_response invalid
        render json: {errors: invalid.message}, status: :not_found
    end
end
