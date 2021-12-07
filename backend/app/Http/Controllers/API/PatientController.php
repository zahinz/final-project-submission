<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Traits\JsonTrait;
use App\Models\Patient;
use App\Models\WaitingList;
use Validator;

class PatientController extends Controller
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
    $this->middleware('auth.jwt', ['except' => ['store', 'queueData']]);
   }

   // get all waiting list
   public function index(){
       $waitingPatient = Patient::join('waiting_lists','patients.id', '=', 'waiting_lists.patient_id')->orderBy('waiting_lists.status', 'desc')->paginate(9);
       return $waitingPatient;
   }

   // check patient id, if not register patient and enter new waiting list
   public function store(Request $request){
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|between:2,100',
        'phone' => 'required|string|between:8,13',
    ]);
    // dd($validator);

    if ($validator->fails()){
        return response()->json($validator->error(),400);
    }

    try{

        $patient = new Patient();

  
        $patient->name = $request['name'];
        $patient->phone = $request['phone'];

        $patient->save();

        $waiting = new WaitingList([
            'status'=> 'waiting',
        ]);
        
        $patient->waiting()->save($waiting);
        $sixdigits = str_pad($waiting->id, 6, '0', STR_PAD_LEFT);

        $waiting->queue_number = $sixdigits;

        $patient->waiting()->save($waiting);

        return response()->json([
            'message' => 'New entry created',
            'patient' => $patient,
            'waiting' => $waiting,
        ], 201);
    }
    catch(Exception $err){
        //Show error page
        return response()->json([
            'message' => $err -> getMessage()
        ]);
    }

   }

   // get number of people in the waiting list
   public function queueData(){
       $waitingNumber = WaitingList::where('status','=','waiting')->count();
       return $waitingNumber;
   }

    // update waiting list to finised based on waiting list id
    public function finishedWaitingList(WaitingList $waitingList){
        // dd($waitingList);
        $finishedPatient = WaitingList::find($waitingList->id)->update(['status'=>'finished']);
        return $finishedPatient;
    }
}
