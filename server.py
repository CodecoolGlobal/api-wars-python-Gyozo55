from flask import Flask, render_template, redirect, request, url_for, session, escape

app = Flask(__name__)

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
user_name = ''


@app.route("/")
def main():
    return render_template("index.html")


@app.route('/create-user', methods=['GET', 'POST'])
def create_us():
    return render_template("create-user.html", text="kiscica")


if __name__ == "__main__":
    app.run()
