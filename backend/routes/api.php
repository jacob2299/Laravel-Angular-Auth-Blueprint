<?php

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

Route::post('login', 'Auth\LoginController@login')->name('auth.login');
Route::post('register', 'Auth\RegisterController@register')->name('auth.register');
Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('auth.password.email');
Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('auth.password.reset');
Route::post('email/verification', 'Auth\EmailVerificationController@emailVerification')->name('auth.email.verification');
Route::get('login/google', 'Auth\GoogleProviderController@redirectToGoogleProvider')->name('auth.login.google');
Route::get('login/google/callback', 'Auth\GoogleProviderController@handleGoogleProviderCallback')->name('auth.login.google.callback');

Route::middleware('auth:api')->group(function () {
    Route::post('google2fa', 'Auth\TwoFactorAuthController@google2fa')->name('auth.google2fa');
    Route::get('google2fa/qr', 'Auth\TwoFactorAuthController@google2faQrImage')->name('auth.google2fa.qr');

    Route::post('logout', 'Auth\LoginController@logout')->name('auth.name');
    Route::get('me', 'Auth\LoginController@me')->name('auth.me');
});