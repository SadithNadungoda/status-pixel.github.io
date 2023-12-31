<?php

namespace App\Console\Commands\Install;

use Illuminate\Console\Command;
use JsonException;

class InitCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'install:init';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Execute the actions to perform the system installation';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     * @throws JsonException
     */
    public function handle()
    {
        $this->call('down');

        $this->info('Step 1 of 4 - Creating the database tables');
        $this->call('migrate');

        $this->info('Step 2 of 4 - Introducing the data in the database');
        $this->call('db:seed');

        $this->info('Step 3 of 4 - Generating the unique key of the application');
        $this->call('key:generate');

        $this->info('Step 4 of 4 - Making storage link');
        $this->call('storage:link');

        $data = json_encode([
            'date' => date('Y/m/d h:i:s')
        ], JSON_THROW_ON_ERROR);
        file_put_contents(storage_path('framework/cache/installed'), $data, FILE_APPEND | LOCK_EX);

        $this->call('route:clear');
        $this->call('cache:clear');
        $this->call('config:clear');
        $this->call('view:clear');
        $this->call('optimize:clear');

        $this->call('up');
        $this->info('Installation completed successfully');
        return true;
    }
}
