<?php
/**
 * Created by PhpStorm.
 * User: oussama
 * Date: 10/12/2020
 * Time: 20:41
 */

namespace App\Models;
use Tymon\JWTAuth\Contracts\JWTSubject;

use Illuminate\Foundation\Auth\User as Authenticatable;


class MongoAuth extends Authenticatable implements  JWTSubject
{

}