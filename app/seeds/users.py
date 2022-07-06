from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo1 = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        picture_url='https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
        name='Demo-lition',
        bio='I am the first test user.',
        location='St. Louis, Missouri'
        )

    demo2 = User(
        username='Demo2',
        email='demo2@aa.io',
        password='password',
        picture_url='https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
        name='Demo-lition2',
        bio='I am the Second test user.',
        location='St. Louis, Missouri'
        )


    db.session.add(demo1)
    db.session.add(demo2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
