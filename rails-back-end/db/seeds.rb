# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
adventures = Adventure.create([{
    prompt: "Begin in an underworld hellscape surrounded by violent skeletons",
    ratings: [5,5,4],
    description: "I made this one to see if I could overcome the undead on their own turf",
    title: "TurboMetal HellScape",
    comments: ["This was awesome!", "wayyyy too metal for me"]
    },{
        prompt: "Begin on a seemingly deserted island with nothing but your wits",
        ratings: [5,4,4],
        description: "Don't forget your volleyball!",
        title: "Cast Away",
        comments: ["This was awesome!", "WILSSONNNNNNN!!!!"]
    }]);

characters = Character.create([{
    user_id: 1,
    adventure_id: 1,
    context: ["something", "something else"]
},{
    user_id: 2,
    adventure_id: 2,
    context: ["something", "something else"]
}])

