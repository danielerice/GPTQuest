class AdventuresController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_response

    #POST /adventures
    def create
        adventure = Adventure.create!(character_params)
        render json: adventure, status: :created
    end

    #GET /adventures/:id
    def show
        adventure = Adventure.find(params[:id])
        render json: adventure, status: :ok
    end

    #GET /adventures
    def index
        render json: Adventure.all, status: :ok
    end

    #PATCH /adventures/:id
    def update
        adventure = Adventure.find(params[:id])
        adventure.update!(adventure_params)
        render json: adventure, status: :ok
    end

    #DELETE /adventures/:id
    def destroy
        user = User.find(session[user_id])
        adventure = user.adventures.find(params[:id])
        adventure.destroy
        head :no_content
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
