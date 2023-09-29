class Character < ApplicationRecord
    belongs_to :user
    belongs_to :adventure

    validates :context, presence: true
end
