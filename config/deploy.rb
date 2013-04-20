set :application, "sensors"
set :repository,  "git@github.com:KmaDevelopers/Monitoring-System.git"
set :user, "demo"
set :password, "demo"
set :keep_releases, 2
set :use_sudo, false
set :deploy_via, :remote_cache
set :deploy_to, "/var/www/html/#{application}.demo.iqria.com"
set :application_shared_params_path, "#{deploy_to}/shared"

role :web, "10.80.80.72"                          # Your HTTP server, Apache/etc
role :app, "10.80.80.72"                          # This may be the same as your `Web` server
role :db,  "10.80.80.72", :primary => true # This is where Rails migrations will run

set :default_run_options, { 
    :shell => '/bin/bash', 
    :pty => true 
}

set :ssh_options, {
    :keys => [
        File.join(ENV["HOME"], '.ssh', 'iqria_demo')
    ]
}

namespace :deploy do
  task :permissions do ; end
  task :migrate do ; end

  desc "Use sudo"
  task :use_sudo do
      unless exists? :password_entered
          set(:password) { Capistrano::CLI.password_prompt("Root password: ") }
          set :use_sudo, true
          set :password_entered, true
      end
  end

  desc <<-DESC
    task is used only in deploy:setup
    deploy:setup should be runned with root-access
    as result the owner of #{deploy_to}-folder will be root
    this task changes this issue to setup valid-rights for #{deploy_to}-folder 
  DESC
  task :fix_setup_permissions do
      run "#{try_sudo} chown #{user}:#{user} -R #{deploy_to}"
      run "#{try_sudo} chmod 755 #{deploy_to}"
  end

  task :apply_db_dump do
    #set(:database_user) { Capistrano::CLI.password_prompt("Database username: ") }
    #set(:database_password) { Capistrano::CLI.password_prompt("Database password: ") }
    #set(:database_name) { Capistrano::CLI.password_prompt("Database name: ") }
    
    #run "mysql -u#{database_user} -p#{database_password} #{database_name} < #{latest_release}/db.sql"
  end

  task :run_migrations do 
    run %{
        cd #{latest_release} ; protected/yiic migrate --interactive=0
    }
  end

  task :apply_shared_folders do ; end

  task :change_env do
    run %{
        sed -i  s/"define('YII_DEBUG',true)"/"define('YII_DEBUG',false)"/ #{latest_release}/index.php
    }
    #run %{
    #  rm #{latest_release}/config.php ;
    #  ln -sf #{application_shared_params_path}/config.php #{latest_release}/config.php ;
    #}
  end

  task :create_env do
    #db_config = apply_template 'config', 'Configuration'
    #put db_config, "#{application_shared_params_path}/config.php"
  end
end

before "deploy:setup", "deploy:use_sudo"
after  "deploy:setup", "deploy:fix_setup_permissions"

before "deploy:start", "deploy:permissions"
before "deploy:start", "deploy:apply_db_dump"
before "deploy:start", "deploy:run_migrations"
before "deploy:start", "deploy:create_env"

before "deploy:restart", "deploy:permissions"
before "deploy:restart", "deploy:run_migrations"

before "deploy:create_symlink", "deploy:change_env"
after  "deploy:restart", "deploy:cleanup"
after  "deploy:create_symlink", "deploy:apply_shared_folders"

# namespace :deploy do
#     task :change_constants do
#         command = %q{sed -i  s/"define('YII_DEBUG',true)"/"define('YII_DEBUG',false)"/ }
#         run "#{command} #{current_release}/index.php"
#     end

# 	desc "Migrations :)"
#     task :migrate, { :only => { :primary => true}, :roles=>:db } do
#         run "cd #{current_release} && protected/yiic migrate --interactive=0"
#     end

#     task :update_rights do
#     	run "chmod 777 -R #{current_release}/protected/runtime"
# 	end

#     desc "Minimizes all css and js code"
#     task :minimize_all, :roles => :app do
#         run "echo 4" do |c,s,d|
#             p d
#         end
#         sencha.check_sdk

#     	if sdk_exists
#         	run "ln -sf #{current_release}/protected/config/jsEnvs/env.php #{current_release}/protected/config/jsEnvs/jsb.php"
#         	run "cd #{current_release}/adminJs && xvfb-run sencha create jsb -a http://#{application}/ -p ./app.jsb"
#         	run "cd #{current_release}/adminJs && sencha build -c -p app.jsb -d ."
#         	run "ln -sf #{current_release}/protected/config/jsEnvs/env.php #{current_release}/protected/config/jsEnvs/production.php"
#         else
#         	p "task minimize_all::Sencha SDK not found !!!"
#             p "run cap sencha:setup to install it"
#         end
#     end
# end

# before "deploy:create_symlink", "deploy:change_constants"

# after "deploy:create_symlink", "deploy:update_rights"
# after "deploy:create_symlink", "deploy:minimize_all"