# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

test_user =
  User.create email: 'test@test.com',
              password: 'test_password',
              password_confirmation: 'test_password',
              name: 'test_user_555'

tags =
  ['Green Tea', 'Expensive', 'Umami', 'Cloudy'].map! do |name|
    Tag.create!(name: name)
  end

i = 0

(
  [
    {
      temperature: 80,
      rating: 3,
      time: %w[15 30 45],
      price: 15,
      notes: 'Exquisite!',
      name: 'Unknown Green Tea',
      link: 'example.com',
    },
    {
      temperature: 70,
      rating: 5,
      time: %w[45 90 60],
      price: 30.50,
      notes: 'Wonderful!',
      name: 'Costly Green Tea',
      link: 'example.com',
    },
    {
      temperature: 65,
      rating: 2,
      time: %w[60 90 60],
      price: 10,
      notes: 'Decent',
      name: 'Average Green Tea',
      link: 'example.com',
    },
  ] * 12
).each do |post_data|
  post =
    Post.create!(
      temperature: post_data[:temperature],
      rating: post_data[:rating],
      price: post_data[:price],
      notes: post_data[:notes],
      name: post_data[:name],
      link: post_data[:link],
      poster_id: test_user.id,
      is_public: (i % 4 != 0),
      temp_unit: (i % 2 == 0) ? 'celsius' : 'fahrenheit',
      leaf_quantity: (i % 2 == 0) ? "#{i}g" : '',
      water_quantity: (i % 2 == 0) ? "#{i * 20}ml" : '',
      time: post_data[:time],
    )
  rand(tags.length + 1).times { |i| PostTag.create!(tag: tags[i], post: post) }
  i += 1
end
