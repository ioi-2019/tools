import telebot

# file with comma delimited data 
filepath = "/home/juser/telegrambot/final-contest.txt"
fields = ["Seat","Name","Surname","MAC","IP","Laptop"]
 
f = open("ioi2019bot.key", "r")
botKey = f.read(45)
print(botKey)
bot = telebot.TeleBot(botKey)

@bot.message_handler(content_types=["text"])


def start_reading(message):
   try:
      if message.text == "/salam":
         bot.send_message(message.from_user.id,"Ay eleykum salam")
      elif message.text == "/help":
         bot.send_message(message.from_user.id,"Just type the data you want to find.")
      else:
         if len(message.text) < 3:
             bot.send_message(message.from_user.id,"Please enter at least 3 characters")  
         else:
             search_data(message)      
   except:
      print("exception: "+message.text)
 
def search_data(message):
   ret_msg = "No data found..."

   # search in file
   f = open(filepath, "r")
   for line in f:
      if line.upper().find(message.text.upper()) >= 0:
         if ret_msg.find("No data found...") >= 0:
            ret_msg = ""

         values = line.split(',')
         idx = 0
         for val in values:
            ret_msg = ret_msg + fields[idx]+" : "+val+" \n"
            idx = idx + 1

   bot.send_message(message.from_user.id,ret_msg)

 
bot.polling(none_stop=True, interval=0)

