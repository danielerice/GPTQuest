class CharactersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_response

    #POST /characters
    def create
        character = Character.create!(character_params)
        render json: character, status: :created
    end

    #PATCH /characters/:id
    def update
        user = User.find(session[:user_id])
        character = user.characters.find(params[:id])
        character.update!(character_params)
        render json: character, status: :ok
    end

    #DELETE /charcters/:id
    def destroy
        user = User.find(session[:user_id])
        character = user.characters.find(params[:id])
        character.destroy
        head :no_content
    end

    private
    def unprocessable_entity_response invalid
        render json: {errors: [invalid.message]}, status: :unprocessable_entity
    end

    def record_not_found_response invalid
        render json: {errors: [invalid.message]}, status: :not_found
    end

    def character_params
        params.permit(:user_id, :adventure_id, :context)
    end
end
