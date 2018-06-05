<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\Google2faRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Google2FA;

class TwoFactorAuthController extends Controller
{
    /**
     * @param Google2faRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function google2fa(Google2faRequest $request)
    {
        $user = $request->user();
        $code = $request->get('code');

        if (Google2FA::verifyKey($user->google2fa_secret, (string)$code)) {
            return response()->json([], Response::HTTP_NO_CONTENT);
        } else {
            return response()->json('Uw opgegeven code is onjuist', Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @param Request $request
     * @return array
     */
    public function google2faQrImage(Request $request)
    {
        $user = $request->user();

        $secret = Google2FA::generateSecretKey();
        $user->google2fa_secret = $secret;
        $user->google2fa_enabled = 1;
        $user->save();

        $QR_Image = Google2FA::getQRCodeInline(
            config('app.name'),
            $user->email,
            $secret
        );

        return compact('QR_Image', 'secret');
    }

}
