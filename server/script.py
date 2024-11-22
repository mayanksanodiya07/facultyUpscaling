import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import pymongo
import pickle
import sys
import nltk
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from difflib import get_close_matches

data = pd.read_csv("CourseSheet.csv", encoding='unicode_escape')
data.to_csv("original_course_data.csv", index=False)

# data.info()
redundantValues = data.duplicated()
nullValues = data.isnull()
data = data.dropna(how='any', axis=0)

data['Duration'] = data['Duration'].str.replace('weeks', '', case=False, regex=False).str.strip().astype(int)

for column in ['About', 'Prerequiste', 'Course Name', 'Industry support', 'Discipline']:
    data[column] = data[column].str.replace('_', '').str.replace(':', '').str.replace('(', '').str.replace(')', '').str.replace(' ', ',').str.replace(',,', ',')

courseData = data[['Course Name', 'SME Name', 'Link', 'Duration', 'Institute']].copy()
data['Duration'] = data['Duration'].astype(str)
courseData['Tokens'] = data['Course Name'] + data['About'] + data['Prerequiste'] + data['Industry support']+ data['Discipline']
courseData['Tokens'] = courseData['Tokens'].str.replace(',', ' ').apply(lambda x: x.lower())

# Stemming
stm = PorterStemmer()
def stemming(token):
    return " ".join([stm.stem(word) for word in token.split()])

courseData['Tokens'] = courseData['Tokens'].apply(stemming)

import nltk
from nltk.corpus import stopwords
nltk.download('stopwords')

# Load English stop words
stop_words = set(stopwords.words('english'))

# Remove stop words from Tokens
courseData['Tokens'] = courseData['Tokens'].apply(
    lambda x: " ".join(word for word in x.split() if word not in stop_words)
)

# Text Vectorization
cv = CountVectorizer(max_features=20000, stop_words='english')
vectors = cv.fit_transform(courseData['Tokens']).toarray()

# Cosine Similarity
similarity = cosine_similarity(vectors)

# Rename columns for consistency
courseData.rename(columns={'Course Name': 'CourseName'}, inplace=True)
processed_data = courseData[['CourseName', 'Tokens']]
processed_data.to_csv("processed_course_data.csv", index=False)

# Export the similarity matrix and processed data
pickle.dump(similarity, open('similarity.pkl', 'wb'))
pickle.dump(courseData, open('courses.pkl', 'wb'))
pickle.dump(data, open('coursesFull.pkl', 'wb'))

# Recommendation Function
def recommend(course, n_recommendations=6):
    if course in courseData['CourseName'].values:
        course_index = courseData[courseData['CourseName'] == course].index[0]
    else:
        close_matches = get_close_matches(course, courseData['CourseName'], n=1, cutoff=0.3)
        if close_matches:
            course_index = courseData[courseData['CourseName'] == close_matches[0]].index[0]
        else:
            return courseData['CourseName'].head(n_recommendations).tolist()

    distances = similarity[course_index]
    course_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:n_recommendations + 1]
    recommended_courses = [courseData.iloc[i[0]].CourseName for i in course_list]

    return recommended_courses

# MongoDB Connection
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["Project"]
mycol = mydb["apprisals"]
faculty_data = pd.DataFrame(list(mycol.find()))

# Process faculty responses and generate recommendations
recommendations_list = []
for index, faculty_row in faculty_data.iterrows():
    combined_info = " ".join(
        filter(
            None,
            [
                str(faculty_row._id),
                faculty_row.responses.get("Q1", ""),
                faculty_row.responses.get("Q3", ""),
                faculty_row.responses.get("Q8", ""),
                faculty_row.responses.get("Q6", ""),
                faculty_row.responses.get("Q7", ""),
                faculty_row.responses.get("Q10", ""),
                faculty_row.responses.get("Q13", ""),
                faculty_row.responses.get("Q14", ""),
            ]
        )
    ).strip()

    recommended_courses = recommend(combined_info)
    recommendations_list.append({
        'No.': index + 1,
        'Faculty details': combined_info,
        'Recommended Courses': recommended_courses
    })

    course_info = []
    for course_name in recommended_courses:
        
        course_row = data[data['Course Name'] == course_name]
        if not course_row.empty:
            sme_name = course_row['SME Name'].values[0]
            link = course_row['Link'].values[0]
            duration = course_row['Duration'].values[0]
            institute = course_row['Institute'].values[0]
            course_info.append({
                "coursename": course_name.replace(",", " "),
                "SME Name": sme_name,
                "link": link,
                "Duration": duration,
                "Institute": institute
            })

    mycol.update_one(
        {'_id': faculty_row['_id']},
        {'$set': {'Recommendations': course_info}}
    )

