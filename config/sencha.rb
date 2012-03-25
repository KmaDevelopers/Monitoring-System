set :xvfb_exists, false
set :sdk_exists, false
set :sdk_arch, "x86"

namespace :sencha do
    task :check_xvfb_program do
        run "s=`command -v xvfb-run`;echo $s;unset $s" do |channel, stream, data|
            set :xvfb_exists, true if data.chomp.length > 0 # program exists
        end
    end

    task :check_sdk do
       run "s=`command -v sencha`;echo $s;unset $s" do |channel, stream, data|
            set :sdk_exists, true if data.chomp.length > 0 # program exists
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
            p 'installing sencha-sdk ...'
            run "cd #{current_release}/config/installers && sencha_installer_#{sdk_arch}.run" do |channel, stream, data|
               p data 
            end
        end
    end
end