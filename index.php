

<html>
    <head>
        <meta charset="UTF-8">
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/class/Tile.class.js"></script>
        <script src="js/class/TileMap.class.js"></script>
        <script src="js/class/TileModel.class.js"></script>
        <script src="js/script.js"></script>
        <link rel="stylesheet" href="style.css">
    </head>
    
    <body>
        
        <div id="left-panel">   
            <canvas id="dungeon-canvas"></canvas>     
        </div>
        <div id="right-panel">
            <div id="panel-size">
                <div><span>Number of tiles wide :</span><input id="SizeX" type="number" value="10" min="1" max="500"></div>
                <div><span>Number of tiles tall :</span><input id="SizeY" type="number" value="10" min="1" max="500"></div>
                <a id="butChangeSize" class="button">Go !</a>
            </div>
            <div id="panel-tiles">
                <div id="col-right">
                    <input id="filter-bar" type="text"><a id="but-filter" class="button inline">Filter</a>
                </div>
                <div id="col-left">                    
                </div>
            </div>
            <div id="panel-tools">
                <div id="tool-buttons">
                    <a id="but-erase" class="tool-button"><img src="images/icons/eraser.png"></a>
                    <a id="but-fill" class="tool-button"><img src="images/icons/fill.png"></a>
                    <a id="but-export" class="tool-button"><img src="images/icons/export.png"></a>
                    <a id="but-manage-filters" class="tool-button float-right"><img src="images/icons/filter.png"></a>
                </div>
                <div>zoom : <input id="range-zoom" type="range" min=0.1 max=5 value=1 step=0.1><span></span></div>
            </div>
        </div>
    </body>    
</html>