# Export faculty recommendations to CSV
recommendations_df = pd.DataFrame(recommendations_list)
recommendations_df.to_csv("faculty_recommendations.csv", index=False)















# import pandas as pd
# import numpy as np
# import matplotlib.pyplot as plt
# import pymongo
# import pickle
# import sys

# data=pd.read_csv("CourseSheet.csv", encoding='unicode_escape')
# data.head()
# data.to_csv("original_course_data.csv", index=False)
# data[['Course Name', 'Duration']].head(25)

# data.info()

# redundantValues = data.duplicated()
# redundantValues.sum()

# nullValues = data.isnull()
# nullValues.sum()

# data = data.dropna(how='any',axis=0)
# nullValues = data.isnull()
# nullValues.sum()

# #Removing the word 'weeks' from duration for better analysis
# data['Duration'] = data['Duration'].str.replace('weeks', '', case=False, regex=False).str.strip().astype(int)
# data[['Duration']].head(10)

# topDuration = data.groupby('Course Name')['Duration'].mean().reset_index()
# topDuration.sort_values('Duration', ascending=False, inplace=True)
# topDuration.head(10)

# topDuration.tail(10)


# courseDurations=data['Duration'].value_counts()
# ##plt.bar(courseDurations.index, courseDurations.values)
# ##plt.xlabel('Duration')
# ##plt.ylabel('Count')
# ##plt.title('Number of courses in each duration')
# ##plt.show()

# """# *Data Preprocessing*"""

# # Seperate all the words in 'About' column by a comma

# data['About'] = data['About'].str.replace('_','')
# data['About'] = data['About'].str.replace(':','')
# data['About'] = data['About'].str.replace('(','')
# data['About'] = data['About'].str.replace(')','')
# data['About'] = data['About'].str.replace(' ',',')
# data['About'] = data['About'].str.replace(',,',',')

# # Seperate all the words in 'Prerequiste' column by a comma

# data['Prerequiste'] = data['Prerequiste'].str.replace('_','')
# data['Prerequiste'] = data['Prerequiste'].str.replace(':','')
# data['Prerequiste'] = data['Prerequiste'].str.replace('(','')
# data['Prerequiste'] = data['Prerequiste'].str.replace(')','')
# data['Prerequiste'] = data['Prerequiste'].str.replace(' ',',')
# data['Prerequiste'] = data['Prerequiste'].str.replace(',,',',')

# # Seperate all the words in 'Course Name' column by a comma

# data['Course Name'] = data['Course Name'].str.replace(':','')
# data['Course Name'] = data['Course Name'].str.replace(' ',',')
# data['Course Name'] = data['Course Name'].str.replace(',,',',')

# data['Industry support'] = data['Industry support'].str.replace('_','')
# data['Industry support'] = data['Industry support'].str.replace(':','')
# data['Industry support'] = data['Industry support'].str.replace('(','')
# data['Industry support'] = data['Industry support'].str.replace(')','')
# data['Industry support'] = data['Industry support'].str.replace(' ',',')
# data['Industry support'] = data['Industry support'].str.replace(',,',',')

# # Create a new dataframe and copy 'Course Name' column into it
# courseData = data[['Course Name']].copy()
# # courseData = data[['SME Name']].copy()

# data['Duration'] = data['Duration'].astype(str)
# courseData['Tokens'] = data['Course Name']+data['About']+data['Prerequiste']+data['Industry support']
# courseData['Tokens'] = courseData['Tokens'].str.replace(',',' ')
# courseData['Course Name'] = courseData['Course Name'].str.replace(',',' ')
# courseData['Tokens'] = courseData['Tokens'].apply(lambda x:x.lower())
# courseData

