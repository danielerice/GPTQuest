class ItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :context

  belongs_to :user
end
