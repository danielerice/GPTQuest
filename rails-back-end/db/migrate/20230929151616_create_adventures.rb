class CreateAdventures < ActiveRecord::Migration[7.0]
  def change
    create_table :adventures do |t|
      t.text :prompt
      t.integer :ratings, array: true, default: []
      t.text :description
      t.string :title
      t.text :comments, array: true, default: []

      t.timestamps
    end
  end
end
