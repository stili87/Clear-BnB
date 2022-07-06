from .db import db
from .propertytypes import property_types

class Type(db.Model):
    __tablename__ = 'types'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(255), nullable = False)

    types_property = db.relationship(
        "Property",
        secondary=property_types, 
        back_populates='property_types'
    )



    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type
        }
