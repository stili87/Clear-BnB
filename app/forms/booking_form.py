from flask_wtf import FlaskForm
from wtforms import DecimalField, IntegerField, DateField
from wtforms.validators import DataRequired

class BookingForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    property_id = IntegerField('property_id', validators=[DataRequired()])
    start_date = DateField('start_date', validators=[DataRequired('Start Date is Required.')])
    end_date = DateField('end_date', validators=[DataRequired('End Date is Required.')])
    guests = IntegerField('guests', validators=[DataRequired()])
    cost = DecimalField('cost', validators=[DataRequired()])
