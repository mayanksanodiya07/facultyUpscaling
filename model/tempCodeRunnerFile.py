combined_info = f"{faculty_row['responses.Q1'[0]]}".strip()
    recommended_courses = recommend(combined_info)
    recommendations.append(recommended_courses)
    #  {faculty_row['Q3']} {faculty_row['Q8']} {faculty_row['Q6']} {faculty_row['Q7']} {faculty_row['Q10']} {faculty_row['Q13']} {faculty_row['Q14']}
    recommendations_list.append({
        'No.': index + 1,
        'Faculty details': combined_info,
        'Recommended Courses': recommended_courses
    