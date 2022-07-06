from pydoc import describe
from turtle import title
from .db import db

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
            'user_id': self.user_id
        }
