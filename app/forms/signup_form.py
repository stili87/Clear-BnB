from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Email
from app.models import User

def username_length(form, field):
    username = field.data
    if len(username) > 40:
        raise ValidationError('Username is too long. (Maximum length is 40).')

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def check_length(form, field):
    checking = field.data
    if len(checking) > 255:
        raise ValidationError(f'{field.name.capitalize()} is too long. (Maximum length is 255).')

def check_bio_length(form, field):
    checking = field.data
    if len(checking) > 1024:
        raise ValidationError(f'{field.name.capitalize()} is too long. (Maximum length is 1024).')

def check_password(form, field):
    checking = field.data
    if len(checking) < 7:
        raise ValidationError('Password must be more than 6 characters.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired('User Name is required.'), username_exists, username_length])
    email = StringField('email', validators=[DataRequired('Email is required.'), Email("Please enter a proper email address."), user_exists, check_length, ])
    password = StringField('password', validators=[DataRequired('Password is required.'), check_length, check_password])
    name = StringField('name', validators=[DataRequired('Name is required.'), check_length])
    bio = TextAreaField('bio', validators=[check_bio_length])
    picture_url = StringField('photo_url')
    location = StringField('location', validators=[DataRequired('Location is required.'), check_length])
