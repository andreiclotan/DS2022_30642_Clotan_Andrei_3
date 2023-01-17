Sidekiq.configure_client do |config|
  config.redis = { url: 'redis://redis:6379/0'  }
  Rails.application.config.after_initialize do
    ReadFromBunnyWorker.perform_async
  end
end

Sidekiq.configure_server do |config|
  config.redis = { url: 'redis://redis:6379/0'  }
end
