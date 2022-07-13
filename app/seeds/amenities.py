from app.models import db, Amenity

def seed_amenities():
    amenity1 = Amenity(
        type = 'Kitchen'
    )
    amenity2 = Amenity(
        type = 'Dedicated workspace'
    )
    amenity3 = Amenity(
        type = 'TV with cable'
    )
    amenity4 = Amenity(
        type = 'Free Washer and Dryer'
    )
    amenity5 = Amenity(
        type = 'Patio or balcony'
    )
    amenity6 = Amenity(
        type = 'Fast wifi'
    )
    amenity7 = Amenity(
        type = 'Air Conditioning'
    )
    amenity8 = Amenity(
        type = 'Backyard'
    )
    amenity9 = Amenity(
        type = 'Breakfast'
    )
    amenity10 = Amenity(
        type = 'Private Patio'
    )
    amenity11 = Amenity(
        type = 'TV'
    )
    amenity12 = Amenity(
        type = 'Free Parking'
    )

    db.session.add(amenity1)
    db.session.add(amenity2)
    db.session.add(amenity3)
    db.session.add(amenity4)
    db.session.add(amenity5)
    db.session.add(amenity6)
    db.session.add(amenity7)
    db.session.add(amenity8)
    db.session.add(amenity9)
    db.session.add(amenity10)
    db.session.add(amenity11)
    db.session.add(amenity12)
    db.session.commit()

def undo_amenities():
    db.session.execute('TRUNCATE amenities RESTART IDENTITY CASCADE;')
    db.session.commit()
