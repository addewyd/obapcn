<?php


define('LOG_DIR', $_SERVER['DOCUMENT_ROOT'].'/obapcn/log/app.log');
define('HTTP_HOST', $_SERVER['HTTP_HOST']);

define('APP_ID', '');
define('APP_SECRET_CODE', '');
define('APP_ID_DEB', '');
define('APP_SECRET_CODE_DEB', '');
define('APP_REG_URL', 'https://' . HTTP_HOST . '/obapcn/index.php');
define('APP_SCOPE', 'user,bizproc,crm,disk');
$db_settings = array(
    'host' => 'localhost',
    'user' => '',
    'pass' => '',
    'db' => 'mysql',
    'port' => 3306,
    'charset' => 'utf8',
);
