from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Review

review_routes = Blueprint('reivew', __name__)

@review_routes.route('')
def all_reviews():
    reviews = Review.query.all()
    print(reviews)
    return {'reviews': [review.to_dict() for review in reviews]}
