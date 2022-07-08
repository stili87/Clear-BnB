from tracemalloc import start
from flask import Blueprint, request
from flask_login import login_required
from app.models import Booking, db
from app.forms import BookingForm

booking_routes = Blueprint('booking', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@booking_routes.route('')
def all_bookings():
    bookings = Booking.query.all()
    return {'bookings': [booking.to_dict() for booking in bookings]}

@booking_routes.route('', methods=['POST'])
@login_required
def post_booking():
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_booking = Booking(
            user_id=form.data['user_id'],
            property_id=form.data['property_id'],
            start_date=form.data['start_date'],
            end_date=form.data['end_date'],
            cost=form.data['cost'],
            guests=form.data['guests']
        )
        db.session.add(new_booking)
        db.session.commit()
        return new_booking.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@booking_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_booking(id):
    booking = Booking.query.get(id)
    db.session.delete(booking)
    db.session.commit()
    return {'Successful': 'Successful'}
