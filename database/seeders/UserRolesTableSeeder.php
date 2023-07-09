<?php

namespace Database\Seeders;

use App\Http\Controllers\Api\Dashboard\StatsController as DashboardStatsController;
use App\Models\UserRole;
use Illuminate\Database\Seeder;
use JsonException;

class UserRolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws JsonException
     */
    public function run()
    {
        if (UserRole::count() === 0) {
            // Add Admin Role
            $userRole = new UserRole();
            $userRole->name = 'Admin';
            $userRole->type = 1;
            $userRole->permissions = '[]';
            $userRole->save();
            // Add User Role
            $userRole = new UserRole();
            $userRole->name = 'User';
            $userRole->type = 1;
            $userRole->permissions = json_encode([str_replace('\\', '.', DashboardStatsController::class)], JSON_THROW_ON_ERROR);
            $userRole->save();
        }
    }
}
