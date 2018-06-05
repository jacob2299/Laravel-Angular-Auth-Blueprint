<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\EmailVerificationRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class EmailVerificationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Email verification
     * @param EmailVerificationRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function emailVerification(EmailVerificationRequest $request)
    {
        $email = decrypt($request->get('email'));
        $request['email'] = $email;
        $this->validateEmail($request->all())->validate();
        $user = User::where('email', $email)->where('email_verification_token', $request->get('token'))->firstOrFail();
        $user->verified = 1;
        $user->email_verification_token = null;
        $user->save();

        return response()->json([], Response::HTTP_NO_CONTENT);
    }

    /**
     * Email validator
     * @param $request
     * @return \Illuminate\Contracts\Validation\Validator
     */
    private function validateEmail($request)
    {
        return Validator::make($request, [
            'email' => 'email'
        ]);
    }
}
