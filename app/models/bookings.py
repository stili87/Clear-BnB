from .db import db

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    cost = db.Column(db.Float, nullable=False)
    guests = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates='bookings')
    property = db.relationship("Property", back_populates='bookings')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'property_id': self.property_id,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'cost': self.cost,
            'guests': self.guests
        }
