<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>chess Game</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
<div class = "main">
    <div id="chessboard"></div>
    <p id ="status">Start Game (white first)</p>
</div>
</body>
<script src="const.js"></script>
<script src="pieces/piece.js"></script>
<script src="pieces/bishop.js"></script>
<script src="pieces/rook.js"></script>
<script src="pieces/knight.js"></script>
<script src="pieces/pawn.js"></script>
<script src="pieces/queen.js"></script>
<script src="pieces/king.js"></script>
<script src="pieceFactory.js"></script>
<script src="board.js"></script>
<script src="drawHtml.js"></script>
<script src="playgame.js"></script>
</html>l>