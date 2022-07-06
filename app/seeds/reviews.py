from app.models import db, Review

def seed_reviews():
    review1 = Review(
        property_id = 1,
        rating = 4,
        user_id=2,
        content='A very nice and comfortable place to spend my time in St. Louis'
    )

    db.session.add(review1)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
