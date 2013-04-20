#!/usr/bin/env ruby
File.open("js/a", "r").each_line do |line|
	line.strip!
	
	if line.index(".js")
		dir = File.dirname(line)
		`mkdir -p ../coffee/#{dir}`
		coffee_file_name = line.gsub(".js", "")
		puts "js2coffee js/#{line} > coffee/#{coffee_file_name}.coffee"
	#	`js2coffee #{line} > ../coffee/#{coffee_file_name}.coffee`	
	end
end
