# Quiz - Find on which day of the week the Date falls on
# Generating a quiz
# Evaluating the score

import datetime 
import random 
import numpy as np
import json 
from time import sleep


# Function generating a Quiz for dates
def generate_quiz(start_year=1752, end_year = 2100, number_of_questions=5):
    """This function generates a quiz and returns -
    -------------------------------------------------
    1) Questions to be displayed - (str)
    2) Answers to the Questions
    """
    date_format = '%d-%m-%Y'  # The date is displayed in this format

    # Start and End Dates
    start_date = datetime.date(start_year, 1, 1)
    end_date = datetime.date(end_year, 12, 31)

    # Calculating the number of days
    no_days = (end_date-start_date).days

    # Picking 10 random number between 0 and the number of days
    days_array = np.arange(1, no_days+1)
    random_days = random.choices(days_array, k=number_of_questions)

    # Generating the Questions (Dates) & Answers (Day of the Week)
    question_displays = []
    answer_days = []
    for n_days in random_days:
        time_delta = datetime.timedelta(days = int(n_days))
        question_date = (start_date+time_delta) # Finding the date
        question_display = question_date.strftime(date_format) # Converting into Dispay Format
        answer_day = question_date.strftime("%A") # Taking only Day of the Week 
        # Appending the question and answer
        question_displays.append(question_display)
        answer_days.append(answer_day)
    
    # Creating a dictionary 
    quiz_dictonary = {question_displays[i]:answer_days[i] for i in range(len(answer_days))}

    return quiz_dictonary

# Fuction to dump the questions dictionary as a JSON file
def json_creation(questions_answers_dict, file_name = "questions/data.json"):
    """This function dumps the questions created as a JSON file"""
    with open(file_name, "w", encoding='utf-8') as file_pointer:
        json.dump(questions_answers_dict, file_pointer, ensure_ascii=False)


# Generated a Quiz
if __name__ == "__main__":
    dictionary = generate_quiz()
    json_creation(dictionary)
    
