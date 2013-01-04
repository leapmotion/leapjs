require 'erb'

def load_file(path)
  raise "nothing at #{path}" if Dir[path].empty?
  files = Dir[path].map do |f|
    File.read(f)
  end
  files.join("\n")
end

task :test => :build do
  exec "./node_modules/.bin/mocha-phantomjs test.html"
end

task :build do
  File.open("./leap.js", 'w') { |f| f << ERB.new(File.read("./leap.js.erb")).result }
  system("./node_modules/.bin/uglifyjs ./leap.js -o leap.min.js") or raise
end
