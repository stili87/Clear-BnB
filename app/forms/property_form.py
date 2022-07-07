from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, IntegerField, Field
from wtforms.validators import DataRequired, ValidationError


def check_title_len(form, field):
    title = field.data
    if len(title) > 255:
        raise ValidationError('Field cannot be more than 200 characters')

class ListField(Field):
    def process_formdata(self, valuelist):
        self.data = valuelist

def check_types(form, field):
    types_list = field.data
    if types_list[0] == '':
        raise ValidationError('Type of Property is Required')

def check_amenities(form, field):
    amenities_list = field.data
    if amenities_list[0] == '':
        raise ValidationError('Amenities of Property is Required')

def check_lat_lng(form, field):
    coordinate = field.data
    if coordinate == 0:
        raise ValidationError('Address not found')


class PropertyForm(FlaskForm):
            title = StringField('title', validators=[DataRequired(), check_title_len])
            description = TextAreaField('description', validators=[DataRequired()])
            address = StringField('address', validators=[DataRequired()])
            city = StringField('city', validators=[DataRequired()])
            state = StringField('state', validators=[DataRequired()])
            zipcode = StringField('zipcode', validators=[DataRequired()])
            lat = DecimalField('lat', validators=[check_lat_lng])
            lng = DecimalField('lng', validators=[check_lat_lng])
            price = DecimalField('price', validators=[DataRequired()])
            service_fee = DecimalField('service_fee', validators=[DataRequired()])
            bedrooms = IntegerField('bedrooms', validators=[DataRequired()])
            bathrooms = IntegerField('bathrooms', validators=[DataRequired()])
            guests = IntegerField('bathrooms', validators=[DataRequired()])
            property_types = ListField('property_types', validators=[check_types])
            property_amenities = ListField('property_amenities', validators=[check_amenities])
            user_id = IntegerField('user_id', validators=[DataRequired()])
