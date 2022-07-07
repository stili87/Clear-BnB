from flask import Blueprint
from app.models import Amenity, db

amenity_routes = Blueprint('amenity', __name__)

@amenity_routes.route('')
def all_amenities():
    amenities = Amenity.query.all()
    return {'amenities': [amenity.to_dict() for amenity in amenities]}
