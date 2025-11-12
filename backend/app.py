from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from models import db, User, Task, Note, init_db

app = Flask(__name__)
CORS(app)

# Configuração do banco de dados SQLite
# O database.db está na raiz do projeto, então precisamos subir um nível
basedir = os.path.abspath(os.path.dirname(__file__))
database_path = os.path.join(os.path.dirname(basedir), 'database.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{database_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar SQLAlchemy
db.init_app(app)

# Inicializar o banco de dados
init_db(app)

@app.route('/')
def index():
    return {'status': 'API Infinity School rodando!'}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    cpf = data.get('cpf')
    email = data.get('email')
    birthdate = data.get('birthdate')
    
    user = None
    if cpf:
        user = User.query.filter_by(cpf=cpf, birthdate=birthdate).first()
    if not user and email:
        user = User.query.filter_by(email=email, birthdate=birthdate).first()
    
    if user:
        user_dict = user.to_dict()
        return jsonify(user_dict)
    else:
        return jsonify({'error': 'Usuário não encontrado ou dados inválidos'}), 401

@app.route('/tasks', methods=['GET', 'POST'])
def tasks():
    if request.method == 'POST':
        data = request.json
        task = Task(
            user_id=data.get('user_id', 1),
            title=data['title'],
            date=data['date'],
            category=data['category'],
            checked=data.get('checked', 0)
        )
        db.session.add(task)
        db.session.commit()
        return jsonify({'status': 'created'}), 201
    else:
        user_id = request.args.get('user_id', 1, type=int)
        tasks = Task.query.filter_by(user_id=user_id).all()
        return jsonify([task.to_dict() for task in tasks])

@app.route('/tasks/<int:task_id>', methods=['PUT', 'DELETE'])
def task_detail(task_id):
    task = Task.query.get_or_404(task_id)
    
    if request.method == 'PUT':
        data = request.json
        task.title = data['title']
        task.date = data['date']
        task.category = data['category']
        task.checked = data['checked']
        db.session.commit()
        return jsonify({'status': 'updated'})
    else:
        db.session.delete(task)
        db.session.commit()
        return jsonify({'status': 'deleted'})

@app.route('/notes', methods=['GET', 'POST'])
def notes():
    if request.method == 'POST':
        data = request.json
        note = Note(
            user_id=data.get('user_id', 1),
            content=data['content'],
            created_at=data['created_at']
        )
        db.session.add(note)
        db.session.commit()
        return jsonify({'status': 'created'}), 201
    else:
        user_id = request.args.get('user_id', 1, type=int)
        notes = Note.query.filter_by(user_id=user_id).all()
        return jsonify([note.to_dict() for note in notes])

@app.route('/notes/<int:note_id>', methods=['PUT', 'DELETE'])
def note_detail(note_id):
    note = Note.query.get_or_404(note_id)
    
    if request.method == 'PUT':
        data = request.json
        note.content = data['content']
        note.created_at = data['created_at']
        db.session.commit()
        return jsonify({'status': 'updated'})
    else:
        db.session.delete(note)
        db.session.commit()
        return jsonify({'status': 'deleted'})

@app.route('/user/<int:user_id>', methods=['GET', 'PUT'])
def user_profile(user_id):
    user = User.query.get_or_404(user_id)
    
    if request.method == 'GET':
        return jsonify(user.to_dict())
    else:
        data = request.json
        if 'name' in data:
            user.name = data['name']
        if 'email' in data:
            user.email = data['email']
        if 'role' in data:
            user.role = data['role']
        if 'cpf' in data:
            user.cpf = data['cpf']
        if 'birthdate' in data:
            user.birthdate = data['birthdate']
        if 'bio' in data:
            user.bio = data['bio']
        if 'photo' in data:
            user.photo = data['photo']
        
        db.session.commit()
        return jsonify({'status': 'updated'})

if __name__ == '__main__':
    app.run(debug=True)
