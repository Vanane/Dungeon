//Déclaration des variables globales
var canvas, ctx;
var TilesWide;
var TilesTall;
var TileModelList;
var PropList;

//Variables d'états
var PaintMode;
var CanDraw;

var SelectedTileModel = NewTileModel();

//"Point d'entrée" du script, s'enclenche dès que la page a terminé de s'afficher.
$(document).ready(function()
{    
    CanDraw = false;
    PaintMode = "tile";
    //Instanciation des variables globales
    canvas = document.getElementById("dungeon-canvas");
    ctx = canvas.getContext("2d");

    
    UpdateSizeValues();    
        
    ResetDrawing();
            
    LoadAllTiles();   

    DefineEvents();
});

function LoadAllTiles()
{
    //GetJSON permet de récupérer un fichier JSON et de le lire.
    //Ici on récupère un fichier contenant les infos des tiles existantes.    

    var json = $.getJSON("tiles.json", function(){ 
        //La fonction anonyme est lancée lorsque getJSON a terminé.  
        TileModelList = json.responseJSON;
        for(var i = 0; i < TileModelList.length; i++)
        {
            //Pour chaque case du tableau récupéré, on crée un nouvel élément
            //<img> dont on va charger l'image de la tile actuellement étudiée, 
            //Puis on l'attache au panneau de droite.
            let img = $("<img class=\"img-" + TileModelList[i].Type + "\" id="+ TileModelList[i].ID +" />").attr('src', TileModelList[i].Path)
            .on('load', function() {
                if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                    alert('broken image!');
                } else {
                    switch(img[0].className)
                    {
                        case "img-tile":
                                img[0].style.display = "initial";
                            break;
                        default:
                            img[0].style.display = "none";
                            break;
                    }
                    $("#col-left").append(img);
                }
            });
            img.on("click", OnTileModelClick);
        }
    });
}

function SetSelectedModel(id)
{    
    //Affecte le modèle de tile actuellement sélectionné
    var found = false;
    var i = 0;
    //On parcourt toute la liste jusqu'à trouver ou arriver jusqu'à la fin de la liste
    while(!found && i < TileModelList.length)
    {
        if(TileModelList[i].ID == id)
            found = true;
        else i++;
    }
    if(found)
    {
        SelectedTileModel = TileModelList[i];
        PaintMode = SelectedTileModel.Type;
    }    

}

function UpdateSizeValues()
{
    //Récupère les valeurs des deux champs number
    TilesWide = document.getElementById("SizeX").value;
    TilesTall = document.getElementById("SizeY").value;
}
function ResetDrawing()
{
    //Permet d'effacer et redessiner le canvas
    UpdateSizeValues();
    ctx.clearRect(0,0,canvas.width, canvas.height);
    NewTileMap(TilesWide, TilesTall);

    resize();

    DrawGrid(TileMap.SizeX, TileMap.SizeY);
}


