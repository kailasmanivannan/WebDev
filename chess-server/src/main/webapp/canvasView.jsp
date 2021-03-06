<%--
  Created by IntelliJ IDEA.
  User: KAILAS
  Date: 29-06-2021
  Time: 08:25 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chess Game</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<div class = "main">
    <canvas id ="board" width="720" height="720" style = "border:10px solid #000000"></canvas>
    <div style="padding: 12px;"></div>
    <p id ="status"> Start Game (white first)</p>
</div>
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
<script src="drawCanvas.js"></script>
<script src="playgame.js"></script>
</body>
</html>