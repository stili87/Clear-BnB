from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

def username_length(form, field):
    username = field.data
    if len(username) > 40:
        raise ValidationError('Username is too long. (Maximum length is 40)')

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

def check_password(form, field):
    checking = field.data
    if len(checking) < 7:
        raise ValidationError('Password must be more than 6 characters.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, username_length])
    email = StringField('email', validators=[DataRequired(), user_exists, check_length])
    password = StringField('password', validators=[DataRequired(), check_length, check_password])
    name = StringField('name', validators=[DataRequired(), check_length])
    bio = TextAreaField('bio')
    picture_url = StringField('photo_url')
    location = StringField('location', validators=[DataRequired(), check_length])
