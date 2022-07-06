from flask.cli import AppGroup
from .users import seed_users, undo_users
from .property import seed_properties, undo_properties
from .bookings import seed_bookings, undo_bookings
from .reviews import seed_reviews, undo_reviews
from .likes import seed_likes, undo_likes
from .amenities import seed_amenities, undo_amenities
from .types import seed_types, undo_types

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_amenities()
    seed_types()
    seed_users()
    seed_properties()
    seed_bookings()
    seed_reviews()
    seed_likes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_amenities()
    undo_types()
    undo_users()
    undo_properties()
    undo_bookings()
    undo_reviews()
    undo_likes()
    # Add other undo functions here
