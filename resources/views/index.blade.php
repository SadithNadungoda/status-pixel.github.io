<!DOCTYPE html>
<html lang="{{ Base::locale() }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ Setting::get('meta_home_title', config('app.name', 'Laravel')) }}</title>
    <link rel="shortcut icon" href="{{ Base::icon() }}">
    <link href="{{ url(mix('css/app.css')) }}" rel="stylesheet">
</head>
<body>
<div id="app"></div>
<script>
    window.app = {!! json_encode([
        'url' => url('/'),
        'meta_home_title' => Setting::get('meta_home_title'),
        'app_date_format' => Setting::get('app_date_format'),
        'app_date_locale' => Setting::get('app_date_locale'),
        'app_timezone' => Setting::get('app_timezone'),
        'name'=> Setting::get('app_name', env('APP_NAME')),
        'register' => Setting::get('app_user_registration') ? true : false,
        'icon'=> Base::icon(),
        'background'=> Base::background(),
    ], JSON_THROW_ON_ERROR) !!};
</script>
<script src="{{ url(mix('js/app.js')) }}"></script>
</body>
</html>
