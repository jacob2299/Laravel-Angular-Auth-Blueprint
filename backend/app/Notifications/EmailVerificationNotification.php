<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class EmailVerificationNotification extends Notification
{
    use Queueable;

    public $token;
    public $user;

    /**
     * Create a new notification instance.
     *
     * @param $token
     * @param $user
     */
    public function __construct($token, User $user)
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
        $url = config('app.js_url') . '/auth/email-verification?token=' . $this->token . '&email=' . encrypt($this->user->email);
        return (new MailMessage)
                    ->subject('E-mail verificatie')
                    ->greeting('Hallo ' . $this->user->name)
                    ->line('Klik op de onderstaande knop om uw E-mail adres te verifiëren')
                    ->action('E-mail verifiëren', $url)
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
