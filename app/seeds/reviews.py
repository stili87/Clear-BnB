from app.models import db, Review

def seed_reviews():
    review1 = Review(
        property_id = 1,
        rating = 4,
        user_id=2,
        content='A very nice and comfortable place to spend my time in St. Louis'
    )

    review2 = Review(
        property_id = 1,
        rating = 3,
        user_id=3,
        content='I am really satisfied with my rental. I would be lost without rental. I use rental often.'
    )

    review3 = Review(
        property_id = 2,
        rating = 5,
        user_id=2,
        content="I will recommend you to my colleagues. Rental is awesome! We're loving it."
    )

    review4 = Review(
        property_id = 2,
        rating = 1,
        user_id=3,
        content='Not able to tell you how happy I am with rental. I love rental.'
    )

    review5 = Review(
        property_id = 3,
        rating = 4,
        user_id=2,
        content='Dude, your stuff is the bomb! I will refer everyone I know. Rental is great.'
    )

    review6 = Review(
        property_id = 3,
        rating = 3,
        user_id=3,
        content="It's just amazing. "
    )

    review7 = Review(
        property_id = 4,
        rating = 5,
        user_id=3,
        content="The very best."
    )

    review8 = Review(
        property_id = 4,
        rating = 1,
        user_id=2,
        content="The very best. We've used rental for the last five years. Rental is worth much more than I paid."
    )

    review9 = Review(
        property_id = 5,
        rating = 2,
        user_id=3,
        content="It's all good. I have gotten at least 50 times the value from rental."
    )

    review10 = Review(
        property_id = 5,
        rating = 4,
        user_id=2,
        content="Very easy to use. Man, this thing is getting better and better as I learn more about it. If you want real marketing that works and effective implementation - rental's got you covered."
    )

    review11 = Review(
        property_id = 6,
        rating = 3,
        user_id=1,
        content="Rental should be nominated for service of the year. I STRONGLY recommend rental to EVERYONE interested in running a successful online business! Without rental, we would have gone bankrupt by now."
    )

    review12 = Review(
        property_id = 6,
        rating = 4,
        user_id=3,
        content="Your company is truly upstanding and is behind its product 100%. It's really wonderful. Without rental, we would have gone bankrupt by now. Rental is awesome!"
    )

    review13 = Review(
        property_id = 7,
        rating = 2,
        user_id = 3,
        content="We can't understand how we've been living without rental."
    )

    review14 = Review(
        property_id = 7,
        rating = 1,
        user_id=1,
        content="I am completely blown away. Rental has really helped our business. Keep up the excellent work."
    )

    review15 = Review(
        property_id = 8,
        rating = 4,
        user_id=1,
        content="Since I invested in rental I made over 100,000 dollars profits. Thank you so much for your help. It's the perfect solution for our business."
    )

    review16 = Review(
        property_id = 8,
        rating = 5,
        user_id=3,
        content="I can't say enough about rental. You guys rock! I would also like to say thank you to all your staff. I STRONGLY recommend rental to EVERYONE interested in running a successful online business!"
    )

    review17 = Review(
        property_id = 9,
        rating = 3,
        user_id=3,
        content="I use rental often."
    )

    review18 = Review(
        property_id = 9,
        rating = 5,
        user_id=1,
        content="Rental is awesome! We've used rental for the last five years."
    )

    review19 = Review(
        property_id = 10,
        rating = 4,
        user_id=1,
        content="Thank You! Great job, I will definitely be ordering again! Rental should be nominated for service of the year."
    )

    review20 = Review(
        property_id = 10,
        rating = 1,
        user_id=3,
        content="Thanks guys, keep up the good work! I have gotten at least 50 times the value from rental."
    )

    review21 = Review(
        property_id = 11,
        rating = 4,
        user_id=1,
        content="I was amazed at the quality of rental."
    )

    review22 = Review(
        property_id = 11,
        rating = 1,
        user_id=2,
        content="This is simply unbelievable! Needless to say we are extremely satisfied with the results."
    )

    review23 = Review(
        property_id = 12,
        rating = 2,
        user_id=2,
        content="Thanks guys, keep up the good work! I like rental more and more each day because it makes my life a lot easier. I am completely blown away. Definitely worth the investment."
    )

    review24 = Review(
        property_id = 12,
        rating = 5,
        user_id=1,
        content="I just can't get enough of rental. I want to get a T-Shirt with rental on it so I can show it off to everyone. Thank You! The best on the net!"
    )

    review25 = Review(
        property_id = 13,
        rating = 3,
        user_id=1,
        content="Rental is awesome! Rental is awesome! It's just amazing. Thanks to rental, we've just launched our 5th website!"
    )

    review26 = Review(
        property_id = 13,
        rating = 3,
        user_id=2,
        content="I have gotten at least 50 times the value from rental. Thank you so much for your help."
    )

    review27 = Review(
        property_id = 14,
        rating = 1,
        user_id=2,
        content="I would also like to say thank you to all your staff. I will refer everyone I know. Great job, I will definitely be ordering again! Rental is exactly what our business has been lacking."
    )

    review28 = Review(
        property_id = 14,
        rating = 1,
        user_id=1,
        content="Thanks for the great service."
    )

    review29 = Review(
        property_id = 15,
        rating = 5,
        user_id=1,
        content="I would gladly pay over 600 dollars for rental. Really good. Thanks guys, keep up the good work! I wish I would have thought of it first."
    )

    review30 = Review(
        property_id = 15,
        rating = 5,
        user_id=2,
        content="We're loving it. The very best. It's the perfect solution for our business."
    )


    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)
    db.session.add(review16)
    db.session.add(review17)
    db.session.add(review18)
    db.session.add(review19)
    db.session.add(review20)
    db.session.add(review21)
    db.session.add(review22)
    db.session.add(review23)
    db.session.add(review24)
    db.session.add(review25)
    db.session.add(review26)
    db.session.add(review27)
    db.session.add(review28)
    db.session.add(review29)
    db.session.add(review30)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
