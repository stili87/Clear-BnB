from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo1 = User(
        username='stili87',
        email='demo@aa.io',
        password='password',
        picture_url='https://klinelawstl.com/wp-content/uploads/2019/05/Andrew1.jpg',
        name='Andrew Stilinovic',
        bio='The developer of this web application.',
        location='St. Louis, Missouri'
        )

    demo2 = User(
        username='DanButtig',
        email='demo2@aa.io',
        password='password',
        picture_url='https://klinelawstl.com/wp-content/uploads/2019/05/Leigh-About-Us-1.jpg',
        name='Dan Buttig',
        bio='I am a property owner. ',
        location='St. Louis, Missouri'
        )

    demo3 = User(
        username='WesGotshcall',
        email='demo3@aa.io',
        password='password',
        picture_url='https://klinelawstl.com/wp-content/uploads/2020/07/Wes-Website-Pic1.jpg',
        name='Wes Gotshcall',
        bio='I am the Third test user.',
        location='Fort Myers, Florida'
        )


    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
