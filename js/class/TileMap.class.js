//Déclaration de la variable globale TileMap
var TileMap = {
    Tiles: [],
    SizeX: 0,
    SizeY: 0
};

var GridProperties = {
    LineWidth: 1    
}


function NewTileMap(SizeX, SizeY)
{
    //Vide le tableau de cases actuel. Le garbage collector supprime le tableau perdu en mémoire
    TileMap = {
        Tiles: [],
        SizeX: 0,
        SizeY: 0
    };
    TileMap.SizeX = SizeX;
    TileMap.SizeY = SizeY;
    
    for(var j = 0; j < SizeX * SizeY; j++)
    {        
        TileMap.Tiles[j] = NewTile();
        //On affecte à chaque tile son numéro en deux dimensions
        TileMap.Tiles[j].Pos.x = j % TileMap.SizeX;
        TileMap.Tiles[j].Pos.y = Math.trunc(j / TileMap.SizeX);
    }
}


function GetTileFromIndex(x, y)
{
    var i = x + y * TileMap.SizeX;
    return TileMap.Tiles[i];
}

function GetTileFromPosition(x, y)
{
    //Retourne l'index de la case correspondant à un emplacement dans un tableau à deux dimensions
    //Les Offsets permettent de prendre en compte le décalage de pixels créé par la grile dessinée.
    XOffsetBecauseOfGrid = Math.ceil(x/(TileProperties.TileSize + GridProperties.LineWidth));
    YOffsetBecauseOfGrid = Math.ceil(y/(TileProperties.TileSize + GridProperties.LineWidth)) + 1;

    x = Math.trunc((x - XOffsetBecauseOfGrid) / TileProperties.TileSize);
    y = Math.trunc((y - YOffsetBecauseOfGrid) / TileProperties.TileSize);
    var i = x + y * TileMap.SizeX;
    return TileMap.Tiles[i];
}

function GetPositionFromTile(tile)
{
    //Retourne la position sur le canvas de la tile cliquée
    //+1 car la grille
    var x = tile.Pos.x * (TileProperties.TileSize + GridProperties.LineWidth) + GridProperties.LineWidth;
    var y = tile.Pos.y * (TileProperties.TileSize + GridProperties.LineWidth) + GridProperties.LineWidth;
    var pos = {"x":x, "y":y};
    return pos;
}

function UpdateTile(canvas, tile)
{
    //Dessine le sprite correspondant sur la taile cliquée
    //Taille de l'image - GridProperties.LineWidth car on redimensionne pour aller avec
    //la taille des traits de la grille.

    //Drawing the sprite of the tile itself
    if(tile.TileID != null)
        canvas.drawImage(document.getElementById(tile.TileID),
            GetPositionFromTile(tile).x, GetPositionFromTile(tile).y,
            TileProperties.TileSize, TileProperties.TileSize);    
    if(tile.PropID != null)
        canvas.drawImage(document.getElementById(tile.PropID),
            GetPositionFromTile(tile).x, GetPositionFromTile(tile).y,
            TileProperties.TileSize, TileProperties.TileSize);    
}

function EraseTile(canvas, tile)
{
    //Dessine le sprite correspondant sur la taile cliquée
    canvas.clearRect(GetPositionFromTile(tile).x, GetPositionFromTile(tile).y,
        TileProperties.TileSize, TileProperties.TileSize);
        tile.TileID = null;
        tile.PropID = null;
}
