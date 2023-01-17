class ReadFromBunnyWorker
  include Sidekiq::Worker

  def perform()
    require "rubygems"
    require "bunny"
    require "json"
    conn = Bunny.new 'amqps://xdcbuepr:NlscYF_6yP3QTajeSeDI21AutxsR-Nte@sparrow.rmq.cloudamqp.com/xdcbuepr'
    conn.start
    ch = conn.create_channel
    q  = ch.queue("examplequeue", :durable => true)
    q.subscribe(:block => true) do |delivery_info, properties, payload|
      json_information_message = JSON.parse(payload)
      ReadFromBunnyService.call(json_information_message)
    end
  end
end
