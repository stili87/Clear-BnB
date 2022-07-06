import imp
from app.models import db, Type

def seed_types():

    type1 = Type(
        type='Beach'
    )
    type2 = Type(
        type='City'
    )
    type3 = Type(
        type='Lake'
    )
    type4 = Type(
        type='House'
    )
    type5 = Type(
        type='Apartment'
    )
    type6 = Type(
        type='Camping'
    )
    type7 = Type(
        type='Rural'
    )
    type8 = Type(
        type='Pets Allowed'
    )
    type9 = Type(
        type='Pets Not Allowed'
    )

    db.session.add(type1)
    db.session.add(type2)
    db.session.add(type3)
    db.session.add(type4)
    db.session.add(type5)
    db.session.add(type6)
    db.session.add(type7)
    db.session.add(type8)
    db.session.add(type9)
    db.session.commit()

def undo_types():
    db.session.execute('TRUNCATE types RESTART IDENTITY CASCADE;')
    db.session.commit()
