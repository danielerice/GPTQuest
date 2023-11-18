class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :characters, :adventures

  has_many :characters
  has_many :adventures, through: :characters
end
