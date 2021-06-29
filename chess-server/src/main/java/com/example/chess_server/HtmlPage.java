package com.example.chess_server;

import java.io.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "HtmlPage", value = "/hopen")
public class HtmlPage extends HttpServlet {

    public void init() {

    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        response.sendRedirect("htmlView.jsp");
    }

    public void destroy() {
    }
}