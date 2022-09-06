require('Oktakit');

id = ARGV[0];

client = Oktakit.new(token: ENV['OKTA_TOKEN'], api_endpoint: ENV['OKTA_BASE_URL']);
response, http_status = client.deactivate_application(id);
p(http_status);
response, http_status = client.delete_application(id);
p(http_status);
p(response);
