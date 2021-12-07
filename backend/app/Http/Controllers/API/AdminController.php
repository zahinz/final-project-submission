<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Traits\JsonTrait;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    use JsonTrait;

    // check the JWT token
    public function __construct() {
        $this->middleware('auth.jwt');
    }

    // list all user without role
    public function index() {
        $admin = Auth::user()->hasRole(['admin']);
        if($admin){
            $Users = User::with('roles')->orderBy('id', 'desc')->get();
            return $Users;
        }else{
            return response()->json([
                'message' => 'Not are not authorise to perform the action.'
            ], 403);
        }
    }

    // check the user as admin and assign the request id as staff
    public function update(User $user_id){
        $admin = Auth::user()->hasRole(['admin']);
        if(!$admin){
            return response()->json([
                'message' => 'Not are not authorise to perform the action.'
            ], 403);
        }
        $staff = User::where('id','=',$user_id->id)->firstOrFail()->assignRole('staff');
        if($staff){
            return response()->json([
                'message' => 'New staff created'
            ], 201);
        }
    }
}
