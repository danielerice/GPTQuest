class ItemSerializer < ActiveModel::Serializer
  attributes :id, :adventure_id, :title, :context

  belongs_to :adventure
end
