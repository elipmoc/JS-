<?php
use Herrera\Pdo\PdoServiceProvider;
use Silex\Application;

$dbopts = parse_url(getenv('DATABASE_URL'));
$app = new Silex\Application();
/*$app->register(new Herrera\Pdo\PdoServiceProvider(),
               array(
                   'pdo.dsn' => 'pgsql:dbname='.ltrim($dbopts["path"],'/').';host='.$dbopts["host"] . ';port=' . $dbopts["port"],
                   'pdo.username' => $dbopts["user"],
                   'pdo.password' => $dbopts["pass"]
               )
);*/
var_dump($app);
echo file_get_contents("index.html");