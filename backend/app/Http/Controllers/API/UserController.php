<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Traits\JsonTrait;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Validator;

class UserController extends Controller
{
    use JsonTrait;
    /**
     * Update the authenticated user
     * 
     * @return \Illuminate\Http\JsonResponse
     */

    //  check the JWT token
    public function __construct() {
        $this->middleware('auth.jwt');
    }

    public function userUpdate(Request $request, User $user) {
        // get the auth user
        $user = Auth::user();
        

        // validate the form submitted
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => ['required','string','email',Rule::unique('users')->ignore($user),],
            'password' => 'required|string|confirmed|min:6',
            'nric' => 'required|string|min:8',
            'phone' => 'required|string|between:8,13',
            'title' => 'required|string|between:2,20',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        
        try{
            //Find the user object from model if it exists
            // $database= User::findOrFail($user);
            // dd($user);
    
            //$request contain your post data sent from your edit from
            //$user is an object which contains the column names of your table
    
            //Set user object attributes
            $user->name = $request['name'];
            $user->email = $request['email'];
            $user->password = bcrypt($request->password);
            $user->nric = $request['nric'];
            $user->phone = $request['phone'];
            $user->title = $request['title'];
    
            // Save/update user. 
            // This will will update your the row in ur db.
            $user->save();

            // dd($user);
    
            return response()->json([
                'message' => 'User updated',
                'user' => $user
            ], 201);
        }
        catch(Exception $err){
            //Show error page
            return response()->json([
                'message' => $err -> getMessage()
            ]);
        }
    }
}
