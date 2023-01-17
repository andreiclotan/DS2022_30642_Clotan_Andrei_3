class ReadFromBunnyService < ActiveJob::Base
    require "rubygems"
    require "bunny"
    require "json"
   
    # Returns a connection instance
    conn = Bunny.new 'amqps://xdcbuepr:NlscYF_6yP3QTajeSeDI21AutxsR-Nte@sparrow.rmq.cloudamqp.com/xdcbuepr'
    # The connection is established when start is called
    conn.start

    # Create a channel in the TCP connection
    ch = conn.create_channel
    # Declare a queue with a given name, examplequeue. In this example is a durable shared queue used.
    q  = ch.queue("examplequeue", :durable => true)

    # Method for the PDF processing
    

    # Set up the consumer to subscribe from the queue
    q.subscribe(:block => true) do |delivery_info, properties, payload|
      json_information_message = JSON.parse(payload)
      pdf_processing(json_information_message)
    end

  def pdf_processing(json_information_message)
    puts json_information_message
    sleep 10.0
  end
end
