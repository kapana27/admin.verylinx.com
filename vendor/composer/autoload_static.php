<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitbc09a5064798c8e9ef006aae88851124
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $classMap = array (
        'api' => __DIR__ . '/../..' . '/engine/classes/api.class.php',
        'app' => __DIR__ . '/../..' . '/engine/classes/app.class.php',
        'cache' => __DIR__ . '/../..' . '/engine/classes/cache.class.php',
        'co' => __DIR__ . '/../..' . '/engine/controllers/admin/co.php',
        'common' => __DIR__ . '/../..' . '/engine/controllers/admin/common.php',
        'controller' => __DIR__ . '/../..' . '/engine/classes/controller.class.php',
        'controllers\\guest' => __DIR__ . '/../..' . '/engine/controllers/guest.php',
        'db' => __DIR__ . '/../..' . '/engine/api/db.class.php',
        'guest' => __DIR__ . '/../..' . '/engine/controllers/guest/guest.php',
        'html_template' => __DIR__ . '/../..' . '/engine/classes/html_template.php',
        'lang' => __DIR__ . '/../..' . '/engine/classes/lang.class.php',
        'mem' => __DIR__ . '/../..' . '/engine/classes/mem.class.php',
        'memcached' => __DIR__ . '/../..' . '/engine/classes/memcached.class.php',
        'navigation' => __DIR__ . '/../..' . '/engine/controllers/admin/navigation.php',
        'ppp\\ragddddac' => __DIR__ . '/../..' . '/ppp/src/ragddddac.php',
        'route' => __DIR__ . '/../..' . '/engine/classes/route.class.php',
        'stud' => __DIR__ . '/../..' . '/engine/controllers/student/stud.php',
        'students' => __DIR__ . '/../..' . '/engine/controllers/admin/students.php',
        'students_groups' => __DIR__ . '/../..' . '/engine/controllers/admin/students_groups.php',
        'tableModel' => __DIR__ . '/../..' . '/engine/classes/tablemodel.class.php',
        'user' => __DIR__ . '/../..' . '/engine/api/user.class.php',
        'userinfo' => __DIR__ . '/../..' . '/engine/controllers/admin/userinfo.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitbc09a5064798c8e9ef006aae88851124::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitbc09a5064798c8e9ef006aae88851124::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitbc09a5064798c8e9ef006aae88851124::$classMap;

        }, null, ClassLoader::class);
    }
}