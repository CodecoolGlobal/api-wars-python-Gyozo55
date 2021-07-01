from flask import Flask, render_template, redirect, request, url_for, session
import password_check
import data_handler


app = Flask(__name__)

app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
user_name = ''


@app.route("/")
def main():
    return render_template("index.html")


@app.route('/create-us', methods=['GET', 'POST'])
def create_us():
    return render_template("create-user.html")


@app.route('/log', methods=['GET', 'POST'])
def log():
    return render_template("login.html")


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        current_password = request.form['password']
        print(current_password)
        user_data = data_handler.list_user()
        users = []
        n = 0
        for i in user_data:
            user_dat = user_data[n]
            users.append(user_dat['user_name'])
            n += 1
        if session['username'] in users:
            user_password = data_handler.get_user_pw(session['username'])
            user_pw = user_password[0]
            check = password_check.verify_password(current_password, user_pw['user_password'])
            if check:
                return redirect("/"+session['username'])
            else:
                return render_template('login.html', text="Try again!")

        else:
            return render_template('login.html', text="Try again!")


@app.route('/create-user', methods=['GET', 'POST'])
def create_user():
    if request.method == 'POST':
        session['username'] = request.form['username']
        user_nam = session['username']
        user_password = request.form['password']
        hashed_password = password_check.hash_password(user_password)
        user_data = data_handler.list_user()
        users = []
        n = 0
        for i in user_data:
            user_dat = user_data[n]
            users.append(user_dat['user_name'])
            n += 1
        if user_nam not in users:
            data_handler.add_user(user_nam, hashed_password)
            return render_template('login.html', text="Successful user creation!")
        else:
            return render_template('login.html', text="This username incorrect pls try again!")


@app.route('/logout')
def logout():
    session.pop('username', None)
    text = "Login"
    return redirect(url_for("main_page"))


if __name__ == "__main__":
    app.run()
