class ItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :context
end
