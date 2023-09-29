class Item < ApplicationRecord
    belongs_to :user

    validates :title, presence: true
    validates :context, presence: true
end
