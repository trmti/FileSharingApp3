# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

5.times do |n|
  user = User.create!(name: "user#{n + 1}", email: "user#{n + 1}@example.com", password: "123456789", password_confirmation: "123456789")
  user.create_post(image: File.open("./app/assets/images/seed#{n + 1}.jpg"))
  user.save
  5.times do |o|
    team = user.teams.create({name: "team#{o + 1}", description: "seed", leader_id: n+1, publish_range: "private"})
    5.times do |p|
      team.editors << user
      folder = team.folders.create({title: "folder#{p + 1}", description: "seed"})
      5.times do |q|
        file_content = folder.file_contents.create({title: "file_content#{q + 1}", description: "seed"});
        5.times do |r|
          comment = file_content.comments.create({text: "sample comment", user_id: r + 1})
        end
      end
    end
  end
end