<?php
require('config.php');
$pdo = new PDO('mysql:host='.$secret['mysqlHost'].';dbname='.$secret['mysqlDb'], $secret['mysqlUser'],$secret['mysqlPass'],null);

echo '<table border = "1">';

foreach ($pdo->query("select * from maci") as $key=>$value) {
    echo '<tr><td>'.$value[0]."</td><td>".$value[1]. '</td></tr>';  
}
echo '</table>'
?>