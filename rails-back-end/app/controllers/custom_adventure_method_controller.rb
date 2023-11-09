class CustomAdventureMethodController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_response
    skip_before_action :authorize
    skip_before_action :verify_authenticity_token

    #POST /adventures
    def create
        adventure = Adventure.create!(adventure_params)
        user = User.find(session[:user_id])
        adventure.characters.create!( user_id: session[:user_id], context: [(adventure_params[:prompt])])
        render json: adventure, status: :created
    end

    private
    def unprocessable_entity_response invalid
        render json: {errors: [invalid.message]}, status: :unprocessable_entity
    end

    def record_not_found_response invalid
        render json: {errors: [invalid.message]}, status: :not_found
    end

    def adventure_params
        params.permit(:prompt, :ratings, :description, :title, :comments, :id)
    end
end