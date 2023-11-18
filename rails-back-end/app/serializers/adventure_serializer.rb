class AdventureSerializer < ActiveModel::Serializer
  attributes :id, :prompt, :ratings, :description, :title, :comments, :items

  has_many :characters
  has_many :items
  has_many :users, through: :characters
end
