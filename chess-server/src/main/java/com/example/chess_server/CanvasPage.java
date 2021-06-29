package com.example.chess_server;

import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "CanvasPage", value = "/copen")
public class CanvasPage extends HttpServlet {

    public void init() {
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        response.sendRedirect("canvasView.jsp");

    }

    public void destroy() {
    }
}