import database_common
from psycopg2.extras import RealDictCursor


@database_common.connection_handler
def add_user(cursor: RealDictCursor, name, password: str):
    query = f"INSERT INTO users (name, pw) " \
            f"VALUES ('{name}', '{password}');"
    cursor.execute(query)


@database_common.connection_handler
def list_user(cursor: RealDictCursor) -> list:
    query = f"SELECT name FROM users;"
    cursor.execute(query)
    return cursor.fetchall()


@database_common.connection_handler
def list_passwords(cursor: RealDictCursor) -> list:
    query = f"SELECT pw FROM users;"
    cursor.execute(query)
    return cursor.fetchall()


@database_common.connection_handler
def get_user_pw(cursor: RealDictCursor, name: str) -> list:
    query = f"SELECT pw FROM users WHERE name LIKE '{name}';"
    cursor.execute(query)
    return cursor.fetchall()



