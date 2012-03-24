load "config/sencha"

set :application, "temperature.kma.edu"
set :repository,  "git@github.com:KmaDevelopers/Monitoring-System.git"
set :user, "root"
set :port, 23
set :use_sudo, false
set :password, "kma2011"
set :scm, :git
set :deploy_to, "/var/www"
set :current_dir, "#{application}"
set :keep_releases, 3
set :deploy_via, :copy
set :copy_exclude, [".git"]
set :branch, 'master'
#ssh_options[:forward_agent] = true

role :web, "217.77.223.17"                          # Your HTTP server, Apache/etc
role :app, "217.77.223.17"                          # This may be the same as your `Web` server
role :db,  "217.77.223.17", :primary => true # This is where Rails migrations will run

after "deploy:create_symlink", "deploy:update_rights"
after "deploy:create_symlink", "deploy:minimize_all"

namespace :deploy do
	desc "Migrations :)"
    task :migrate, { :only => { :primary => true}, :roles=>:db } do
        run "cd #{current_release} && protected/yiic migrate --interactive=0"
    end

    task :update_rights do
    	run "chmod 777 -R #{current_release}/protected/runtime"
	end

    desc "Minimizes all css and js code"
    task :minimize_all, :roles => :app do
    	check_sdk

    	if sdk_exists
        	run "ln -sf #{current_release}/protected/config/jsEnvs/env.php #{current_release}/protected/config/jsEnvs/jsb.php"

        	run "cd #{current_release}/apps/main/public && xvfb-run sencha create jsb -a http:/// -p ./app.jsb"
        	run "cd #{current_release}/apps/main/public && sencha build -c -p app.jsb -d ."

        	run "ln -sf #{current_release}/protected/config/jsEnvs/env.php #{current_release}/protected/config/jsEnvs/production.php"
        else
        	p "task minimize_all::Sencha SDK not found !!!"
        end
    end
end