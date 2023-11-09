class ItemsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_response

    #POST /items
    def create
        user = User.find(session[:user_id])
        item = user.items.create!(item_params)
        render json: item, status: :created
    end

    #DELETE /items/:id
    def destroy
        user = User.find(session[:user_id])
        item = user.items.find(params[:id])
        item.destroy
        head :no_content
    end

    private
    def unprocessable_entity_response invalid
        render json: {errors: [invalid.message]}, status: :unprocessable_entity
    end

    def record_not_found_response invalid
        render json: {errors: [invalid.message]}, status: :not_found
    end

    def item_params
        params.permit(:title, context: [])
    end
end
