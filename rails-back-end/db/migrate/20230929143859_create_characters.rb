class CreateCharacters < ActiveRecord::Migration[7.0]
  def change
    create_table :characters do |t|
      t.integer :user_id
      t.integer :adventure_id
      t.text :context, array: true, default: []

      t.timestamps
    end
  end
end
