from app.models import db, Booking
from datetime import date

def seed_bookings():
    booking1 = Booking(
        user_id = 1,
        property_id = 1,
        start_date = date(2022, 10, 1),
        end_date = date(2022, 10, 7),
        cost = 3025,
        guests = 10
        )

    booking2 = Booking(
        user_id = 1,
        property_id = 2,
        start_date = date(2022, 7, 14),
        end_date = date(2022, 7, 15),
        cost = 425.30,
        guests = 4
        )

    booking3 = Booking(
        user_id = 1,
        property_id = 3,
        start_date = date(2022, 9, 14),
        end_date = date(2022, 9, 22),
        cost = 4900,
        guests = 15
        )

    booking4 = Booking(
        user_id = 1,
        property_id = 7,
        start_date = date(2022, 8, 2),
        end_date = date(2022, 8, 23),
        cost = 10620,
        guests = 3
        )

    booking5 = Booking(
        user_id = 1,
        property_id = 9,
        start_date = date(2022, 7, 27),
        end_date = date(2022, 8, 11),
        cost = 15950.50,
        guests = 1
        )

    booking6 = Booking(
        user_id = 1,
        property_id = 15,
        start_date = date(2022, 7, 27),
        end_date = date(2022, 7, 29),
        cost = 525.50,
        guests = 3
        )

    booking7 = Booking(
        user_id = 1,
        property_id = 13,
        start_date = date(2022, 10, 26),
        end_date = date(2022, 11, 25),
        cost = 16525.50,
        guests = 8
        )
    
    db.session.add(booking1)
    db.session.add(booking2)
    db.session.add(booking3)
    db.session.add(booking4)
    db.session.add(booking5)
    db.session.add(booking6)
    db.session.add(booking7)
    db.session.commit()

def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()
