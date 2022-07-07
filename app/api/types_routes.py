from flask import Blueprint
from app.models import Type, db

types_routes = Blueprint('type', __name__)

@types_routes.route('')
def all_types():
    types = Type.query.all()
    return {'types': [type.to_dict() for type in types]}
