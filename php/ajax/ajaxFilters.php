<?php
$jsonFile = fopen("../../filters.json", "w");
$datas = $_POST["filters"];
/*$json = "[";

foreach($datas as $key => $data){
    $json = $json."\n{\"ID\":\"".$key."\",";
    $json = $json."\"Filters\":\"".$data."\"}";

    if($i + 1 < count($files))
        $json =$json.",";
}

$json = $json."]";*/
var_dump($jsonFile);
fwrite($jsonFile, $datas);

?>