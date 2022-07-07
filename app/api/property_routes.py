from flask import Blueprint
from app.models import Property, db

property_routes = Blueprint('property', __name__)

@property_routes.route('')
def all_properties():
    properties = Property.query.all()
    return {'properties': [property.to_dict() for property in properties]}
