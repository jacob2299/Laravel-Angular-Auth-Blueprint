<?php

namespace App\Http\Controllers\Auth;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;

class GoogleProviderController extends Controller
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
     * @return array
     */
    public function redirectToGoogleProvider()
    {
        return [
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl()
        ];
    }

    /**
     * @return array
     */
    public function handleGoogleProviderCallback()
    {
        $user = Socialite::driver('google')->stateless()->user();

        $user = User::updateOrCreate([
            'google_id' => $user->getId()
        ], [
            'google_token' => $user->token,
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'verified' => 1,
        ]);

        $user->setApiToken();
        $user = new UserResource($user);

        return compact('user');
    }
}
