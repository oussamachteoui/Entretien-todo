<?php
//
//namespace App\Models;
//
//use Illuminate\Contracts\Auth\MustVerifyEmail;
//use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Foundation\Auth\User as Authenticatable;
//use Illuminate\Notifications\Notifiable;
//
//class User extends Authenticatable
//{
//    use HasFactory, Notifiable;
//
//    /**
//     * The attributes that are mass assignable.
//     *
//     * @var array
//     */
//    protected $fillable = [
//        'name',
//        'email',
//        'password',
//    ];
//
//    /**
//     * The attributes that should be hidden for arrays.
//     *
//     * @var array
//     */
//    protected $hidden = [
//        'password',
//        'remember_token',
//    ];
//
//    /**
//     * The attributes that should be cast to native types.
//     *
//     * @var array
//     */
//    protected $casts = [
//        'email_verified_at' => 'datetime',
//    ];
//}


namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
//use Illuminate\Foundation\Auth\User as Authenticatable;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Auth\User as Authenticatable;





class User extends Authenticatable implements  JWTSubject
{

    use Notifiable;


    protected $connection = 'mongodb';
    protected $collection = 'users';
    // Rest omitted for brevity
    protected $fillable =[
        'username','email','password'
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
