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

    property2 = Property(
        title="Boho Abode - 1 Bedroom Apt-Close To Food",
        description='Enjoy a stylish experience at this centrally-located place. Close to Downtown, the Zoo, Shows, good coffee and great food!Enjoy a stylish experience at this centrally-located place. Close to Downtown, the Zoo, Shows, good coffee and great food!Enjoy a stylish experience at this centrally-located place. Close to Downtown, the Zoo, Shows, good coffee and great food!Enjoy a stylish experience at this centrally-located place. Close to Downtown, the Zoo, Shows, good coffee and great food!Enjoy a stylish experience at this centrally-located place. Close to Downtown, the Zoo, Shows, good coffee and great food!Enjoy a stylish experience at this centrally-located place. Close to Downtown, the Zoo, Shows, good coffee and great food!Enjoy a stylish experience at this centrally-located place. Close to Downtown, the Zoo, Shows, good coffee and great food!Enjoy a stylish experience at this centrally-located place. Close to Downtown, the Zoo, Shows, good coffee and great food!Enjoy a stylish experience at this centrally-loc',
        address='330 S Newstead Ave',
        city='St. Louis',
        state='Missouri',
        zipcode='63110',
        lat = 38.634996,
        lng = -90.256027,
        price = 400.00,
        service_fee = 25.30,
        bedrooms = 1,
        bathrooms = 1,
        guests = 4,
        photo1_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-639326654753020101/original/cdb5c91b-1c9b-43d4-816c-f3f328889104.jpeg',
        photo2_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-639326654753020101/original/711c36b9-1994-4a58-93bc-252aac5ad4e0.jpeg',
        photo3_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-639326654753020101/original/12917e22-0854-4f12-82d6-b37ed37c21f9.jpeg',
        user_id = 1,
        property_amenities = [all_amenities[0], all_amenities[2], all_amenities[4]],
        property_types = [all_types[0], all_types[2], all_types[4]]
        )

    property3 = Property(
        title="Home in St. Louis",
        description='The uniqueness of this home is that it is located within 5 minutes of Forest Park, the St. Louis Zoo, Ted Drewes, and Historic Macklind District for restaurants and shopping, and The Hill for some of the finest Italian dining in the country. This home is within 10 minutes of Bush Stadium, the Soulard Market, Central West End, Washington Univesity, SLU, ETC. A safe, well-lit neighborhood within walking distance to a park with tennis courts, pickleball courts, and a playground for the kids.',
        address='5532 Rosa Ave',
        city='St. Louis',
        state='Missouri',
        zipcode='63109',
        lat = 38.5809836,
        lng = -90.2883646,
        price = 600.00,
        service_fee = 100.00,
        bedrooms = 4,
        bathrooms = 5,
        guests = 20,
        photo1_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-645854964771070079/original/8de1c0cb-8304-4e01-96b0-abc2351e3e49.jpeg',
        photo2_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-645854964771070079/original/627224ee-847e-4908-a059-41450f307ad3.jpeg',
        photo3_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-645854964771070079/original/72a8c90a-5403-4489-a82c-e45bcece4b79.jpeg',
        user_id = 1,
        property_amenities = [all_amenities[6], all_amenities[7], all_amenities[8]],
        property_types = [all_types[9], all_types[11], all_types[10]]
        )

    property4 = Property(
        title="Hampton Place East",
        description='This stylish place to stay is perfect for singles and couples and work and play! Located minutes from Downtown and Clayton. Located in the southwest city area near Hampton Village. This is a second floor apartment.',
        address='5506 Walsh St',
        city='St. Louis',
        state='Missouri',
        zipcode='63109',
        lat = 38.582615,
        lng = -90.2871565,
        price = 200.00,
        service_fee = 50.00,
        bedrooms = 1,
        bathrooms = 1,
        guests = 4,
        photo1_url = 'https://a0.muscache.com/im/pictures/b4efcbe3-ef98-4e6c-a11e-764015d1488a.jpg',
        photo2_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-605830232720351322/original/39696e6e-a70f-4b78-a339-9dbd5dc712ef.jpeg',
        photo3_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-605830232720351322/original/b57f9943-c52f-4fd6-bb0d-a5ce5ec37f4a.jpeg',
        user_id = 1,
        property_amenities = [all_amenities[1], all_amenities[3], all_amenities[5]],
        property_types = [all_types[1], all_types[3], all_types[5]]
        )

    property5 = Property(
        title="The Sweet Spot: beautiful luxury home.",
        description='The Sweet Spot. Recently remodeled & beautifully furnished 3 bedrooms with 2 full baths. Perfect for 2-3 couples, with a kitchen and 2 bedrooms up and 1 down. Each level has its own gathering/TV viewing area .Close to The Hill, The Arch, Tower Grove & Forest Park, as well as the BJC & Wash U medical complexes. Leave the car in your private driveway for a tree-lined stroll to a cafe, creamery, restaurant or coffee shop. This is your Sweet Spot in St. Louis! Max 6 guests',
        address='5704 Delor St',
        city='St. Louis',
        state='Missouri',
        zipcode='63109',
        lat = 38.5838532,
        lng = -90.2903123,
        price = 700.00,
        service_fee = 120.00,
        bedrooms = 3,
        bathrooms = 3,
        guests = 6,
        photo1_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-624692121409019281/original/4feebd5e-08db-4d36-be04-0854ced26b60.jpeg',
        photo2_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-624692121409019281/original/f4b8820a-362f-470d-a9e7-ba4cd41ecf54.jpeg',
        photo3_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-624692121409019281/original/6db90857-405e-425c-838c-984977e28b5d.jpeg',
        user_id = 1,
        property_amenities = [all_amenities[7], all_amenities[8], all_amenities[9]],
        property_types = [all_types[6], all_types[7], all_types[9]]
        )

    property6 = Property(
        title="Lovely 3 bedroom penthouse",
        description='Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.',
        address='5506 Walsh St',
        city='St. Louis',
        state='Missouri',
        zipcode='63109',
        lat = 38.582615,
        lng = -90.2871565,
        price = 300.00,
        service_fee = 20.00,
        bedrooms = 3,
        bathrooms = 3,
        guests = 6,
        photo1_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-641941643069892432/original/221b1fd0-232f-4bb3-bf44-e48aa3193a6c.jpeg',
        photo2_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-641941643069892432/original/f2a8a4a5-7fe1-4d8e-b083-3d39af22a4b8.jpeg',
        photo3_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-641941643069892432/original/f63a16cc-3403-4bc5-86d1-97dc911747d0.jpeg',
        user_id = 2,
        property_amenities = [all_amenities[9], all_amenities[10], all_amenities[11]],
        property_types = [all_types[6], all_types[7], all_types[9]]
        )

    property7 = Property(
        title="Stylish Apt near STL Attractions",
        description='Enjoy a stylish experience at this centrally-located apartment. Along with great amenities to make your stay feel as comfortable as home, this unique South City apartment will surely make a memorable stay in St. Louis.',
        address='5317 Nottingham Ave',
        city='St. Louis',
        state='Missouri',
        zipcode='63109',
        lat = 38.5859136,
        lng = -90.2826851,
        price = 500.00,
        service_fee = 120.00,
        bedrooms = 4,
        bathrooms = 3,
        guests = 3,
        photo1_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-666595301673089580/original/89924b51-c762-4707-a1cf-423180549445.jpeg',
        photo2_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-666595301673089580/original/2fbe4b1c-7ec7-4b5a-8689-3d00354fa3e4.jpeg',
        photo3_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-666595301673089580/original/9eb7cbb0-d6ce-46e8-bb6c-e3a32aac9d9a.jpeg',
        user_id = 2,
        property_amenities = [all_amenities[1], all_amenities[10], all_amenities[5]],
        property_types = [all_types[3], all_types[2], all_types[5]]
        )

    property8 = Property(
        title="St. Louis Cherokee St Hideaway",
        description="This St Louis Hideaway keeps you near everything you'd want while also giving you the quiet to relax. Within walking distance of Historic Cherokee St that houses coffee shops, bars, breweries, and a multitude of local shops including 3 cat cafes! You are also within 10 minutes of downtown including Busch Stadium and the Blues arena. Easily catch any game in town!",
        address='5003 Murdoch Ave',
        city='St. Louis',
        state='Missouri',
        zipcode='63109',
        lat = 38.5862969,
        lng = -90.2777721,
        price = 525.00,
        service_fee = 127.00,
        bedrooms = 2,
        bathrooms = 1,
        guests = 15,
        photo1_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-53501848/original/bcc122fd-3487-48cf-adc3-0fcb3e293877.png',
        photo2_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-53501848/original/a62f5539-c61f-4a46-be20-3859d90af56b.png',
        photo3_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-53501848/original/09beaa64-4cbc-4e78-9661-3b22bf2d4024.png',
        user_id = 2,
        property_amenities = [all_amenities[2], all_amenities[7], all_amenities[8]],
        property_types = [all_types[11], all_types[6], all_types[1]]
        )

    property9 = Property(
        title="Perfect Family Retreat | 3bd | Quiet",
        description="Need an extended stay while in STL? Welcome to our adorable, quiet abode located in the beautiful St. Louis Hills Neighborhood, just around the corner from Famous Ted Drewes' Frozen Custard. Surrounded by rich architecture and parks with mature trees, our playfully decorated home boasts spacious living areas suitable for bigger groups or family visits. We offer a large drive way with enough free off-street parking for two vehicles, and a back patio for you to enjoy.",
        address='5225 Bancroft Ave',
        city='St. Louis',
        state='Missouri',
        zipcode='63109',
        lat = 38.5901505,
        lng = -90.2801918,
        price = 1055.00,
        service_fee = 125.50,
        bedrooms = 7,
        bathrooms = 5,
        guests = 5,
        photo1_url = 'https://a0.muscache.com/im/pictures/c46896bf-3ed2-45c4-ab3f-ee16c21cc67e.jpg',
        photo2_url = 'https://a0.muscache.com/im/pictures/093c6eb0-7736-43af-aea8-06540a80067d.jpg',
        photo3_url = 'https://a0.muscache.com/im/pictures/3ceb818a-dccf-47a1-b87c-a78e4f9e8c4c.jpg',
        user_id = 2,
        property_amenities = [all_amenities[6], all_amenities[5], all_amenities[10]],
        property_types = [all_types[5], all_types[3], all_types[10]]
        )

    property10 = Property(
        title="FULL 1 bedroom apartment on first floor",
        description='Newly painted first floor apartment in the Bevo Mill neighborhood in South Saint Louis. The apartment is located on the left side of the building and is fully furnished with new furniture. Very cozy 1 bedroom, 1 bathroom with 65" television Netflix, Hulu, Amazon Prime capable as well as 1 gaming system.',
        address='5252 Lindenwood Ave',
        city='St. Louis',
        state='Missouri',
        zipcode='63109',
        lat = 38.5927397,
        lng = -90.2801802,
        price = 300.00,
        service_fee = 25.50,
        bedrooms = 2,
        bathrooms = 3,
        guests = 7,
        photo1_url = 'https://a0.muscache.com/im/pictures/c7d91300-486a-46c8-ab9a-02b86b528772.jpg',
        photo2_url = 'https://a0.muscache.com/im/pictures/ac64e777-39b0-4aa9-b66a-b595103f409b.jpg',
        photo3_url = 'https://a0.muscache.com/im/pictures/28dcf0f1-90ab-427c-b666-efd362737d48.jpg',
        user_id = 2,
        property_amenities = [all_amenities[7], all_amenities[2], all_amenities[1]],
        property_types = [all_types[1], all_types[3], all_types[11]]
        )

    property11 = Property(
        title="Direct Gulf Front/Beach views",
        description='Our unit is located on the 6th floor in building A with spectacular beach views and Gulf of Mexico from kitchen, living room, and bedroom areas. Sunsets are a premium from our private lanai or stroll down to the beach area and walk 7 miles of beautiful white sandy beach. Estero Beach & Tennis (EBT) is located on the quiet south end of Fort Myers Beach.',
        address='3239 Cortez Blvd',
        city='Fort Myers',
        state='Florida',
        zipcode='33901',
        lat = 26.6175039,
        lng = -81.8800864,
        price = 500.00,
        service_fee = 125.50,
        bedrooms = 4,
        bathrooms = 3,
        guests = 9,
        photo1_url = 'https://a0.muscache.com/im/pictures/cf8b86c9-7d69-42b8-8457-93fe1a3873f8.jpg',
        photo2_url = 'https://a0.muscache.com/im/pictures/a81c1f30-929a-476d-ad18-d59816e1c0a4.jpg',
        photo3_url = 'https://a0.muscache.com/im/pictures/4d9b9d94-ef4e-468f-b89d-a705d47554e0.jpg',
        user_id = 3,
        property_amenities = [all_amenities[2], all_amenities[5], all_amenities[9]],
        property_types = [all_types[9], all_types[1], all_types[6]]
        )

    property12 = Property(
        title="Cozy Fort Myers Home",
        description='Stay in my spacious one level ranch with an open kitchen, two bedrooms, large living room windows that allow for excellent natural light, a front porch swing, pool and patio for those looking to slow down. Centrally located near RSW airport, Fort Myers beaches, spring training baseball stadiums (JetBlue Park and CenturyLink Sports Complex), restaurants, and the downtown entertainment district. ',
        address='1552 Coconut Dr',
        city='Fort Myers',
        state='Florida',
        zipcode='33901',
        lat = 26.6209293,
        lng = -81.8811743,
        price = 700.00,
        service_fee = 130.50,
        bedrooms = 3,
        bathrooms = 5,
        guests = 15,
        photo1_url = 'https://a0.muscache.com/im/pictures/ba932a43-0aa1-41af-ac47-6c5ad5465a10.jpg',
        photo2_url = 'https://a0.muscache.com/im/pictures/324c2d6d-ac2e-4282-900a-8e62ca7ddf20.jpg',
        photo3_url = 'https://a0.muscache.com/im/pictures/0ee33ee7-15c0-4dd2-87dd-310e2f3a88ce.jpg',
        user_id = 3,
        property_amenities = [all_amenities[11], all_amenities[3], all_amenities[5]],
        property_types = [all_types[8], all_types[9], all_types[10]]
        )

    property13 = Property(
        title="Cheerful 3 Bedroom Pool Home",
        description="Keep it simple at this peaceful and centrally-located home. 5 minutes from the heart of Cape Coral. Close to shopping, dining, and beaches. 25 minutes to Sanibel Island, and Fort Myers Beach. 3 spacious bedrooms, with 3 bathrooms. A beautiful, quaint sun room to sip your morning coffee, or to relax after a day of boating or day at the beach. Take a swim in the heated pool, and soak up the beautiful Florida sun. Head to the dock, and bring your poles, or your boat! Boat lift available.",
        address='1700 Coronado Rd',
        city='Fort Myers',
        state='Florida',
        zipcode='33901',
        lat = 26.6205353,
        lng = -81.878102,
        price = 450.00,
        service_fee = 200.50,
        bedrooms = 5,
        bathrooms = 3,
        guests = 6,
        photo1_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-668032204278267927/original/348a0175-39b1-4c54-a787-59b135eacc97.jpeg',
        photo2_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-668032204278267927/original/2bd70622-5abf-435a-ae03-e2e011bb838c.jpeg',
        photo3_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-668032204278267927/original/7cf71504-17e8-400a-b49f-3a0375574352.jpeg',
        user_id = 3,
        property_amenities = [all_amenities[1], all_amenities[5], all_amenities[7]],
        property_types = [all_types[5], all_types[6], all_types[7]]
        )

    property14 = Property(
        title="Thinking about a relaxing getaway?",
        description="Spend your vacation relaxing in a modern-style Florida home and enjoying the tropical outdoor area. Ideal for outdoor lovers, poolside relaxing, romantic gateways, and sunrise/sunset viewing.",
        address='1206 Plumosa Dr',
        city='Fort Myers',
        state='Florida',
        zipcode='33901',
        lat = 26.6149837,
        lng = -81.8892492,
        price = 550.00,
        service_fee = 25.50,
        bedrooms = 4,
        bathrooms = 2,
        guests = 8,
        photo1_url = 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53278832/original/e7a3b5f4-d04a-477f-a8bd-8e07e41ee248.jpeg',
        photo2_url = 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53278832/original/045bee32-e905-43bb-a535-a34780fc0349.jpeg',
        photo3_url = 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53278832/original/17205c9d-afb9-4bf6-af8b-07c85240eda1.jpeg',
        user_id = 3,
        property_amenities = [all_amenities[2], all_amenities[5], all_amenities[9]],
        property_types = [all_types[7], all_types[5], all_types[2]]
        )

    property15 = Property(
        title="Modest Mansion Luxury Suite",
        description="Beautiful country estate in the heart of Fort Myers with private entrance, granite counter tops, custom cabinetry, full bath, hardwood floors and a shaded outdoor sitting area beneath a coconut tree. Within walking distance of Whole Foods, Gulf Coast Hospital, Publix and only a short drive from airport, downtown and beach, this home is super private, safe, central and convenient to everything!",
        address='1314 Florida Ave',
        city='Fort Myers',
        state='Florida',
        zipcode='33901',
        lat = 26.6131362,
        lng = -81.8876499,
        price = 250.00,
        service_fee = 25.50,
        bedrooms = 2,
        bathrooms = 2,
        guests = 5,
        photo1_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-52184300/original/c60a8e7d-fd28-423a-8f89-732bc7282243.png',
        photo2_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-52184300/original/0e8e3557-2368-4647-b230-e3637760601e.png',
        photo3_url = 'https://a0.muscache.com/im/pictures/miso/Hosting-52184300/original/40bbda8e-1bd4-401f-bcb4-94b3466cc893.jpeg',
        user_id = 3,
        property_amenities = [all_amenities[2], all_amenities[5], all_amenities[9]],
        property_types = [all_types[2], all_types[5], all_types[3]]
        )



    db.session.add(property1)
    db.session.add(property11)
    db.session.add(property2)
    db.session.add(property12)
    db.session.add(property3)
    db.session.add(property13)
    db.session.add(property4)
    db.session.add(property14)
    db.session.add(property5)
    db.session.add(property15)
    db.session.add(property6)
    db.session.add(property7)
    db.session.add(property8)
    db.session.add(property9)
    db.session.add(property10)
    db.session.commit()

def undo_properties():
    db.session.execute('TRUNCATE properties RESTART IDENTITY CASCADE;')
    db.session.commit()
