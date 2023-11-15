class Adventure < ApplicationRecord
    has_many :characters
    has_many :users, through: :characters

    validates :title, presence: true
    validates :prompt, presence: true
    validates :description, presence: true
    validates :originator, presence: true
end
