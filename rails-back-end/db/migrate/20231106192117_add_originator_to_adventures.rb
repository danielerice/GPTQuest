class AddOriginatorToAdventures < ActiveRecord::Migration[7.0]
  def change
    add_column :adventures, :originator, :integer
  end
end
