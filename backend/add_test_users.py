from flask import Flask
import os
from models import db, User

# Configurar Flask app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
database_path = os.path.join(os.path.dirname(basedir), 'database.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{database_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

def add_test_users():
    """Adiciona usuários de teste com CPF e data usando apenas 0s, 1s e 2s"""
    
    test_users = [
        {
            'name': 'Usuário Teste 0',
            'email': 'teste0@teste.com',
            'role': 'Colaborador',
            'password': '',
            'cpf': '00000000000',
            'birthdate': '2000-01-01',
            'bio': '',
            'photo': ''
        },
        {
            'name': 'Usuário Teste 1',
            'email': 'teste1@teste.com',
            'role': 'Colaborador',
            'password': '',
            'cpf': '11111111111',
            'birthdate': '2001-01-01',
            'bio': '',
            'photo': ''
        },
        {
            'name': 'Usuário Teste 2',
            'email': 'teste2@teste.com',
            'role': 'Colaborador',
            'password': '',
            'cpf': '22222222222',
            'birthdate': '2002-02-02',
            'bio': '',
            'photo': ''
        },
        {
            'name': 'Usuário Teste 01',
            'email': 'teste01@teste.com',
            'role': 'Colaborador',
            'password': '',
            'cpf': '00000000001',
            'birthdate': '2000-01-02',
            'bio': '',
            'photo': ''
        },
        {
            'name': 'Usuário Teste 10',
            'email': 'teste10@teste.com',
            'role': 'Colaborador',
            'password': '',
            'cpf': '11111111110',
            'birthdate': '2001-01-10',
            'bio': '',
            'photo': ''
        },
        {
            'name': 'Usuário Teste 20',
            'email': 'teste20@teste.com',
            'role': 'Colaborador',
            'password': '',
            'cpf': '22222222220',
            'birthdate': '2002-02-20',
            'bio': '',
            'photo': ''
        },
        {
            'name': 'Usuário Teste 012',
            'email': 'teste012@teste.com',
            'role': 'Colaborador',
            'password': '',
            'cpf': '00000000122',
            'birthdate': '2000-12-12',
            'bio': '',
            'photo': ''
        },
        {
            'name': 'Usuário Teste 120',
            'email': 'teste120@teste.com',
            'role': 'Colaborador',
            'password': '',
            'cpf': '11111111220',
            'birthdate': '2001-12-20',
            'bio': '',
            'photo': ''
        },
        {
            'name': 'Usuário Teste 201',
            'email': 'teste201@teste.com',
            'role': 'Colaborador',
            'password': '',
            'cpf': '22222222001',
            'birthdate': '2002-02-01',
            'bio': '',
            'photo': ''
        },
        {
            'name': 'Usuário Teste 210',
            'email': 'teste210@teste.com',
            'role': 'Colaborador',
            'password': '',
            'cpf': '22222222110',
            'birthdate': '2002-10-10',
            'bio': '',
            'photo': ''
        }
    ]
    
    with app.app_context():
        added_count = 0
        skipped_count = 0
        
        for user_data in test_users:
            # Verificar se o usuário já existe (por CPF ou email)
            existing_user = User.query.filter(
                (User.cpf == user_data['cpf']) | (User.email == user_data['email'])
            ).first()
            
            if existing_user:
                print(f"Usuário já existe: {user_data['name']} (CPF: {user_data['cpf']})")
                skipped_count += 1
            else:
                new_user = User(**user_data)
                db.session.add(new_user)
                print(f"[OK] Adicionado: {user_data['name']} - CPF: {user_data['cpf']}, Data: {user_data['birthdate']}")
                added_count += 1
        
        db.session.commit()
        print(f"\nConcluido! {added_count} usuarios adicionados, {skipped_count} ja existiam.")

if __name__ == '__main__':
    add_test_users()

