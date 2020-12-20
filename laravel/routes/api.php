<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//Route
//Route::post('/test',[\App\Http\Controllers\TestController::class, 'store']);





Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('/register','AuthController@register');
    Route::post('/login', 'AuthController@login');
    Route::post('/logout', 'AuthController@logout');
    Route::post('/refresh', 'AuthController@refresh');
    Route::post('/me', 'AuthController@me');


});

Route::group([

    'middleware' => 'api',
//    'prefix' => 'todo'


], function ($router) {

    // Route for Todo List
    Route::get('/all','TestController@index');
    Route::post('/add','TestController@store');
    Route::post('/edit/{id}','TestController@edit');
    Route::post('/delete/{id}','TestController@destroy');
});