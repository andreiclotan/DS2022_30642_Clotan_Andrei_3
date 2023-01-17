# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = "1.0"

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
# example_publisher.rb

# Returns a connection instance
conn = Bunny.new 'amqps://xdcbuepr:NlscYF_6yP3QTajeSeDI21AutxsR-Nte@sparrow.rmq.cloudamqp.com/xdcbuepr'
# The connection is established when start is called
conn.start

# create a channel in the TCP connection
ch = conn.create_channel

# Declare a queue with a given name, examplequeue. In this example is a durable shared queue used.
q  = ch.queue("examplequeue", :durable => true)

# Bind a queue to an exchange
x = ch.direct("example.exchange", :durable => true)
q.bind(x, :routing_key => "process")

# Publish a message

require 'csv'
device_id = 3007 - ARGV[1].to_i
CSV.foreach("sensor.csv") do |row|
  information_message = {
    timestamp: Time.now,
    device_id: device_id,
    measured_value: 1500
  }
  x.publish(JSON.dump(information_message),
  :timestamp      => Time.now.to_i,
  :routing_key    => "process",
  )
  sleep 10
end

sleep 1.0
conn.close