class AdventuresController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_response

    #POST /create
    def create
        adventure = Adventure.create!(character_params)
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
        params.permit(:prompt, :ratings, :description, :title, :comments)
    end
end
