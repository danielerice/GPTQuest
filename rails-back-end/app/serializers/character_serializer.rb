class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :adventure_id, :context

  belongs_to :user
end
