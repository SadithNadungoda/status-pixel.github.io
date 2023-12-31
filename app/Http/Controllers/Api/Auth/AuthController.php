<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RecoverRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResetRequest;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use App\Notifications\Auth\ResetPassword;
use App\Notifications\Auth\UserRegister;
use Auth;
use Carbon\Carbon;
use DB;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Setting;
use stdClass;
use Str;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('register', ['only' => ['register']]);
        $this->middleware('auth:sanctum', ['except' => ['login', 'register', 'recover', 'reset', 'verify']]);
        $this->middleware('demo', ['only' => ['register', 'recover', 'reset']]);
    }

    /**
     * @param  LoginRequest  $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $request->validated();
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            /** @var User $user */
            $user = Auth::user();
            if ((int) $user->status !== 1) {
                return response()->json(['message' => __('The user is deactivated, contact the administrator')], 406);
            }
            $token = $user->createToken(Str::slug(config('app.name').'_auth_token', '_'))->plainTextToken;
            return response()->json(['token' => $token, 'user' => new UserResource($user)]);
        }
        return response()->json(['message' => __('These credentials do not match our records, or the user is disabled')], 406);
    }

    /**
     * @return JsonResponse
     * @throws Exception
     */
    public function logout(): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        return response()->json(['message' => __('Session closed successfully')]);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $request->validated();
        // Create new user
        $user = new User();
        $user->name = $request->get('name');
        $user->email = $request->get('email');
        $user->password = bcrypt($request->get('password'));
        $user->role_id = Setting::get('default_role');
        $user->save();
        // Notification data object
        $objNotificationData = new stdClass();
        $objNotificationData->user = $user;
        // Send reset password notification
        $user->notify((new UserRegister($objNotificationData))->locale(Setting::get('app_locale')));
        // Login the user
        $token = $user->createToken(Str::slug(config('app.name').'_auth_token', '_'))->plainTextToken;
        return response()->json(['token' => $token, 'user' => new UserResource($user)]);
    }

    public function recover(RecoverRequest $request): JsonResponse
    {
        $request->validated();
        $user = User::where('email', $request->get('email'))->first();
        if (!$user) {
            return response()->json(['message' => __('The email entered is not registered')], 406);
        }
        $token = Str::random(60);
        DB::table('password_resets')->where('email', $request->get('email'))->delete();
        DB::table('password_resets')->insert(['email' => $request->get('email'), 'token' => $token, 'created_at' => Carbon::now()]);
        $objNotificationData = new stdClass();
        $objNotificationData->token = $token;
        $objNotificationData->user = $user;
        $user->notify((new ResetPassword($objNotificationData)));
        return response()->json(['message' => __('An email has been sent with a link to reset the password')]);
    }

    public function reset(ResetRequest $request): JsonResponse
    {
        $request->validated();
        $tokenData = DB::table('password_resets')->where('token', $request->get('token'))->first();
        if ($tokenData) {
            $user = User::where('email', $tokenData->email)->first();
            if (!$user) {
                return response()->json(['message' => __('The email entered is not registered')], 406);
            }
            $user->password = bcrypt($request->get('password'));
            if (is_null($user->email_verified_at)) {
                $user->email_verified_at = Carbon::now();
            }
            $user->save();
            DB::table('password_resets')->where('email', $user->email)->delete();
            /** @var User $user */
            $user = Auth::loginUsingId($user->id);
            $token = $user->createToken(Str::slug(config('app.name').'_auth_token', '_'))->plainTextToken;
            return response()->json(['token' => $token, 'user' => new UserResource($user)]);
        }
        return response()->json(['message' => __('The recovery token is incorrect or has already been used')], 406);
    }

    /**
     * @return JsonResponse
     */
    public function user(): JsonResponse
    {
        return response()->json(new UserResource(auth()->user()));
    }

    public function check(Request $request): JsonResponse
    {
        $access = Auth::check();
        if ($request->get('controller')) {
            /** @var User $user */
            $user = Auth::user();
            $access = $user->userRole->checkPermission($request->get('controller'));
        }
        return response()->json(['access' => $access]);
    }
}
