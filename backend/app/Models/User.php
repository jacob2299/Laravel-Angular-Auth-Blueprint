<?php

namespace App\Models;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'api_token', 'verified', 'google_id', 'google_token', 'google2fa_secret', 'google2fa_enabled'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     *
     */
    protected $hidden = [
        'password', 'remember_token', 'email_verification_token'
    ];

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token, $this));
    }

    /**
     * Hash passwords
     *
     * @param $value
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password']  = Hash::make($value);
    }

    /**
     * Encrypt google2fa secret
     *
     * @param $value
     */
    public function setGoogle2faSecretAttribute($value)
    {
        $this->attributes['google2fa_secret'] = encrypt($value);
    }

    /**
     * Decrypt google2fa secret
     *
     * @param $value
     * @return string
     */
    public function getGoogle2faSecretAttribute($value)
    {
        return $value ? decrypt($value) : null;
    }

    /**
     * Save new api token
     *
     * @return bool
     */
    public function setApiToken()
    {
        $this->attributes['api_token'] = str_random(60);
        return $this->save();
    }

    /**
     * Remove api token
     *
     * @return bool
     */
    public function unsetApiToken()
    {
        $this->attributes['api_token'] = null;
        return $this->save();
    }
}
