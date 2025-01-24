import sys
import joblib
import numpy as np
import pandas as pd
import os
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem.porter import PorterStemmer
import nltk
import psycopg2
from sqlalchemy import create_engine
import requests




try:
   
    url = "http://localhost:8080/api/collections/course/all"
    response = requests.get(url)
    
    if response.status_code == 200:
        courses = response.json()  # Parse JSON response
        if not courses:
            print("No data found in the course table.")
        else:
            # Convert the JSON response into a DataFrame
            df = pd.DataFrame(courses)
    
    
            if df.empty:
                print("No data found in the course table.")
    
            else : 
                
               # print(df.columns)  # This will list all columns in the DataFrame
                df.rename(columns={'title': 'Course Name'}, inplace=True)
                df.rename(columns={'difficultyLevel': 'Difficulty Level'}, inplace=True)
                df.rename(columns={'skills': 'Skills'}, inplace=True)
                df.rename(columns={'description': 'Course Description'}, inplace=True)

                # Save the DataFrame to a CSV file
                df.to_csv('course_data.csv', index=False)
                #print("Data has been exported to 'course_data.csv'.")

except Exception as e:
    print(f"Error: {e}")
    #pass


# Load the data
data = pd.read_csv("course_data.csv")

# Retaining necessary columns
data = data[['Course Name', 'Difficulty Level', 'Course Description', 'Skills']]

# title = course name , 
# Cleaning and formatting text data
data['Course Name'] = data['Course Name'].str.replace(' ', ',', regex=False).str.replace(',,', ',', regex=False).str.replace(':', '', regex=False)
data['Course Description'] = (
    data['Course Description']
    .str.replace(' ', ',', regex=False)
    .str.replace(',,', ',', regex=False)
    .str.replace('_', '', regex=False)
    .str.replace(':', '', regex=False)
    .str.replace('(', '', regex=False)
    .str.replace(')', '', regex=False)
)
data['Skills'] = data['Skills'].str.replace('(', '', regex=False).str.replace(')', '', regex=False)

# Creating tags column
data['tags'] = data['Course Name'] + " " + data['Difficulty Level'] + " " + data['Course Description'] + " " + data['Skills']

# Selecting and formatting columns
new_df = data[['Course Name', 'tags']].copy()
new_df['tags'] = new_df['tags'].str.replace(',', ' ', regex=False).str.lower()
new_df['Course Name'] = new_df['Course Name'].str.replace(',', ' ', regex=False).str.lower()
new_df.rename(columns={'Course Name': 'course_name'}, inplace=True)

# Initializing vectorizer
cv = CountVectorizer(max_features=5000, stop_words='english')
vectors = cv.fit_transform(new_df['tags']).toarray()

# Stemming function
ps = PorterStemmer()


def stem(text):
    return " ".join(ps.stem(word) for word in text.split())


# Apply stemming to tags
new_df['tags'] = new_df['tags'].apply(stem)

# Compute cosine similarity
similarity = cosine_similarity(vectors)


# Function to recommend courses
def recommend(course_name, courses, similarity_matrix):
    course_index = courses[courses['course_name'] == course_name].index[0]
    distances = similarity_matrix[course_index]
    course_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:8]
    recommended_courses = [courses.iloc[i[0]].course_name for i in course_list]
    return recommended_courses


# Predict function
def predicted_course(course_name):
    courses = new_df.copy()
    recommendations = recommend(course_name, courses, similarity)
    return recommendations


# Main execution block
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 predict.py <course_name>")
        sys.exit(1)

    try:
        course_title = sys.argv[1].lower()
        predictions = predicted_course(course_title)

        if predictions:
            #print("Recommended Courses:")
            for rec in predictions:
                print(f"{rec}")
        else:
            print("No recommendations found for the given course title.")
    except ValueError:
        print("Invalid Input Values")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
        

#python3 predictContentBased.py "Machine Learning 101"
# python3 predictContentBased.py "Supervised Machine Learning: Regression and Classification"



# Write the DataFrame to a CSV file
# data.to_csv("Coursera_updated.csv", index=False)


# user search + courses click - oita save in the array , array traverse 
# frontend  