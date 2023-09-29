class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.integer :user_id
      t.string :title
      t.text :context, array: true, default: []

      t.timestamps
    end
  end
end
