from pydoc import describe
from turtle import title
from .db import db
from .propertytypes import property_types
from .propertyamenities import property_amenities




class Property(db.Model):
    __tablename__ = 'properties'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    zipcode = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Numeric, nullable=False)
    lng = db.Column(db.Numeric, nullable=False)
    price = db.Column(db.Numeric(10,2), nullable=False)
    service_fee = db.Column(db.Numeric(10,2), nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    guests = db.Column(db.Integer, nullable=False)
    photo1_url = db.Column(db.Text)
    photo2_url = db.Column(db.Text)
    photo3_url = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship("User", back_populates='properties')
    bookings = db.relationship("Booking", back_populates='property')
    reviews = db.relationship("Review", back_populates='property')
    likes = db.relationship("Like", back_populates='property')

    property_types = db.relationship(
        "Type",
        secondary=property_types,
        back_populates='types_property'
    )

    property_amenities = db.relationship(
        "Amenity",
        secondary=property_amenities,
        back_populates='amenities_property'
    )


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'lat': self.lat,
            'lng': self.lat,
            'price': self.price,
            'service_fee': self.service_fee,
            'bedrooms': self.bedrooms,
            'bathrooms': self.bathrooms,
            'guests': self.guests,
            'photo1_url': self.photo1_url,
            'photo2_url': self.photo2_url,
            'photo3_url': self.photo3_url,
            'user_id': self.user_id,
            'types': [prop_type.to_dict() for prop_type in self.property_types],
            'amenities': [amenity.to_dict() for amenity in self.property_amenities]

        }
