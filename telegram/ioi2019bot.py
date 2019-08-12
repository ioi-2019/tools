import telebot

# file with comma delimited data 
filepath = "contestant-list.txt"
fields = ["MAC","IP","Seat","User","Name","Surname"]
 
f = open("ioi2019bot.key", "r")
botKey = f.read(45)
print(botKey)
bot = telebot.TeleBot(botKey)

@bot.message_handler(content_types=["text"])


def start_reading(message):
   try:
      if message.text == "/help":
         bot.send_message(message.from_user.id,"Enter the contestant related data (seat, IP or name) to get more detailed information.")
      else:
         if len(message.text) < 3:
             bot.send_message(message.from_user.id,"Please enter at least 3 characters")  
         else:
             search_data(message)      
   except Exception as e:
      print("Exception: Request "+message.text+" Error: "+str(e))
 
def search_data(message):
   ret_msg = "No data found..."

   # search in file
   f = open(filepath, "r")
   for line in f:
      if line.upper().find(message.text.upper()) >= 0:
         if ret_msg.find("No data found...") >= 0:
            ret_msg = ""

         values = line.split(',')
         idx = -1
         for val in values:
            idx = idx + 1
 
            #if idx < 2:
            #   continue
            ret_msg = ret_msg + fields[idx]+" : "+val+" \n"
   bot.send_message(message.from_user.id,ret_msg)

 
bot.polling(none_stop=True, interval=0)
