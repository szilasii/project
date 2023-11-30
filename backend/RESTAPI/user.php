<?php

$params = explode('=',$_SERVER['QUERY_STRING']);

if (!isset($params[1])) {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $sql = "select * from User";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return;    
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') { 
    $sql = "select * from User where userID = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$params[1]]);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
return;    
}



if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    
}

