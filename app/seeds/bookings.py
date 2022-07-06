from app.models import db, Booking
from datetime import date

def seed_bookings():
    booking1 = Booking(
        user_id = 2,
        property_id = 1,
        start_date = date(2022, 10, 1),
        end_date = date(2022, 10, 7),
        cost = 3525,
        guests = 10
        )
    
    db.session.add(booking1)
    db.session.commit()

def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()
