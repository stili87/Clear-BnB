from app.models import db, Property, Amenity, Type

def seed_properties():

    all_amenities = Amenity.query.all()
    all_types = Type.query.all()

    property1 = Property(
        title="South City Home",
        description='Nice 2000 square foot home with three bedrooms and two bathrooms',
        address='5725 Gresham Ave.',
        city='St. Louis',
        state='Missouri',
        zipcode='63109',
        lat = 38.575350,
        lng = -90.293260,
        price = 500.00,
        service_fee = 25.00,
        bedrooms = 3,
        bathrooms = 2,
        guests = 10,
        photo1_url = 'https://a0.muscache.com/im/pictures/fa47b336-ceab-477a-837d-9e731e40ad29.jpg',
        photo2_url = 'https://a0.muscache.com/im/pictures/ae9a5b06-0c6b-468f-8a1c-0558b703cb3c.jpg',
        photo3_url = 'https://a0.muscache.com/im/pictures/7a068bec-d8e0-4152-802e-7bec10645fb0.jpg',
        user_id = 1,
        property_amenities = all_amenities,
        property_types = all_types
        )

    db.session.add(property1)
    db.session.commit()

def undo_properties():
    db.session.execute('TRUNCATE properties RESTART IDENTITY CASCADE;')
    db.session.commit()
