from .db import db

property_types = db.Table(
    "propertyTypes",
    db.Model.metadata,
    db.Column('propertyId', db.Integer, db.ForeignKey("properties.id"), primary_key=True),
    db.Column('typeId', db.Integer, db.ForeignKey("types.id"), primary_key=True)
)
