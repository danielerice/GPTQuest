class CredentialsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_response

    skip_before_action :authorize
    skip_before_action :verify_authenticity_token

    #GET '/creds'
    def show
        credentials = Rails.application.credentials.dig(:openai)
        render json: credentials, status: :ok
    end

    private
    def unprocessable_entity_response invalid
        render json: {errors: invalid.message}, status: :unprocessable_entity
    end

    def record_not_found_response invalid
        render json: {errors: invalid.message}, status: :not_found
    end
end