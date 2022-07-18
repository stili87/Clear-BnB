from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, IntegerField, Field
from wtforms.validators import DataRequired, ValidationError
import re


def check_title_len(form, field):
    title = field.data
    if len(title) > 40:
        raise ValidationError('Title cannot be more than 40 characters.')

class ListField(Field):
    def process_formdata(self, valuelist):
        self.data = valuelist

def check_types(form, field):
    types_list = field.data
    if types_list[0] == '':
        raise ValidationError('Type of Property is Required.')

def check_amenities(form, field):
    amenities_list = field.data
    if amenities_list[0] == '':
        raise ValidationError('Amenities of Property is Required.')

def check_lat_lng(form, field):
    coordinate = field.data
    if coordinate == 0:
        raise ValidationError('Address not found.')
        
def check_description_len(form, field):
    description = field.data
    if len(description) > 1024:
        raise ValidationError('Description cannot be more than 1,024 characters.')
def check_max_price(form, field):
    price = field.data
    if price > 10000:
        raise ValidationError('Cost per Night cannot be more than $10,000.')

def check_max_service(form, field):
    service = field.data
    if service > 500:
        raise ValidationError('Service Fee cannot be more than $500.')

def check_zip_code_numeric(form, field):
    zipcode = field.data
    if not re.match(r'\d{5}$', zipcode):
        raise ValidationError('Zipcode must be 5 digits exactly.')

class PropertyForm(FlaskForm):
            title = StringField('title', validators=[DataRequired('Title is required.'), check_title_len])
            description = TextAreaField('description', validators=[DataRequired('Description is required.'), check_description_len])
            address = StringField('address', validators=[DataRequired('Address is required.'), ])
            city = StringField('city', validators=[DataRequired('City is required.')])
            state = StringField('state', validators=[DataRequired('State is required.')])
            zipcode = StringField('zipcode', validators=[DataRequired('Zipcode is required.'), check_zip_code_numeric])
            lat = DecimalField('lat', validators=[check_lat_lng])
            lng = DecimalField('lng', validators=[check_lat_lng])
            price = DecimalField('price', validators=[DataRequired('Cost per night is required.'), check_max_price])
            service_fee = DecimalField('service_fee', validators=[DataRequired('Service Fee is required.'), check_max_service] )
            bedrooms = IntegerField('bedrooms', validators=[DataRequired()])
            bathrooms = IntegerField('bathrooms', validators=[DataRequired()])
            guests = IntegerField('bathrooms', validators=[DataRequired('Property Types is required.')])
            property_types = ListField('property_types', validators=[check_types])
            property_amenities = ListField('property_amenities', validators=[check_amenities])
            user_id = IntegerField('user_id', validators=[DataRequired()])
