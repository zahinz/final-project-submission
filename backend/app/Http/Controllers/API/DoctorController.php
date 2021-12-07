<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Traits\JsonTrait;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Validator;

class DoctorController extends Controller
{
    use JsonTrait;
     /**
     * Update the authenticated user
     * Check the role === staff
     * return list of doctor
     * 
     * @return \Illuminate\Http\JsonResponse
     */

    //  check the JWT token
    public function __construct() {
        $this->middleware('auth.jwt', ['except' => ['showIsOnDuty']]);
    }

    // display all doctors
    public function index(User $user){
        $user = Auth::user()->hasRole(['admin','staff']);

        if ($user) {
            $doctor = User::role('doctor')->has('doctor')->with('doctor')->get(); 
            $doctorOnDuty = collect($doctor)->sortBy("doctor.is_on_duty", 1, true)->values();
            return $doctorOnDuty;
        }
    }

    // create new doctor
    public function store(Request $request,){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'nric' => 'required|string|min:8',
            'phone' => 'required|string|between:8,13',
            'title' => 'required|string|between:2,20',
            'mmc_registration_number' => 'required|string|between:2,20',
            'graduated_from' => 'required|string|max:20',
            'is_on_duty' => 'boolean',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try{
            // create new user
            $user = new User();
    
            //Set user object attributes
            $user->name = $request['name'];
            $user->email = $request['email'];
            $user->password = bcrypt($request->password);
            $user->nric = $request['nric'];
            $user->phone = $request['phone'];
            $user->title = $request['title'];
    
            // Save/update user. 
            $user->save();

            // Set user's role as doctor
            $user->assignRole('doctor');

            // create doctor
            $doctor = new Doctor([
                'mmc_registration_number' => $request['mmc_registration_number'] ,
                'graduated_from' => $request['graduated_from'] ,
                'is_on_duty' => false,
            ]);

            // save doctor
            $user->doctor()->save($doctor);

            // dd($user);
    
            return response()->json([
                'message' => 'New doctor created',
                'user' => $user,
                'doctor' => $doctor,
            ], 201);
        }
        catch(Exception $err){
            //Show error page
            return response()->json([
                'message' => $err -> getMessage()
            ]);
        }


    }

    // show a doctor based on id
    public function show(Doctor $doctor){
        $queryDoctor = User::role('doctor')->where('id', '=', $doctor->user_id)->with('doctor')->get();
        // dd($queryDoctor);

        return $queryDoctor;
    }

    // update a doctor based on id
    public function update(Doctor $doctor, Request $request, User $user){
        // get the doctor
        $queryUser = User::where('id', '=', $doctor->user_id)->firstOrFail();
        $queryDoctor = Doctor::where('id', '=', $doctor->id)->firstOrFail();
        
        // dd($queryDoctor);

        // validate the inputs
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => ['required','string','email',Rule::unique('users')->ignore($queryUser),],
            'password' => 'required|string|confirmed|min:6',
            'nric' => 'required|string|min:8',
            'phone' => 'required|string|between:8,13',
            'title' => 'required|string|between:2,20',
            'mmc_registration_number' => 'required|string|between:2,20',
            'graduated_from' => 'required|string|max:20',
            'is_on_duty' => 'boolean',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try{
            //Set user object attributes
            $queryUser ->name = $request['name'];
            $queryUser ->email = $request['email'];
            $queryUser ->password = bcrypt($request->password);
            $queryUser ->nric = $request['nric'];
            $queryUser ->phone = $request['phone'];
            $queryUser ->title = $request['title'];

            $queryDoctor->graduated_from = $request['graduated_from'];
            $queryDoctor->mmc_registration_number = $request['mmc_registration_number'];
            $queryDoctor->is_on_duty = false;

            
            // Save/update queryUser . 
            $queryUser->update();
            $queryDoctor->update();


            // dd($queryUser->doctor->graduated_from );
    
            return response()->json([
                'message' => 'Doctor details updated',
                'user' => $queryUser,
                'doctor' => $queryDoctor,
            ], 201);
        }

        catch(Exception $err){
            //Show error page
            return response()->json([
                'message' => $err -> getMessage()
            ]);
        }
    }

    // delete a doctor based on id
    public function destroy(Doctor $doctor){
        $queryUser = User::where('id', '=', $doctor->user_id)->firstOrFail();
        $doctor->delete();
        $queryUser->delete();

        return response()->json([
            'message' => 'Doctor deleted',
        ], 201);
    }

    // show doctor is on duty
    public function showIsOnDuty(){
        // $showIsOnDuty = Doctor::where('is_on_duty', true)->get();
        $doctorIsOnduty = User::role('doctor')->has('doctor')->leftJoin('doctors', 'users.id', '=', 'doctors.user_id')->where('doctors.is_on_duty','=','1')->get();
        // $doctorIsOnduty = $doctor->union($showIsOnDuty);
        return $doctorIsOnduty;
    }

    // update is_on_duty into true
    public function isOnDuty(Doctor $doctor){
        $isOnDutyDoctor = Doctor::query()->update(['is_on_duty'=>0]);
        $isOnDutyDoctor = Doctor::find($doctor->id);
        if($isOnDutyDoctor){
            $isOnDutyDoctor->is_on_duty=true;
            $isOnDutyDoctor->save();
        }
        return $isOnDutyDoctor;
    }
}
