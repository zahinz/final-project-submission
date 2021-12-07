<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superAdminUser = User::firstOrCreate(
            [
                'id' => 1,
            ],
            [
                'title' => 'Mr',
                'nric' => '940330106191',
                'name' => 'Super Admin',
                'phone' => '0196974200',
                'email' => 'superadmin@mail.com',
                'password' => bcrypt('password'),
            ]
        );
        $superAdminUser->assignRole('admin');
    }
}
