from turtle import back
from .db import db
from .propertyamenities import property_amenities

class Amenity(db.Model):
    __tablename__ = 'amenities'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(255), nullable=False)


    amenities_property = db.relationship(
        'Property',
        secondary=property_amenities,
        back_populates='property_amenities'
        
    )

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type
        }
