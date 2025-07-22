from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = 'database.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return {'status': 'API Infinity School rodando!'}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    cpf = data.get('cpf')
    email = data.get('email')
    birthdate = data.get('birthdate')
    conn = get_db()
    c = conn.cursor()
    user = None
    if cpf:
        c.execute('SELECT * FROM users WHERE cpf=? AND birthdate=?', (cpf, birthdate))
        user = c.fetchone()
    if not user and email:
        c.execute('SELECT * FROM users WHERE email=? AND birthdate=?', (email, birthdate))
        user = c.fetchone()
    if user:
        user_dict = dict(user)
        user_dict.pop('password', None)
        return jsonify(user_dict)
    else:
        return jsonify({'error': 'Usuário não encontrado ou dados inválidos'}), 401

@app.route('/tasks', methods=['GET', 'POST'])
def tasks():
    conn = get_db()
    c = conn.cursor()
    if request.method == 'POST':
        data = request.json
        c.execute('INSERT INTO tasks (user_id, title, date, category, checked) VALUES (?, ?, ?, ?, ?)',
                  (data.get('user_id', 1), data['title'], data['date'], data['category'], data.get('checked', 0)))
        conn.commit()
        return jsonify({'status': 'created'}), 201
    else:
        c.execute('SELECT * FROM tasks WHERE user_id = ?', (request.args.get('user_id', 1),))
        tasks = [dict(row) for row in c.fetchall()]
        return jsonify(tasks)

@app.route('/tasks/<int:task_id>', methods=['PUT', 'DELETE'])
def task_detail(task_id):
    conn = get_db()
    c = conn.cursor()
    if request.method == 'PUT':
        data = request.json
        c.execute('UPDATE tasks SET title=?, date=?, category=?, checked=? WHERE id=?',
                  (data['title'], data['date'], data['category'], data['checked'], task_id))
        conn.commit()
        return jsonify({'status': 'updated'})
    else:
        c.execute('DELETE FROM tasks WHERE id=?', (task_id,))
        conn.commit()
        return jsonify({'status': 'deleted'})

@app.route('/notes', methods=['GET', 'POST'])
def notes():
    conn = get_db()
    c = conn.cursor()
    if request.method == 'POST':
        data = request.json
        c.execute('INSERT INTO notes (user_id, content, created_at) VALUES (?, ?, ?)',
                  (data.get('user_id', 1), data['content'], data['created_at']))
        conn.commit()
        return jsonify({'status': 'created'}), 201
    else:
        c.execute('SELECT * FROM notes WHERE user_id = ?', (request.args.get('user_id', 1),))
        notes = [dict(row) for row in c.fetchall()]
        return jsonify(notes)

@app.route('/notes/<int:note_id>', methods=['PUT', 'DELETE'])
def note_detail(note_id):
    conn = get_db()
    c = conn.cursor()
    if request.method == 'PUT':
        data = request.json
        c.execute('UPDATE notes SET content=?, created_at=? WHERE id=?',
                  (data['content'], data['created_at'], note_id))
        conn.commit()
        return jsonify({'status': 'updated'})
    else:
        c.execute('DELETE FROM notes WHERE id=?', (note_id,))
        conn.commit()
        return jsonify({'status': 'deleted'})

@app.route('/user/<int:user_id>', methods=['GET', 'PUT'])
def user_profile(user_id):
    conn = get_db()
    c = conn.cursor()
    if request.method == 'GET':
        c.execute('SELECT * FROM users WHERE id=?', (user_id,))
        user = c.fetchone()
        if user:
            return jsonify(dict(user))
        else:
            return jsonify({'error': 'Usuário não encontrado'}), 404
    else:
        data = request.json
        c.execute('''UPDATE users SET name=?, email=?, role=?, cpf=?, birthdate=?, bio=?, photo=? WHERE id=?''',
                  (data.get('name'), data.get('email'), data.get('role'), data.get('cpf'), data.get('birthdate'), data.get('bio'), data.get('photo'), user_id))
        conn.commit()
        return jsonify({'status': 'updated'})

if __name__ == '__main__':
    app.run(debug=True) 