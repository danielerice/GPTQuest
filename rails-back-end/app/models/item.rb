class Item < ApplicationRecord
    belongs_to :adventure

    validates :title, presence: true
    validates :context, presence: true
end
