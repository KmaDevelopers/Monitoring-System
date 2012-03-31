set :xvfb_exists, false
set :sdk_exists, false
set :sdk_arch, "x86"
set :default_run_options, { :pty => true}

namespace :sencha do
    task :check_xvfb_program do
        run "s=`command -v xvfb-run`;echo $s" do |channel, stream, data|
            set :xvfb_exists, true if data.chomp.length > 0 # program exists
        end
    end

    task :check_sdk do
       run "s=`command -v sencha`;echo $s" do |channel, stream, data|
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
            # check distribution's name
            command = 'grep -ihs "buntu\|SUSE\|Fedora\|PCLinuxOS\|MEPIS\|Mandriva\|Debian\|Damn\|Sabayon\|Slackware\|KNOPPIX\|Gentoo\|Zenwalk\|Mint\|Kubuntu\|FreeBSD\|Puppy\|Freespire\|Vector\|Dreamlinux\|CentOS\|Arch\|Xandros\|Elive\|SLAX\|Red\|BSD\|KANOTIX\|Nexenta\|Foresight\|GeeXboX\|Frugalware\|64\|SystemRescue\|Novell\|Solaris\|BackTrack\|KateOS\|Pardus" /etc/{issue,*release,*version}'
            run command do |channel, stream, data|
                if data =~ /Arch Linux/
                    run "wget http://www.archlinux.org/mirrorlist/?country=all&protocol=http&ip_version=4 /tmp/mirrolist"
                    sudo "mv /etc/pacman.d/mirrolist /etc/pacman.d/mirrolist_old"
                    sudo "cat /tmp/mirrolist > /etc/pacman.d/mirrolist"
                    sudo "pacman -Syu" do |ch, st, result|
                        p result
                        ch.send_data "Y\n" if result =~ /Y\/n/
                    end

                    sudo "pacman -S xorg-server-xvfb" do |ch, st, result|
                        p result
                        ch.send_data "Y\n" if result =~ /Y\/n/
                    end
                elsif data =~ /ubuntu/ || data =~ /debian/
                    sudo "apt-get update" # because sometime xvfb cannot be founded
                    sudo "apt-get install xvfb" do |ch, st, result|
                        ch.send_data "Y\n" if result =~ /Do you want to continue/
                    end
                end
            end
        end
    end

    task :setup_sdk do
        check_sdk

        unless sdk_exists
            p 'installing sencha-sdk ...'
            sudo "chmod +x #{current_release}/config/installers/sencha_installer_#{sdk_arch}.run"
            run "cd #{current_release}/config/installers && ./sencha_installer_#{sdk_arch}.run" do |channel, stream, data|
                channel.send_data "\n" if data =~ /Enter/ or data =~ /Installation Directory/
                channel.send_data "y\n" if data =~ /Do you accept this license/
                channel.send_data "Y\n" if data =~ /Do you want to continue/
            end
        end
    end
end