class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :characters, :adventures, :items

  has_many :characters
  has_many :adventures, through: :characters
  has_many :items
end
