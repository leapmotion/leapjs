require 'erb'

def load_file(path)
  raise "nothing at #{path}" if Dir[path].empty?
  files = Dir[path].to_a.sort.map do |f|
    File.read(f)
  end
  files.join("\n")
end

task :test => :build do
  exec "./node_modules/.bin/mocha-phantomjs test/runner.html"
end

task :build do
  File.open(File.expand_path("../leap.js", __FILE__), "w") { |f| f << ERB.new(File.read("./template/leap.js.erb")).result }
  system("./node_modules/.bin/uglifyjs ./leap.js -o leap.min.js") or raise
end

task :serve do
  `./node_modules/.bin/static .`
end