# """# *Stemming*"""

# import nltk
# from nltk.stem.porter import PorterStemmer
# stm = PorterStemmer()
# def stemming(token):
#     tk=[]
#     # For each word in 'Token' column extract the root or stem word of each word
#     for i in token.split():
#         tk.append(stm.stem(i))
#     return " ".join(tk)
# courseData['Tokens'] = courseData['Tokens'].apply(stemming)

# courseData.head(10)

# """# *Text Vectorization*"""

# from sklearn.feature_extraction.text import CountVectorizer

# # Initiate a CountVectorizer object with a maximum of 10,000 features (words)

# cv = CountVectorizer(max_features=20000,stop_words='english')

# # Fit the vectorizer to the 'Tokens' column in the 'courseData' DataFrame and convert it into a document-term matrix

# vectors = cv.fit_transform(courseData['Tokens']).toarray()
# xxx = 0;
# for i in vectors[0]:
# ##    if(i == 1):
# ##        print(xxx);
#     xxx=xxx+1
# cv.get_feature_names_out()[124]

# """# *Cosine Similarity*"""

# from sklearn.metrics.pairwise import cosine_similarity
# # Calculate the cosine similarity between the document-term matrix stored in the vectors variable
# similarity = cosine_similarity(vectors)

# courseData.rename(columns = {'Course Name':'CourseName'}, inplace = True)
# courseData

# processed_data = courseData[['CourseName', 'Tokens']]
# processed_data.to_csv("processed_course_data.csv", index=False)

# data.rename(columns={'Course Name': 'CourseName'}, inplace=True)
# # Export the similarity matrix and the dataframe containing course names and tokens

# pickle.dump(similarity,open('similarity.pkl','wb'))
# pickle.dump(courseData,open('courses.pkl','wb'))
# pickle.dump(data,open('coursesFull.pkl','wb'))
# # similarity
# # data
# courseData

# import pandas as pd
# from difflib import get_close_matches


# def recommend(course, n_recommendations=6):
#     if course in courseData['CourseName'].values:
#         course_index = courseData[courseData['CourseName'] == course].index[0]
#     else:
#         close_matches = get_close_matches(course, courseData['CourseName'], n=1, cutoff=0.3)
#         if close_matches:
#             course_index = courseData[courseData['CourseName'] == close_matches[0]].index[0]
#         else:

#             return courseData['CourseName'].head(n_recommendations).tolist()

#     distances = similarity[course_index]

#     course_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:n_recommendations + 1]

#     recommended_courses = [courseData.iloc[i[0]].CourseName for i in course_list]

#     return recommended_courses

# myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# mydb = myclient["Project"]
# mycol = mydb["apprisals"]
# faculty_data = pd.DataFrame(list(mycol.find()))
# recommendations_list = []
# recommendations=[]
# # print(faculty_data)

# for index, faculty_row in faculty_data.iterrows():
#     # print(faculty_row.responses)
#     combined_info = " ".join(
#     filter(
#         None,  # This will filter out any None values
#         [
#             str(faculty_row._id),
#             faculty_row.responses.get("Q1", ""),
#             faculty_row.responses.get("Q3", ""),
#             faculty_row.responses.get("Q8", ""),
#             faculty_row.responses.get("Q6", ""),
#             faculty_row.responses.get("Q7", ""),
#             faculty_row.responses.get("Q10", ""),
#             faculty_row.responses.get("Q13", ""),
#             faculty_row.responses.get("Q14", ""),
#         ]
#     )
#     ).strip()

#     # print(combined_info)
#     recommended_courses = recommend(combined_info)
#     recommendations.append(recommended_courses)
#     # 
#     recommendations_list.append({
#         'No.': index + 1,
#         'Faculty details': combined_info,
#         'Recommended Courses': recommended_courses
#     })
#     mycol.update_one(
#         {'_id': faculty_row['_id']},
#         {'$set': {'Recommendations': recommended_courses}}
#     )


# recommendations_df = pd.DataFrame(recommendations_list)
# recommendations_df.to_csv("faculty_recommendations.csv", index=False)


# # print(recommendations)


