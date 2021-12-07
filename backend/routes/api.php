<?php

use App\Http\Controllers\API\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\DoctorController;
use App\Http\Controllers\API\PatientController;
use App\Http\Controllers\API\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']); 
    Route::post('/user-update', [UserController::class, 'userUpdate']);    

    Route::get('/doctors', [DoctorController::class, 'index']);
    Route::post('/doctors', [DoctorController::class, 'store']);
    Route::get('/doctors/{doctor}', [DoctorController::class, 'show']);
    Route::post('/doctors/{doctor}', [DoctorController::class, 'update']);
    Route::delete('/doctors/{doctor}', [DoctorController::class, 'destroy']);
    Route::get('/isonduty', [DoctorController::class, 'showIsOnDuty']);
    Route::post('/isonduty/{doctor}', [DoctorController::class, 'isOnDuty']);

    Route::get('/queue', [PatientController::class, 'index']);
    Route::post('/queue', [PatientController::class, 'store']);
    Route::get('/queue-data', [PatientController::class, 'queueData']);
    Route::post('/queue/finished/{waitingList}', [PatientController::class, 'finishedWaitingList']);

    Route::get('/admin', [AdminController::class, 'index']);
    Route::post('/admin/set-staff/{user_id}', [AdminController::class, 'update']);
});