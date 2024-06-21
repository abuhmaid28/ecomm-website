<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('products/search', [ProductController::class, 'search']);
Route::get('products', [ProductController::class, 'index']);
Route::post("register", [UserController::class, "register"]);
Route::post("login", [UserController::class, "login"]);
Route::post('products', [ProductController::class, 'store']);

Route::put('products/{product}', [ProductController::class, 'update']);
Route::get('products/{product}', [ProductController::class, 'show']);
Route::delete('products/{product}', [ProductController::class, 'destroy']);
