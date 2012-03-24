set :xvfb_exists, false
set :sdk_exists, false

namespace :sencha do
    task :check_xvfb_program do
        run "command -v xvfb-run" do |channel, stream, data|
            set :xvfb_exists, true if data.length > 0 # program exists
        end
    end

    task :check_sdk do
       run "command -v sencha" do |channel, stream, data|
            set :sdk_exists, true if data.length > 0 # program exists
        end 
    end

    task :setup do
        setup_xvfb
        setup_sdk
    end

    task :setup_xvfb do
        check_xvfb_program

        unless xvfb_exists 
            run "apt-get update" # because sometime xvfb cannot be founded
            run "apt-get install xvfb" do |channel, stream, data|
                channel.send_data "Y\n" if data =~ /Do you want to continue/
            end
        end
    end

    task :setup_sdk do
        check_sdk

        unless sdk_exists
            run "   "
        end
    end
end