from crypt import methods
from flask import Blueprint, request
from flask_login import login_required
from app.forms import ReviewForm
from app.models import db, Review

review_routes = Blueprint('reivew', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@review_routes.route('')
def all_reviews():
    reviews = Review.query.all()
    print(reviews)
    return {'reviews': [review.to_dict() for review in reviews]}

@review_routes.route('', methods=["POST"])
@login_required
def post_review():
    form = ReviewForm()
    print(form.data, '!'*50)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        new_review = Review(
            user_id=form.data['user_id'],
            content=form.data['content'],
            property_id=form.data['property_id'],
            rating=form.data['rating']
        )

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_review = Review.query.get(id)

        edit_review.content=form.data['content']
        edit_review.rating=form.data['rating']

        db.session.commit()
        return edit_review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return {'Successful': 'Successful'}
