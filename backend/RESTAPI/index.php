<?php

    require('config.php');
    require('cors.php');
    require('database.php');
    
    if ($devlopment) {
        ini_set("display_errors",1);
        error_reporting(E_ALL);
    }
    
    //ini_set("display_errors",0);

    $resource = strtok($_SERVER['QUERY_STRING'],'=');

    //var_dump('resource: ', $resource);

    if ($resource == 'user') {

        require('user.php');
    }

    echo json_encode($data);






