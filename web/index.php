<?php

// web/index.php
require_once __DIR__.'/../vendor/autoload.php';

$app = new Silex\Application();

$app->get('/hello/{name}', function ($name) use ($app) {
	return 'Hello '.$app->escape($name);
});


$app->get('/go0dbye/{name}', function ($name) use ($app) {
	return 'Hello '.$app->escape($name);
});

$app->get('/Goodbye/{name}', function ($name) use ($app) {
	return 'Hello '.$app->escape($name);
});

$app->get('/', function () use ($app) {
	return $app->redirect('/hello/world');
});

$app->run();