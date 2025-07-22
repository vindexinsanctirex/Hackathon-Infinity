import sqlite3

DATABASE = 'database.db'

def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        role TEXT,
        password TEXT,
        cpf TEXT UNIQUE,
        birthdate TEXT,
        bio TEXT,
        photo TEXT
    )''')
    c.execute('''CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT,
        date TEXT,
        category TEXT,
        checked INTEGER DEFAULT 0
    )''')
    c.execute('''CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        content TEXT,
        created_at TEXT
    )''')
    # Inserir usuários se não existirem
    c.execute("SELECT COUNT(*) FROM users WHERE email='caiosduarte@protonmai.com' OR cpf='06897476404'")
    if c.fetchone()[0] == 0:
        c.execute('''INSERT INTO users (name, email, role, password, cpf, birthdate, bio, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
            ('Caio S. Duarte', 'caiosduarte@protonmai.com', 'Colaborador', '', '06897476404', '1987-12-23', '', ''))
    c.execute("SELECT COUNT(*) FROM users WHERE email='exemplo@exemplo.com' OR cpf='12345678910'")
    if c.fetchone()[0] == 0:
        c.execute('''INSERT INTO users (name, email, role, password, cpf, birthdate, bio, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
            ('Protótipo de Usuário', 'exemplo@exemplo.com', 'Colaborador', '', '12345678910', '2001-01-01', '', ''))
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db() 