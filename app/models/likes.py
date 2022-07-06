from .db import db

class Like(db.Model):
    __tablename__ = 'likes'

    id = id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'), nullable=False)

    user = db.relationship("User", back_populates='likes')
    property = db.relationship("Property", back_populates='likes')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'property_id': self.property_id
        }
