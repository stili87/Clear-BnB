from app.models import db, Like

def seed_likes():
    like1 = Like(
        user_id = 2,
        property_id = 1
    )

    db.session.add(like1)
    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
