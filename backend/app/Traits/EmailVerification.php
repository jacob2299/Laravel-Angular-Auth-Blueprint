<?php
/**
 * Created by PhpStorm.
 * User: Jacob
 * Date: 5-6-2018
 * Time: 12:03
 */

namespace App\Traits;


use App\Models\User;
use Illuminate\Http\Response;

trait EmailVerification
{
    /**
     * Check if user's email is verified or not
     *
     * @param $request
     * @return bool
     */
    public function emailNotVerified($request)
    {
        $user = User::where('email', $request->get('email'))->first();

        if ($user->verified === 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendEmailNotVerifiedResponse()
    {
        return response()->json('U E-mail is nog niet geverifieerd!', Response::HTTP_UNAUTHORIZED);
    }
}