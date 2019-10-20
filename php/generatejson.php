<?php
$files = array_merge(glob("../images/tiles/*.png"), glob("../images/props/*.png"));
$jsonFile = fopen("../tiles.json", "w");

$json = "[";

for($i = 0; $i < count($files); $i++){
    $FilePathArray = explode('/', dirname($files[$i]));
    $ParentDir = end($FilePathArray);
    $TileType;

    $json = $json."\n{\"Name\":\"".substr(basename($files[$i]), 0, -4)."\",";
    $json = $json."\"ID\":\"".substr(basename($files[$i]), 0, -4)."\",";
    $json = $json."\"Path\":\"images/".$ParentDir."/".basename($files[$i])."\",";

    switch($ParentDir)
    {
        case "tiles":
        $TileType = "tile";
        break;
        case "props":
        $TileType = "prop";
        break;
    }

    $json = $json."\"Type\":\"".$TileType."\"";

    $json = $json."}";

    if($i + 1 < count($files))
        $json =$json.",";
}
$json = $json."\n]";

fwrite($jsonFile, $json);
/*
$files = glob("../images/props/*.png");
$jsonFile = fopen("../props.json", "w");

$json = "[";

for($i = 0; $i < count($files); $i++){
    $json = $json."\n{\"Name\":\"".substr(basename($files[$i]), 0, -4)."\",";
    $json = $json."\"ID\":\"".substr(basename($files[$i]), 0, -4)."\",";
    $json = $json."\"Path\":\"images/props/".basename($files[$i])."\",";
    $json = $json."\"Type\":\"prop\"";

    $json = $json."}";

    if($i + 1 < count($files))
        $json =$json.",";
}
$json = $json."]";

fwrite($jsonFile, $json);*/

?>