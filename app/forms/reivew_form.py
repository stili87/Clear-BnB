from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def check_content_len(form, field):
    content = field.data
    print(len(content), '!'*50)
    if len(content) > 10000:
        raise ValidationError('Content cannot be more than 10,000 characters')


class ReviewForm(FlaskForm):
    content= TextAreaField('content', validators=[DataRequired(), check_content_len])
    rating= IntegerField('rating', validators=[DataRequired()])
    user_id= IntegerField('user_id', validators=[DataRequired()])
    property_id= IntegerField('property_id', validators=[DataRequired()])
