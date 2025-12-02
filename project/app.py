from flask import Flask, render_template, request, redirect, session
import sqlite3
import hashlib
import os

app = Flask(__name__)
app.secret_key = "sua_chave_secreta_aqui"


# ====================================
# CRIAR BANCO DE DADOS AUTOMATICAMENTE
# ====================================
def init_db():
    if not os.path.exists("database.db"):
        conn = sqlite3.connect("database.db")
        cursor = conn.cursor()

        cursor.execute("""
            CREATE TABLE usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        """)

        conn.commit()
        conn.close()

init_db()


# ====================
# FUNÇÃO HASH SENHA
# ====================
def hash_senha(texto):
    return hashlib.sha256(texto.encode()).hexdigest()


# ====================
# LOGIN REQUIRED
# ====================
def login_required(f):
    def wrap(*args, **kwargs):
        if "user_id" not in session:
            return redirect("/login")
        return f(*args, **kwargs)
    wrap.__name__ = f.__name__
    return wrap


# ====================
# ROTAS
# ====================

@app.route("/")
@login_required
def home():
    return render_template("home.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        user = request.form["username"]
        password = hash_senha(request.form["password"])

        conn = sqlite3.connect("database.db")
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM usuarios WHERE username = ? AND password = ?", (user, password))
        result = cursor.fetchone()
        conn.close()

        if result:
            session["user_id"] = result[0]
            return redirect("/")
        else:
            return render_template("login.html", erro="Usuário ou senha incorretos!")

    return render_template("login.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        user = request.form["username"]
        password = hash_senha(request.form["password"])

        try:
            conn = sqlite3.connect("database.db")
            cursor = conn.cursor()
            cursor.execute("INSERT INTO usuarios (username, password) VALUES (?, ?)", (user, password))
            conn.commit()
            conn.close()
            return redirect("/login")

        except:
            return render_template("register.html", erro="Usuário já existe!")

    return render_template("register.html")


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/login")


# RODAR SERVIDOR
if __name__ == "__main__":
    app.run(debug=True)
