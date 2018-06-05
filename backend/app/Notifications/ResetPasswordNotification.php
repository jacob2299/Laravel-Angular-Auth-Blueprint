<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public $token;

    /**
     * Create a new notification instance.
     *
     * @param $token
     * @param $user
     */
    public function __construct($token, $user)
    {
        $this->token = $token;
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = config('app.js_url') . '/auth/reset-password?token=' . $this->token . '&email=' . encrypt($this->user->email);
        return (new MailMessage)
                    ->subject('Wachtwoord reset')
                    ->greeting('Hallo')
                    ->line('U ontvangt deze e-mail omdat we een verzoek voor het opnieuw instellen van uw wachtwoord voor uw account hebben ontvangen.')
                    ->action('Herstel', $url)
                    ->line('Als u geen wachtwoord reset hebt aangevraagd, hoeft u verder niets te doen.')
                    ->salutation('Groeten, ' . config('app.name'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
