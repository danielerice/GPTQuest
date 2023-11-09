class AdventuresController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_response
    skip_before_action :authorize
    skip_before_action :verify_authenticity_token


    #POST /adventures
    def create
        adventure = Adventure.create!(adventure_params)
        adventure.update!(originator: session[:user_id])
        adventure.characters.create!( user_id: session[:user_id], context: [(adventure_params[:prompt])])
        render json: adventure, status: :created
    end

    #GET /adventures/:id
    def show
        adventure = Adventure.find(params[:id])
        render json: adventure, status: :ok
    end

    #GET /adventures
    def index
        #adventures = Adventure.all
        adventures = Adventure.order(:id)
        render json: adventures, status: :ok
    end

    #PATCH /adventures/:id
    def update
        adventure = Adventure.find(params[:id])
        adventure.update!(adventure_params)
        render json: adventure, status: :ok
    end

    #DELETE /adventures/:id
    def destroy
        user = User.find(session[:user_id])
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
        params.permit(:prompt, :ratings, :description, :title, :comments, :id)
    end
end
