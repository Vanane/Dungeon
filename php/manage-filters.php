<html>
    <head>
        <script src="../js/jquery-3.3.1.min.js"></script>
    </head>
    <body>
        <p>/!\ Only use white space to separate filter words ! Every symbol accepted.</p>
        <?php

        $files = array_merge(glob("../images/tiles/*.png"), glob("../images/props/*.png"));

        for($i = 0; $i < count($files); $i++){
            echo("
            <p>
                Filters of : ".basename($files[$i])." : <textarea id=\"".basename($files[$i])."\"></textarea>
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
                console.log(JSON.stringify(datas));
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

