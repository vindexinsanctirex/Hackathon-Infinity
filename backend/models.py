from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=True)
    email = db.Column(db.String, unique=True, nullable=True)
    role = db.Column(db.String, nullable=True)
    password = db.Column(db.String, nullable=True)
    cpf = db.Column(db.String, unique=True, nullable=True)
    birthdate = db.Column(db.String, nullable=True)
    bio = db.Column(db.Text, nullable=True)
    photo = db.Column(db.String, nullable=True)
    
    # Relacionamentos
    tasks = db.relationship('Task', backref='user', lazy=True, cascade='all, delete-orphan')
    notes = db.relationship('Note', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'cpf': self.cpf,
            'birthdate': self.birthdate,
            'bio': self.bio,
            'photo': self.photo
        }

class Task(db.Model):
    __tablename__ = 'tasks'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    checked = db.Column(db.Integer, default=0)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'date': self.date,
            'category': self.category,
            'checked': self.checked
        }

class Note(db.Model):
    __tablename__ = 'notes'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.String, nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'content': self.content,
            'created_at': self.created_at
        }

def init_db(app):
    """Inicializa o banco de dados e cria as tabelas se não existirem"""
    with app.app_context():
        db.create_all()
        
        # Verificar e inserir usuários padrão se não existirem
        user1 = User.query.filter(
            or_(User.email == 'caiosduarte@protonmail.com', User.cpf == '06897476404')
        ).first()
        
        if not user1:
            user1 = User(
                name='Caio S. Duarte',
                email='caiosduarte@protonmail.com',
                role='Colaborador',
                password='',
                cpf='06897476404',
                birthdate='1987-12-23',
                bio='',
                photo=''
            )
            db.session.add(user1)
        
        user2 = User.query.filter(
            or_(User.email == 'exemplo@exemplo.com', User.cpf == '12345678910')
        ).first()
        
        if not user2:
            user2 = User(
                name='Protótipo de Usuário',
                email='exemplo@exemplo.com',
                role='Colaborador',
                password='',
                cpf='12345678910',
                birthdate='2001-01-01',
                bio='',
                photo=''
            )
            db.session.add(user2)
        
        db.session.commit()
