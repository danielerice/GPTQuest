class AdventureSerializer < ActiveModel::Serializer
  attributes :id, :prompt, :ratings, :description, :title, :comments

  has_many :characters
  has_many :adventures, through: :characters
end
