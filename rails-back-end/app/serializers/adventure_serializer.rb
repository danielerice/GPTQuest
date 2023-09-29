class AdventureSerializer < ActiveModel::Serializer
  attributes :id, :prompt, :ratings, :description, :title, :comments
end
