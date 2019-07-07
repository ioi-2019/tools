from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
import csv
import logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',level=logging.INFO)
import os

# Load .env
from dotenv import load_dotenv
load_dotenv()

# Create a location dictionary
loc_file = 'location.csv'
with open(loc_file, mode='r') as infile:
    reader = csv.reader(infile)
    loc_dict = {rows[0]:rows[1] for rows in reader}

# Create Updater and Dispatcher object
updater = Updater(os.getenv("TELEGRAM_API_KEY"))
dispatcher = updater.dispatcher

# Reply wrapper method
def reply(bot, update, text):
    bot.send_message(chat_id=update.message.chat_id, text=text)

# A simple /start
def start(bot, update):
    reply(bot, update, "Use /location XX or /script AA BB commands.")

# Get the laptop name from location
def location(bot, update, args):    
    if len(args) == 0:
        reply(bot, update, "Location is not shown")
    else:
        key = args[0]
        if key in loc_dict:
            reply(bot, update, loc_dict[key])
        else:
            reply(bot, update, "Location doesn't exist")

# Default method to catch unknown commands
def unknown(bot, update):
    reply(bot, update, "This command is not implemented.")

# Register handlers
unknown_handler = MessageHandler(Filters.command, unknown)
start_handler = CommandHandler('start', start)
location_handler = CommandHandler('location', location, pass_args=True)
dispatcher.add_handler(start_handler)
dispatcher.add_handler(location_handler)
dispatcher.add_handler(unknown_handler)

# Start the bot
updater.start_polling()
