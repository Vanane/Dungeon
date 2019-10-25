<html>
    <head>
        <script src="../js/jquery-3.3.1.min.js"></script>
    </head>
    <body>
        <p>/!\ Only use white space to separate filter words ! Every symbol accepted.</p>
        <?php
        $jsonFile = fopen("../filters.json", "r");
        $jsonFilters = json_decode(stream_get_contents($jsonFile));


        $files = array_merge(glob("../images/tiles/*.png"), glob("../images/props/*.png"));

        for($i = 0; $i < count($files); $i++){
            $TileName = basename($files[$i], ".png");
            echo("
            <p>
                Filters of : ".$TileName." :
                <img src=\"".dirname($files[$i])."/".basename($files[$i])."\"></img>
                <textarea id=\"".$TileName."\" value=\"".$jsonFilters->$TileName."\"></textarea>
            </p>
            ");
        }
        
        
        ?>
        <a id="but-send">Validate</a>
        <script>
            var datas = {};

            $("#but-send").on("click", function(){
                $("textarea").each(function(i, e){
                    datas[e.id] = e.value;
                });
                alert("Saved !");
                $.ajax({
                    method: "POST",
                    url: "ajax/ajaxFilters.php",
                    data:{
                        "filters": JSON.stringify(datas)
                    }
                    });

            });
        </script>
    </body>
</html>

