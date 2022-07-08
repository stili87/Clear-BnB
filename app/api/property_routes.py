from flask import Blueprint, request
from flask_login import login_required
from app.models import Property, db, Type, Amenity
from app.forms import PropertyForm
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename)

property_routes = Blueprint('property', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@property_routes.route('')
def all_properties():
    properties = Property.query.all()
    return {'properties': [property.to_dict() for property in properties]}

@property_routes.route('', methods=['POST'])
@login_required
def post_property():

    if len(request.files) < 1:
        return {'errors': ['At least one picture must be uploaded']}, 401

    if 'photo1_url' in request.files:
        image = request.files["photo1_url"]
        
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        
        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        photo1_url = upload['url']
    else:
        photo1_url=None

    if 'photo2_url' in request.files:
        image = request.files["photo2_url"]
        
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 401
        
        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        photo2_url = upload['url']
    else:
        photo2_url=None

    if 'photo3_url' in request.files:
        image = request.files["photo3_url"]
        
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 401
        
        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        photo3_url = upload['url']
    else:
        photo3_url=None

    form = PropertyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form_types_array1 = form.data['property_types'][0].split(',')
        form_types_array = [int(x) for x in form_types_array1]
        # [1, 2, 3]
        types = Type.query.all()
        property_types = [type for type in types if type.id in form_types_array]
        #list of objects

        form_amenity_array1 = form.data['property_amenities'][0].split(',')
        form_amenity_array = [int(x) for x in form_amenity_array1]
        amenities = Amenity.query.all()
        property_amenities = [amenity for amenity in amenities if amenity.id in form_amenity_array]

        new_property = Property(
            title=form.data['title'],
            description=form.data['description'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            zipcode=form.data['zipcode'],
            lat=form.data['lat'],
            lng=form.data['lng'],
            price=form.data['price'],
            service_fee=form.data['service_fee'],
            bedrooms=form.data['bedrooms'],
            bathrooms=form.data['bathrooms'],
            guests=form.data['guests'],
            user_id=form.data['user_id'],
            property_amenities=property_amenities,
            property_types=property_types,
            photo1_url=photo1_url,
            photo2_url=photo2_url,
            photo3_url=photo3_url
        )

        db.session.add(new_property)
        db.session.commit()
        return new_property.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@property_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_property(id):
    edit_property = Property.query.get(id)

    if 'photo1_url' in request.files:
        image = request.files["photo1_url"]
        
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        
        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        photo1_url = upload['url']
    else:
        photo1_url=edit_property.photo1_url

    if 'photo2_url' in request.files:
        image = request.files["photo2_url"]
        
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 401
        
        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        photo2_url = upload['url']
    else:
        photo2_url=edit_property.photo2_url

    if 'photo3_url' in request.files:
        image = request.files["photo3_url"]
        
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 401
        
        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        photo3_url = upload['url']
    else:
        photo3_url=edit_property.photo3_url

    form = PropertyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        form_types_array1 = form.data['property_types'][0].split(',')
        form_types_array = [int(x) for x in form_types_array1]
        types = Type.query.all()
        property_types = [type for type in types if type.id in form_types_array]

        form_amenity_array1 = form.data['property_amenities'][0].split(',')
        form_amenity_array = [int(x) for x in form_amenity_array1]
        amenities = Amenity.query.all()
        property_amenities = [amenity for amenity in amenities if amenity.id in form_amenity_array]

        
        edit_property.title=form.data['title']
        edit_property.description=form.data['description']
        edit_property.address=form.data['address']
        edit_property.city=form.data['city']
        edit_property.state=form.data['state']
        edit_property.zipcode=form.data['zipcode']
        edit_property.lat=form.data['lat']
        edit_property.lng=form.data['lng']
        edit_property.price=form.data['price']
        edit_property.service_fee=form.data['service_fee']
        edit_property.bedrooms=form.data['bedrooms']
        edit_property.bathrooms=form.data['bathrooms']
        edit_property.guests=form.data['guests']
        edit_property.user_id=form.data['user_id']
        edit_property.property_amenities=property_amenities
        edit_property.property_types=property_types
        edit_property.photo1_url=photo1_url
        edit_property.photo2_url=photo2_url
        edit_property.photo3_url=photo3_url
        


        db.session.commit()
        return edit_property.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@property_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_book(id):
    property = Property.query.get(id)
    db.session.delete(property)
    db.session.commit()
    return {'Successful': 'Successful'}
