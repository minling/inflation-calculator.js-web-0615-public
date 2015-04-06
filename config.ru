$LOAD_PATH << '.'
require './config/environment'

use Rack::Static, :urls => ['/stylesheets', '/javascripts'], :root => 'public'
use Rack::MethodOverride

run ApplicationController