class Adventure < ApplicationRecord
    has_many :characters
    has_many :items
    has_many :users, through: :characters

    validates :title, presence: true
    validates :prompt, presence: true
    validates :description, presence: true
end
