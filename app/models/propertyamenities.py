from .db import db

property_amenities = db.Table(
    'propertyAmenities',
    db.Model.metadata,
    db.Column('propertyId', db.Integer, db.ForeignKey("properties.id"), primary_key=True),
    db.Column('amenityId', db.Integer, db.ForeignKey("amenities.id"), primary_key=True),
)
