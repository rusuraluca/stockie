# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://0.0.0.0:3000"
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
   end
end

Rails.application.config.hosts = [
    IPAddr.new("0.0.0.0/0"),        # All IPv4 addresses.
    IPAddr.new("::/0"),             # All IPv6 addresses.
    "localhost",                    # The localhost reserved domain.
    ENV["ec2-13-50-226-35.eu-north-1.compute.amazonaws.com"]  # Additional comma-separated hosts for development.
]