function resize() {
    //Recadre le canvas pour adapter à la taille demandée
    canvas.style.width = TileMap.SizeX * (TileProperties.TileSize + GridProperties.LineWidth);
    canvas.style.height = TileMap.SizeY * (TileProperties.TileSize + GridProperties.LineWidth);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

function DrawGrid(SizeX, SizeY)
{
    //Dessine une grille sur le canvas
    ctx.beginPath(); // begin
  
    ctx.lineWidth = GridProperties.LineWidth;
    ctx.lineCap = 'square';
    ctx.strokeStyle = '#909090';

    for(var i = 0; i - 1 < TileMap.SizeX; i++)
    {
        //Drawing  vertical lines
        //+0.5 car pour une sombre raison, sans ça, les lines se dessinent entre 2 pixels.
        ctx.moveTo((TileProperties.TileSize + GridProperties.LineWidth) * i + 0.5, 0); // from
        ctx.lineTo((TileProperties.TileSize + GridProperties.LineWidth) * i + 0.5, TileMap.SizeY * (TileProperties.TileSize + GridProperties.LineWidth)); // to
    }

    for(var i = 0; i - 1 < TileMap.SizeY; i++)
    {
        //Drawing  horizontal lines
        //+0.5 car pour une sombre raison, sans ça, les lines se dessinent entre 2 pixels.
        ctx.moveTo(0, (TileProperties.TileSize + GridProperties.LineWidth) * i + 0.5); // from
        ctx.lineTo((TileProperties.TileSize + GridProperties.LineWidth) * TileMap.SizeX, (TileProperties.TileSize + GridProperties.LineWidth) * i + 0.5); // to
    }

    ctx.stroke(); // draw it!
}


function FloodFill(tile, TargetId, NewId)
{
    //tile = tile étudiée, TargetId = Id que l'on veut trouver, NewId = Id que l'on va donner
    //Si la tile étudiée est de TargetId.
    if(tile == null)
        return;
   
    if(tile.TileID != TargetId || tile.TileID == NewId) // if it's not color go back
        return;
           
    tile.TileID = NewId; // mark the point so that I know if I passed through it. 

    UpdateTile(ctx, tile);

    FloodFill(GetTileFromIndex(tile.Pos.x, tile.Pos.y + 1), TargetId, NewId);  // then i can either go south
    FloodFill(GetTileFromIndex(tile.Pos.x, tile.Pos.y - 1), TargetId, NewId);  // or north
    FloodFill(GetTileFromIndex(tile.Pos.x + 1, tile.Pos.y), TargetId, NewId);  // or east
    FloodFill(GetTileFromIndex(tile.Pos.x - 1, tile.Pos.y), TargetId, NewId);  // or west   
    return;
}


function ToggleVisibility(el){
    if(el.style.display == "none")
        el.style.display = "initial";
    else el.style.display = "none";
}

/********************************/
/************ EVENTS ************/
/********************************/

function DefineEvents()
{
    canvas.addEventListener("mousedown", OnCanvasClick); 
    canvas.addEventListener("mouseup", OnCanvasUnclick); 
    canvas.addEventListener("mousemove", OnCanvasDraw); 
    document.getElementById("butChangeSize").addEventListener("click", ResetDrawing);

    $("#but-erase").on("click", OnButtonEraseClick);
    $("#but-fill").on("click", OnButtonFillClick);
    $("#but-switch-tile-prop").on("click", OnButtonSwitchClick);
    $("#but-export").on("click", OnButtonExportClick);
    $("#but-manage-filters").on("click", OnButtonManageFiltersClick);
    $("#range-zoom").on("mousemove", OnRangeZoomChange);
    $("#range-zoom").on("change", OnRangeZoomChange);
}


function OnButtonSwitchClick(e){
    var elements = document.getElementById("col-left").children;
    $(elements).each(i => {
        ToggleVisibility(elements[i]);
    });
}

function OnButtonEraseClick(e)
{
    PaintMode = "erase";
}

function OnButtonExportClick(e)
{
    window.open(canvas.toDataURL());
}

function OnButtonFillClick(e)
{
    PaintMode = "fill";
}

function OnButtonManageFiltersClick(e){
    window.open("php/manage-filters.php");
}

function OnCanvasClick(e)
{
    CanDraw = true;
    OnCanvasDraw(e);
}

function OnCanvasUnclick()
{
    CanDraw = false;
}

function OnCanvasDraw(t)
{
    if(CanDraw)
    {
        //De base, on récupère la taile cliquée.
        var tile = GetTileFromPosition(t.layerX, t.layerY);
        
        switch(PaintMode)
        {
            case "tile":
                if(SelectedTileModel.ID != "")
                {
                    tile.TileID = SelectedTileModel.ID;
                    UpdateTile(ctx, tile);
                }
                break;
            case "prop":
                if(SelectedTileModel.ID != "")
                {
                    tile.PropID = SelectedTileModel.ID;
                    UpdateTile(ctx, tile);
                }
                break;
            case "erase":
                EraseTile(ctx, tile);
                break;
            case "fill":
                FloodFill(tile, tile.TileID, SelectedTileModel.ID);
                break;
        }
    }
}

function OnRangeZoomChange(e)
{
    canvas.style.transformOrigin = "top left";
    canvas.style.transform = "scale("+ e.target.value +")";
    e.target.parentElement.getElementsByTagName("span")[0].innerHTML = e.target.value;   
}

function OnTileModelClick(el)
{
    SetSelectedModel(el.target.id);
}
