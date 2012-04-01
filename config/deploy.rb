load "config/sencha"

#set :application, "temperature.kma.edu"
set :application, "kmamonitor.dyndns.info"
set :repository,  "git@github.com:KmaDevelopers/Monitoring-System.git"
set :user, "rsqw"
set :use_sudo, false
set :password, "rsqw"
set :scm, :git
set :deploy_to, "/home/htdocs/kma.ms"
set :current_dir, "#{application}"
set :keep_releases, 3
set :deploy_via, :copy
set :copy_exclude, [".git"]
set :branch, 'master'
set :default_run_options, { 
    :shell => "/bin/bash", 
    :pty => true
}

role :web, "kmamonitor.dyndns.info"                          # Your HTTP server, Apache/etc
role :app, "kmamonitor.dyndns.info"                          # This may be the same as your `Web` server
role :db,  "kmamonitor.dyndns.info", :primary => true # This is where Rails migrations will run

before "deploy:create_symlink", "deploy:change_constants"

after "deploy:create_symlink", "deploy:update_rights"
after "deploy:create_symlink", "deploy:minimize_all"

namespace :deploy do
    task :change_constants do
        command = %q{sed -i  s/"define('YII_DEBUG',true)"/"define('YII_DEBUG',false)"/ }
        run "#{command} #{current_release}/index.php"
    end

	desc "Migrations :)"
    task :migrate, { :only => { :primary => true}, :roles=>:db } do
        run "cd #{current_release} && protected/yiic migrate --interactive=0"
    end

    task :update_rights do
    	run "chmod 777 -R #{current_release}/protected/runtime"
	end

    desc "Minimizes all css and js code"
    task :minimize_all, :roles => :app do
        run "echo 4" do |c,s,d|
            p d
        end
        sencha.check_sdk

    	if sdk_exists
        	run "ln -sf #{current_release}/protected/config/jsEnvs/env.php #{current_release}/protected/config/jsEnvs/jsb.php"
        	run "cd #{current_release}/adminJs && xvfb-run sencha create jsb -a http://#{application}/ -p ./app.jsb"
        	run "cd #{current_release}/adminJs && sencha build -c -p app.jsb -d ."
        	run "ln -sf #{current_release}/protected/config/jsEnvs/env.php #{current_release}/protected/config/jsEnvs/production.php"
        else
        	p "task minimize_all::Sencha SDK not found !!!"
            p "run cap sencha:setup to install it"
        end
    end
end