from .db import db

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)

    user = db.relationship("User", back_populates='reviews')
    property = db.relationship("Property", back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'property_id': self.property_id,
            'rating': self.rating,
            'user_id': self.user_id,
            'content': self.content
        }
